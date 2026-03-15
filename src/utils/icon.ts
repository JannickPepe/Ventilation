import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faXmark,
  faSearch,
  faChevronRight,
  faCheck,
  faGear,
  faGears,
  faShieldHalved,
  faClock,
  faWrench,
  faClipboardCheck,
  faInbox,
  faEnvelope,
  faLock,
  faUser,
  faCircleExclamation,
  faSpinner,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'

/**
 * Icon name keys for use with AtomIcon.
 * Use these consistently across the app for type safety.
 */
export type IconName =
  | 'close'
  | 'search'
  | 'chevron'
  | 'check'
  | 'gear'
  | 'gears'
  | 'shield'
  | 'clock'
  | 'wrench'
  | 'clipboard-check'
  | 'inbox'
  | 'envelope'
  | 'lock'
  | 'user'
  | 'circle-exclamation'
  | 'spinner'
  | 'triangle-exclamation'

const iconMap: Record<IconName, IconDefinition> = {
  close: faXmark,
  search: faSearch,
  chevron: faChevronRight,
  check: faCheck,
  gear: faGear,
  gears: faGears,
  shield: faShieldHalved,
  clock: faClock,
  wrench: faWrench,
  'clipboard-check': faClipboardCheck,
  inbox: faInbox,
  envelope: faEnvelope,
  lock: faLock,
  user: faUser,
  'circle-exclamation': faCircleExclamation,
  spinner: faSpinner,
  'triangle-exclamation': faTriangleExclamation
}

/** Get Font Awesome icon definition by name. Falls back to close if not found. */
export function getIcon(name: string): IconDefinition {
  return iconMap[name as IconName] ?? iconMap.close
}

/** All available icon names. Use for validation or dropdowns. */
export const ICON_NAMES = Object.keys(iconMap) as IconName[]
