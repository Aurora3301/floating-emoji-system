# 🍔 Lunch Break Reminder System

A fun web app that reminds you to take lunch breaks with floating food emojis! 🎉

---

## What Does This App Do?

- 🍕 Shows floating food emojis on your screen
- ⏰ Reminds you at **every hour** (like 9:00, 9:30, 10:00, etc.)
- 🎯 Displays a friendly message: "It's lunch time, Go and take a rest!"
- 🔘 You can also click a button to start/stop the animation anytime

---

## 📋 Requirements

Before you begin, you need to install one thing:

| Your Computer | What to Download |
|---------------|------------------|
| **Mac** | [Node.js for Mac](https://nodejs.org/dist/v20.11.0/node-v20.11.0.pkg) |
| **Windows** | [Node.js for Windows](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi) |

**How to check if you already have Node.js:**
- **Mac**: Open **Terminal** (press `Cmd + Space`, type "Terminal")
- **Windows**: Open **Command Prompt** (press `Win + R`, type "cmd")
- Type this command and press Enter:
  ```
  node -v
  ```
- If you see a version number (like `v20.11.0`), you're good to go!

---

## 🚀 Step-by-Step Installation

### Step 1: Download the Code

#### Option A: Download as ZIP (Easiest!)

1. Go to: https://github.com/Aurora3301/floating-emoji-system
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file to your Desktop

#### Option B: Using Git (For Terminal Users)

**Mac:**
1. Open **Terminal** (Cmd + Space, type "Terminal")
2. Type these commands (press Enter after each):

```bash
# Go to your Desktop
cd Desktop

# Clone the repository
git clone https://github.com/Aurora3301/floating-emoji-system.git
```

**Windows:**
1. Open **Command Prompt** (Win + R, type "cmd")
2. Type these commands (press Enter after each):

```cmd
cd %USERPROFILE%\Desktop

git clone https://github.com/Aurora3301/floating-emoji-system.git
```

---

### Step 2: Install the App

**Mac - Terminal:**
```bash
# Go to the project folder
cd Desktop/floating-emoji-system

# Install the app
npm install
```

**Windows - Command Prompt:**
```cmd
cd /d %USERPROFILE%\Desktop\floating-emoji-system

npm install
```

> ⚠️ **Wait** for the installation to finish (this takes 1-2 minutes)

---

### Step 3: Run the App

**Mac - Terminal:**
```bash
npm run dev
```

**Windows - Command Prompt:**
```cmd
npm run dev
```

---

### Step 4: Open the App in Your Browser

1. Wait for Terminal/Command Prompt to say something like:
   ```
   Local: http://localhost:3000/
   ```
2. Open your web browser (Chrome, Safari, Edge, etc.)
3. Type in the address bar: `http://localhost:3000`
4. Press Enter

🎉 **That's it!** The app should now be running!

---

## ❓ How to Use the App

### Automatic Reminders
- The app automatically shows floating emojis at **every hour** (like 9:00, 9:30, 10:00, etc.)
- A message will appear: "It's lunch time, Go and take a rest! 😀"
- The animation lasts for **10 minutes**

### Manual Control
- Look for the **red button** in the bottom-right corner
- Click it to **start** or **stop** the animation anytime

### Time Display
- The current time (24-hour format) is shown in the **bottom-left** corner

---

## 🛠️ Troubleshooting

### "npm is not recognized" Error

**Windows:**
1. Download and install Node.js from: https://nodejs.org
2. Restart your computer
3. Try again

### "Port 3000 is already in use" Error

This means another app is using port 3000. Try:
1. Close other browser tabs
2. Or change the port in the code (advanced)

### App Not Loading

1. Make sure you ran `npm install` first
2. Make sure you ran `npm run dev`
3. Try closing and reopening Terminal/Command Prompt
4. Make sure your browser is up to date

### The Animation Is Not Showing

1. Keep the tab **active** (don't switch to another tab)
2. Check the time - it only triggers at **:00 or :30** (like 9:00, 9:30, 10:00)
3. Click the **red button** in the bottom-right to start manually

---

## 📁 Where Are the Files?

After downloading, you'll have a folder called `floating-emoji-system` with these files:

```
floating-emoji-system/
├── src/                    # The app code
│   ├── components/        # Different parts of the app
│   ├── composables/        # App logic
│   └── utils/             # Settings
├── package.json            # App information
├── vite.config.ts          # App configuration
└── README.md              # This file!
```

---

## 🎨 Customization (Optional)

Want to change the emojis or timing? You can edit the settings file!

### Change the Reminder Message

1. Open the file: `src/utils/constants.ts`
2. Find this line:
   ```typescript
   message: "It's lunch time, Go and take a rest! 😀",
   ```
3. Change the text inside the quotes to whatever you want
4. Save the file
5. The app will update automatically!

### Change Emoji Size

In the same file, find:
```typescript
emojiSize: 35,
```
Change `35` to any number (bigger = bigger emojis)

---

## 📝 Commands Reference

| Command | What It Does |
|---------|--------------|
| `npm install` | Install the app (do this once) |
| `npm run dev` | Start the app |
| `npm run build` | Create a production version |

---

## 📄 License

This project is created by **Timothy Chan & Jade Lam © 2026**

All Rights Reserved.

---

## 💬 Need Help?

If you have any questions or run into issues:
1. Check the **Troubleshooting** section above
2. Search for your error message online
3. Feel free to ask for help!

---

**Made with ❤️ by Timothy Chan & Jade Lam**
