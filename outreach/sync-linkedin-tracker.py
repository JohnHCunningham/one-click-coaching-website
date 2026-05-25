#!/usr/bin/env python3
"""
Sync LinkedIn Tracker → Outreach Pipeline

Reads John's LinkedIn Tracker Google Sheet and:
1. Finds connections that are accepted but not yet followed up
2. Displays the qualified leads
3. Optionally exports them to CSV for enrichment

Usage:
  python3 sync-linkedin-tracker.py                  # Show leads ready for outreach
  python3 sync-linkedin-tracker.py --export          # Export to CSV for enrichment
  python3 sync-linkedin-tracker.py --mark-sent       # Mark exported leads as Follow-Up sent

Requires: Google Sheets API enabled, token at ~/.hermes/google_token.json
"""

import csv
import json
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path

# --- Configuration ---
SHEET_ID = "13Qo3tZvlWBYnoPWn7-m7sBbBPVeLEfDYVLmK-0SlleQ"
SHEET_RANGE = "A2:J200"  # Skip header rows
GAPI = [
    "python3",
    str(Path.home() / ".hermes/skills/productivity/google-workspace/scripts/google_api.py"),
]
OUTREACH_DIR = Path(__file__).parent
EXPORT_FILE = OUTREACH_DIR / "linkedin-qualified-leads.csv"

os.environ.setdefault("HERMES_HOME", str(Path.home() / ".hermes"))


def read_tracker():
    """Read the LinkedIn Tracker sheet and return leads as dicts."""
    result = subprocess.run(
        GAPI + ["sheets", "get", SHEET_ID, SHEET_RANGE],
        capture_output=True, text=True, timeout=30
    )
    if result.returncode != 0:
        print(f"Error reading sheet: {result.stderr[:200]}")
        return []

    rows = json.loads(result.stdout)

    # Header row
    headers = ["firstName", "lastName", "title", "company", "dateSent",
               "dateAccepted", "status", "connectionType", "followUpSent", "notes"]

    leads = []
    for row in rows:
        if not row or len(row) < 7:
            continue
        lead = {}
        for i, h in enumerate(headers):
            lead[h] = row[i].strip() if i < len(row) and row[i] else ""
        leads.append(lead)

    return leads


def find_qualified(leads):
    """Find leads that are accepted but not followed up."""
    qualified = []
    for lead in leads:
        status = lead.get("status", "").strip().lower()
        follow_up = lead.get("followUpSent", "").strip().lower()
        name = f"{lead.get('firstName', '')} {lead.get('lastName', '')}".strip()

        if not name or name == "First Name":
            continue

        if status == "accepted" and follow_up in ("no", "", "n"):
            qualified.append(lead)

    return qualified


def export_csv(leads, path):
    """Export qualified leads to CSV ready for enrichment."""
    fieldnames = ["firstName", "lastName", "title", "company", "notes",
                  "linkedinStatus", "linkedinDateAccepted"]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for lead in leads:
            writer.writerow({
                "firstName": lead.get("firstName", ""),
                "lastName": lead.get("lastName", ""),
                "title": lead.get("title", ""),
                "company": lead.get("company", ""),
                "notes": lead.get("notes", ""),
                "linkedinStatus": lead.get("status", ""),
                "linkedinDateAccepted": lead.get("dateAccepted", ""),
            })
    return path


def display_leads(leads):
    """Display leads in terminal-friendly format."""
    if not leads:
        print("No qualified leads ready for outreach.")
        return

    print(f"\n{len(leads)} leads ready for outreach:\n")
    for i, lead in enumerate(leads):
        name = f"{lead.get('firstName', '')} {lead.get('lastName', '')}".strip()
        title = lead.get("title", "")
        company = lead.get("company", "")
        date = lead.get("dateAccepted", "")
        notes = lead.get("notes", "")
        print(f"  [{i+1}] {name}")
        print(f"      {title} at {company}")
        if date:
            print(f"      Accepted: {date}")
        if notes:
            print(f"      Notes: {notes}")
        print()


def mark_followed_up(names):
    """Not yet implemented — would update the sheet via API."""
    print("Note: Automatic sheet updating not yet implemented.")
    print("Mark these leads as Follow-Up Sent = Yes manually in the sheet:")
    for n in names:
        print(f"  - {n}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Sync LinkedIn Tracker to outreach pipeline")
    parser.add_argument("--export", action="store_true", help="Export qualified leads to CSV")
    parser.add_argument("--mark-sent", action="store_true", help="Mark leads as followed up")
    args = parser.parse_args()

    print("Reading LinkedIn Tracker...")
    all_leads = read_tracker()
    qualified = find_qualified(all_leads)

    display_leads(qualified)

    if args.export and qualified:
        path = export_csv(qualified, EXPORT_FILE)
        print(f"Exported to: {path}")
        print(f"\nNext: python3 enrich-leads.py {path}")

    if args.mark_sent:
        mark_followed_up([f"{l['firstName']} {l['lastName']}" for l in qualified])

    # Summary
    total = len([l for l in all_leads if l.get("firstName", "").strip()])
    pending = len([l for l in all_leads if l.get("status", "").strip().lower() == "pending"])
    accepted = len([l for l in all_leads if l.get("status", "").strip().lower() == "accepted"])
    print(f"\nTracker summary: {total} total | {pending} pending | {accepted} accepted | {len(qualified)} ready for outreach")
