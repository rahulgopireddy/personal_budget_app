describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
  it('passes', () => {
    cy.visit('http://localhost:4200/login');
  });
  describe('Login Functionality', () => {
    it('should log in successfully', () => {
      // Visit the login page
      cy.visit('http://localhost:4200/login'); // Update with your actual login page route

      // Fill in the email and password fields
      cy.get('#username').type('r@gmail.com');
      cy.get('#password').type('1Ssecretpassword');

      // Submit the login form
      cy.get('.log').click();

      // Assertions for successful login
      cy.url().should('include', 'http://localhost:4200/dashboard'); // Update with your expected dashboard route
      cy.contains('Add Expense').should('exist'); // Assuming the application displays the header on successful login
    });

    // it('should show error messages for invalid login', () => {
    //   // Visit the login page
    //   cy.visit('http://localhost:4200/login'); // Update with your actual login page route

    //   // Submit the login form without filling in credentials
    //   cy.get('form').submit();

    //   // Assertions for error messages
    //   cy.contains('div', 'Email is required.');
    //   cy.contains('div', 'Password is required.');
    // });
  });
});
