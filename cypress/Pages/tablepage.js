// cypress/pages/loginPage.js

class tablepage{
    // Elements
    get TableDataMarker() {
      return cy.get('summary');
    }
  
    get TextareaInput() {
      return cy.get('#jsondata');
    }
  
    get clickRefreshTableButton() {
      return cy.get('#refreshtable');
    }

    get tableRows() {
        return cy.get('#dynamictable tr');
      }
  
    // Actions
    login(username, password) {
      this.usernameInput.type(username);
      this.passwordInput.type(password);
      this.loginButton.click();
    }
  }
  
  export default new tablepage();
  