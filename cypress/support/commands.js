// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import { nome, sobrenome, empresa, pais, endereco1, endereco2, cidade, estado, cep, telefone, email } from "../fixtures/data.json";
Cypress.Commands.add("Carrinho", () => {
    const carrinhoPage = new CarrinhoPage();

    cy.visit('produtos')
    carrinhoPage.adicionaProdutoNoCarrinho();
    cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
    carrinhoPage.irParaCheckout()
    cy.get('.page-title').should('be.visible').should('contain', "Checkout")
})

Cypress.Commands.add("Checkout", ()=> {
    const checkoutPage = new CheckoutPage();
    checkoutPage.preencherDados(nome,sobrenome, empresa, pais, endereco1, endereco2, cidade, estado, cep, telefone, email)
    checkoutPage.concluirCompra()
    cy.get('.page-title').should('contain', 'Pedido recebido')
})