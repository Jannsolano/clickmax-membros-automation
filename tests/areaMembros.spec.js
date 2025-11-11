import { test, expect } from '@playwright/test';
import * as path from 'path';
import { areaMembrosSelectors } from '../pages/selectors';
import { sensitiveData } from '../fixtures/dados';

const IMAGE_PATH = path.join(__dirname, '..', 'media', 'capa.jpeg');
const FIXED_SUBDOMAIN = 'area-teste';

 async function Login(page){
  await page.locator(areaMembrosSelectors.emailField).fill(sensitiveData.validEmail);
  await page.locator(areaMembrosSelectors.passwordField).fill(sensitiveData.validPassword);
  await page.locator(areaMembrosSelectors.loginButton).click();
 }

test('create member area', async ({ page }) => {
  await page.goto('https://app.clickmax.io');
  await Login(page);
  await page.locator(areaMembrosSelectors.membersDashboard).click();
  await page.locator(areaMembrosSelectors.newMembersButton).nth(0).click();
  await page.locator(areaMembrosSelectors.membersNameField).fill(areaMembrosSelectors.membersNameTitle);
  await page.locator(areaMembrosSelectors.descriptionField).fill(areaMembrosSelectors.membersDescription);
  await page.locator(areaMembrosSelectors.membersSubdomain).fill(FIXED_SUBDOMAIN);
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