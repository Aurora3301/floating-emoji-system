<template>
  <button 
    class="fab-button"
    @click="handleClick"
    :title="isActive ? 'Stop Animation' : BUTTON_CONFIG.label"
    :class="{ 'is-active': isActive }"
  >
    <span class="fab-icon">{{ isActive ? '⏹️' : '🎉' }}</span>
  </button>
</template>

<script setup lang="ts">
import { BUTTON_CONFIG } from '../utils/constants'

const props = defineProps<{
  isActive: boolean
  onToggle: () => void
}>()

const handleClick = () => {
  props.onToggle()
}
</script>

<style scoped>
.fab-button {
  position: fixed;
  bottom: v-bind('BUTTON_CONFIG.position.bottom');
  right: v-bind('BUTTON_CONFIG.position.right');
  width: v-bind('BUTTON_CONFIG.size');
  height: v-bind('BUTTON_CONFIG.size');
  border-radius: 50%;
  background-color: v-bind('BUTTON_CONFIG.backgroundColor');
  color: v-bind('BUTTON_CONFIG.textColor');
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
  z-index: 1001;
}

.fab-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.fab-button:active {
  transform: scale(0.95);
}

.fab-button.is-active {
  background-color: #333333;
}

.fab-icon {
  display: block;
  line-height: 1;
}
</style>
