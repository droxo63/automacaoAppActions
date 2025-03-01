

// checkoutPage.js
class CheckoutPage {

  // Definindo os seletores
  firstName = '#billing_first_name';
  lastname = '#billing_last_name';
  company = '#billing_company';
  country = "[role='combobox']";
  adress1 = '#billing_address_1';
  adress2 = '#billing_address_2';
  city = '#billing_city';
  state = "[role='combobox']";
  postCode = '#billing_postcode'
  phone = '#billing_phone';
  email = '#billing_email'

    preencherDados(nome, sobrenome, empresa, pais, endereco1, endereco2, cidade, estado, cep, telefone, email) {
      cy.get(this.firstName).type(nome);
      cy.get(this.lastname).type(sobrenome);
      cy.get(this.company).type(empresa);
      cy.get(this.country).eq(0).type(pais).click();
      cy.get(this.adress1).type(endereco1);
      cy.get(this.adress2).type(endereco2);
      cy.get(this.city).type(cidade);
      cy.get(this.state).eq(1).type(estado).click();
      cy.get(this.postCode).type(cep);
      cy.get(this.phone).type(telefone);
      cy.get(this.email).type(email);
      
    }
  
    concluirCompra() {
      cy.get(".input-checkbox").eq(1).click();
      cy.get('#place_order').click();
    }
  }
  
  export default CheckoutPage;
  