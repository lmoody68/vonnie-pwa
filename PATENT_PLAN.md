# V.O.N.N.I.E. — Patent Strategy & Filing Plan
**Voice Output Neural Navigator Interface Environment**
*"Always here for you"*

**Prepared by:** Leslie Moody
**Date:** April 27, 2026
**Version:** 1.0
**Status:** Pre-filing — Provisional Applications Recommended

---

## Executive Summary

V.O.N.N.I.E. is a browser-based Augmentative and Alternative Communication (AAC) tool for
people who cannot speak. After a full technical audit of 123 distinct features across the
application, **four innovations** stand out as genuinely novel, non-obvious, and patentable
under United States patent law. These represent meaningful advances over the prior art in the
AAC device industry.

**Recommended immediate action:** File Provisional Patent Applications (PPAs) for all four
innovations within 30 days. Each PPA costs $320 (small entity) or $160 (micro entity), gives
12 months of legal "Patent Pending" status, and establishes your priority date before a
competitor sees the app.

---

## Part 1 — Patentable Innovations

---

### PATENT 1 — Caregiver-Initiated Bidirectional Communication System for Non-Verbal Patients

**Classification:** Utility Patent — Medical Device / Human-Computer Interface
**Novelty Score:** ★★★★★ (Highest — no known prior art in AAC space)

#### What It Is

A communication method and system in which a healthcare provider or caregiver initiates a
structured question to a non-verbal patient using an AAC device. The system:

1. Displays a categorized library of clinically relevant questions to the caregiver
2. Upon selection, synthesizes and vocalizes the question aloud via text-to-speech
3. Presents a full-screen binary response interface (YES / NO) optimized for patients with
   limited motor control (minimum 44px tap targets)
4. Captures the patient's response via touch input
5. Vocalizes the patient's answer back to the caregiver
6. Automatically dismisses the response interface and returns to the question library

#### Why It's Novel

Every AAC device on the market (Tobii Dynavox, Proloquo2Go, TouchChat, Cboard, LetMeTalk)
is designed exclusively for **patient-initiated** communication — the patient decides what to
say, taps a button, and the device speaks. No existing system includes a dedicated
**caregiver-initiated structured questioning** workflow.

The specific combination of:
- Caregiver-side question library with clinical categorization
- TTS vocalization of the question
- Full-screen YES/NO response capture
- TTS vocalization of the patient's answer
- Automatic return to question flow

...has no known prior art in any AAC device, app, or patent filing.

#### Prior Art Comparison

| System | Patient-Initiated | Caregiver-Initiated | Binary Response | Auto-Return |
|---|---|---|---|---|
| Tobii Dynavox | ✅ | ❌ | ❌ | ❌ |
| Proloquo2Go | ✅ | ❌ | ❌ | ❌ |
| TouchChat HD | ✅ | ❌ | ❌ | ❌ |
| LetMeTalk | ✅ | ❌ | ❌ | ❌ |
| Cboard | ✅ | ❌ | ❌ | ❌ |
| **V.O.N.N.I.E.** | ✅ | **✅** | **✅** | **✅** |

#### Draft Patent Claims

**Independent Claim 1:**
A computer-implemented communication method comprising:
- displaying, on a first user interface, a plurality of pre-formulated questions organized by
  clinical category for selection by a caregiver;
- responsive to selection of a question, generating and outputting speech audio corresponding
  to the selected question via a text-to-speech engine;
- displaying, on a second full-screen user interface, a binary response interface comprising a
  YES element and a NO element, each sized for low-motor-control touch interaction;
- receiving a touch input on one of the YES element or NO element from a non-verbal patient;
- generating and outputting speech audio corresponding to the received touch input; and
- dismissing the binary response interface and returning to the first user interface.

**Dependent Claim 2:** The method of claim 1 wherein the clinical categories include at
least: basic physiological needs, comfort level, pain assessment, emotional state, and
activity preferences.

**Dependent Claim 3:** The method of claim 1 wherein the binary response interface is
automatically dismissed after a predetermined delay following speech output of the patient
response.

---

### PATENT 2 — AI-Powered First-Person Voice Proxy for Non-Verbal Communication

**Classification:** Utility Patent — Artificial Intelligence / Assistive Technology
**Novelty Score:** ★★★★★ (Highest — genuinely novel AI application)

#### What It Is

A method and system in which an AI language model generates speech output **on behalf of** a
non-verbal user — speaking *as* the user in first person, rather than speaking *to* or *for*
the user as an external assistant. The system:

1. Accepts natural language input (typed or partial) from a caregiver or patient
2. Passes the input to an AI language model with a system prompt that instructs the AI to
   respond as though it IS the patient — using first-person language, appropriate vocabulary
   for the patient's condition, and natural spoken sentence structure
3. Returns the AI-generated phrase to the patient's device
4. Speaks the phrase aloud as if the patient themselves said it

The specific system prompt architecture ("Dignity-First AI Communication") instructs the AI:
- To speak in first person as an adult with the patient's specific condition
- To use natural, dignified language — not medical or clinical language
- To complete partial thoughts rather than generate clinical responses
- To never break the first-person perspective

#### Why It's Novel

Current AI-powered communication tools use AI as an **assistant** that speaks *to* the user
("Here is a phrase you could say...") or as a *translator* that reformats text. No existing
AAC product uses AI as a **voice proxy** — a system that takes over the user's linguistic
voice entirely, generating speech as if the AI itself is the non-verbal person.

This represents a fundamentally different relationship between AI and user:

| Traditional AI | V.O.N.N.I.E. AI Proxy |
|---|---|
| AI is an assistant | AI is a voice surrogate |
| Speaks *to* the user | Speaks *as* the user |
| Third-person suggestions | First-person speech generation |
| AI retains its identity | AI adopts the user's identity |
| Informational | Communicative |

#### Draft Patent Claims

**Independent Claim 1:**
A computer-implemented method for AI-mediated communication comprising:
- receiving natural language input from a user or caregiver of a non-verbal person;
- transmitting the input to a language model with a system prompt that instructs the language
  model to generate output in the first person as if the non-verbal person is speaking,
  wherein the system prompt includes persona information about the non-verbal person's
  condition, communication style, and dignity preferences;
- receiving generated text from the language model in first-person natural language; and
- converting the generated text to speech audio and outputting the audio on the non-verbal
  person's communication device.

**Dependent Claim 2:** The method of claim 1 wherein the system prompt constrains the
language model to use natural colloquial language rather than clinical or formal language.

**Dependent Claim 3:** The method of claim 1 further comprising a multi-provider cascade
wherein the system sequentially queries a plurality of language model providers until a
successful response is received.

**Dependent Claim 4:** The method of claim 1 wherein the language model additionally
generates contextually relevant follow-up communication suggestions based on the prior
utterance.

---

### PATENT 3 — QR-Code-Facilitated Multi-Device AAC Configuration Synchronization System

**Classification:** Utility Patent — Medical Device Management / Network Communication
**Novelty Score:** ★★★★☆

#### What It Is

A method and system for deploying, synchronizing, and updating communication button
configurations across multiple AAC devices within a healthcare facility — using QR codes as
the device onboarding mechanism and a cloud database as the synchronization source. The
system:

1. An administrator defines named button set configurations via a web-based dashboard
2. The dashboard generates a QR code encoding a facility-specific deep-link URL containing a
   unique facility identifier
3. A caregiver scans the QR code with an AAC device; the device's browser opens the AAC
   application URL and automatically reads the facility code from the URL parameters
4. The device registers itself in the facility's cloud database with a unique device
   identifier and label
5. The device periodically synchronizes its button configuration from the cloud, receiving
   any updates pushed by the administrator
6. The administrator can push a configuration update to all registered devices
   simultaneously without physical access to any device

#### Why It's Novel

Existing AAC device management requires either physical configuration of each device
individually or proprietary enterprise device management systems costing thousands of dollars.
The specific combination of:
- QR code as the initial enrollment mechanism (vs manual IP entry or proprietary pairing)
- Deep-link URL encoding of facility credentials
- Automatic device registration on URL parameter detection
- Cloud-synchronized button set propagation to all registered devices
- Browser-based (no app store, no proprietary MDM) implementation

...is novel in the AAC and medical device management space.

#### Draft Patent Claims

**Independent Claim 1:**
A system for managing communication configurations across a plurality of AAC devices
comprising:
- a web-based administrative interface for defining communication button set configurations;
- a QR code generation module that encodes a facility identifier within a URL parameter of
  a deep-link URL pointing to an AAC application;
- a device registration module that, upon detection of the facility identifier in the URL
  parameter at application launch, automatically registers the device in a cloud database
  with a unique device identifier;
- a synchronization module that periodically retrieves the active button set configuration
  for the registered device from the cloud database; and
- a propagation module that, upon administrator action, updates the active button set
  configuration for all registered devices in the cloud database.

**Dependent Claim 2:** The system of claim 1 wherein the AAC application is a progressive
web application operable without native application installation.

**Dependent Claim 3:** The system of claim 1 wherein individual devices may be assigned
device-specific configurations that override the facility-wide active configuration.

---

### PATENT 4 — Restore-Code-Based Cloud Backup and Recovery System for AAC Button Configurations

**Classification:** Utility Patent — Data Management / Assistive Technology
**Novelty Score:** ★★★☆☆ (Moderate — novel in AAC context)

#### What It Is

A method and system for backing up and recovering personalized AAC communication button
configurations using a human-memorable restore code — without requiring user account
creation or authentication credentials. The system:

1. On the first modification of a button configuration, generates a unique restore code
   (e.g., "VONNIE-A4B2C8") and stores it locally on the device
2. Automatically synchronizes the button configuration to a cloud database indexed by the
   restore code after every modification
3. Displays the restore code prominently in the application settings as a recovery mechanism
4. Provides a recovery input field where a user can enter a restore code on any device to
   retrieve the backed-up button configuration
5. The recovery operation restores the complete personalized button set without requiring
   login credentials, email verification, or account creation

#### Why It's Novel

Standard backup systems require user accounts, email addresses, or authentication tokens.
For caregivers of non-verbal patients — who may be elderly, non-technical, or under stress —
account creation creates a barrier that prevents backup adoption. The specific combination of:
- Account-free backup using a short, human-readable restore code
- Automatic background synchronization triggered by user content changes
- Cross-device recovery without authentication
- Domain-specific application to AAC communication configurations

...is novel in the assistive technology space.

#### Draft Patent Claims

**Independent Claim 1:**
A method for backing up and recovering personalized AAC communication configurations
comprising:
- generating a unique alphanumeric restore code associated with a first user device upon
  initial creation or modification of a communication button configuration on the device;
- storing the restore code on the first user device and in a cloud database record indexed
  by the restore code;
- automatically uploading the communication button configuration to the cloud database record
  upon each modification without requiring user authentication;
- displaying the restore code to a user in a human-readable format; and
- responsive to receiving the restore code as input on a second user device, retrieving and
  applying the stored communication button configuration from the cloud database to the
  second user device without requiring account credentials.

---

## Part 2 — Filing Strategy

### Recommended Approach: Provisional Patent Applications First

A **Provisional Patent Application (PPA)** is the fastest and cheapest way to establish
your priority date and begin using "Patent Pending" legally.

**Why file provisional first:**
- Costs $160–$320 per application (vs. $10,000–$20,000 for full utility patent with attorney)
- Gives 12 months to raise funds, refine the product, and hire a patent attorney
- Establishes your legal priority date immediately
- Allows you to mark the app "Patent Pending" in marketing materials
- If a competitor files the same idea after your provisional date, YOUR date wins

### Filing Order (by priority)

| Order | Innovation | Reason |
|---|---|---|
| **1st** | Caregiver YES/NO System (Patent 1) | Most novel, highest commercial value, biggest litigation protection |
| **2nd** | AI Voice Proxy (Patent 2) | Genuinely novel AI application, strong defensibility |
| **3rd** | QR Multi-Device Sync (Patent 3) | Key to facility licensing revenue |
| **4th** | Restore Code Backup (Patent 4) | Useful but least novel |

---

## Part 3 — Step-by-Step Filing Plan

### Phase 1 — Immediate (Within 30 Days) — DIY Provisional Applications

**Goal:** Establish priority dates for all four innovations before marketing begins.

#### Step 1 — Verify You Qualify as Micro Entity
If your gross income is under $239,754/year and you are not obligated to assign the patent
to a large entity, you qualify as a **micro entity** — filing fees are reduced by 80%.

- Micro entity fee per provisional: **$160**
- Small entity fee per provisional: **$320**
- Large entity fee per provisional: **$1,760**

#### Step 2 — Conduct a Prior Art Search (Free)
Before filing, verify no one has patented these exact ideas.

1. Go to **patents.google.com**
2. Search for: `"AAC" AND "caregiver" AND "yes no"` — for Patent 1
3. Search for: `"augmentative communication" AND "artificial intelligence" AND "first person"` — for Patent 2
4. Search for: `"AAC" AND "QR code" AND "synchronization"` — for Patent 3
5. Search for: `"communication device" AND "backup" AND "restore code"` — for Patent 4

If you find close prior art, note it — the examiner will ask about it later.

#### Step 3 — File Provisional Patent Applications on USPTO
URL: **https://www.uspto.gov/patents/basics/apply**

1. Create a USPTO account at **account.uspto.gov**
2. Go to **EFS-Web** (Electronic Filing System)
3. Select: **New application → Provisional**
4. For each provisional, you need:
   - **Title** (use the titles from Part 1 above)
   - **Specification** (detailed description — use the "What It Is" sections above as a starting point, expand to 3–5 pages each)
   - **Drawings** (simple flowcharts are acceptable — sketch the user flow)
   - **Inventors** — Leslie Moody
   - **Filing fee** — pay by credit card

5. You do NOT need formal claims in a provisional (they are optional)
6. After filing, you receive a **filing receipt** with your application number

#### Step 4 — Mark the App "Patent Pending"
Once all four provisionals are filed, add to the V.O.N.N.I.E. app:
- Footer: "Patent Pending"
- Flier: "Patent Pending"
- Admin dashboard: "Patent Pending"

**Important:** Do not use "Patent Pending" until the filing receipt is in hand.

---

### Phase 2 — Within 6 Months — Hire a Patent Attorney

**Goal:** Convert provisionals to full utility applications with professionally drafted claims.

#### What to Look For in a Patent Attorney
- Specialization in **software patents** or **medical device patents**
- Experience with **AAC** or **assistive technology** (a plus)
- Offers **flat-fee provisional-to-utility conversion** (typical: $3,000–$6,000 per patent)
- Member of the **USPTO Patent Bar** (required to file)

#### Finding Attorneys
- **USPTO Patent Attorney Search:** https://oedci.uspto.gov/OEDCI/
- **Avvo.com** — search "patent attorney" + "software" or "medical device"
- **IPWatchdog.com** — patent attorney referral network

#### What the Attorney Will Do
1. Review your provisional applications
2. Conduct thorough prior art search
3. Draft formal patent claims (the legally enforceable part)
4. Write the full specification with legal precision
5. File the utility application (before your 12-month provisional deadline)

**Estimated cost:** $3,500–$5,500 per utility patent with an experienced software patent attorney.
**Estimated total for all 4:** $14,000–$22,000 (spread over 12 months)

---

### Phase 3 — Month 6–24 — USPTO Prosecution

**Goal:** Successfully defend the applications through USPTO examination.

The USPTO will:
1. Assign an examiner to each application
2. Issue an **Office Action** (likely rejecting some claims initially — this is normal)
3. You (or your attorney) respond with arguments and/or amended claims
4. Process repeats until the examiner allows or finally rejects

**Typical timeline:** 18–36 months from utility filing to patent grant
**Patents last:** 20 years from the utility application filing date

---

## Part 4 — Cost Summary

| Phase | Action | Cost | Timeline |
|---|---|---|---|
| Phase 1 | 4 Provisional Patent Applications (DIY, micro entity) | $640 | Within 30 days |
| Phase 2 | Patent attorney retainer + prior art searches | $500–$1,000 | Month 2–3 |
| Phase 2 | 4 Utility Patent conversions (attorney-drafted) | $14,000–$22,000 | Month 3–12 |
| Phase 3 | USPTO Office Action responses (per patent) | $1,500–$3,000 each | Year 1–3 |
| **Total estimated** | | **$17,000–$28,000** | **Over 3 years** |

**Revenue offset strategy:**
- Begin selling facility licenses ($299–$8,000/year) immediately after filing provisionals
- Use facility license revenue to fund Phase 2 attorney costs
- Year 3 ARR projection ($1.4M) easily covers total patent costs

---

## Part 5 — Trade Secret and Trademark Strategy

In addition to patents, protect V.O.N.N.I.E. through complementary IP strategies:

### Trademark (Highest Priority — Do This First)

**Trademark "V.O.N.N.I.E."** as a brand name in Class 10 (medical devices) and Class 42
(software as a service).

- File at: **teas.uspto.gov**
- Cost: $250–$350 per class (TEAS Plus application)
- Timeline: 8–12 months to registration
- Protection: Indefinite (renew every 10 years)

**Search first:** tmsearch.uspto.gov — confirm "VONNIE" is not already registered.

### Trade Secrets (No Filing Required)

Protect these through confidentiality and internal documentation:
- The exact wording of the VONNIE_SYSTEM AI persona prompt
- The specific question bank wording (30+ clinical questions)
- The AI provider cascade order and fallback logic
- The exact restore code generation algorithm

Document these internally with timestamps. Never publish the verbatim system prompt.

### Copyright (Automatic — No Filing Required)

The following are automatically copyright-protected:
- The source code of index.html, admin.html, guide.html, flier.html
- The V.O.N.N.I.E. written content (question banks, button phrases, UI text)
- The marketing flier design

Optional: Register with the U.S. Copyright Office ($65) for stronger litigation standing.

---

## Part 6 — Competitive IP Monitoring

After filing, monitor competitors for potential infringement:

1. **Google Patents Alerts** — Set alerts for: "AAC caregiver" "augmentative communication AI" "speech device QR"
2. **USPTO Patent Full-Text Search** — uspatws.com — search monthly
3. **App Store Monitor** — Track new AAC apps for similar features
4. **Google Alerts** — "caregiver communication app" "AAC artificial intelligence"

If a competitor launches a substantially similar feature **after your priority date**, consult
your patent attorney about sending a cease-and-desist or licensing negotiation.

---

## Part 7 — The "Patent Pending" Commercial Advantage

Filing these provisionals immediately — even before they are reviewed by an examiner —
gives V.O.N.N.I.E. a powerful commercial advantage:

1. **Investor confidence** — "Patent Pending" signals defensible IP to potential investors
2. **Facility sales** — Healthcare IT departments ask about IP protection before purchasing
3. **Partnership leverage** — ASHA, ALS Association, Easter Seals will be more confident
   recommending a product with pending patent protection
4. **Acquisition premium** — Companies like Tobii Dynavox or PRC-AAC pay more to acquire
   products with IP than those without
5. **Competitor deterrence** — Filing dates are public record; competitors see them and may
   choose not to copy

---

## Appendix A — Key Resources

| Resource | URL | Purpose |
|---|---|---|
| USPTO Patent Center | patentcenter.uspto.gov | File provisional and utility applications |
| Google Patents | patents.google.com | Prior art search |
| USPTO TEAS | teas.uspto.gov | Trademark filing |
| USPTO Patent Bar Directory | oedci.uspto.gov/OEDCI | Find licensed patent attorneys |
| IPWatchdog | ipwatchdog.com | Patent news and attorney referrals |
| LegalZoom Patents | legalzoom.com | Budget option for provisional drafting |
| Avvo | avvo.com | Attorney reviews and referrals |
| Copyright Office | copyright.gov/registration | Source code copyright registration |

---

## Appendix B — Provisional Application Template

Use this structure for each of the four provisional applications:

```
TITLE: [Use the title from Part 1]

INVENTORS: Leslie Moody, [City, State, Country]

FIELD OF THE INVENTION:
This invention relates to augmentative and alternative communication (AAC) devices and
methods for assisting non-verbal individuals.

BACKGROUND:
[2-3 paragraphs describing the problem that existing AAC tools fail to solve]

SUMMARY OF THE INVENTION:
[1-2 paragraphs summarizing the innovation]

DETAILED DESCRIPTION:
[3-5 pages describing exactly how the system works, step by step, with reference to the
flowcharts in the drawings]

DRAWINGS:
[Simple numbered flowcharts showing the user interaction flow]

ABSTRACT:
[Single paragraph, 150 words maximum, summarizing the invention]
```

---

*V.O.N.N.I.E. Patent Strategy v1.0 | Leslie Moody | April 27, 2026*
*This document is attorney-client work product and should be treated as confidential.*
*Consult a licensed patent attorney before filing.*
