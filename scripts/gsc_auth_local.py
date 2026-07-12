#!/usr/bin/env python3
"""
GSC OAuth authentication — run this on your Mac, NOT the VPS.

Requirements:
  pip3 install google-auth-oauthlib google-auth-httplib2

Steps:
  1. Download OAuth 2.0 Desktop Client JSON from Google Cloud Console
     APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
     Application type: Desktop app → Download JSON
  2. Save it as client_secret.json in the same folder as this script
  3. Run: python3 gsc_auth_local.py
  4. Browser opens → log in with the account that has GSC access
  5. gsc_token.json is created → copy to VPS: /root/credentials/aivelocity-gsc-token.json
"""

import json
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import google.auth

SCOPES = [
    'https://www.googleapis.com/auth/webmasters.readonly',
]

CLIENT_SECRETS = os.path.join(os.path.dirname(__file__), 'client_secret.json')
TOKEN_OUT = os.path.join(os.path.dirname(__file__), 'gsc_token.json')


def main():
    if not os.path.exists(CLIENT_SECRETS):
        print("ERROR: client_secret.json not found.")
        print(f"Expected at: {CLIENT_SECRETS}")
        print()
        print("Get it from: Google Cloud Console → APIs & Services → Credentials")
        print("Create Credentials → OAuth 2.0 Client ID → Desktop app → Download JSON")
        return

    flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS, SCOPES)

    # Runs a local server on port 8085 — browser redirects back automatically
    creds = flow.run_local_server(port=8085, open_browser=True)

    # Serialize credentials
    token_data = {
        'token': creds.token,
        'refresh_token': creds.refresh_token,
        'token_uri': creds.token_uri,
        'client_id': creds.client_id,
        'client_secret': creds.client_secret,
        'scopes': list(creds.scopes),
    }

    with open(TOKEN_OUT, 'w') as f:
        json.dump(token_data, f, indent=2)

    print(f"\n✅ Token saved to: {TOKEN_OUT}")
    print()
    print("Now copy to VPS:")
    print(f"  scp {TOKEN_OUT} root@YOUR_VPS_IP:/root/credentials/aivelocity-gsc-token.json")
    print()
    print("Then test with: python3 /root/scripts/gsc_tracker.py --test")


if __name__ == '__main__':
    main()
