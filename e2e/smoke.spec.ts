import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('home route loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Huso')
  })

  test('home has main content', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.home')).toBeVisible()
  })

  test('language selector works', async ({ page }) => {
    await page.goto('/')
    const select = page.locator('select')
    await expect(select).toBeVisible()
    await select.selectOption('da')
    await expect(page.locator('h1')).toContainText('Huso')
  })
})
