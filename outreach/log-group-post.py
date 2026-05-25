#!/usr/bin/env python3
"""
Auto-logger for group AND profile posts. Call this after you post.
Usage: python3 log-group-post.py --group "Sandler Sales Training" --topic "Training abandonment" --methodology "Sandler" --angle "Trainers watch their work erode"
"""
import argparse
import csv
import os
from datetime import date, datetime

GROUP_LOG = "/Users/johncunningham/one-click-coaching-website/content-queue/group-posting-log.md"
COUNTER_SCRIPT = "/Users/johncunningham/one-click-coaching-website/outreach/daily-counter.py"

def update_group_log(group, topic, methodology, angle):
    """Append entry to the group posting log."""
    today = str(date.today())
    
    with open(GROUP_LOG, 'r') as f:
        content = f.read()
    
    new_row = f"| {today} | {group} | {topic} | {methodology} | {angle} |"
    
    if "## Posting Rules" in content:
        content = content.replace("## Posting Rules", f"{new_row}\n## Posting Rules")
    else:
        content += f"\n{new_row}"
    
    with open(GROUP_LOG, 'w') as f:
        f.write(content)
    
    print(f"✅ Group posting log updated: {group} — {topic}")

def update_counter():
    """Add to BOTH group_posts AND profile_posts counters since same post goes both places."""
    os.system(f"cd /Users/johncunningham/one-click-coaching-website/outreach && python3 {COUNTER_SCRIPT} --add group_posts 1")
    os.system(f"cd /Users/johncunningham/one-click-coaching-website/outreach && python3 {COUNTER_SCRIPT} --add profile_posts 1")

def main():
    parser = argparse.ArgumentParser(description="Log a LinkedIn group + profile post")
    parser.add_argument("--group", required=True, help="Group name (e.g., 'Sandler Sales Training')")
    parser.add_argument("--topic", required=True, help="Post topic/angle name")
    parser.add_argument("--methodology", default="Agnostic", help="Methodology referenced")
    parser.add_argument("--angle", required=True, help="The specific angle used (e.g., 'Trainers watch their work erode')")
    args = parser.parse_args()
    
    update_group_log(args.group, args.topic, args.methodology, args.angle)
    update_counter()
    
    print(f"📊 Group post + profile post both logged. Counters updated.")
    print(f"   Group: {args.group}")
    print(f"   Topic: {args.topic}")
    print(f"   Methodology: {args.methodology}")
    print(f"   Angle: {args.angle}")
    print(f"   ✅ group_posts +1, profile_posts +1 (10 points total)")

if __name__ == "__main__":
    main()
