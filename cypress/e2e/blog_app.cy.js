/// <reference types="Cypress" />


describe('Note app', function () {
  beforeEach('Reset users', () => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'zushi',
      username: 'zms',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input').first().type('mluukkai')
      cy.get('input').eq(1).type('salainen')
      cy.get('button').click()
      cy.contains('is logged in')
    })

    it.only('can log out', function () {
      cy.get('body').should('contain', 'is logged in')
      cy.contains('button', 'Logout').click()
      cy.get('body').should('not.contain', 'is logged in')
    })

    it('can submit new blog entires', function () {
      cy.get('#blogSubmitFormButton').click()
      cy.get('input').eq(0).type('title text')
      cy.get('input').eq(1).type('author text')
      cy.get('input').eq(2).type('url text')
      cy.contains('button', 'save').click()
      cy.contains('title text')
    })

    describe('When a new blog exists', function () {
      beforeEach(function () {
        cy.intercept({
          method: 'POST',
          url: '*'
        }).as('posts')

        cy.get('#blogSubmitFormButton').click()
        cy.get('input').eq(0).type('title text')
        cy.get('input').eq(1).type('author text')
        cy.get('input').eq(2).type('url text')
        cy.contains('button', 'save').click()

        cy.wait('@posts').then(xhr => {
          cy.log(xhr.responseBody)
          cy.log(xhr.requestBody)
          //expect(xhr.method).to.eq('POST')
        })

        cy.contains('title text')
      })

      it('can submit new likes', function () {
        cy.contains('button', 'Like').click()
        cy.contains('likes: 1')
      })

      it('can delete the blog', function () {
        cy.contains('title text')
        cy.contains('button', 'Delete').click()
        cy.get('body').should('not.contain', 'title text')
      })
    })
  })
})