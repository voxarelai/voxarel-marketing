#!/usr/bin/env node
/**
 * Losslessly-looking PNG compression for the site's raster assets. Palette
 * quantisation with dithering keeps flat brand artwork visually identical while
 * cutting bytes by half or more. Dimensions never change (the Organization
 * schema declares the logo size and the email template references the white
 * logo directly). A file is only overwritten when the result is smaller.
 *
 *   npm run images:compress
 */
import { readFile, writeFile, stat } from "node:fs/promises";
import sharp from "sharp";

const TARGETS = [
  { file: "public/og.png", quality: 85 },
  { file: "public/voxarel-logo.png", quality: 90 },
  { file: "public/voxarel-logo-white.png", quality: 90 },
  { file: "src/app/icon.png", quality: 90 },
];

let failed = false;
for (const t of TARGETS) {
  const before = await readFile(t.file);
  const meta = await sharp(before).metadata();
  const out = await sharp(before)
    .png({ palette: true, quality: t.quality, compressionLevel: 9, effort: 10, dither: 1 })
    .toBuffer();
  const outMeta = await sharp(out).metadata();
  if (outMeta.width !== meta.width || outMeta.height !== meta.height) {
    console.error(`${t.file}: dimensions changed, skipped`);
    failed = true;
    continue;
  }
  if (out.length >= before.length) {
    console.log(`${t.file}: already optimal (${before.length} bytes)`);
    continue;
  }
  await writeFile(t.file, out);
  const after = (await stat(t.file)).size;
  const pct = Math.round((1 - after / before.length) * 100);
  console.log(`${t.file}: ${before.length} -> ${after} bytes (${pct}% smaller), ${meta.width}x${meta.height}`);
}
process.exit(failed ? 1 : 0);
