import { test, expect } from '@playwright/test';
import * as path from 'path';

const IMAGE_PATH = path.join(__dirname, '..', 'media', 'capa.jpeg');
const FIXED_SUBDOMAIN = 'area-teste';

test('create member area', async ({ page }) => {
  await page.goto('https://app.clickmax.io');
  await page.locator("[name='email']").fill("jann.solano@gmail.com");
  await page.locator("[name='password']").fill("Minh@senha120x");
  await page.locator("[type='submit']").click();
  await page.locator("[href='/-/members/my-areas']").click();
  await page.locator("[data-sentry-element='Button']").nth(0).click();
  await page.locator("[name='name']").fill("areamembros");
  await page.locator("[name='description']").fill("este texto é temporario");
  await page.locator("[name='subdomain']").fill(FIXED_SUBDOMAIN);
  const verifyButton = page.getByRole('button', { name: 'Verificar' });
  await expect(verifyButton).toBeEnabled({ timeout: 10000 });
  await verifyButton.click();
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.getByRole('button', { name: 'Upload do arquivo' }).click()
  ]);
  await fileChooser.setFiles(IMAGE_PATH);
  const concludeButton = page.getByRole('button', { name: 'Concluir' });
  await expect(concludeButton).toBeEnabled({ timeout: 15000 });
  await concludeButton.click();
});

// test('Delete member area', async({ page }) =>{
// await page.goto('https://app.clickmax.io/-/members/my-areas');
// await page.locator("[data-sentry-component='Trash']").click({timeout: 2000})
// });