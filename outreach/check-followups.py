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
                status = row.get("Status", "").strip()
                notes = row.get("Follow-up Notes", "").strip()
                accepted = row.get("Accepted Date", "").strip()
                name = row.get("Name", "").strip()
                company = row.get("Company", "").strip()
                
                if status == "Connected" and accepted:
                    # Check if follow-up was sent
                    followup_sent = any(phrase in notes.lower() for phrase in [
                        "follow-up sent", "replied", "messaged"
                    ])
                    
                    if not followup_sent:
                        # Calculate hours since acceptance
                        try:
                            accepted_dt = datetime.strptime(accepted, "%Y-%m-%d")
                            hours_ago = (datetime.now() - accepted_dt).total_seconds() / 3600
                            urgency = "⚠️ OVERDUE" if hours_ago > 24 else f"⏰ {24 - int(hours_ago)}h remaining"
                        except:
                            urgency = "⚠️ Unknown"
                        
                        pending.append({
                            "name": name,
                            "company": company,
                            "accepted": accepted,
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
        print(f"   {p['name']} — {p['company']}")
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
