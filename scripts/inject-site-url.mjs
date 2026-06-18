/**
 * ????????? URL??? canonical / Open Graph?
 * ???SITE_URL=https://???? node scripts/inject-site-url.mjs
 * ??? SITE_URL ??__SITE_URL__ ????????????? /
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'landing', 'index.html');
const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');

let html = readFileSync(htmlPath, 'utf8');

if (!html.includes('__SITE_URL__')) {
  console.log('[inject-site-url] ????');
  process.exit(0);
}

html = html.replaceAll('__SITE_URL__', siteUrl);
writeFileSync(htmlPath, html, 'utf8');

if (siteUrl) {
  console.log(`[inject-site-url] ??? SITE_URL=${siteUrl}`);
} else {
  console.log('[inject-site-url] ??? SITE_URL????????? /');
}
