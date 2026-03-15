export type Variant = Record<string, unknown>

export type AnimationPreset =
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'scaleIn'
  | 'staggerChildren'
  | 'sectionReveal'
  | 'cardReveal'
  | 'heroReveal'

export type AnimationOptions = {
  initial?: Variant
  enter?: Variant
  leave?: Variant
  visible?: Variant
  visibleOnce?: Variant
}

const presets: Record<AnimationPreset, AnimationOptions> = {
  fadeIn: {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 }
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 20 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.95 }
  },
  staggerChildren: {
    initial: { opacity: 0, y: 10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0 }
  },
  sectionReveal: {
    initial: { opacity: 0, y: 40 },
    visibleOnce: { opacity: 1, y: 0 }
  },
  cardReveal: {
    initial: { opacity: 0, y: 24 },
    visibleOnce: { opacity: 1, y: 0 }
  },
  heroReveal: {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0 }
  }
}

export function useAnimation() {
  function getPreset(name: AnimationPreset): AnimationOptions {
    return presets[name]
  }

  function createAnimation(
    options: AnimationOptions | AnimationPreset
  ): AnimationOptions {
    if (typeof options === 'string') return presets[options]
    return options
  }

  return {
    presets,
    getPreset,
    createAnimation
  }
}
