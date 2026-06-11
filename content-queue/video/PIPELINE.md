# OCC Video Production — Weekly System

## Weekly Rhythm

MONDAY: Blog publishes to oneclickcoaching.com  
TUESDAY: Feed blog post into Claude Pro "Video Scripts" project (project #10) → 90s script  
WEDNESDAY: HeyGen production (pick avatar, paste script, generate)  
THURSDAY: Apply watermark → upload to Buffer → schedule LinkedIn post  

## Pipeline

Blog post → Claude Pro Video Scripts → HeyGen Creator ($29/mo USD) → ffmpeg watermark → Buffer → LinkedIn

## HeyGen Specs

- Plan: Creator ($29/mo USD, ~$47 CAD)
- Voice: Natural/conversational, not presenter/announcer
- Background: Clean, solid or simple office
- Pacing: Slower than default — ~150 words over 90 seconds
- Captions: On
- Format: 1080p, 25fps

## Watermark

- Source: /Users/johncunningham/one-click-coaching-website/occ-logo-mark.png
- Command: ffmpeg -i input.mp4 -i occ-logo-mark.png -filter_complex "[1:v]scale=100:-1[logo];[0:v][logo]overlay=W-w-40:H-h-40:format=auto" -c:a copy output_watermarked.mp4

## Claude Pro Project

- Project: "Video Scripts" (#10)
- Instructions: ~/Downloads/video-scripts-project-instructions.md
- Voice rules: ~/Downloads/video-scripts-voice-rules.md
- Output format: TITLE, HOOK, CONTEXT, INSIGHT, CLOSE, WORD COUNT, DURATION

## Content Queue

- /video/drafts/ — generated scripts awaiting review
- /video/approved/ — scripts approved for production
- /video/produced/ — videos produced with URLs
- /video/rejected/ — scripts needing rebuilds

## Videos Produced

| Date | Title | Blog Source | Duration | Status |
|---|---|---|---|---|---|
| 2026-06-05 | The Coaching Gap Nobody Talks About | manager-coaching-training-gap | 57s | ✅ Watermarked |
| 2026-06-17 | The Sampling Problem Nobody Diagnoses | sampling-problem-pattern-recognition | 52s | ✅ Scheduled Buffer (June 24) |
| 2026-06-24 | The Pipeline Mirage | pipeline-mirage-crm-stages | 63s | ✅ Watermarked |
| 2026-07-01 | The Lever Nobody Pulls | coaching-roi-vs-hiring-roi | ~55s | 🔄 Watermarking |

## Posting Schedule

| Date | Video | Platform |
|---|---|---|
| Wed June 11 | The Coaching Gap | LinkedIn |
| Wed June 18 | The Sampling Problem | LinkedIn |
| Wed June 25 | The Pipeline Mirage | LinkedIn |
| Wed July 2 | The Lever Nobody Pulls | LinkedIn |
