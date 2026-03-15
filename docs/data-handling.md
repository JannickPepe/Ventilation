# Data Handling & API Scenarios

Overview of utils and composables for API data handling, serialization, and conversion.

## Command: dev:full

```bash
npm run dev:full
```

Runs **before** starting the dev server:

1. Lint (ESLint)
2. TypeScript check (vue-tsc)
3. Tests (Vitest)
4. Dev server (Vite)

If any step fails, the dev server does not start.

---

## Utils for API & Data Handling

| Scenario | Util | Usage |
|----------|------|-------|
| **Request/response JSON** | `json.safeParse`, `json.safeStringify` | Parse API responses safely, stringify for requests |
| **Deep copy** | `json.deepClone` | Clone objects before mutating |
| **Serialize/deserialize** | `serializer.serialize`, `serializer.deserialize` | Store/retrieve objects (localStorage, query) |
| **String conversion** | `string.camelCase`, `string.snakeCase`, `string.kebabCase` | Map API snake_case ↔ app camelCase |
| **Array operations** | `array.unique`, `array.groupBy`, `array.sortBy`, `array.pickFrom` | Normalize list responses |
| **Object shape** | `object.pick`, `object.omit`, `object.deepMerge` | Pick fields for API, merge updates |
| **Dates** | `date.formatDate`, `date.parseDate`, `date.addDays` | Format for API/display |
| **Times** | `time.formatTime`, `time.toMilliseconds` | Duration and time handling |
| **URL params** | `urlTypes.getQueryParam`, `urlTypes.buildUrlFromParams` | Pagination, filters in URL |
| **Image paths** | `imagePath.resolveImageUrl`, `imagePath.thumbnail` | API image URLs |
| **Validation** | `validation.isEmail`, `validation.required`, etc. | Pre-submit checks |

---

## Composables for API Scenarios

| Scenario | Composable | Usage |
|----------|------------|-------|
| **Create** | `useCreate` | Add new resources |
| **Edit** | `useEdit` | Load and update by ID |
| **Delete** | `useDelete` | Remove resources |
| **Create or Edit** | `useSave` | Unified save flow |
| **Step wizard** | `useStepProgress` | Multi-step forms, wizards |
| **Form submit** | `useFormLoading` | Loading state during submit |
| **Form + schema** | `useFormHandler` | VeeValidate + Zod |
| **Image upload** | `useImageUpload` | File upload, preview, progress |
| **Validation** | `useValidation`, `useValidationField` | Standalone or with forms |
| **Animation** | `useAnimation` | Presets for enter/leave effects |

---

## Error Handling

**File:** `src/core/errorHandler.ts`

- `handleError(error)` – Normalize and pass to global handler
- `setErrorHandler(fn)` – Override default (e.g. show toast, report to service)
- Used by API interceptors; extend for custom error flows

---

## Suggested Flows

### List + filters (pagination)
- `urlTypes.buildUrlFromParams` for query
- `array.groupBy`, `array.sortBy` for client-side transform
- `createResourceStore` / `fetchAll` for data

### Create/update form
- `useFormHandler` + Zod for validation
- `useFormLoading` for submit state
- `useCreate` / `useEdit` or `useSave` for API
- `object.pick` / `object.omit` to shape payload
- `string.snakeCase` if API expects snake_case

### API response → UI
- `json.safeParse` for raw responses
- `object.deepMerge` for partial updates
- `date.formatDate`, `time.formatTime` for display
