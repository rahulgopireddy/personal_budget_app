describe('Visuals', () => {
  it('should compare screenshot of the entire page', () => {
    cy.visit('http://localhost:4200/login');
    cy.compareSnapshot('home-page');
  });
});
