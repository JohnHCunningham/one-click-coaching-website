#!/usr/bin/env python3
"""
merge-email-icebreakers.py

Takes Claude's icebreaker output + Evaboot CSV → Instantly-ready CSV.

Usage:
  python3 merge-email-icebreakers.py claude-output.md evaboot-export.csv

Inputs:
  claude-output.md  — Claude Pro's structured output (name, SEND/SKIP, icebreaker)
  evaboot-export.csv — UTF-16 tab-separated Evaboot export (email, firstName, lastName, company...)

Output:
  outreach/email-batch-YYYY-MM-DD.csv — Instantly-ready: email, firstName, lastName, company, personalization
"""

import csv
import re
import sys
from datetime import datetime
from pathlib import Path

OUTREACH_DIR = Path(__file__).resolve().parent  # /outreach/ directory
DOWNLOADS_DIR = Path.home() / "Downloads"  # Where John expects the output


def parse_claude_output(filepath: str) -> dict:
    """
    Parse Claude's structured output into a dict keyed by full name.
    Returns: {"Sarah Chen": {"icebreaker": "...", "status": "SEND"}, ...}
    """
    text = Path(filepath).read_text(encoding="utf-8")

    entries = {}
    current_name = None
    current_block = {}

    lines = text.split("\n")
    for line in lines:
        line = line.strip()

        # Match: "1. Sarah Chen — Meridian SaaS" or "12. John Smith — Acme Corp"
        # Also handles "**1. Bob Jacobs — Lucidworks**" (bold markdown)
        name_match = re.match(r"^\*{0,2}\d+\.\s+(.+?)\s+[—\-]\s+(.+?)\*{0,2}$", line)
        if name_match:
            if current_name and current_block:
                entries[current_name] = current_block
            current_name = name_match.group(1).strip()
            current_block = {"company": name_match.group(2).strip().rstrip("*")}
            continue

        # Match: SEND | SKIP (possibly with ⊘ prefix from Claude)
        if line in ("SEND", "SKIP") or line == "⊘ SKIP":
            current_block["status"] = "SKIP" if "SKIP" in line else "SEND"
            # If ⊘ SKIP, the reason is on the next line(s)
            if "⊘" in line:
                current_block["_awaiting_skip_reason"] = True
            continue

        # Capture SKIP reason after ⊘ SKIP (multi-line until Icebreaker or next entry)
        if current_block.get("_awaiting_skip_reason") and line and not line.startswith("---") and not re.match(r"^\d+\.", line) and not line.startswith("Icebreaker:"):
            if "skip_reason" in current_block:
                current_block["skip_reason"] += " " + line
            else:
                current_block["skip_reason"] = line
            continue

        # Match: "SKIP — reason" or "SKIP - reason" (inline reason)
        skip_match = re.match(r"^(?:⊘\s*)?SKIP\s*[—\-]\s*(.+)$", line)
        if skip_match:
            current_block["status"] = "SKIP"
            current_block["skip_reason"] = skip_match.group(1).strip()
            current_block.pop("_awaiting_skip_reason", None)
            continue

        # Match: "Icebreaker: ..."
        ice_match = re.match(r"^Icebreaker:\s*(.+)$", line)
        if ice_match:
            current_block["icebreaker"] = ice_match.group(1).strip()
            current_block.pop("_awaiting_skip_reason", None)
            continue

        # Multi-line icebreaker continuation (no label, just text after icebreaker line)
        if "icebreaker" in current_block and line and not line.startswith("SUMMARY") and not line.startswith("Send:") and not line.startswith("Skip:") and not line.startswith("---") and not re.match(r"^\d+\.", line):
            current_block["icebreaker"] += " " + line

    # Don't forget the last entry
    if current_name and current_block:
        entries[current_name] = current_block

    return entries


def read_evaboot_csv(filepath: str) -> list:
    """
    Read Evaboot CSV. Handles UTF-16 tab-separated format.
    Returns list of dicts with keys: email, firstName, lastName, company
    """
    raw = Path(filepath).read_bytes()

    # Try UTF-16 first (Evaboot default), then UTF-8
    try:
        text = raw.decode("utf-16")
    except (UnicodeDecodeError, UnicodeError):
        text = raw.decode("utf-8-sig")

    # Tab-separated
    reader = csv.DictReader(text.splitlines(), delimiter="\t")
    rows = list(reader)

    # Normalize column names: strip spaces, lowercase — handles "First Name" → "firstname"
    normalized = []
    for row in rows:
        nr = {}
        for k, v in row.items():
            # "First Name" → "firstname", "Email" → "email"
            clean_key = k.lower().replace(" ", "")
            nr[clean_key] = v
        # Only keep rows with an email
        if nr.get("email", "").strip():
            normalized.append(nr)

    return normalized


def merge(claude_entries: dict, evaboot_rows: list) -> tuple:
    """
    Match Claude icebreakers to Evaboot rows by full name (case-insensitive).
    Returns (output_rows, skipped_list, unmatched_sends_set).
    """
    output = []
    matched = set()
    skipped = []

    for row in evaboot_rows:
        first = row.get("firstname", "").strip()
        last = row.get("lastname", "").strip()
        full_name = f"{first} {last}".strip()
        email = row.get("email", "").strip()
        company = row.get("company", "").strip()

        if not email:
            continue

        # Try exact match first
        icebreaker = None
        entry = None

        if full_name in claude_entries:
            entry = claude_entries[full_name]
        else:
            # Case-insensitive match
            for name, e in claude_entries.items():
                if name.lower() == full_name.lower():
                    entry = e
                    break

        if entry and entry.get("status") == "SEND" and entry.get("icebreaker"):
            icebreaker = entry["icebreaker"]
            matched.add(full_name)
            # Use Claude's company if Evaboot didn't have one
            if not company and entry.get("company"):
                company = entry["company"]
        elif entry and entry.get("status") == "SKIP":
            skipped.append(f"{full_name}: {entry.get('skip_reason', 'no reason')}")
            continue

        output.append({
            "email": email,
            "firstName": first,
            "lastName": last,
            "company": company,
            "personalization": icebreaker or "",
        })

    # Remove rows without icebreakers (unmatched leads or Claude SKIPs with emails)
    output = [r for r in output if r["personalization"]]

    # Report unmatched Claude entries
    unmatched = set(claude_entries.keys()) - matched
    unmatched_sends = {
        n for n in unmatched
        if claude_entries[n].get("status") == "SEND"
    }

    return output, skipped, unmatched_sends


def write_instantly_csv(rows: list) -> str:
    """Write Instantly-ready CSV. Returns filepath."""
    today = datetime.now().strftime("%Y-%m-%d")
    outpath = DOWNLOADS_DIR / f"email-batch-{today}.csv"

    fieldnames = ["email", "firstName", "lastName", "company", "personalization"]
    with open(outpath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

    return str(outpath)


def main():
    if len(sys.argv) < 3:
        print("Usage: python3 merge-email-icebreakers.py claude-output.md evaboot-export.csv")
        sys.exit(1)

    claude_file = sys.argv[1]
    evaboot_file = sys.argv[2]

    # Parse
    print(f"Parsing Claude output: {claude_file}")
    claude_entries = parse_claude_output(claude_file)
    sends = sum(1 for e in claude_entries.values() if e.get("status") == "SEND")
    skips = sum(1 for e in claude_entries.values() if e.get("status") == "SKIP")
    print(f"  Found {len(claude_entries)} entries: {sends} SEND, {skips} SKIP")

    print(f"\nReading Evaboot CSV: {evaboot_file}")
    evaboot_rows = read_evaboot_csv(evaboot_file)
    print(f"  Found {len(evaboot_rows)} leads with emails")

    # Merge
    print("\nMerging...")
    output_rows, skipped, unmatched = merge(claude_entries, evaboot_rows)

    # Report
    with_icebreaker = sum(1 for r in output_rows if r["personalization"])
    without_icebreaker = sum(1 for r in output_rows if not r["personalization"])

    print(f"  {with_icebreaker} leads with icebreakers")
    print(f"  {without_icebreaker} leads without icebreakers (no match or SKIP)")
    if skipped:
        print(f"  {len(skipped)} skipped: {', '.join(skipped[:5])}" + ("..." if len(skipped) > 5 else ""))
    if unmatched:
        print(f"  ⚠ {len(unmatched)} SEND entries not found in CSV: {', '.join(list(unmatched)[:5])}" + ("..." if len(unmatched) > 5 else ""))

    # Write
    outpath = write_instantly_csv(output_rows)
    print(f"\n✅ Instantly-ready CSV written: {outpath}")
    print(f"   Columns: email, firstName, lastName, company, personalization")
    print(f"\n   Next: Import into Instantly → Campaign → Leads tab → Import")
    print(f"   IMPORTANT: Uncheck 'Check for duplicates' before importing.")


if __name__ == "__main__":
    main()
