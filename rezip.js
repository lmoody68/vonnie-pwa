/**
 * Rebuilds vonnie-pwa.zip to include all site files.
 * Run from the vonnie-pwa directory: node rezip.js
 */
const fs   = require('fs');
const path = require('path');

const SRC  = __dirname;
const DEST = path.join(__dirname, '..', 'vonnie-pwa.zip');

// Files/folders to include (relative to vonnie-pwa/)
// Add entries here any time you add a new file to the project.
const ENTRIES = [
    'index.html',
    'manifest.json',
    'sw.js',
    'speech_test.html',
    'flier.html',
];

// ---- minimal zip builder (no npm deps) ----
// Uses Node's built-in zlib for deflate.
const zlib = require('zlib');

function crc32(buf) {
    const table = (() => {
        const t = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
            let c = i;
            for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            t[i] = c;
        }
        return t;
    })();
    let crc = 0xFFFFFFFF;
    for (const b of buf) crc = table[(crc ^ b) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
}

function writeU16(b, o, v) { b[o] = v & 0xFF; b[o+1] = (v>>8) & 0xFF; }
function writeU32(b, o, v) { b[o]=v&0xFF; b[o+1]=(v>>8)&0xFF; b[o+2]=(v>>16)&0xFF; b[o+3]=(v>>24)&0xFF; }

const parts   = [];
const central = [];
let   offset  = 0;

for (const rel of ENTRIES) {
    const full = path.join(SRC, rel);
    if (!fs.existsSync(full)) { console.log(`  SKIP (not found): ${rel}`); continue; }

    const raw       = fs.readFileSync(full);
    const compressed = zlib.deflateRawSync(raw, { level: 6 });
    const crc       = crc32(raw);
    const nameBytes = Buffer.from(rel, 'utf8');
    const modDate   = new Date();
    const dosTime   = ((modDate.getSeconds() >> 1) | (modDate.getMinutes() << 5) | (modDate.getHours() << 11));
    const dosDate   = (modDate.getDate() | ((modDate.getMonth()+1) << 5) | ((modDate.getFullYear()-1980) << 9));

    // Local file header
    const lhSize = 30 + nameBytes.length;
    const lh = Buffer.alloc(lhSize);
    writeU32(lh, 0,  0x04034B50);   // sig
    writeU16(lh, 4,  20);            // version needed
    writeU16(lh, 6,  0);             // flags
    writeU16(lh, 8,  8);             // deflate
    writeU16(lh, 10, dosTime);
    writeU16(lh, 12, dosDate);
    writeU32(lh, 14, crc);
    writeU32(lh, 18, compressed.length);
    writeU32(lh, 22, raw.length);
    writeU16(lh, 26, nameBytes.length);
    writeU16(lh, 28, 0);
    nameBytes.copy(lh, 30);

    // Central directory entry
    const cd = Buffer.alloc(46 + nameBytes.length);
    writeU32(cd, 0,  0x02014B50);   // sig
    writeU16(cd, 4,  20);            // version made by
    writeU16(cd, 6,  20);            // version needed
    writeU16(cd, 8,  0);             // flags
    writeU16(cd, 10, 8);             // deflate
    writeU16(cd, 12, dosTime);
    writeU16(cd, 14, dosDate);
    writeU32(cd, 16, crc);
    writeU32(cd, 20, compressed.length);
    writeU32(cd, 24, raw.length);
    writeU16(cd, 28, nameBytes.length);
    writeU16(cd, 30, 0);             // extra len
    writeU16(cd, 32, 0);             // comment len
    writeU16(cd, 34, 0);             // disk start
    writeU16(cd, 36, 0);             // internal attr
    writeU32(cd, 38, 0);             // external attr
    writeU32(cd, 42, offset);        // local header offset
    nameBytes.copy(cd, 46);

    parts.push(lh, compressed);
    central.push(cd);

    offset += lh.length + compressed.length;
    console.log(`  Added: ${rel}  (${raw.length} → ${compressed.length} bytes)`);
}

// End of central directory
const cdBuf  = Buffer.concat(central);
const eocd   = Buffer.alloc(22);
writeU32(eocd, 0,  0x06054B50);
writeU16(eocd, 4,  0);
writeU16(eocd, 6,  0);
writeU16(eocd, 8,  central.length);
writeU16(eocd, 10, central.length);
writeU32(eocd, 12, cdBuf.length);
writeU32(eocd, 16, offset);
writeU16(eocd, 20, 0);

fs.writeFileSync(DEST, Buffer.concat([...parts, cdBuf, eocd]));
console.log(`\n  ✓  vonnie-pwa.zip rebuilt at: ${DEST}`);
console.log(`  Size: ${(fs.statSync(DEST).size / 1024).toFixed(1)} KB\n`);
