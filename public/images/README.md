# public/images — studio photo files

Full instructions live in **[IMAGES.md](../../IMAGES.md)** (also readable
on GitHub at `IMAGES.md` in the repository root).

Quick version:

1. Export the photo at up to 2000 px on the long edge.
2. Compress it to WebP/JPEG, quality ~80, aiming for 150–250 KB.
3. Save it here, e.g. `vocal-booth.jpg`.
4. Reference it as `/images/vocal-booth.jpg` in `src/data/images.js`, with a real
   `alt`, a `caption` and the true `width`/`height`.

This folder doubles as an inventory check: `du -h public/images/* | sort -h`
shows exactly what the site will ship. Every file here is served with a
one-week cache header from `vercel.json`.

