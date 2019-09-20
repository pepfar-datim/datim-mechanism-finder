describe('Test Search Bar', () => {
  
	it('Opens app', () => {
		cy.visit('http://localhost:3000/')
	})

	it('Types into search bar', () => {
		cy.get('#searchTextInput').type('aids')
	})

	it('Results in returned data', () => {
		cy.get('#returnedData')
	})
})