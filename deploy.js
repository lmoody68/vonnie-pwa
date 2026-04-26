/**
 * V.O.N.N.I.E. — Netlify Deploy Script
 * Uses Node's built-in modules only (no npm packages needed).
 *
 * First deploy:   node deploy.js YOUR_TOKEN
 * All future:     node deploy.js YOUR_TOKEN   (same command, same URL)
 *
 * Your token never expires unless you revoke it.
 * Save it in API_Keys.txt and reuse it every time.
 *
 * Get/manage tokens at:
 *   https://app.netlify.com/user/applications#personal-access-tokens
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const TOKEN    = process.argv[2];
const ZIP      = path.join(__dirname, '..', 'vonnie-pwa.zip');
const CFG_FILE = path.join(__dirname, 'vonnie-site.json'); // saved after first deploy

if (!TOKEN) {
    console.error('\n  ERROR: No token provided.');
    console.error('  Usage:  node deploy.js YOUR_NETLIFY_TOKEN');
    console.error('  Token never expires — save it and reuse it every time.\n');
    process.exit(1);
}

if (!fs.existsSync(ZIP)) {
    console.error('\n  ERROR: vonnie-pwa.zip not found at:', ZIP, '\n');
    process.exit(1);
}

/* ---- raw HTTPS helper ---- */
function api(method, endpoint, body, contentType) {
    return new Promise((resolve, reject) => {
        const isBuf = Buffer.isBuffer(body);
        const data  = isBuf ? body : (body ? Buffer.from(JSON.stringify(body)) : null);

        const opts = {
            hostname: 'api.netlify.com',
            path:     '/api/v1' + endpoint,
            method,
            headers: { 'Authorization': 'Bearer ' + TOKEN }
        };

        if (data) {
            opts.headers['Content-Type']   = contentType || 'application/json';
            opts.headers['Content-Length'] = data.byteLength;
        }

        const req = https.request(opts, res => {
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => {
                const raw = Buffer.concat(chunks).toString('utf8');
                try {
                    const parsed = JSON.parse(raw);
                    if (res.statusCode >= 400) {
                        reject(new Error(`HTTP ${res.statusCode} — ${parsed.message || parsed.error || raw.slice(0, 200)}`));
                    } else {
                        resolve(parsed);
                    }
                } catch {
                    reject(new Error(`Non-JSON (HTTP ${res.statusCode}): ${raw.slice(0, 200)}`));
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

/* ---- poll until deploy is ready ---- */
async function waitForReady(deployId, maxWaitMs = 90000) {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
        await new Promise(r => setTimeout(r, 3000));
        const d = await api('GET', `/deploys/${deployId}`);
        process.stdout.write('.');
        if (d.state === 'ready') return d;
        if (d.state === 'error') throw new Error('Netlify reported deploy error: ' + (d.error_message || 'unknown'));
    }
    throw new Error('Deploy timed out after 90s');
}

/* ---- main ---- */
async function deploy() {
    console.log('\n  ◠‿◠  V.O.N.N.I.E. — Netlify Deploy\n');

    /* --- Step 1: get or create the site --- */
    let siteId, siteUrl, isNew = false;

    if (fs.existsSync(CFG_FILE)) {
        // Returning deploy — verify site still exists then reuse it
        const cfg = JSON.parse(fs.readFileSync(CFG_FILE, 'utf8'));
        process.stdout.write(`  [1/4] Verifying existing site...`);
        try {
            const site = await api('GET', `/sites/${cfg.siteId}`);
            siteId  = site.id;   // always use the canonical UUID
            siteUrl = site.ssl_url || site.url || cfg.siteUrl;
            // Update saved config with canonical UUID in case it was a name before
            fs.writeFileSync(CFG_FILE, JSON.stringify({ siteId, siteUrl }, null, 2));
            console.log(` ✓  ${siteUrl}`);
        } catch {
            console.log(' site not found — creating a new one.');
            fs.unlinkSync(CFG_FILE);
            isNew = true;
        }
    }

    if (!siteId) {
        // First deploy — create a new site
        process.stdout.write('  [1/4] Creating Netlify site...');
        const siteName = 'vonnie-aac-' + Math.random().toString(36).slice(2, 7);
        const site = await api('POST', '/sites', { name: siteName });
        siteId  = site.id;
        siteUrl = site.ssl_url || site.url || `https://${site.name}.netlify.app`;
        isNew   = true;
        console.log(` ✓  ${siteUrl}`);

        // Save for all future deploys
        fs.writeFileSync(CFG_FILE, JSON.stringify({ siteId, siteUrl }, null, 2));
        console.log('       Site ID saved to vonnie-site.json — future deploys reuse this site.');
    }

    /* --- Step 2: upload zip --- */
    process.stdout.write('  [2/4] Uploading vonnie-pwa.zip...');
    const zipData = fs.readFileSync(ZIP);
    const deploy  = await api('POST', `/sites/${siteId}/deploys`, zipData, 'application/zip');
    console.log(` ✓  Deploy ID: ${deploy.id}`);

    /* --- Step 3: wait for processing --- */
    process.stdout.write('  [3/4] Processing');
    const ready = await waitForReady(deploy.id);
    console.log(` ✓`);

    /* --- Step 4: publish --- */
    process.stdout.write('  [4/4] Publishing to production...');
    await api('POST', `/deploys/${ready.id}/restore`);
    console.log(' ✓');

    /* --- Done --- */
    console.log('\n  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    if (isNew) {
        console.log('  ✅  V.O.N.N.I.E. IS LIVE!\n');
    } else {
        console.log('  ✅  V.O.N.N.I.E. UPDATED!\n');
    }
    console.log('  🌐  ' + siteUrl);
    console.log('\n  Same URL every time — no changes needed on her tablet.');
    console.log('\n  To redeploy after future updates:');
    console.log('    node deploy.js YOUR_TOKEN   (same token, same command)\n');
    console.log('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

deploy().catch(err => {
    console.error('\n  ✗  Deploy failed:', err.message, '\n');
    process.exit(1);
});
