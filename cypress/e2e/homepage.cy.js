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
    cy.intercept('GET', 'https://oauth.reddit.com/r/MadeMeSmile/comments/*', mockRedditComments)
    
  })

  it('renders posts', () => {
    cy.get('[data-test-id="post"]')
    .should('have.length', 4)    
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
      cy.get('[test-label-id="most-liked-filter"]').click()
      //cy.get('[aria-label="votes"]').should.h
      cy.get('[aria-label="votes"]').should(($els) => {
        // map jquery elements to array of their innerText
        const elsText = $els.toArray().map(el => el.innerText)
        expect(elsText).to.deep.eq(['4','3','2','1'])
      })

    })
    it('displays awarded posts', () => {
      cy.get('[test-label-id="awards-filter"]').click()
      cy.get('[data-test-id="post"]')
      .should('have.length', 1)    
  

    })
    it('displays flaired', () => {
      cy.get('[test-label-id="flaired-filter"]')

    })
    it('displays link posts', () => {
      cy.get('[test-label-id="links-filter"]').click()
      cy.get('[data-testid="OpenInNewIcon"]')
      cy.get('[data-test-id="post"]')
      .should('have.length', 1)    
  

    })
    it('displays video posts', () => {
      cy.get('[test-label-id="videos-filter"]').click()
      cy.get('video')
      cy.get('[data-test-id="post"]')
      .should('have.length', 1)    


    })
    it('displays image posts', () => {
      cy.get('[test-label-id="images-filter"]')
      cy.get('img')
    })
    it('displays text posts', () => {
      cy.get('[test-label-id="text-filter"]').click()
      cy.get('[aria-label="show more"]')
      .should('have.text', 'show more')    
    })
    it('displays sign-in alert', () => {
      cy.get('[aria-label="upvote"]').first().click()
      cy.get('[role="alert"]')
      .should('have.text', 'sign in to perform this action')    
    })
    it('signs in', () => {
      localStorage.setItem('randomString', "QbGAnEGNo8bIqhL9WyTGRJhaRobU15jE")
      cy.intercept(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_ID}&response_type=code&state=${localStorage.getItem('randomString')}&redirect_uri=${process.env.REACT_APP_URI}&duration=permanent&scope=${process.env.REACT_APP_SCOPE_STRING}`)
      cy.intercept('http://localhost:3000/?state=QbGAnEGNo8bIqhL9WyTGRJhaRobU15jE&code=Cv-Qu54mS2hspuKCgoEzp4PMZjNAPw#_')
      cy.find('Login').click()
      cy.get('[role="alert"]')
      .should('have.text', 'sign in to perform this action')    
    })
})