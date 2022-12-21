
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', {username:'pipo', password:'pass'})
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('pipo')
            cy.get('#password').type('pass')
            cy.contains('login').click()
            cy.contains('successful authentication')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('pass')
            cy.get('#password').type('pipo')
            cy.contains('login').click()
            cy.contains('wrong credentials')
        })
  })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('pipo')
            cy.get('#password').type('pass')
            cy.contains('login').click()
        })

        it('A blog can be created', function() {
            cy.contains('add blog').click()
            cy.get('#title').type('mockTitle')
            cy.get('#url').type('mockURL')
            cy.get('#author').type('mockAuthor')
            cy.contains('save').click()

            cy.contains('mockTitle')
            cy.contains('mockAuthor')
        })
    })
})
