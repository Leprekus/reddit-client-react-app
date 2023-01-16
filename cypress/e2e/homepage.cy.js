import { mockRedditComments, mockRedditCommets, mockRedditPosts } from "../../src/mocks/responseData"

describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', 'https://www.reddit.com/api/v1/access_token', {
      statusCode: 200,
      body: {
          "access_token": "-Y5VLpKRk1DKYxXauItBLAu9EzwwhWw",
          "token_type": "bearer",
          "expires_in": true,
          "scope": "*"
      },
    })

    // cy.intercept('GET', 'https://oauth.reddit.com/.json?sort=new', {
    //   statusCode: 200,
    //   body: {
    //     data: {
    //       children:  mockRedditPosts
    //     }
    //   }
    // })
    cy.intercept('https://oauth.reddit.com/.json?sort=new', mockRedditPosts)
    cy.intercept('GET', 'https://oauth.reddit.com/r/MadeMeSmile/comments/10csw70', mockRedditComments)
    
  })

  it('renders posts', () => {
    cy.get('[data-test-id="post"]')
    .should('have.length', 1)    
  })

  it('loads comments', () => {
    cy.get('[aria-label="display-comments-button"]').first().click()
    cy.get('[aria-label="comment"]').should('have.length.greaterThan', 0)
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

    it('displays most liked posts', () => {
      cy.get(['test-label-id="most-liked-filter"'])
    })
    it('displays awarded posts', () => {
      cy.get(['test-label-id="awards-filter"'])
    })
    it('displays flaired', () => {
      cy.get(['test-label-id="flaired-filter"'])

    })
    it('displays link posts', () => {
      cy.get(['test-label-id="links-filter"'])

    })
    it('displays video posts', () => {
      cy.get(['test-label-id="videos-filter"'])

    })
    it('displays image posts', () => {
      cy.get(['test-label-id="images-filter"'])

    })
    it('displays text posts', () => {
      cy.get(['test-label-id="text-filter"'])

    })
})