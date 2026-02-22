<template>
  <div 
    ref="particleRef"
    class="emoji-particle"
    :style="particleStyle"
  >
    {{ emoji }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ANIMATION_CONFIG } from '../../utils/constants'

const props = defineProps<{
  emoji: string
  particleId: string
  registerParticle: (id: string, element: HTMLElement) => void
}>()

const particleRef = ref<HTMLElement>()

const particleStyle = computed(() => ({
  fontSize: `${ANIMATION_CONFIG.emojiSize}px`,
  position: 'absolute',
  willChange: 'transform',
  userSelect: 'none',
  pointerEvents: 'none'
}))

onMounted(() => {
  if (particleRef.value) {
    props.registerParticle(props.particleId, particleRef.value)
  }
})
</script>

<style scoped>
.emoji-particle {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
