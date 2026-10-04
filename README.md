# SS Transync Website

Static website for SS Transync — Corporate Mobility & Employee Transportation.

## Structure

- `index.html` — main website
- `css/style.css` — website styles
- `js/main.js` — navigation, animations, blog reader and legal modal behavior
- `assets/` — local image assets

## Run locally

Open `index.html` directly in a browser, or use a local static server.

## GitHub Pages

This is a static site and can be hosted from GitHub Pages.

## GoDaddy cPanel

Upload the contents of this repository to:

`public_html/`

The main file must be:

`public_html/index.html`

Do not upload the repository folder itself unless you want the site to appear under a subdirectory.

## Contact form

`contact.php` is included for GoDaddy/cPanel hosting. It sends enquiries to `fleet@sstransync.com` using PHP `mail()`.

Before going live:
1. Confirm that `fleet@sstransync.com` is the correct receiving address.
2. If needed, change `$recipient` in `contact.php`.
3. Upload `contact.php`, `thank-you.html`, and `contact-error.html` along with the rest of the site.
4. Test the form from the live GoDaddy domain.

GitHub Pages does not execute PHP. The website itself works as a static site on GitHub Pages, but the PHP contact form is intended for the GoDaddy/cPanel deployment.
