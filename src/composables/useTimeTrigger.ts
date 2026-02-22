/**
 * Time-based trigger composable
 * Triggers at HH:00:00 and HH:30:00 using precise setTimeout (no polling)
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { TIME_TRIGGER_CONFIG } from '../utils/constants'

export function useTimeTrigger(callback: () => void) {
  const nextTriggerTime = ref<Date | null>(null)
  const timeoutId = ref<number | null>(null)
  const isTriggering = ref(false)

  // Calculate milliseconds until next trigger (:00 or :30)
  const calculateNextTrigger = (): number => {
    const now = new Date()
    const currentMinutes = now.getMinutes()
    
    // Find next trigger minute (0 or 30)
    let nextTriggerMinute: number
    if (currentMinutes < 30) {
      nextTriggerMinute = 30
    } else {
      nextTriggerMinute = 0 // Next hour
    }
    
    // Calculate next trigger time
    const nextTrigger = new Date(now)
    if (nextTriggerMinute === 0) {
      nextTrigger.setHours(now.getHours() + 1, 0, 0, 0)
    } else {
      nextTrigger.setMinutes(30, 0, 0)
    }
    
    nextTriggerTime.value = nextTrigger
    
    // Return milliseconds until trigger
    return nextTrigger.getTime() - now.getTime()
  }

  // Schedule the next trigger
  const scheduleNextTrigger = () => {
    // Clear existing timeout
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    
    const delay = calculateNextTrigger()
    
    console.log(`[TimeTrigger] Next trigger scheduled in ${Math.round(delay / 1000)}s at ${nextTriggerTime.value?.toLocaleTimeString()}`)
    
    timeoutId.value = window.setTimeout(() => {
      if (!isTriggering.value && document.visibilityState === 'visible') {
        isTriggering.value = true
        callback()
        
        // Reset after trigger and schedule next
        setTimeout(() => {
          isTriggering.value = false
          scheduleNextTrigger()
        }, 1000)
      } else {
        // If conditions not met, reschedule
        scheduleNextTrigger()
      }
    }, delay)
  }

  // Handle visibility change
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // Tab became visible - check if we missed a trigger
      const now = new Date()
      if (nextTriggerTime.value && now > nextTriggerTime.value) {
        console.log('[TimeTrigger] Tab became active, missed trigger detected')
        scheduleNextTrigger()
      }
    }
  }

  onMounted(() => {
    // Initial schedule
    scheduleNextTrigger()
    
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    // Cleanup
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return {
    nextTriggerTime,
    isTriggering
  }
}
