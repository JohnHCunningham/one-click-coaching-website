#!/usr/bin/env python3
"""
Generate OCC icebreakers using OpenRouter for an already-normalized/enriched CSV.
Does not send emails. Writes an Instantly-ready CSV for review.
"""
import csv, json, os, time, urllib.request, urllib.error
from pathlib import Path

MODEL = os.environ.get('OPENROUTER_MODEL', 'openai/gpt-4o-mini')
API_URL = 'https://openrouter.ai/api/v1/chat/completions'

def load_key():
    key = os.environ.get('OPENROUTER_API_KEY', '')
    if key:
        return key.strip().strip('"').strip("'")
    env = Path.home()/'.hermes'/'.env'
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith('OPENROUTER_API_KEY='):
                return line.split('=',1)[1].strip().strip('"').strip("'")
    return ''

KEY = load_key()

def generate(row):
    name = (row.get('firstName','') + ' ' + row.get('lastName','')).strip()
    title = row.get('title','')
    company = row.get('company','')
    headline = row.get('headline','')
    desc = (row.get('companyDescription','') or row.get('website_text','') or '')[:1200]
    prompt = f"""Write ONE cold email icebreaker sentence for One Click Coaching outreach.

Product context: One Click Coaching helps sales leaders reinforce methodology training after workshops by scoring calls and surfacing coaching gaps. Buyer: VP Sales / Head of Sales / Sales Enablement at B2B companies with roughly 5-50 reps.

Prospect:
Name: {name}
Title: {title}
Company: {company}
LinkedIn headline: {headline}
Company/site info: {desc}

Rules:
- One sentence only, under 35 words.
- Specific to role/company/industry when possible.
- Bridge naturally to sales coaching, team consistency, training drift, revenue execution, or manager visibility.
- Do not mention One Click Coaching.
- No hype, no flattery, no "impressive".
- No fake facts. If detail is thin, anchor to title and company context.

Return only the sentence."""
    data = json.dumps({
        'model': MODEL,
        'messages': [{'role':'user','content':prompt}],
        'max_tokens': 90,
        'temperature': 0.7,
    }).encode()
    req = urllib.request.Request(API_URL, data=data, headers={
        'Authorization': 'Bearer ' + KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://oneclickcoaching.com',
        'X-Title': 'OCC Outreach Enrichment',
    })
    with urllib.request.urlopen(req, timeout=45) as resp:
        result = json.loads(resp.read())
    return result['choices'][0]['message']['content'].strip().strip('"').strip("'")

def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('input')
    ap.add_argument('--output', required=True)
    ap.add_argument('--delay', type=float, default=1.0)
    args = ap.parse_args()
    if not KEY:
        raise SystemExit('OPENROUTER_API_KEY missing')
    rows = list(csv.DictReader(open(args.input, encoding='utf-8')))
    fields = list(rows[0].keys())
    if 'icebreaker' not in fields:
        fields.append('icebreaker')
    if 'send_status' not in fields:
        fields.append('send_status')
    with open(args.output, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for i,row in enumerate(rows,1):
            email_status = (row.get('emailStatus') or '').lower()
            email = row.get('email') or ''
            if not email:
                row['send_status'] = 'HOLD - no email'
            elif email_status != 'safe':
                row['send_status'] = 'HOLD - email not safe'
            else:
                row['send_status'] = 'REVIEW - do not send until warmup complete'
            try:
                row['icebreaker'] = generate(row)
            except Exception as e:
                row['icebreaker'] = '[generation error: ' + str(e)[:120] + ']'
            print(f"{i}/{len(rows)} {row.get('firstName','')} {row.get('lastName','')} — {row['send_status']} — {row['icebreaker'][:90]}")
            w.writerow(row)
            if i < len(rows):
                time.sleep(args.delay)
    print('done', args.output)

if __name__ == '__main__':
    main()
