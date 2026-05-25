#!/usr/bin/env python3
"""
Track LinkedIn connections and follow-ups for John's OCC outreach.

Usage examples:
  python3 linkedin-connection-tracker.py --add "Thomas Mallerman,emergiTEL,VP Sales,V-A,2026-05-19"
  python3 linkedin-connection-tracker.py --accept "Thomas Mallerman"
  python3 linkedin-connection-tracker.py --list pending
  python3 linkedin-connection-tracker.py --list accepted
"""
import argparse
import json
import os
import subprocess
import sys
from datetime import date

SHEET_ID = "1tXnqwo_yKwdVEH7C6sFZVp3YOj2uKdUjzdxiT1ABXh0"
GAPI = "/Users/johncunningham/.hermes/skills/productivity/google-workspace/scripts/google_api.py"

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--add", help="Add new connection: Name,Company,Title,MessageType,Date")
    p.add_argument("--accept", help="Mark connection as accepted by name")
    p.add_argument("--list", choices=["pending", "accepted", "all"], help="List connections")
    p.add_argument("--sheet-name", default="LinkedIn Connections", help="Sheet name")
    args = p.parse_args()

    env = os.environ.copy()
    env["HERMES_HOME"] = "/Users/johncunningham/.hermes"

    if args.add:
        # Parse the add string
        parts = args.add.split(",")
        if len(parts) != 5:
            print("Error: --add requires Name,Company,Title,MessageType,Date")
            return 1
        
        name, company, title, msg_type, req_date = [p.strip() for p in parts]
        
        # Create row
        values = [[req_date, name, company, title, msg_type, "Pending", "", ""]]
        
        # Append to sheet
        cmd = [
            sys.executable, GAPI, "sheets", "append", SHEET_ID, 
            f"{args.sheet_name}!A:H",
            "--values", json.dumps(values),
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, env=env)
        
        if result.returncode != 0:
            print("Error adding connection:")
            print(result.stderr)
            return 1
        
        print(f"Added connection: {name} at {company}")
    
    elif args.accept:
        print(f"Marking {args.accept} as accepted...")
        # This would require reading the sheet, finding the row, and updating
        # For now, manual update in sheet
        print("Please manually update the Status column to 'Accepted' in the sheet")
    
    elif args.list:
        # Read the sheet
        cmd = [sys.executable, GAPI, "sheets", "get", SHEET_ID, f"{args.sheet_name}!A:H"]
        result = subprocess.run(cmd, capture_output=True, text=True, env=env)
        
        if result.returncode != 0:
            print("Error reading connections:")
            print(result.stderr)
            return 1
        
        try:
            data = json.loads(result.stdout)
            if not data:
                print("No connections found")
                return
            
            headers = data[0] if data else []
            print(f"{'Name':<20} {'Company':<20} {'Status':<10} {'Date':<12}")
            print("-" * 62)
            
            for row in data[1:]:  # Skip header
                if len(row) >= 6:
                    req_date, name, company, title, msg_type, status = row[:6]
                    if args.list == "all" or status.lower() == args.list:
                        print(f"{name:<20} {company:<20} {status:<10} {req_date:<12}")
        
        except json.JSONDecodeError:
            print("Error parsing sheet data")
            return 1

if __name__ == "__main__":
    main()