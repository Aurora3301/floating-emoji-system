/**
 * Floating Emoji Animation System Configuration
 * 
 * Centralized configuration for all animation parameters.
 * Easy to customize without touching component code.
 */

// 25 Food emojis for lunch break celebration
export const FOOD_EMOJIS = [
  '🍔', '🍕', '🍜', '🍱', '🥗', 
  '🌮', '🌯', '🍝', '🍛', '🍣', 
  '🍤', '🍙', '🍚', '🍘', '🍥', 
  '🥠', '🥘', '🍲', '🥣', '🥪', 
  '🌭', '🥙', '🧆', '🥚', '🍳'
] as const

// Animation configuration constants
export const ANIMATION_CONFIG = {
  // Number of emojis to display
  emojiCount: 25,
  
  // Total animation duration: 10 minutes in milliseconds
  totalDuration: 10 * 60 * 1000, // 600,000ms
  
  // Fade-in duration: 5 seconds
  fadeInDuration: 5 * 1000, // 5,000ms
  
  // Fade-out duration: 5 seconds  
  fadeOutDuration: 5 * 1000, // 5,000ms
  
  // Distance from screen edges (pixels)
  // Emojis will stay completely within this margin
  edgeDistance: 30,
  
  // Emoji size configuration (pixels)
  // Set to 24px (50% smaller than original 48px)
  emojiSize: 35,
  
  // Physics configuration - Medium bounce
  physics: {
    // Velocity range (pixels per frame)
    minSpeed: 7,
    maxSpeed: 10,
    
    // Speed multiplier for variety
    speedVariation: 0.8
  },
  
  // Z-index for the global overlay
  // Must be higher than all other content
  zIndex: 9999
} as const

// Alert/Toast configuration
export const ALERT_CONFIG = {
  // Toast message text
  message: "It's lunch time, Go and take a rest! 😀",
  
  // Auto-dismiss duration: 8 seconds
  autoDismissDuration: 8 * 1000, // 8,000ms
  
  // Toast styling
  backgroundColor: 'rgba(255, 107, 107, 0.95)',
  textColor: '#ffffff'
} as const

// Time trigger configuration
export const TIME_TRIGGER_CONFIG = {
  // Trigger at :00 and :30 of every hour
  triggerMinutes: [0, 30],
  
  // Check interval when calculating next trigger (ms)
  // Only used during initial calculation, not for polling
  calculationBuffer: 100
} as const

// Button configuration
export const BUTTON_CONFIG = {
  // FAB (Floating Action Button) settings
  label: 'Activate Floating Emojis',
  
  // Position: bottom-right
  position: {
    bottom: '30px',
    right: '30px'
  },
  
  // Styling
  backgroundColor: '#ff6b6b',
  textColor: '#ffffff',
  size: '56px'
} as const

// Time display configuration
export const TIME_DISPLAY_CONFIG = {
  // 24-hour format
  use24HourFormat: true,
  
  // Position: bottom-left (moved up to avoid trademark footer)
  position: {
    bottom: '80px',
    left: '30px'
  },
  
  // Styling
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
} as const

// Type definitions for better IDE support
export type EmojiConfig = typeof ANIMATION_CONFIG
export type AlertConfig = typeof ALERT_CONFIG
export type TimeTriggerConfig = typeof TIME_TRIGGER_CONFIG
export type ButtonConfig = typeof BUTTON_CONFIG
export type TimeDisplayConfig = typeof TIME_DISPLAY_CONFIG
