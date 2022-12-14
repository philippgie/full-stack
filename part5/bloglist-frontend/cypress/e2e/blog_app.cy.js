
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

        it('A blog can be deleted', function() {
            cy.contains('add blog').click()
            cy.get('#title').type('mockTitle')
            cy.get('#url').type('mockURL')
            cy.get('#author').type('mockAuthor')
            cy.contains('save').click()


            cy.contains('view').click()
            cy.contains('delete').click()

            cy.contains('a blog was deleted')
        })

        it('Blogs are sorted by likes', function() {
            cy.contains('add blog').click()
            cy.get('#url').type('moreLikes')
            cy.get('#title').type('mockTitle')
            cy.get('#author').type('mockAuthor')
            cy.contains('save').click()

            cy.contains('view').click()
            cy.contains('upvote').click()
            cy.contains('upvote').click()

            cy.visit('http://localhost:3000')
            cy.contains('add blog').click()
            cy.get('#url').type('lessLikes')
            cy.get('#title').type('mockTitle')
            cy.get('#author').type('mockAuthor')
            cy.contains('save').click()

            
            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            cy.contains('view').click()
            cy.get('#blog').contains('lessLikes')
            cy.contains('hide').click()
            cy.get('#blog').contains('moreLikes')
        })
    })
})
