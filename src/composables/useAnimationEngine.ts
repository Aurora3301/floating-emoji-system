/**
 * Animation Engine composable
 * Handles physics simulation with requestAnimationFrame
 * GPU-accelerated transforms, boundary collision, pause/resume
 */

import { ref, onUnmounted } from 'vue'
import { ANIMATION_CONFIG } from '../utils/constants'

// Physics state for a single emoji
interface EmojiPhysics {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  element: HTMLElement | null
}

export function useAnimationEngine() {
  const isRunning = ref(false)
  const rafId = ref<number | null>(null)
  const particles = ref<EmojiPhysics[]>([])
  const bounds = ref({
    minX: ANIMATION_CONFIG.edgeDistance,
    maxX: window.innerWidth - ANIMATION_CONFIG.edgeDistance,
    minY: ANIMATION_CONFIG.edgeDistance,
    maxY: window.innerHeight - ANIMATION_CONFIG.edgeDistance
  })

  // Update boundaries on resize
  const updateBounds = () => {
    bounds.value = {
      minX: ANIMATION_CONFIG.edgeDistance,
      maxX: window.innerWidth - ANIMATION_CONFIG.edgeDistance,
      minY: ANIMATION_CONFIG.edgeDistance,
      maxY: window.innerHeight - ANIMATION_CONFIG.edgeDistance
    }
  }

  // Initialize a particle with random position and velocity
  const createParticle = (id: string): EmojiPhysics => {
    const { minSpeed, maxSpeed } = ANIMATION_CONFIG.physics
    
    // Random position within bounds
    const x = bounds.value.minX + Math.random() * (bounds.value.maxX - bounds.value.minX)
    const y = bounds.value.minY + Math.random() * (bounds.value.maxY - bounds.value.minY)
    
    // Random velocity (medium bounce)
    const angle = Math.random() * Math.PI * 2
    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed)
    
    return {
      id,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      element: null
    }
  }

  // Register a particle's DOM element
  const registerParticle = (id: string, element: HTMLElement) => {
    const existing = particles.value.find(p => p.id === id)
    if (existing) {
      existing.element = element
    } else {
      particles.value.push({
        ...createParticle(id),
        id,
        element
      })
    }
  }

  // Physics update loop
  const updatePhysics = () => {
    particles.value.forEach(particle => {
      if (!particle.element) return

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary collision detection (bounce)
      if (particle.x <= bounds.value.minX) {
        particle.x = bounds.value.minX
        particle.vx = Math.abs(particle.vx)
      } else if (particle.x >= bounds.value.maxX) {
        particle.x = bounds.value.maxX
        particle.vx = -Math.abs(particle.vx)
      }

      if (particle.y <= bounds.value.minY) {
        particle.y = bounds.value.minY
        particle.vy = Math.abs(particle.vy)
      } else if (particle.y >= bounds.value.maxY) {
        particle.y = bounds.value.maxY
        particle.vy = -Math.abs(particle.vy)
      }

      // Apply transform using translate3d for GPU acceleration
      particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`
    })
  }

  // Animation loop
  const animate = () => {
    if (!isRunning.value) return
    
    updatePhysics()
    rafId.value = requestAnimationFrame(animate)
  }

  // Start animation
  const start = () => {
    if (isRunning.value) return
    
    isRunning.value = true
    updateBounds()
    animate()
    
    console.log('[AnimationEngine] Animation started')
  }

  // Stop animation
  const stop = () => {
    isRunning.value = false
    if (rafId.value) {
      cancelAnimationFrame(rafId.value)
      rafId.value = null
    }
    console.log('[AnimationEngine] Animation stopped')
  }

  // Pause when tab hidden
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      stop()
    } else if (isRunning.value) {
      // Resume if we were running
      animate()
    }
  }

  // Cleanup
  onUnmounted(() => {
    stop()
    particles.value = []
  })

  // Listen for visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // Listen for resize
  window.addEventListener('resize', updateBounds)

  return {
    isRunning,
    registerParticle,
    start,
    stop,
    updateBounds
  }
}
