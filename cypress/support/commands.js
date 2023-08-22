Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Murilo')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('murilo.souza@castrosouza.com.br')
    cy.get('#open-text-area').type('Realizado o teste do  campo obrigatório: como posso te ajudar. Agradeço a compreensão e até logo!', {delay:0})
    cy.get('.button[type="submit"]').click()
    
})

Cypress.Commands.add('sendingWithError', function(){
    cy.get('#firstName').type('Murilo')
      .should('have.value', 'Murilo')
    cy.get('#lastName').type('Souza')
      .should('have.value', 'Souza')
    cy.get('#email').type('murilo.souza@castrosouza,com')
    cy.get('#open-text-area').type('Realizado o teste do  campo obrigatório: como posso te ajudar. Agradeço a compreensão e até logo!', {delay:0})
    cy.get('.button[type="submit"]')
      .click()
})