import { test, expect } from '@playwright/test'

test.describe('Smoke tests', () => {
  test('home route loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Expert|Ventilation|VentPro/i)
  })

  test('home has main content and footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.locator('footer[role="contentinfo"]')).toBeVisible()
  })

  test('login route loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Log in|Log ind/i)
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign in|Log ind/i })).toBeVisible()
  })

  test('register route loads', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('main#main-content')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Register|Opret/i)
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /Create account|Opret konto/i })).toBeVisible()
  })

  test('nav links to login and register from home', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /Log in|Log ind/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Register|Opret konto/i }).first()).toBeVisible()
    await page.getByRole('link', { name: /Log in|Log ind/i }).first().click()
    await expect(page).toHaveURL(/\/login/)
    await page.goto('/')
    await page.getByRole('link', { name: /Register|Opret konto/i }).first().click()
    await expect(page).toHaveURL(/\/register/)
  })

  test('language selector works', async ({ page }) => {
    await page.goto('/')
    const select = page.locator('select')
    await expect(select).toBeVisible()
    await select.selectOption('da')
    await expect(page.locator('main#main-content')).toBeVisible()
  })
})
