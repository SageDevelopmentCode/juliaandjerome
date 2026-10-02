// Compresses the raw photos/video in source-assets/ into web-ready files in public/assets/web/.
// Usage: node scripts/optimize-assets.mjs   (requires macOS `sips` for HEIC and `ffmpeg` for video)
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("source-assets/v2");
const OUT = path.resolve("public/assets/web");
mkdirSync(OUT, { recursive: true });

const FULL = 2400;
const INLINE = 1400;
const THUMB = 800;

/** Instagram story screenshots (1206x2622): strip the status bar, story header, and reply bar. */
const IG_STORY = { left: 0, top: 380, width: 1206, height: 1900 };

/** [output slug, source filename, max long edge, optional crop] */
const photos = [
  ["hero-boat", "DAP_8298.jpg", FULL],
  ["invite-lake", "DAP_9081.jpg", FULL],
  ["welcome-party", "DAP_8535.jpg", INLINE],
  ["timeline-bg", "Julia and Jerome.jpg", FULL],
  ["rsvp-boat", "Julia and Jerome (1).jpg", INLINE],
  ["presence-stairs", "DAP_8079.jpg", FULL],
  ["dress-girls-bg", "DSC03448.jpg", FULL],
  ["dress-guys-bg", "DSC03558.jpg", FULL],
  ["villa-front", "7fdd14edf0dcad477c76aa728a137106.jpg", THUMB],
  ["villa-aerial", "3c8d24490a75ae5a4665336c9ab0874c.jpg", THUMB],
  ["como-strip-1", "IMG_3513.JPG", THUMB],
  ["como-strip-2", "IMG_2577.JPG", THUMB],
  ["como-strip-3", "IMG_2932.JPG", THUMB],
  ["como-strip-4", "IMG_3531.jpg", THUMB],
  ["como-strip-5", "IMG_2550.JPG", THUMB],
  ["como-strip-6", "IMG_2976.JPG", THUMB],
  ["como-arch", "IMG_3585.JPG", THUMB],
  ["travel-milan-1", "IMG_2232.jpg", THUMB],
  ["travel-milan-2", "IMG_2132.JPG", THUMB],
  ["travel-dolomites-1", "DSCF1987.JPG", THUMB],
  ["travel-dolomites-2", "IMG_4814.JPG", THUMB],
  ["travel-venice-1", "IMG_4320.JPG", THUMB],
  ["travel-venice-2", "IMG_4366.JPG", THUMB],
  ["travel-florence-1", "IMG_9183.PNG", THUMB, IG_STORY],
  ["travel-florence-2", "IMG_9178.PNG", THUMB, IG_STORY],
  ["travel-pisa", "IMG_6977.heic", THUMB],
  ["travel-rome-1", "IMG_6292.heic", THUMB],
  ["travel-rome-2", "IMG_9182.PNG", THUMB, IG_STORY],
  ["travel-rome-3", "IMG_6263.heic", THUMB],
  ["travel-rome-4", "IMG_9179.PNG", THUMB, IG_STORY],
  ["travel-amsterdam", "IMG_4007.JPG", THUMB],
  ["travel-london", "IMG_5363-2.JPG", THUMB],
  ["travel-barcelona", "7422004C-390F-4F37-A24C-855A0A00BEFF.jpg", THUMB],
  ["travel-paris", "IMG_9185.PNG", THUMB, IG_STORY],
  ["travel-germany", "IMG_9186.jpg", THUMB],
  ["travel-switzerland", "IMG_7982.HEIC", THUMB],
  ["travel-greece", "IMG_9188.PNG", THUMB, IG_STORY],
];

const tmp = mkdtempSync(path.join(tmpdir(), "jj-assets-"));

function decodable(file) {
  if (!/\.heic$/i.test(file)) return path.join(SRC, file);
  const out = path.join(tmp, file.replace(/\.heic$/i, ".jpg"));
  execFileSync("sips", ["-s", "format", "jpeg", path.join(SRC, file), "--out", out], {
    stdio: "ignore",
  });
  return out;
}

const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;

for (const [slug, file, size, crop] of photos) {
  const out = path.join(OUT, `${slug}.jpg`);
  let img = sharp(decodable(file)).rotate();
  if (crop) img = img.extract(crop);
  await img
    .resize(size, size, { fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#f7f5f0" })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true })
    .toFile(out);
  console.log(`${slug}.jpg  ${kb(out)}`);
}

for (const [slug, file, size] of [
  ["monogram", "Title - 2 (1).png", 400],
  ["tadeos-logo", "Title - 7.png", 600],
]) {
  const out = path.join(OUT, `${slug}.png`);
  await sharp(path.join(SRC, file))
    .trim()
    .resize(size, size, { fit: "inside" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(out);
  console.log(`${slug}.png  ${kb(out)}`);
}

/** Dress code outfit cutouts (transparent PNGs from Canva), cropped tight to the figure. */
const ATTIRE = path.resolve("source-assets/attire");
const attire = [
  ["attire-guys-wedding-1", "Untitled design.png"],
  ["attire-guys-welcome-1", "Untitled design (1).png"],
  ["attire-guys-welcome-2", "Untitled design (2).png"],
  ["attire-guys-welcome-3", "Untitled design (3).png"],
  ["attire-guys-welcome-4", "Untitled design (4).png"],
  ["attire-guys-welcome-5", "Untitled design (5).png"],
  ["attire-girls-welcome-1", "Untitled design (12).png"],
  ["attire-girls-welcome-2", "Untitled design (6).png"],
  ["attire-girls-welcome-3", "Untitled design (10).png"],
  ["attire-girls-welcome-4", "Untitled design (7).png"],
  ["attire-girls-welcome-5", "Untitled design (11).png"],
  ["attire-girls-welcome-6", "Untitled design (8).png"],
  ["attire-girls-welcome-7", "Untitled design (9).png"],
  ["attire-girls-wedding-1", "Untitled design (13).png"],
  ["attire-girls-wedding-2", "Untitled design (14).png"],
  ["attire-girls-wedding-3", "Untitled design (15).png"],
  ["attire-girls-wedding-4", "Untitled design (16).png"],
];

for (const [slug, file] of attire) {
  const src = path.join(ATTIRE, file);
  if (!existsSync(src)) continue;
  const out = path.join(OUT, `${slug}.webp`);
  const { info } = await sharp(src)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 })
    .resize({ height: 640, withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(out)
    .then((info) => ({ info }));
  console.log(`${slug}.webp  ${info.width}x${info.height}  ${kb(out)}`);
}

copyFileSync(path.join(SRC, "RVV SVG Vector.svg"), path.join(OUT, "villa-sketch.svg"));
console.log(`villa-sketch.svg  ${kb(path.join(OUT, "villa-sketch.svg"))}`);

const video = path.resolve("source-assets/super8.mp4");
if (existsSync(video)) {
  const out = path.join(OUT, "super8.mp4");
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-i", video,
    "-vf", "scale=960:-2", "-c:v", "libx264", "-preset", "slow", "-crf", "28",
    "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", out,
  ]);
  console.log(`super8.mp4  ${kb(out)}`);
  const poster = path.join(OUT, "super8-poster.jpg");
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-ss", "2", "-i", video, "-frames:v", "1",
    "-vf", "scale=1440:-2", "-q:v", "5", poster,
  ]);
  console.log(`super8-poster.jpg  ${kb(poster)}`);
}
