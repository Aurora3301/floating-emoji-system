/**
 * Alert/Toast composable
 * Displays lunch reminder with 8-second auto-dismiss
 */

import { ref } from 'vue'
import { ALERT_CONFIG } from '../utils/constants'

export function useAlert() {
  const isVisible = ref(false)
  const message = ref(ALERT_CONFIG.message)
  let dismissTimeout: number | null = null

  // Show the alert
  const show = () => {
    // Clear any existing timeout
    if (dismissTimeout) {
      clearTimeout(dismissTimeout)
    }
    
    isVisible.value = true
    console.log('[Alert] Showing lunch reminder')
    
    // Auto-dismiss after 8 seconds
    dismissTimeout = window.setTimeout(() => {
      hide()
    }, ALERT_CONFIG.autoDismissDuration)
  }

  // Hide the alert
  const hide = () => {
    isVisible.value = false
    if (dismissTimeout) {
      clearTimeout(dismissTimeout)
      dismissTimeout = null
    }
    console.log('[Alert] Hiding lunch reminder')
  }

  return {
    isVisible,
    message,
    show,
    hide
  }
}
