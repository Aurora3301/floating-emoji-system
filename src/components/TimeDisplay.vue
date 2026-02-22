<template>
  <div class="time-display">
    {{ formattedTime }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TIME_DISPLAY_CONFIG } from '../utils/constants'

const formattedTime = ref('')
let intervalId: number | null = null

const updateTime = () => {
  const now = new Date()
  
  if (TIME_DISPLAY_CONFIG.use24HourFormat) {
    // 24-hour format: HH:MM
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    formattedTime.value = `${hours}:${minutes}`
  } else {
    // 12-hour format
    formattedTime.value = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }
}

onMounted(() => {
  updateTime()
  // Update every second
  intervalId = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.time-display {
  position: fixed;
  bottom: v-bind('TIME_DISPLAY_CONFIG.position.bottom');
  left: v-bind('TIME_DISPLAY_CONFIG.position.left');
  font-size: v-bind('TIME_DISPLAY_CONFIG.fontSize');
  font-weight: v-bind('TIME_DISPLAY_CONFIG.fontWeight');
  color: v-bind('TIME_DISPLAY_CONFIG.color');
  background-color: v-bind('TIME_DISPLAY_CONFIG.backgroundColor');
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  font-family: 'Segoe UI', system-ui, sans-serif;
  letter-spacing: 1px;
}
</style>
