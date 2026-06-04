# LoudBar website

The one-page marketing site for **LoudBar**, hosted on GitHub Pages at **loudbar.xyz**,
with payments + DMG delivery via **Polar.sh**.

```
website/
├── index.html        # landing page (hero, features, how-it-works, pricing, FAQ)
├── thanks.html       # post-purchase thank-you + install steps + download
├── styles.css        # all styling (dark, orange brand)
├── config.js         # ← set your Polar checkout link here (only place to edit)
├── assets/           # icon + favicons
├── CNAME             # custom domain (loudbar.xyz)
├── .nojekyll         # tell GitHub Pages to serve files as-is
├── robots.txt, sitemap.xml
```

---

## The full flow

```
loudbar.xyz (GitHub Pages)
   │  visitor clicks "Get LoudBar — $9"
   ▼
Polar.sh checkout  ($9 one-time)
   │  payment succeeds
   ├─► DMG delivered via Polar "File Download" benefit (on receipt page + email + portal)
   ▼
loudbar.xyz/thanks.html   (Polar "Success URL")
      "Thank you for buying LoudBar — enjoy 200% amplification" + install steps
```

> **Why the DMG lives on Polar, not in this repo:** GitHub Pages is fully public, so
> any file you commit here is free to download. To actually gate the app behind the $9
> payment, the `.dmg` must be uploaded to Polar as a **File Download benefit**. Do **not**
> commit `LoudBar.dmg` to this public repo.

---

## 1. Configure Polar.sh

1. Create an **Organization** in Polar (this becomes your `<org>` slug).
2. Create a **Product**:
   - Name: `LoudBar`
   - Pricing: **One-time**, **$9 USD**.
   - (Optional) Add a second discounted tier or a **Discount code** for the
     "90% off for the first 100 users" launch deal, capped at 100 redemptions.
3. Add a **File Download** benefit to the product and **upload `LoudBar.dmg`**.
   This is what buyers receive after paying.
4. Open the product's **Checkout Link** and set its **Success URL** to:
   ```
   https://loudbar.xyz/thanks.html
   ```
5. Copy the **Checkout Link** (looks like `https://buy.polar.sh/polar_cl_…`).

## 2. Plug the link into the site

Edit **`config.js`**:

```js
window.LOUDBAR_CONFIG = {
  checkoutUrl: "https://buy.polar.sh/polar_cl_xxxxxxxxxxxx",   // ← your checkout link
  portalUrl:   "https://polar.sh/<org>/portal"                 // ← optional, for re-downloads
};
```

Every "Buy" button on the site automatically uses `checkoutUrl`. The thank-you page
uses `portalUrl` (if set) to give buyers a "My purchases" button for re-downloading.

> The thank-you page also supports an optional `?dl=<direct-link>` query param if you
> ever want to pass a download URL straight through. By default it relies on Polar's
> gated delivery (receipt page + email), which is the secure path.

## 3. Deploy to GitHub Pages

```bash
# from the website/ directory
git init
git add .
git commit -m "LoudBar website"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages**:
- **Source:** Deploy from a branch
- **Branch:** `main` / `root`

GitHub Pages will read the `CNAME` file and serve at **loudbar.xyz**.

> If you push the whole `LoudBar-Clean` project (not just `website/`) instead, set Pages
> to serve from the `website/` folder, or move these files to the repo root / `docs/`.

## 4. Point the domain (loudbar.xyz)

At your domain registrar, add DNS records pointing at GitHub Pages:

```
# Apex domain (loudbar.xyz) — A / AAAA records:
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153

# (optional) www subdomain:
CNAME www  <you>.github.io.
```

Back in **Settings → Pages**, enter `loudbar.xyz` as the custom domain and tick
**Enforce HTTPS** once the certificate is issued.

---

## Local preview

```bash
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing notes

- **Price / discount copy** lives in `index.html` (search for `$9`, `90%`, `launch`).
- **Brand colors** are CSS variables at the top of `styles.css` (`--amber`, `--orange`).
- The **"not notarized"** notice is in both `index.html` (notice + FAQ) and
  `thanks.html` (install step 2) — keep them in sync if you notarize later.
