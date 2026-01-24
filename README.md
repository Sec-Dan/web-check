# DanSec Web-Check

A privacy-first fork of **Web-Check**: an all-in-one website OSINT and security toolbox.

This fork focuses on:
- No in-app analytics or tracking scripts
- No sponsor / promo blocks in the UI
- DanSec branding (while retaining upstream credit and MIT licensing)

## Running locally

```bash
git clone https://github.com/Sec-Dan/web-check.git
cd web-check
yarn install
yarn build
yarn serve
```

Then open the app (default: `http://localhost:3000`).

## Deploying to Heroku

Use the one-click deploy:

- `https://heroku.com/deploy?template=https://github.com/Sec-Dan/web-check`

## Privacy note

Many checks work by querying external services. When you run a check, the domain / URL you enter may be sent to those third parties in order to fetch results. This fork only removes **tracking/analytics**, not the functional check integrations.

## Credit

Upstream project: **Web-Check** (MIT)

Licence: MIT (see `LICENSE`).
