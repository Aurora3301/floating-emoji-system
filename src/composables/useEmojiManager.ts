/**
 * Emoji Manager composable
 * Controls the 10-minute lifecycle: fade-in -> floating -> fade-out
 * Manages cleanup and memory management
 */

import { ref, onUnmounted } from 'vue'
import { ANIMATION_CONFIG } from '../utils/constants'

export function useEmojiManager(
  onStart: () => void,
  onStop: () => void
) {
  const isAnimating = ref(false)
  const isFadingIn = ref(false)
  const isFadingOut = ref(false)
  const opacity = ref(0)
  
  // Timeout IDs for cleanup
  const timeouts = ref<number[]>([])
  const startTime = ref<number>(0)

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeouts.value.forEach(id => clearTimeout(id))
    timeouts.value = []
  }

  // Start the animation lifecycle
  const startAnimation = () => {
    if (isAnimating.value) {
      console.log('[EmojiManager] Animation already running, ignoring')
      return
    }

    console.log('[EmojiManager] Starting animation lifecycle')
    
    isAnimating.value = true
    isFadingIn.value = true
    isFadingOut.value = false
    opacity.value = 0
    startTime.value = Date.now()

    // Notify animation engine to start
    onStart()

    // Phase 1: Fade in (5 seconds)
    const fadeInStart = performance.now()
    const fadeInStep = () => {
      if (!isFadingIn.value) return
      
      const elapsed = performance.now() - fadeInStart
      const progress = Math.min(elapsed / ANIMATION_CONFIG.fadeInDuration, 1)
      opacity.value = progress
      
      if (progress < 1) {
        requestAnimationFrame(fadeInStep)
      } else {
        isFadingIn.value = false
        opacity.value = 1
      }
    }
    requestAnimationFrame(fadeInStep)

    // Phase 2: Schedule fade out
    // Total duration - fade in duration - fade out duration = floating time
    const floatingDuration = ANIMATION_CONFIG.totalDuration - ANIMATION_CONFIG.fadeInDuration - ANIMATION_CONFIG.fadeOutDuration
    
    const fadeOutTimeout = window.setTimeout(() => {
      startFadeOut()
    }, ANIMATION_CONFIG.fadeInDuration + floatingDuration)
    
    timeouts.value.push(fadeOutTimeout)
  }

  // Start fade out phase
  const startFadeOut = () => {
    if (!isAnimating.value) return
    
    console.log('[EmojiManager] Starting fade out')
    isFadingOut.value = true
    
    const fadeOutStart = performance.now()
    const fadeOutStep = () => {
      if (!isFadingOut.value) return
      
      const elapsed = performance.now() - fadeOutStart
      const progress = Math.min(elapsed / ANIMATION_CONFIG.fadeOutDuration, 1)
      opacity.value = 1 - progress
      
      if (progress < 1) {
        requestAnimationFrame(fadeOutStep)
      } else {
        // Animation complete
        stopAnimation()
      }
    }
    requestAnimationFrame(fadeOutStep)
  }

  // Stop and cleanup animation
  const stopAnimation = () => {
    console.log('[EmojiManager] Stopping animation')
    
    isAnimating.value = false
    isFadingIn.value = false
    isFadingOut.value = false
    opacity.value = 0
    
    clearAllTimeouts()
    onStop()
  }

  // Force stop (for manual override)
  const forceStop = () => {
    stopAnimation()
  }

  // Cleanup on unmount
  onUnmounted(() => {
    stopAnimation()
  })

  return {
    isAnimating,
    isFadingIn,
    isFadingOut,
    opacity,
    startAnimation,
    forceStop
  }
}
