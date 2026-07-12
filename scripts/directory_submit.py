#!/usr/bin/env python3
"""
Directory submission script for aivelocity.dev
Targets: Ezilon, SoMuch, A1WebDirectory
Run from VPS: python3 directory_submit.py
"""

import time
import json
from datetime import datetime
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout

SITE = {
    "url": "https://aivelocity.dev",
    "title": "AI Velocity",
    "description": "AI Velocity covers agentic commerce, autonomous marketing, AI-native payments, and the emerging machine economy. Independent news, analysis and intelligence for the AI transition.",
    "short_description": "Independent news and analysis on agentic commerce, AI payments, and the autonomous economy.",
    "email": "editorial@aivelocity.dev",
    "category_keywords": ["Technology", "Artificial Intelligence", "News", "Internet"],
}

RESULTS = []

def log(directory, status, note=""):
    entry = {
        "directory": directory,
        "status": status,
        "note": note,
        "timestamp": datetime.utcnow().isoformat()
    }
    RESULTS.append(entry)
    icon = "✅" if status == "submitted" else "⚠️" if status == "manual" else "❌"
    print(f"{icon} {directory}: {status}" + (f" — {note}" if note else ""))

def submit_ezilon(page):
    """Ezilon.com — free, email-based, no account required"""
    try:
        page.goto("https://www.ezilon.com/general_url_submission.htm", timeout=30000)
        page.wait_for_load_state("networkidle", timeout=15000)

        # Fill URL
        if page.locator('input[name="url"], input[name="URL"], input[type="url"]').count() > 0:
            page.fill('input[name="url"], input[name="URL"], input[type="url"]', SITE["url"])

        # Fill title
        if page.locator('input[name="title"], input[name="Title"]').count() > 0:
            page.fill('input[name="title"], input[name="Title"]', SITE["title"])

        # Fill description
        if page.locator('textarea[name="description"], textarea[name="Description"]').count() > 0:
            page.fill('textarea[name="description"], textarea[name="Description"]', SITE["short_description"])

        # Fill email
        if page.locator('input[name="email"], input[type="email"]').count() > 0:
            page.fill('input[name="email"], input[type="email"]', SITE["email"])

        # Check for CAPTCHA before submitting
        if page.locator('iframe[title*="recaptcha"], .g-recaptcha, [data-sitekey]').count() > 0:
            log("Ezilon", "manual", "CAPTCHA present — open https://www.ezilon.com/general_url_submission.htm")
            return

        # Submit
        submit_btn = page.locator('input[type="submit"], button[type="submit"]').first
        if submit_btn.count() > 0:
            submit_btn.click()
            page.wait_for_load_state("networkidle", timeout=15000)
            log("Ezilon", "submitted", "Form submitted successfully")
        else:
            log("Ezilon", "manual", "Submit button not found — check form manually")

    except PlaywrightTimeout:
        log("Ezilon", "failed", "Timeout loading page")
    except Exception as e:
        log("Ezilon", "failed", str(e)[:100])


def submit_somuch(page):
    """SoMuch.com — free, no account required"""
    try:
        page.goto("https://www.somuch.com/submit-links/", timeout=30000)
        page.wait_for_load_state("networkidle", timeout=15000)

        if page.locator('input[name="url"], input[name="link_url"]').count() > 0:
            page.fill('input[name="url"], input[name="link_url"]', SITE["url"])

        if page.locator('input[name="title"], input[name="link_title"]').count() > 0:
            page.fill('input[name="title"], input[name="link_title"]', SITE["title"])

        if page.locator('textarea[name="description"], textarea[name="link_desc"]').count() > 0:
            page.fill('textarea[name="description"], textarea[name="link_desc"]', SITE["short_description"])

        if page.locator('iframe[title*="recaptcha"], .g-recaptcha, [data-sitekey]').count() > 0:
            log("SoMuch", "manual", "CAPTCHA present — open https://www.somuch.com/submit-links/")
            return

        submit_btn = page.locator('input[type="submit"], button[type="submit"]').first
        if submit_btn.count() > 0:
            submit_btn.click()
            page.wait_for_load_state("networkidle", timeout=15000)
            log("SoMuch", "submitted")
        else:
            log("SoMuch", "manual", "Submit button not found")

    except PlaywrightTimeout:
        log("SoMuch", "failed", "Timeout")
    except Exception as e:
        log("SoMuch", "failed", str(e)[:100])


def submit_a1webdirectory(page):
    """A1WebDirectory.org — free PHP directory"""
    try:
        page.goto("https://www.a1webdirectory.org/submit", timeout=30000)
        page.wait_for_load_state("networkidle", timeout=15000)

        if page.locator('input[name="url"]').count() > 0:
            page.fill('input[name="url"]', SITE["url"])

        if page.locator('input[name="title"]').count() > 0:
            page.fill('input[name="title"]', SITE["title"])

        if page.locator('textarea[name="description"]').count() > 0:
            page.fill('textarea[name="description"]', SITE["short_description"])

        if page.locator('input[name="email"], input[type="email"]').count() > 0:
            page.fill('input[name="email"], input[type="email"]', SITE["email"])

        if page.locator('iframe[title*="recaptcha"], .g-recaptcha, [data-sitekey]').count() > 0:
            log("A1WebDirectory", "manual", "CAPTCHA present — open https://www.a1webdirectory.org/submit")
            return

        submit_btn = page.locator('input[type="submit"], button[type="submit"]').first
        if submit_btn.count() > 0:
            submit_btn.click()
            page.wait_for_load_state("networkidle", timeout=15000)
            log("A1WebDirectory", "submitted")
        else:
            log("A1WebDirectory", "manual", "Submit button not found")

    except PlaywrightTimeout:
        log("A1WebDirectory", "failed", "Timeout")
    except Exception as e:
        log("A1WebDirectory", "failed", str(e)[:100])


def main():
    print(f"\n{'='*60}")
    print(f"Directory Submission — {SITE['url']}")
    print(f"Started: {datetime.utcnow().isoformat()}")
    print(f"{'='*60}\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()

        submit_ezilon(page)
        time.sleep(3)

        submit_somuch(page)
        time.sleep(3)

        submit_a1webdirectory(page)

        browser.close()

    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    submitted = [r for r in RESULTS if r["status"] == "submitted"]
    manual = [r for r in RESULTS if r["status"] == "manual"]
    failed = [r for r in RESULTS if r["status"] == "failed"]

    print(f"✅ Submitted: {len(submitted)}")
    print(f"⚠️  Manual required: {len(manual)}")
    print(f"❌ Failed: {len(failed)}")

    if manual:
        print("\nManual submissions needed:")
        for r in manual:
            print(f"  → {r['directory']}: {r['note']}")

    log_path = f"/root/scripts/directory-submit-{datetime.utcnow().strftime('%Y%m%d')}.json"
    with open(log_path, "w") as f:
        json.dump(RESULTS, f, indent=2)
    print(f"\nLog saved: {log_path}")


if __name__ == "__main__":
    main()
