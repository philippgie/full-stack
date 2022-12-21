describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
      cy.request('POST', 'http://localhost:3003/api/users', {username:'pipo', password:'pass'})
      cy.get('#username').type('pipo')
      cy.get('#password').type('pass')
      cy.contains('login').click()
  })
})
