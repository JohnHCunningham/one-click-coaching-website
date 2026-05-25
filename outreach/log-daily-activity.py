#!/usr/bin/env python3
"""
Append John's daily OCC activity to the Google Sheet scoreboard.

Usage examples:
  python3 log-daily-activity.py --requests 20 --connections-made 5 --comments 5 --emails 0 --notes "Warmup only"
  python3 log-daily-activity.py --calls-booked 1 --sales 1

Hermes can call this when John says:
  "log 20 requests, 5 connections made, 5 comments, 1 post"
"""
import argparse
import json
import os
import subprocess
import sys
from datetime import date

SHEET_ID = "1tXnqwo_yKwdVEH7C6sFZVp3YOj2uKdUjzdxiT1ABXh0"
GAPI = "/Users/johncunningham/.hermes/skills/productivity/google-workspace/scripts/google_api.py"

POINTS = {
    "requests": 2,
    "connections_made": 5,
    "comments": 4,
    "emails": 1,
    "calls_booked": 25,
    "calls_completed": 40,
    "sales": 100,
    "linkedin_posts": 15,
    "blog_posts": 25,
}
GOAL = 100


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--date", default=str(date.today()))
    p.add_argument("--requests", type=int, default=0)
    p.add_argument("--connections-made", type=int, default=0)
    p.add_argument("--comments", type=int, default=0)
    p.add_argument("--emails", type=int, default=0)
    p.add_argument("--calls-booked", type=int, default=0)
    p.add_argument("--calls-completed", type=int, default=0)
    p.add_argument("--sales", type=int, default=0)
    p.add_argument("--linkedin-posts", type=int, default=0)
    p.add_argument("--blog-posts", type=int, default=0)
    p.add_argument("--notes", default="")
    p.add_argument("--next-follow-up", default="")
    p.add_argument("--energy", default="")
    args = p.parse_args()

    total = (
        args.requests * POINTS["requests"] +
        args.connections_made * POINTS["connections_made"] +
        args.comments * POINTS["comments"] +
        args.emails * POINTS["emails"] +
        args.calls_booked * POINTS["calls_booked"] +
        args.calls_completed * POINTS["calls_completed"] +
        args.sales * POINTS["sales"] +
        args.linkedin_posts * POINTS["linkedin_posts"] +
        args.blog_posts * POINTS["blog_posts"]
    )
    hit = "YES" if total >= GOAL else "NO"
    confetti = "🎉 CONFETTI - GOAL HIT" if total >= GOAL else "keep going"

    values = [[
        args.date,
        args.requests,
        args.connections_made,
        args.comments,
        args.emails,
        args.calls_booked,
        args.calls_completed,
        args.sales,
        args.linkedin_posts,
        args.blog_posts,
        total,
        hit,
        confetti,
        args.notes,
        args.next_follow_up,
        args.energy,
    ]]

    env = os.environ.copy()
    env["HERMES_HOME"] = "/Users/johncunningham/.hermes"
    cmd = [
        sys.executable, GAPI, "sheets", "append", SHEET_ID, "Daily Log!A:P",
        "--values", json.dumps(values),
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, env=env)
    if res.returncode != 0:
        print(res.stdout)
        print(res.stderr)
        raise SystemExit(res.returncode)

    print(f"Logged {args.date}: {total}/{GOAL} points")
    if hit == "YES":
        print("🎉 CONFETTI - GOAL HIT")
    else:
        remaining = GOAL - total
        print(f"Need {remaining} more points today.")
        print("Examples: 10 connection requests = 20 pts; 5 connections made = 25 pts; 5 comments = 20 pts; 1 LinkedIn post = 15 pts.")

if __name__ == "__main__":
    main()
