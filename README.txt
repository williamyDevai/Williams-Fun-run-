╔═══════════════════════════════════════════╗
║         V2V — Vendor to Vendor            ║
║         Desktop App Setup Guide           ║
╚═══════════════════════════════════════════╝

REQUIREMENTS
────────────
• Node.js (free) — download from https://nodejs.org
  → Download the "LTS" version (big green button)
  → Run the installer, click Next through everything


SETUP (one time only)
─────────────────────
1. Copy YOUR v2v.html file into this folder
   (same folder as this README and main.js)

2. Open a terminal / command prompt in this folder
   → Windows: Right-click the folder → "Open in Terminal"
              OR press Win+R, type cmd, press Enter,
              then type: cd "path\to\this\folder"

3. Install dependencies (one time only):
   npm install

4. Test it runs:
   npm start
   → V2V should open in its own window!


BUILD A REAL .EXE INSTALLER (optional)
───────────────────────────────────────
Once npm start works, run:

   npm run build:win

This creates a "dist" folder with:
  • V2V Setup 1.0.0.exe  ← double-click to install on any PC

After installing, V2V appears in:
  • Start Menu → V2V
  • Desktop shortcut
  • Apps list

Your data saves permanently between sessions.


MAC / LINUX
───────────
  npm run build:mac    → creates a .dmg installer
  npm run build:linux  → creates an AppImage


TIPS
────
• Your data is saved locally on your machine
• Use 💾 Backup → Export JSON after every show
  Store the backup in Google Drive or iCloud
• To update the app, just replace v2v.html and
  run npm start again


TROUBLESHOOTING
───────────────
"npm is not recognized"
  → Node.js isn't installed. Go to nodejs.org and install it.

App opens but shows blank screen
  → Make sure v2v.html is in the SAME folder as main.js

"Cannot find module 'electron'"
  → Run: npm install
