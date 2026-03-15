import { ref, computed } from 'vue'

export function useStepProgress(steps: string[]) {
  const currentStepIndex = ref(0)

  const currentStep = computed(() => steps[currentStepIndex.value] ?? null)
  const isFirst = computed(() => currentStepIndex.value === 0)
  const isLast = computed(() => currentStepIndex.value >= steps.length - 1)
  const progress = computed(() =>
    steps.length ? Math.round(((currentStepIndex.value + 1) / steps.length) * 100) : 0
  )

  function next() {
    if (currentStepIndex.value < steps.length - 1) {
      currentStepIndex.value++
      return true
    }
    return false
  }

  function prev() {
    if (currentStepIndex.value > 0) {
      currentStepIndex.value--
      return true
    }
    return false
  }

  function goTo(index: number) {
    if (index >= 0 && index < steps.length) {
      currentStepIndex.value = index
      return true
    }
    return false
  }

  function reset() {
    currentStepIndex.value = 0
  }

  return {
    steps,
    currentStep,
    currentStepIndex,
    isFirst,
    isLast,
    progress,
    next,
    prev,
    goTo,
    reset
  }
}
