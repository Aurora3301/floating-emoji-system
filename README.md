# 🍔 Lunch Break Reminder System

A Vue 3 + Vite web application featuring a global floating emoji animation system that triggers at specific times to remind you to take lunch breaks.

---

## ✨ Features

- **Time-Based Trigger**: Automatically triggers at :00 and :30 of every hour
- **25 Food Emojis**: Floating food emojis bounce around the screen (24px size)
- **Toggle Control**: FAB button toggles animation on/off (🎉 to start, ⏹️ to stop)
- **Toast Notification**: "It's lunch time, Go and take a rest! 😀" with 8-second auto-dismiss
- **Real-time Clock**: 24-hour format display at bottom-left
- **Full Screen Layout**: Responsive content overlay with gradient background
- **10-Minute Animation**: 5s fade-in → 9m50s floating → 5s fade-out
- **Performance Optimized**: requestAnimationFrame with GPU acceleration
- **Smart Tab Handling**: Pauses when tab is hidden, resumes when active
- **No Memory Leaks**: Proper cleanup of all timers and animations
- **Trademark Footer**: "© 2026 Timothy Chan & Jade Lam All Rights Reserved"

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project folder
cd floating-emoji-system

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📁 Project Structure

```
floating-emoji-system/
├── src/
│   ├── components/
│   │   ├── FloatingEmoji/
│   │   │   ├── FloatingEmoji.vue      # Main overlay component
│   │   │   └── EmojiParticle.vue      # Individual emoji component
│   │   ├── FloatingActionButton.vue   # FAB for manual trigger
│   │   └── TimeDisplay.vue            # 24h clock display
│   ├── composables/
│   │   ├── useTimeTrigger.ts          # HH:00/HH:30 trigger logic
│   │   ├── useAnimationEngine.ts      # Physics engine (RAF)
│   │   ├── useEmojiManager.ts         # 10-min lifecycle manager
│   │   └── useAlert.ts                # Toast notification
│   ├── utils/
│   │   └── constants.ts               # All configuration constants
│   ├── App.vue                        # Root app component
│   └── main.ts                        # App entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎮 How It Works

### Time Trigger System

The system calculates the precise time until the next :00 or :30 mark:

```
If current time is 14:15 → Next trigger is 14:30 (15 minutes)
If current time is 14:45 → Next trigger is 15:00 (15 minutes)
```

Uses a single `setTimeout` (no polling) and recalculates when the tab becomes visible if a trigger was missed.

### Animation Lifecycle

```
Start
  │
  ├─► Fade In (5 seconds) ──► opacity: 0 → 1
  │
  ├─► Floating (9 minutes 50 seconds) ──► Physics animation
  │                                    Emojis bounce within
  │                                    150px of screen edges
  │
  ├─► Fade Out (5 seconds) ──► opacity: 1 → 0
  │
  └─► Stop ──► Cleanup all resources
```

### Physics Engine

- **Medium Bounce**: Velocity 1.5-3.5 pixels per frame
- **Boundary Collision**: Emojis bounce off 150px margins
- **GPU Accelerated**: Uses `transform: translate3d()` for smooth 60fps
- **Dynamic Bounds**: Updates on window resize

---

## ⚙️ Customization

### Change Emojis

Edit `src/utils/constants.ts`:

```typescript
export const FOOD_EMOJIS = [
  '🎉', '🎊', '✨', '🌟', '💫',
  '🎈', '🎁', '🎀', '🎵', '🎶',
  // ... add your custom emojis
]
```

### Change Trigger Times

Edit `TIME_TRIGGER_CONFIG`:

```typescript
export const TIME_TRIGGER_CONFIG = {
  triggerMinutes: [0, 15, 30, 45],  // Every 15 minutes
  // ...
}
```

### Change Emoji Size

Edit `ANIMATION_CONFIG`:

```typescript
export const ANIMATION_CONFIG = {
  emojiSize: 24,      // Emoji size in pixels (default: 24px, original: 48px)
  // ...
}
```

### Change Animation Duration

Edit `ANIMATION_CONFIG`:

```typescript
export const ANIMATION_CONFIG = {
  totalDuration: 5 * 60 * 1000,     // 5 minutes instead of 10
  fadeInDuration: 3 * 1000,          // 3 seconds fade-in
  fadeOutDuration: 3 * 1000,         // 3 seconds fade-out
  // ...
}
```

### Change Toast Message

Edit `ALERT_CONFIG`:

```typescript
export const ALERT_CONFIG = {
  message: "Your custom message here! 🎉",
  autoDismissDuration: 10 * 1000,    // 10 seconds
  // ...
}
```

---

## 🏗️ Architecture

| Composable | Responsibility |
|------------|----------------|
| `useTimeTrigger` | Precise :00/:30 scheduling without polling |
| `useAnimationEngine` | Physics loop with RAF, boundary collision |
| `useEmojiManager` | 10-min lifecycle, fade in/out management |
| `useAlert` | Toast notification with auto-dismiss |

### Performance Features

- ✅ Single RAF loop for all 25 emojis
- ✅ Direct DOM updates (no Vue reactivity overhead)
- ✅ Pauses when tab hidden
- ✅ Cleans up all timeouts and RAF on unmount
- ✅ GPU-accelerated transforms
- ✅ No excessive watchers

---

## 📝 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🛠️ Technologies

- **Vue 3** - Composition API
- **Vite** - Build tool
- **TypeScript** - Type safety
- **No External Animation Libraries** - Pure JavaScript + requestAnimationFrame

---

## 📄 License

This project is created by **Timothy Chan & Jade Lam © 2026**

All Rights Reserved.

---

## 🎨 UI Elements

- **Time Display**: Bottom-left corner, 24-hour format, dark semi-transparent background
- **FAB Button**: Bottom-right corner, toggle button (🎉 to start, ⏹️ to stop)
- **Toast Notification**: Top-center, coral background, auto-dismisses in 8 seconds
- **Floating Emojis**: Full-screen overlay, 25 emojis (24px) bouncing within 150px margins
- **Trademark Footer**: Bottom-center, "© 2026 Timothy Chan & Jade Lam All Rights Reserved"
- **Full Screen Layout**: Gradient background with centered content card

---

## 🔧 Troubleshooting

### Animation not triggering?
- Check browser console for trigger schedule logs
- Ensure tab is active (visible)
- Check system time is correct

### Performance issues?
- Reduce `emojiCount` in constants
- Close other browser tabs
- Check for browser extensions interfering

### Emojis not visible?
- Check z-index (should be 9999)
- Verify `pointer-events: none` is set
- Check opacity is not stuck at 0

---

## 💡 Tips

1. The animation is designed for **desktop only**
2. Keep the tab **active** for triggers to work
3. Use the **FAB button** to toggle animation on/off anytime
   - 🎉 Click to **start** the animation
   - ⏹️ Click to **stop** the animation
4. All settings are in `src/utils/constants.ts`
5. Check browser console for debug logs
6. The **trademark footer** is displayed at the bottom center
7. **Emoji size** is set to 24px (50% smaller than original)

---

**Built with ❤️ by Timothy Chan & Jade Lam**
# Floating Emoji System
