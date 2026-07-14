# Ethereum Native Privacy — Ishikawa Map

Static interactive map you can publish with a public URL.

## Local preview

```bash
cd native-privacy-map
python3 -m http.server 8765
```

Open http://localhost:8765

## Deploy to Netlify

**Option A — drag & drop**

1. Open [Netlify Drop](https://app.netlify.com/drop)
2. Drag the `native-privacy-map` folder
3. Copy the `*.netlify.app` URL

**Option B — CLI**

```bash
cd native-privacy-map
npx netlify-cli deploy --prod --dir=.
```

Deep links work with hashes, e.g. `https://your-site.netlify.app/#p7` or `#n4`.
