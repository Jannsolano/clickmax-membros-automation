async function Login(page){
    await page.locator(selectorsList.emailField).fill(selectorsList.correctEmail);
    await page.locator(selectorsList.passwordField).fill(selectorsList.correctpassword);
    await page.locator(selectorsList.loginButton).click();
   }