#!/usr/bin/env python3
"""
Daily check for accepted connections needing follow-up within 24 hours.
Scans today's and yesterday's CSVs for "Connected" status entries
without follow-up notes.

Usage: python3 check-followups.py
"""
import csv
import os
from datetime import date, datetime, timedelta

OUTREACH_DIR = "/Users/johncunningham/one-click-coaching-website/outreach"

def safe_strip(val):
    """Return stripped string, or empty string if None."""
    return (val or "").strip()

def check_followups():
    today = str(date.today())
    yesterday = str(date.today() - timedelta(days=1))
    
    pending = []
    
    # Check both today's and yesterday's sheets
    for day in [today, yesterday]:
        csv_file = os.path.join(OUTREACH_DIR, f"linkedin-connections-{day}.csv")
        if not os.path.exists(csv_file):
            continue
        
        with open(csv_file, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Skip blank/malformed rows that produce None keys
                if row is None or not any(row.values()):
                    continue
                
                status = safe_strip(row.get("Status"))
                name = safe_strip(row.get("Name"))
                company = safe_strip(row.get("Company"))
                title = safe_strip(row.get("Title"))
                accepted_date = safe_strip(row.get("Date"))
                
                # Status values in CSV: Sent, Pending, Accepted
                # "Accepted" means they connected — needs follow-up
                if status == "Accepted" and name:
                    # Calculate hours since acceptance
                    try:
                        accepted_dt = datetime.strptime(accepted_date, "%Y-%m-%d")
                        hours_ago = (datetime.now() - accepted_dt).total_seconds() / 3600
                        urgency = "⚠️ OVERDUE" if hours_ago > 24 else f"⏰ {24 - int(hours_ago)}h remaining"
                    except:
                        urgency = "⚠️ Unknown"
                    
                    pending.append({
                        "name": name,
                        "company": company,
                        "title": title,
                        "accepted": accepted_date,
                        "urgency": urgency,
                        "source": day
                    })
    
    return pending

def main():
    print("🔍 Checking for un-followed connections...")
    print()
    
    pending = check_followups()
    
    if not pending:
        print("✅ All connected prospects have follow-ups sent.")
        return
    
    print(f"⚠️  {len(pending)} connection(s) need follow-up:")
    print()
    
    for p in pending:
        print(f"   {p['name']} — {p['title']} @ {p['company']}" if p['company'] else f"   {p['name']} — {p['title']}")
        print(f"   Accepted: {p['accepted']} | {p['urgency']}")
        print(f"   Source: linkedin-connections-{p['source']}.csv")
        print()
    
    print("📋 Copy the follow-up template:")
    print("   Subject: Good to connect, [Name]")
    print("   Appreciate the connection. [Personalized line about their company/role.]")
    print("   Would enjoy hearing your perspective on [relevant topic].")
    print()

if __name__ == "__main__":
    main()
