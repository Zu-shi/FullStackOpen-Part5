/// <reference types="Cypress" />

describe('Note app', function () {

  beforeEach('Remove users', () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('blogs')
  })

  describe('login', function () {
    it('succeeds with the correct credientials', function () {
      //cy.ge
      cy.get('input').first().type('mluukkai')
      cy.get('input').eq(1).type('salainen')
      cy.get('button').click()
      cy.contains('is logged in')
      cy.get('button').eq(0).should('not.contain', 'login')
    })

    it('fails with the wrong credientials', function () {
      cy.get('input').first().type('wrong')
      cy.get('input').eq(1).type('wrong')
      cy.get('button').click()
      cy.get('button').eq(0).should('contain', 'login')
    })
  })
})