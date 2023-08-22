// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){

    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong').should('be.visible')
   })
    
    it('Erro de envio de formulario - email inváriodo', function(){
        cy.sendingWithError()
        cy.get('.error').should('be.visible')
    })

    it('Erro de preenchimento - campo telefone preenchido com valor não-númerico', function(){
        cy.get('#phone')
        .type('tele 93 tele')
        .should('have.value','')
    })

    it('Validar campo obrigatório - campo telefone', function(){
        cy.get('#firstName').type('Murilo')
        .should('have.value', 'Murilo')
        cy.get('#lastName').type('Souza')
        .should('have.value', 'Souza')
        cy.get('#email').type('murilo.souza@castrosouza,com')
        cy.get('#phone-checkbox').check()    
        cy.get('#open-text-area').type('Realizado o teste do  campo obrigatório: como posso te ajudar. Agradeço a compreensão e até logo!', {delay:0})
        cy.get('.button[type="submit"]')
        .click()
        cy.get('.error').should('be.visible')
    })
    
    it('Validação campo select - validação por texto do elemento', function(){
        cy.get('select').select('youtube')
        .should('have.value','youtube')
    })
    
    it('Validação campo select - validação por texto do elemento', function(){
        cy.get('select').select('mentoria')
        .should('have.value','mentoria')
    })

    it('Validação campo select - validação por texto do elemento', function(){
        cy.get('select')
        .select('cursos')
        .should('have.value','cursos')
    })

    it('Validação campo select - validação por texto do elemento', function(){
        cy.get('select')
        .select('blog')
        .should('have.value', 'blog')
    })

    it('Validar campo tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marca ambos checkboxes, depois depois desmarcar o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    })
    
    it('selecionar um arquivo da pasta fixtures',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input){ 
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('selecionar um arquivo da pasta fixtures simulando drag-and-drop',function(){
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input){ 
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('selecionar um arquivo da pasta fixtures que foi dado um alias',function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
    })

    it.only('abrindo outra aba', function(){
        cy.get('#privacy a')
        .should('have.attr','target','_blank')
        //.invoke('removeAttr','target')
        //.click()
    })


})
