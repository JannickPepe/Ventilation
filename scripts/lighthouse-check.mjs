import { spawnSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

const THRESHOLD = 0.7 // Minimum score 0-1 per category
const REPORT_PATH = './lighthouse-report.report.json'

const result = spawnSync(
  'npx',
  [
    'lighthouse',
    'http://localhost:4173',
    '--output=json',
    `--output-path=${REPORT_PATH}`,
    '--chrome-flags=--headless --no-sandbox',
    '--quiet'
  ],
  { stdio: 'inherit', shell: true }
)

if (result.status !== 0) {
  process.exit(1)
}

let report
try {
  report = JSON.parse(readFileSync(REPORT_PATH, 'utf-8'))
} catch (e) {
  console.error('Failed to read Lighthouse report')
  process.exit(1)
}

const categories = report.categories || {}
const results = []

for (const [key, cat] of Object.entries(categories)) {
  const score = cat.score ?? 0
  const passed = score >= THRESHOLD
  results.push({ name: cat.title || key, score: Math.round(score * 100), passed })
}

console.log('\n--- Lighthouse scores ---')
results.forEach((r) => {
  const status = r.passed ? 'PASS' : 'FAIL'
  console.log(`${r.name}: ${r.score} (${status})`)
})

const allPassed = results.every((r) => r.passed)
if (!allPassed) {
  console.error(`\nSome scores below threshold (${THRESHOLD * 100})`)
  process.exit(1)
}
console.log('\nAll Lighthouse checks passed.')
