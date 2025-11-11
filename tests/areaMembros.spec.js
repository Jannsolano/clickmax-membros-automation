import { test, expect } from '@playwright/test';
import * as path from 'path';

const IMAGE_PATH = path.join(__dirname, '..', 'media', 'capa.jpeg');
const FIXED_SUBDOMAIN = 'area-teste';

const selectorsList = {
  emailField : "[name='email']",
  correctEmail: "jann.solano@gmail.com",
  passwordField: "[name='password']",
  correctpassword: "Minh@senha120x",
  loginButton: "[type='submit']",
  MembersDashboard: "[href='/-/members/my-areas']",
  newMembersButton: "[data-sentry-element='Button']",
  membersNameField: "[name='name']",
  membersNameTitle: "areamembros",
  descriptionField: "[name='description']",
  membersDescription: "este texto é temporario",
  membersSubdomain: "[name='subdomain']"
}

 async function Login(page){
  await page.locator(selectorsList.emailField).fill(selectorsList.correctEmail);
  await page.locator(selectorsList.passwordField).fill(selectorsList.correctpassword);
  await page.locator(selectorsList.loginButton).click();
 }

test('create member area', async ({ page }) => {
  await page.goto('https://app.clickmax.io');
  await Login(page)
  await page.locator(selectorsList.MembersDashboard).click();
  await page.locator(selectorsList.newMembersButton).nth(0).click();
  await page.locator(selectorsList.membersNameField).fill(selectorsList.membersNameTitle);
  await page.locator(selectorsList.descriptionField).fill(selectorsList.membersDescription);
  await page.locator(selectorsList.membersSubdomain).fill(FIXED_SUBDOMAIN);
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