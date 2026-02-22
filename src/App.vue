<template>
  <!-- Main app container - full screen -->
  <div class="app-container">
    <!-- Content overlay -->
    <div class="app-content">
      <h1>Lunch Break Reminder System</h1>
      <p>Current time is displayed at the bottom left.</p>
      <p>Click the floating button or wait for :00 or :30 to see the animation!</p>
    </div>
    
    <!-- Trademark footer -->
    <div class="trademark-footer">
      © 2026 Timothy Chan & Jade Lam All Rights Reserved
    </div>
  </div>
  
  <!-- Global floating emoji system -->
  <FloatingEmoji />
  
  <!-- Time display (bottom-left) -->
  <TimeDisplay />
</template>

<script setup lang="ts">
import FloatingEmoji from './components/FloatingEmoji/FloatingEmoji.vue'
import TimeDisplay from './components/TimeDisplay.vue'
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  overflow: hidden;
}

.app-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-content {
  text-align: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  width: auto;
  backdrop-filter: blur(10px);
}

.app-content h1 {
  color: #333;
  margin-bottom: 24px;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

.app-content p {
  color: #666;
  margin-bottom: 12px;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
}

.trademark-footer {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  text-align: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(5px);
  white-space: nowrap;
  z-index: 1000;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-content {
    padding: 30px 20px;
    max-width: 90%;
  }
  
  .trademark-footer {
    font-size: 12px;
    padding: 8px 16px;
    bottom: 80px;
  }
}
</style>
