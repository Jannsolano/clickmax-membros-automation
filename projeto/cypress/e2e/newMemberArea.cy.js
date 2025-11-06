describe('spec new members area', () => {
  it('should login', () => {
    cy.visit('https://app.clickmax.io')
    // parte destinada a logar e ir até a área de membros
    cy.get("[name='email']").type("jann.solano@gmail.com")
    cy.get("[name='password']").type("Minh@senha120x")
    cy.get("[type='submit']").click()
    // condição para aceitar cookies
    cy.get('body').then($body => {
      if ($body.find("[data-cky-tag='accept-button']").length > 0) {
        cy.get("[data-cky-tag='accept-button']").click();
      }
    })
    cy.get("[data-sentry-element='IconPhosphor.List']").click()
    cy.contains(".border-b", "Área de Membros").click()
  })
})