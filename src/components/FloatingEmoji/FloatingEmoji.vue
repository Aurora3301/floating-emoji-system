<template>
  <!-- Main overlay container -->
  <div 
    v-if="isAnimating"
    class="floating-emoji-overlay"
    :style="overlayStyle"
  >
    <!-- Emoji particles -->
    <EmojiParticle
      v-for="(emoji, index) in selectedEmojis"
      :key="`emoji-${index}`"
      :emoji="emoji"
      :particle-id="`particle-${index}`"
      :register-particle="registerParticle"
    />
  </div>
  
  <!-- Toast notification -->
  <Transition name="toast">
    <div 
      v-if="isAlertVisible"
      class="toast-notification"
      :style="toastStyle"
    >
      {{ alertMessage }}
    </div>
  </Transition>
  
  <!-- Floating action button (toggle) -->
  <FloatingActionButton 
    :is-active="isAnimating"
    :on-toggle="toggleAnimation"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FOOD_EMOJIS, ANIMATION_CONFIG, ALERT_CONFIG } from '../../utils/constants'
import { useTimeTrigger } from '../../composables/useTimeTrigger'
import { useAnimationEngine } from '../../composables/useAnimationEngine'
import { useEmojiManager } from '../../composables/useEmojiManager'
import { useAlert } from '../../composables/useAlert'
import EmojiParticle from './EmojiParticle.vue'
import FloatingActionButton from '../FloatingActionButton.vue'

// Animation engine
const { registerParticle, start: startAnimation, stop: stopAnimation } = useAnimationEngine()

// Emoji lifecycle manager
const { isAnimating, opacity, startAnimation: startEmojiLifecycle, forceStop } = useEmojiManager(
  startAnimation,
  stopAnimation
)

// Alert/Toast
const { isVisible: isAlertVisible, message: alertMessage, show: showAlert, hide: hideAlert } = useAlert()

// Time-based trigger - only trigger if not already animating
useTimeTrigger(() => {
  if (isAnimating.value) {
    console.log('[FloatingEmoji] Animation already running, skipping time trigger')
    return
  }
  activate()
})

// Overlay styles with dynamic opacity
const overlayStyle = computed(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: ANIMATION_CONFIG.zIndex,
  opacity: opacity.value,
  overflow: 'hidden'
}))

// Toast notification styles
const toastStyle = {
  position: 'fixed',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: ALERT_CONFIG.backgroundColor,
  color: ALERT_CONFIG.textColor,
  padding: '16px 32px',
  borderRadius: '8px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  zIndex: ANIMATION_CONFIG.zIndex + 1,
  textAlign: 'center',
  maxWidth: '90%',
  wordWrap: 'break-word',
  fontFamily: 'system-ui, -apple-system, sans-serif'
}

// Select random emojis for this animation
const selectedEmojis = computed(() => {
  const shuffled = [...FOOD_EMOJIS].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, ANIMATION_CONFIG.emojiCount)
})

// Main activation function
const activate = () => {
  startEmojiLifecycle()
  showAlert()
}

// Toggle animation on/off
const toggleAnimation = () => {
  if (isAnimating.value) {
    // Stop animation
    forceStop()
    hideAlert()
    console.log('[FloatingEmoji] Animation stopped by user')
  } else {
    // Start animation
    activate()
  }
}
</script>

<style scoped>
.floating-emoji-overlay {
  transition: opacity 0.1s linear;
}

/* Toast transition animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}
</style>
