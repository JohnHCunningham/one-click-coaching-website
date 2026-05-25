#!/usr/bin/env python3
"""
Dedupe new Evaboot/Sales Nav exports against OCC master prospect ledger.

Purpose:
- Prevent duplicate work as John changes Sales Navigator searches.
- Keep one source of truth before enrichment / Instantly import.

Usage:
  python3 dedupe-prospects.py new-export.csv
  python3 dedupe-prospects.py new-export.csv --batch-name "Ontario VP Sales Batch 2"

Outputs:
- outreach/prospect-ledger.csv updated
- outreach/deduped/YYYYMMDD-HHMMSS-new-prospects.csv
- outreach/deduped/YYYYMMDD-HHMMSS-duplicates.csv
"""
import argparse
import csv
import hashlib
import re
from datetime import datetime
from pathlib import Path

BASE = Path(__file__).resolve().parent
LEDGER = BASE / "prospect-ledger.csv"
OUTDIR = BASE / "deduped"
OUTDIR.mkdir(exist_ok=True)

LEDGER_FIELDS = [
    "prospect_key", "first_name", "last_name", "title", "company", "email", "linkedin_url",
    "website", "source_file", "batch_name", "first_seen_date", "last_seen_date", "status", "notes"
]

FIELD_ALIASES = {
    "first_name": ["first_name", "firstname", "first name", "firstName", "First Name"],
    "last_name": ["last_name", "lastname", "last name", "lastName", "Last Name"],
    "title": ["title", "job_title", "job title", "position", "Title", "Job Title"],
    "company": ["company", "company_name", "company name", "Company", "Company Name"],
    "email": ["email", "Email", "email address", "Email Address", "professional_email"],
    "linkedin_url": ["linkedin_url", "linkedin", "LinkedIn", "profileUrl", "Profile URL", "Linkedin Profile", "linkedinProfile"],
    "website": ["website", "Website", "company_website", "Company Website", "domain", "Company Domain"],
}

def norm(s):
    return re.sub(r"\s+", " ", (s or "").strip())

def norm_key_part(s):
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())

def get(row, field):
    lower_map = {k.lower(): k for k in row.keys()}
    for alias in FIELD_ALIASES[field]:
        if alias in row and row.get(alias):
            return norm(row.get(alias))
        lk = alias.lower()
        if lk in lower_map and row.get(lower_map[lk]):
            return norm(row.get(lower_map[lk]))
    return ""

def make_key(row):
    email = get(row, "email").lower()
    linkedin = get(row, "linkedin_url").lower().rstrip("/")
    if email:
        return "email:" + email
    if linkedin:
        return "li:" + linkedin
    name_company = "|".join([
        norm_key_part(get(row, "first_name")),
        norm_key_part(get(row, "last_name")),
        norm_key_part(get(row, "company")),
    ])
    if name_company.replace("|", ""):
        return "nameco:" + hashlib.sha1(name_company.encode()).hexdigest()[:16]
    return "row:" + hashlib.sha1(str(row).encode()).hexdigest()[:16]

def read_any_csv(path):
    raw = Path(path).read_bytes()
    encodings = ["utf-8-sig", "utf-16", "latin-1"]
    last_err = None
    for enc in encodings:
        try:
            text = raw.decode(enc)
            sample = text[:4096]
            dialect = csv.Sniffer().sniff(sample, delimiters=",\t;")
            rows = list(csv.DictReader(text.splitlines(), dialect=dialect))
            if rows:
                return rows
        except Exception as e:
            last_err = e
    raise SystemExit(f"Could not parse CSV: {last_err}")

def load_ledger():
    if not LEDGER.exists():
        return {}, []
    with LEDGER.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    return {r["prospect_key"]: r for r in rows if r.get("prospect_key")}, rows

def write_csv(path, rows, fields):
    with Path(path).open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in rows:
            w.writerow({k: r.get(k, "") for k in fields})

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv_path")
    ap.add_argument("--batch-name", default="")
    args = ap.parse_args()

    source = Path(args.csv_path).expanduser().resolve()
    today = datetime.now().strftime("%Y-%m-%d")
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    batch = args.batch_name or source.stem

    existing_by_key, ledger_rows = load_ledger()
    new_rows_raw = read_any_csv(source)

    new_for_ledger = []
    duplicates = []
    seen_this_file = set()

    for row in new_rows_raw:
        key = make_key(row)
        clean = {
            "prospect_key": key,
            "first_name": get(row, "first_name"),
            "last_name": get(row, "last_name"),
            "title": get(row, "title"),
            "company": get(row, "company"),
            "email": get(row, "email"),
            "linkedin_url": get(row, "linkedin_url"),
            "website": get(row, "website"),
            "source_file": source.name,
            "batch_name": batch,
            "first_seen_date": today,
            "last_seen_date": today,
            "status": "new",
            "notes": "",
        }
        if key in existing_by_key or key in seen_this_file:
            prior = existing_by_key.get(key, {})
            dup = clean.copy()
            dup["status"] = "duplicate"
            dup["notes"] = f"Already seen: {prior.get('first_seen_date','same file')} {prior.get('batch_name','')}"
            duplicates.append(dup)
            if key in existing_by_key:
                existing_by_key[key]["last_seen_date"] = today
        else:
            new_for_ledger.append(clean)
            existing_by_key[key] = clean
            ledger_rows.append(clean)
            seen_this_file.add(key)

    new_path = OUTDIR / f"{stamp}-new-prospects.csv"
    dup_path = OUTDIR / f"{stamp}-duplicates.csv"
    write_csv(new_path, new_for_ledger, LEDGER_FIELDS)
    write_csv(dup_path, duplicates, LEDGER_FIELDS)
    write_csv(LEDGER, ledger_rows, LEDGER_FIELDS)

    print(f"source: {source}")
    print(f"input_rows: {len(new_rows_raw)}")
    print(f"new_prospects: {len(new_for_ledger)}")
    print(f"duplicates: {len(duplicates)}")
    print(f"ledger_total: {len(ledger_rows)}")
    print(f"new_file: {new_path}")
    print(f"duplicates_file: {dup_path}")
    print(f"ledger: {LEDGER}")

if __name__ == "__main__":
    main()
