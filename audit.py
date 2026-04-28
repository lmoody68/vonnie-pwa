import re, os

html  = open('index.html',  encoding='utf-8', errors='ignore').read()
sw    = open('sw.js',       encoding='utf-8', errors='ignore').read()
admin = open('admin.html',  encoding='utf-8', errors='ignore').read()
guide = open('guide.html',  encoding='utf-8', errors='ignore').read()

passed, failed, warns = [], [], []

def check(name, cond, note=''):
    if cond: passed.append(name)
    else:    failed.append(name + (' — ' + note if note else ''))

def warn(name, cond, note=''):
    if cond: passed.append(name)
    else:    warns.append(name + (' — ' + note if note else ''))

# CORE STRUCTURE
check('index.html size > 100KB', len(html) > 100000)
check('PWA manifest linked', 'manifest.json' in html)
check('Service worker v16', 'vonnie-v16' in sw)
check('Welcome splash', 'id="welcome"' in html)
check('Sticky header', 'class="header"' in html)
check('Footer present', 'class="footer"' in html)
check('Purple theme (#2d1a4e)', '#2d1a4e' in html)
check('Lavender background', '#f5f0ff' in html)

# BUTTONS
check('Primary grid #buttons', 'id="buttons"' in html)
check('Secondary grid', 'id="secondaryButtons"' in html)
primary_ids = ['restroom','hungry','thirsty','dressed','outside','tv','channel','hot','cold','mom','nene','grandma']
secondary_ids = ['yes','no','pain','medicine','tired','reposition','love','thanks','help','music','privacy','goodday']
check('12 primary buttons', all("id: '" + x + "'" in html for x in primary_ids))
check('12 secondary buttons', all("id: '" + x + "'" in html for x in secondary_ids))
check('STOP button', 'stopSpeaking()' in html)
check('REPEAT button', 'repeatLast()' in html)
check('Say Anything button', 'showSayAnything()' in html)
check('More Options button', 'id="moreBtn"' in html)

# VOICE
check('speak() function', 'function speak(' in html)
check('SpeechSynthesisUtterance', 'SpeechSynthesisUtterance' in html)
check('getPreferredVoice()', 'getPreferredVoice' in html)
check('getVoiceForLang()', 'getVoiceForLang' in html)
check('isFemaleVoice()', 'isFemaleVoice' in html)
check('Pitch 1.08', '1.08' in html)
check('defaultGreeting()', 'defaultGreeting' in html)
check('getAIGreeting()', 'getAIGreeting' in html)
check('Greeting via t()', "t('greeting." in html or "t(`greeting." in html)

# AI
check('callAI() function', 'callAI' in html)
check('6 AI providers', all(p in html for p in ['groq','gemini','together','mistral','deepseek','ollama']))
check('AI chips #aiChips', 'id="aiChips"' in html)
check('Say Anything modal', 'id="sayAnythingModal"' in html)
check('toggleProvider()', 'toggleProvider' in html)

# MULTILINGUAL
langs17 = ['en','es','fr','ar','zh','vi','ht','pt','tl','ko','hi','ru','ja','de','it','pl','uk']
for l in langs17:
    check('Lang: ' + l, ("'" + l + "':") in html or ('"' + l + '":') in html or (l + ':{') in html)
check('LANG_FLAGS object', 'LANG_FLAGS' in html)
check('LANG_VOICE_TAGS all langs', 'fil-PH' in html and 'hi-IN' in html and 'pl-PL' in html)
check('RTL support (Arabic)', 'LANG_RTL' in html and 'rtl' in html)
check('buildLangSelector()', 'buildLangSelector' in html)
check('t() translation fn', 'function t(' in html)
check('getCgQuestions()', 'getCgQuestions' in html)
check('getPhrase() translated', 'getPhrase' in html)
check('Language localStorage', 'vonnie_language' in html)

# CAREGIVER MODE
check('Caregiver toggle btn', 'id="modeToggleBtn"' in html)
check('Caregiver section', 'id="caregiverMode"' in html)
check('5 preset categories', all(("setCgCat('" + c + "'") in html for c in ['needs','comfort','pain','feelings','social']))
check('My Care Questions tab', "setCgCat('custom'" in html)
check('YES/NO overlay', 'id="yesNoOverlay"' in html)
check('answerQuestion yes/no', "answerQuestion('yes')" in html and "answerQuestion('no')" in html)
check('Auto-close 2.2s', '2200' in html)
check('Custom questions modal', 'id="cgQModal"' in html)
check('MEDICAL_EMOJIS picker', 'MEDICAL_EMOJIS' in html)
check('CG_TEMPLATES', 'CG_TEMPLATES' in html)
check('deleteCgQuestion()', 'deleteCgQuestion' in html)

# KIDS MODE
check('Kids toggle btn', 'id="kidsModeBtn"' in html)
check('Kids section', 'id="kidsMode"' in html)
check('Kids header bar', 'kids-header-bar' in html)
check('KIDS_BUTTONS defined', 'KIDS_BUTTONS' in html)
check('Repeat After Me game', 'renderRepeatGame' in html)
check('Word Match game', 'renderMatchGame' in html)
check('KIDS_WORDS 20 entries', html.count("word:'") == 20)
check('kidsScore tracking', 'kidsScore' in html)
check('Celebration animation', 'celebrating' in html)
check('Shake animation', 'shaking' in html)
check('Exits caregiver first', 'if (caregiverModeActive) toggleCaregiverMode()' in html)

# CUSTOM BUTTONS (PATIENT)
check('openBtnEditor()', 'openBtnEditor()' in html)
check('btnEditorModal', 'id="btnEditorModal"' in html)
check('btnFormModal', 'id="btnFormModal"' in html)
check('COLOR_PRESETS', 'COLOR_PRESETS' in html)
check('Live preview', 'id="btnPreview"' in html)
check('saveBtnForm()', 'saveBtnForm()' in html)
check('deleteBtnAt()', 'deleteBtnAt(' in html)
check('customSection', 'id="customSection"' in html)
check('screenshotToast', 'screenshotToast' in html)
check('cloudBackupButtons()', 'cloudBackupButtons' in html)

# CLOUD BACKUP
check('personal_backups table', 'personal_backups' in html)
check('Restore code VONNIE-', 'VONNIE-' in html)
check('restoreCodeBox', 'id="restoreCodeBox"' in html)
check('restoreCodeInput', 'id="restoreCodeInput"' in html)
check('doRestoreButtons()', 'doRestoreButtons' in html)

# FACILITY MODE
check('facilityNotJoined', 'id="facilityNotJoined"' in html)
check('joinModal', 'id="joinModal"' in html)
check('URL ?join= deeplink', "params.get('join')" in html)
check('Supabase URL wired in', 'wztwnyerpzlmkqupvrqu' in html)
check('facilitySection', 'id="facilitySection"' in html)
check('5-min auto-sync', '5 * 60 * 1000' in html)
check('syncFacilityNow()', 'syncFacilityNow' in html)
check('leaveFacility()', 'leaveFacility' in html)
check('Device UUID', 'vonnie_device_id' in html)

# TRIAL SYSTEM
check('trial_devices table', 'trial_devices' in html)
check('trialBanner', 'id="trialBanner"' in html)
check('5 warning milestones', all(str(m) in html for m in [21,14,7,3,1]))
check('trialLockout', 'id="trialLockout"' in html)
check('$9.99 shown in lockout', '9.99' in html)
check('Annual pricing in lockout', '79' in html)
check('has_paid bypass', 'has_paid' in html)
check('vonnie_trial_cache', 'vonnie_trial_cache' in html)

# INSTALL / PWA
check('installBanner', 'id="installBanner"' in html)
check('iOS share instructions', 'Share button' in html)
check('beforeinstallprompt', 'beforeinstallprompt' in html)
check('isStandalone()', 'isStandalone' in html)
check('vonnie_install_dismissed', 'vonnie_install_dismissed' in html)
check('serviceWorker registration', 'serviceWorker' in html)

# SETTINGS
check('settingsModal', 'id="settingsModal"' in html)
check('darkModeToggle', 'darkModeToggle' in html)
check('voiceSelect', 'voiceSelect' in html)
check('voiceSpeed slider', 'voiceSpeed' in html)
check('testVoice()', 'testVoice' in html)
check('3 family phones', all(p in html for p in ['momPhone','nenePhone','grandmaPhone']))
check('6 AI provider toggles', all(('toggle_' + p) in html for p in ['groq','gemini','together','mistral','deepseek','ollama']))
check('langSelector', 'id="langSelector"' in html)
check('User Guide link', 'guide.html' in html)
check('Facility Mode section', 'Facility Mode' in html)

# ACCESSIBILITY
check('Dark mode CSS', '.dark .btn' in html)
check('Touch disambiguation', 'touchFired' in html)
check('Landscape media query', '@media (orientation: landscape)' in html)
check('iOS webkit scroll', '-webkit-overflow-scrolling' in html)
check('aria-label', 'aria-label' in html)

# ADMIN DASHBOARD
check('Admin doLogin()', 'doLogin()' in admin)
check('Admin doRegister()', 'doRegister()' in admin)
check('Registration passcode', 'REGISTRATION_PASSCODE' in admin)
check('Facility code display', 'codeDisplay' in admin)
check('QR code generation', 'qrserver.com' in admin)
check('Button sets tab', 'openSetEditor' in admin)
check('Devices tab', 'loadDevices' in admin)
check('Push to all devices', 'pushToAll' in admin)
check('Admin settings', 'saveSettings' in admin)
check('Admin Supabase wired', 'wztwnyerpzlmkqupvrqu' in admin)

# USER GUIDE
check('Caregiver guide section', 'Caregiver Mode' in guide)
check('My Care Questions guide', 'My Care Questions' in guide)
check('Custom buttons guide', 'Edit My Buttons' in guide or 'Editing' in guide)
check('Facility admin guide', 'Facility Admins' in guide)
check('QR setup guide', 'QR' in guide)
check('Troubleshooting', 'Troubleshooting' in guide)

# SUMMARY
total = len(passed) + len(failed) + len(warns)
sep = '=' * 55
print('\n' + sep)
print('  V.O.N.N.I.E. FULL AUDIT RESULTS')
print(sep)
print(f'\n  Pass  : {len(passed):3d} / {total}  ({round(len(passed)/total*100)}%)')
print(f'  Fail  : {len(failed):3d} / {total}')
print(f'  Warn  : {len(warns):3d} / {total}')

if failed:
    print('\n  FAILURES TO FIX:')
    for f in failed: print(f'    ❌ {f}')
if warns:
    print('\n  WARNINGS:')
    for w in warns: print(f'    ⚠️  {w}')
if not failed:
    print('\n  ✅ ALL CHECKS PASSED — app is healthy!')
print('\n' + sep)
