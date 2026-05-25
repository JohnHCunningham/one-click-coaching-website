#!/usr/bin/env python3
"""
Simple daily activity counter with session tracking and confetti.
Usage: python3 daily-counter.py --add requests 1
       python3 daily-counter.py --add comments 1  
       python3 daily-counter.py --show
       python3 daily-counter.py --reset
       python3 daily-counter.py --start-session
       python3 daily-counter.py --end-session
"""
import argparse
import json
import os
from datetime import datetime, date

COUNTER_FILE = "/Users/johncunningham/one-click-coaching-website/outreach/daily-counter.json"
SESSION_FILE = "/Users/johncunningham/one-click-coaching-website/outreach/session-tracker.json"

def load_counter():
    if not os.path.exists(COUNTER_FILE):
        return {"date": str(date.today()), "requests": 0, "comments": 0, "group_posts": 0, "profile_posts": 0, "connections_made": 0}
    
    with open(COUNTER_FILE, 'r') as f:
        data = json.load(f)
    
    # Add any missing keys from old format
    for key in ["requests", "comments", "group_posts", "profile_posts", "connections_made"]:
        if key not in data:
            data[key] = 0
    
    # Reset if new day
    if data.get("date") != str(date.today()):
        return {"date": str(date.today()), "requests": 0, "comments": 0, "group_posts": 0, "profile_posts": 0, "connections_made": 0}
    
    return data

def save_counter(data):
    with open(COUNTER_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def load_session():
    if not os.path.exists(SESSION_FILE):
        return {"active": False, "start_time": None, "last_prospect": None}
    
    with open(SESSION_FILE, 'r') as f:
        return json.load(f)

def save_session(data):
    with open(SESSION_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def format_duration(start_time_str):
    if not start_time_str:
        return None
    
    start = datetime.fromisoformat(start_time_str)
    duration = datetime.now() - start
    minutes = int(duration.total_seconds() / 60)
    
    if minutes < 60:
        return f"{minutes} minutes"
    else:
        hours = minutes // 60
        remaining_minutes = minutes % 60
        if remaining_minutes == 0:
            return f"{hours} hour{'s' if hours != 1 else ''}"
        return f"{hours}h {remaining_minutes}m"

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--add", nargs=2, help="Add count: --add requests 1")
    p.add_argument("--show", action="store_true", help="Show current counts")
    p.add_argument("--reset", action="store_true", help="Reset to zero")
    p.add_argument("--start-session", action="store_true", help="Start a new session")
    p.add_argument("--end-session", action="store_true", help="End current session")
    p.add_argument("--prospect", type=str, help="Record last prospect name")
    args = p.parse_args()
    
    data = load_counter()
    session = load_session()
    
    if args.start_session:
        session = {
            "active": True, 
            "start_time": datetime.now().isoformat(),
            "last_prospect": session.get("last_prospect")  # Keep previous
        }
        save_session(session)
        print("🚀 Session started!")
        if session["last_prospect"]:
            print(f"   Last prospect from previous session: {session['last_prospect']}")
        print()
        
    elif args.end_session:
        if session.get("active") and session.get("start_time"):
            duration = format_duration(session["start_time"])
            print(f"⏱️ Session completed in {duration}")
        session["active"] = False
        save_session(session)
        
    elif args.prospect:
        session["last_prospect"] = args.prospect
        save_session(session)
        
    if args.add:
        activity, count = args.add
        if activity in data:
            data[activity] += int(count)
            save_counter(data)
            print(f"✅ {activity.title()}: {data[activity]} (added {count})")
            
            # Update last prospect if this was a request
            if activity == "requests" and args.prospect:
                session["last_prospect"] = args.prospect
                save_session(session)
        else:
            print(f"Unknown activity: {activity}")
    
    elif args.reset:
        data = {"date": str(date.today()), "requests": 0, "comments": 0, "group_posts": 0, "profile_posts": 0, "connections_made": 0}
        save_counter(data)
        print("🔄 Counter reset to zero")
    
    # Show session status if active
    if session.get("active") and session.get("start_time"):
        duration = format_duration(session["start_time"])
        print(f"⏱️ Current session: {duration}")
    
    # Always show current status
    print(f"\\\\\\\\n📊 TODAY ({data['date']}):")
    print(f"   Connection Requests: {data['requests']}")
    print(f"   Comments: {data['comments']}")  
    print(f"   Group Posts: {data['group_posts']}")
    print(f"   Profile Posts: {data['profile_posts']}")
    print(f"   Connections Made: {data['connections_made']}")
    
    # Calculate points
    total_points = (data['requests'] * 2) + (data['comments'] * 4) + (data['group_posts'] * 5) + (data['profile_posts'] * 5) + (data['connections_made'] * 5)
    print(f"   📈 Total Points: {total_points}/100")
    
    if total_points >= 100:
        print("   🎉🎊✨ GOAL HIT! ✨🎊🎉")
    else:
        remaining_points = 100 - total_points
        # Show how many more requests needed (easiest path)
        requests_needed = (remaining_points + 1) // 2  # Round up
        print(f"   🎯 Need {requests_needed} more connection requests to hit 100 points")
        print(f"   💡 Or {(remaining_points + 3) // 4} comments or {(remaining_points + 4) // 5} group posts or connections made")

if __name__ == "__main__":
    main()