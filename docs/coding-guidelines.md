# Coding Guidelines

Conventions and best practices for the Huso codebase. See [ARCHITECTURE.md](./ARCHITECTURE.md) for high-level structure and patterns.

## Naming

### Files and folders
- **Components:** PascalCase (`Button.vue`, `UserCard.vue`)
- **Utils/composables:** camelCase (`useFormLoading.ts`, `formatDate.ts`)
- **Folders:** lowercase, kebab-case for multi-word (`api`, `image-upload`)

### Code
- **Variables/functions:** camelCase
- **Types/interfaces:** PascalCase
- **Constants:** UPPER_SNAKE or PascalCase for exported config objects
- **Composables:** prefix with `use` (`useLocaleStore`, `useFormHandler`)

## TypeScript

- Use explicit types for function parameters and return values where it improves clarity
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, mapped types, and aliases
- Avoid `any`; use `unknown` and narrow with type guards
- Export types from `@/types` when shared across features

## Vue

### Components
- Prefer `<script setup lang="ts">` for new components
- Use `defineProps` with TypeScript for props
- Use `defineEmits` with typed signatures
- Keep templates simple; move logic to composables or utils

### Composables
- Return a single object with all reactive state and methods
- Use `ref()` for primitives and simple objects
- Use `reactive()` only for flat objects that don’t need destructuring
- Avoid deeply nested reactive objects

### State
- Keep Pinia stores focused and small
- Put API calls in services/composables, not stores
- Use `createResourceStore` for CRUD resources

## Imports

- Prefer `@/` alias for app imports
- Order: external → internal → types
```ts
import { ref } from 'vue'
import { apiClient } from '@/api/client'
import type { User } from '@/types'
```

## Testing

- Place tests next to source: `foo.ts` → `foo.spec.ts` or `foo.test.ts`
- Use `describe` for grouping, `it` for cases
- Test behavior, not implementation
- Keep tests focused and readable

## Git

- Commits: concise, imperative messages
- Pre-commit: lint, format, TypeScript check, tests
- Push only after local checks pass
