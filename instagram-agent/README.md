# Divya Mangalam — Instagram Automated Posting Setup Guide

This guide explains how to connect your Instagram account **[@divyamangalam.info](https://www.instagram.com/divyamangalam.info/)** to the automated daily posting agent.

> **Zero Password Needed:** You never need to enter your Instagram password anywhere. Meta uses secure OAuth tokens.

---

## 1. Prerequisites (2 Minutes)

1. **Instagram Account:** Must be a **Professional (Creator or Business) Account**.
   *(Your account @divyamangalam.info is already confirmed as a Professional account).*
2. **Facebook Page:** Create a free Facebook Page (e.g. named "Divya Mangalam") at [facebook.com/pages/create](https://www.facebook.com/pages/create) and link it to your Instagram account in Instagram Settings > Linked Accounts.

---

## 2. Generate Meta API Token (5 Minutes)

1. Go to **[developers.facebook.com](https://developers.facebook.com/)** and log in with your Facebook account.
2. Click **My Apps** (top right) → **Create App**.
3. Select **Other** → **Business** → enter app name: `DivyaMangalamPoster` → Click **Create App**.
4. In the app dashboard, go to **Tools** (top menu) → **Graph API Explorer**:
   - In **Meta App**, select `DivyaMangalamPoster`.
   - In **User or Page**, select your Facebook Page.
   - Under **Permissions**, add these 3 permissions:
     - `instagram_basic`
     - `instagram_content_publish`
     - `pages_show_list`
   - Click **Generate Access Token** and approve permissions.
5. In the Graph API Explorer query bar, type:
   `me/accounts?fields=instagram_business_account`
   Click **Submit**. You will see:
   ```json
   "instagram_business_account": {
      "id": "17841400000000000"
   }
   ```
   - Copy this `id` → This is your `INSTAGRAM_ACCOUNT_ID`.
   - Copy the Token from the top bar → This is your `META_ACCESS_TOKEN`.
   *(To make the token never expire, exchange it using Meta's Access Token Tool for a 60-day / permanent Long-Lived Token).*

---

## 3. Add to GitHub Secrets (1 Minute)

1. Open your GitHub repository: [github.com/kedari10085/divyamangalam](https://github.com/kedari10085/divyamangalam)
2. Go to **Settings** → **Secrets and variables** → **Actions**.
3. Click **New repository secret**:
   - Name: `INSTAGRAM_ACCOUNT_ID`
   - Value: *(paste your Instagram Business ID from step 2)*
4. Click **New repository secret** again:
   - Name: `META_ACCESS_TOKEN`
   - Value: *(paste your Meta Access Token from step 2)*

---

## 4. Enabling the GitHub Action (1 Minute)

The GitHub Actions workflow file is stored at `instagram-agent/instagram-daily-workflow.yml`.
To activate the automatic daily 7:00 AM IST schedule on GitHub:
1. In your GitHub repo, go to the **Actions** tab.
2. Click **New workflow** → **set up a workflow yourself**.
3. Name it `.github/workflows/instagram-daily.yml`.
4. Copy and paste the contents of [instagram-daily-workflow.yml](instagram-daily-workflow.yml) into the editor.
5. Click **Commit changes**.

Once committed, you can trigger it anytime via **Actions** → **Daily Instagram Posting Agent** → **Run workflow**, or let it run automatically every morning at 7:00 AM IST.

---

## 5. How to Schedule Custom Posts via Markdown

To set custom posts for future dates, open [DAILY_POSTS.md](../DAILY_POSTS.md) in this repository and add:

```markdown
### Date: 2026-11-04
- **Status:** [PENDING]
- **Deity:** Goddess Saraswati
- **Significance:** Knowledge, arts, and pure discernment.
- **Mantra:** `ॐ ऐं सरस्वत्यै नमः`
- **AI Image Prompt:** `Goddess Saraswati seated on a pure white lotus, holding sacred Veena, swan nearby, serene river background, morning light, hyper-realistic, 8k devotional art`
- **Custom Note:** "Cultivate stillness of mind to receive wisdom."
```

If you don't add anything for a date, the agent **automatically calculates real Panchang and posts the sacred Deity of the Day** on schedule at 7:00 AM IST!
