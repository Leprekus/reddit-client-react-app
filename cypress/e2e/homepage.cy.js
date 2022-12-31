describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('renders posts', () => {
    cy.get('[data-test-id="post"]')
    .should('have.length', 25)    
  })

  it('loads comments', () => {
    cy.get('[aria-label="display-comments-button"]').first().click()
    cy.get('[aria-label="comment"]').should('have.length.greaterThan', 1)
  })
  
  it('displays awards', () => {
    cy.get('[aria-label="awards"]').first().click()

    cy.get('.award-container').first()
    .then(($el) => {
      return window.getComputedStyle($el[0])
    })
    .invoke('getPropertyValue', 'display')
    .should('equal', 'flex')
    })
})