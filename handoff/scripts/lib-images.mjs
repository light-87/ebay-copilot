// Image pipeline: background removal (rembg, local & free) + hosting on eBay's own
// Picture Service (EPS) via the Trading API. EPS means no external bucket to manage —
// the processed image lives on eBay and the returned URL is used directly in the listing.
//
// Prerequisites:
//   - rembg installed:  pipx install rembg   (or  pip install rembg)
//     First run downloads the model (~180MB) once.

import { spawn } from 'node:child_process';
import { readFile, mkdir } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { getAccessToken, API, SITE_ID } from './lib-ebay.mjs';

/** Run rembg to strip the background. Falls back to the original file if disabled. */
export async function removeBackground(inputPath, outDir = '.bg-removed') {
  await mkdir(outDir, { recursive: true });
  const outPath = join(outDir, basename(inputPath).replace(/\.\w+$/, '') + '.png');
  await new Promise((res, rej) => {
    const p = spawn('rembg', ['i', inputPath, outPath], { stdio: 'inherit' });
    p.on('error', (e) =>
      rej(
        new Error(
          `rembg not runnable (${e.message}). Install it: pipx install rembg. Or pass removeBackground:false.`,
        ),
      ),
    );
    p.on('close', (code) => (code === 0 ? res() : rej(new Error(`rembg exited ${code}`))));
  });
  return outPath;
}

/**
 * Upload an image to eBay Picture Services (EPS) and return the hosted URL.
 * Uses the Trading API UploadSiteHostedPictures call with an OAuth IAF token.
 * @returns {Promise<string>} the eBay-hosted full-size image URL (i.ebayimg.com).
 */
export async function uploadToEPS(imagePath, pictureName = basename(imagePath)) {
  const token = await getAccessToken(['https://api.ebay.com/oauth/api_scope']);
  const buf = await readFile(imagePath);

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<UploadSiteHostedPicturesRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <PictureName>${pictureName}</PictureName>
  <PictureSet>Supersize</PictureSet>
</UploadSiteHostedPicturesRequest>`;

  const form = new FormData();
  // Part 1: the XML request. Part 2: the binary image (must come after the XML).
  form.append('XML Payload', new Blob([xml], { type: 'text/xml' }));
  form.append('image', new Blob([buf], { type: 'application/octet-stream' }), pictureName);

  const res = await fetch(`${API}/ws/api.dll`, {
    method: 'POST',
    headers: {
      'X-EBAY-API-CALL-NAME': 'UploadSiteHostedPictures',
      'X-EBAY-API-SITEID': SITE_ID,
      'X-EBAY-API-COMPATIBILITY-LEVEL': '967',
      'X-EBAY-API-IAF-TOKEN': token,
    },
    body: form,
  });
  const text = await res.text();
  const ack = /<Ack>(\w+)<\/Ack>/.exec(text)?.[1];
  const url = /<FullURL>(.*?)<\/FullURL>/.exec(text)?.[1];
  if (!url || (ack && ack !== 'Success' && ack !== 'Warning')) {
    throw new Error(`EPS upload failed (${res.status}, Ack=${ack}): ${text.slice(0, 600)}`);
  }
  return url;
}

/**
 * Process a list of local image paths: optional bg-removal, then EPS upload.
 * Returns a Map<localPath, hostedUrl>. Deduplicates identical paths.
 */
export async function processImages(paths, { removeBg = true } = {}) {
  const map = new Map();
  for (const p of paths) {
    if (map.has(p)) continue;
    const processed = removeBg ? await removeBackground(p) : p;
    const url = await uploadToEPS(processed);
    map.set(p, url);
    console.error(`  image ok: ${p} -> ${url}`);
  }
  return map;
}
