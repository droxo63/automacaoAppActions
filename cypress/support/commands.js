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

Cypress.Commands.add('adicionarNoCarrinho', () => {
    const carrinhoPage = new CarrinhoPage();
    cy.intercept('POST', '/?wc-ajax=get_refreshed_fragments').as('addProductToCart');
    carrinhoPage.adicionaProdutoNoCarrinho();
    // Espera pela requisição de adicionar o produto ao carrinho e valida status code e resposta
    cy.wait('@addProductToCart', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.property('fragments');
    });
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.');
    carrinhoPage.irParaCheckout();
    // Intercepta a requisição de atualização do pedido durante o checkout
    cy.intercept('POST', '/?wc-ajax=update_order_review').as('updateOrderReview');
    // Espera pela requisição de atualização do pedido e valida a resposta
    cy.wait('@updateOrderReview', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200); // Verifica que o status é 200 (sucesso)
    });
    cy.get('.page-title').should('contain', 'Checkout');
})

Cypress.Commands.add('removerProdutoNoCarrinho', () => {
    const carrinhoPage = new CarrinhoPage();
 // Intercepta a requisição de remoção do produto do carrinho
 cy.intercept('GET', '/carrinho/?removed_item=*').as('removeFromCart');
 cy.log('Clicando no botão de remover produto');
 carrinhoPage.removerProdutoDoCarrinho();
 // Espera pela requisição de remoção do produto e valida a resposta
 cy.wait('@removeFromCart', { timeout: 15000 }).then((interception) => {
   console.log(interception);
   expect(interception.response.statusCode).to.eq(200);
 });
 cy.get('.cart-empty', { timeout: 10000 }).should('be.visible').should('contain', 'Seu carrinho está vazio.');
 cy.get('.product', { timeout: 10000 }).should('not.exist');
})

Cypress.Commands.add('falhaAoRemoverProduto', () => {
    const carrinhoPage = new CarrinhoPage();
// Intercepta e simula erro na remoção do produto
cy.intercept('GET', '**/carrinho/?remove_item=*', {
    statusCode: 500,
    body: { error: "Erro ao remover item" },
  }).as('removeFromCartFailure');
  cy.get("[title='Remove this item']").click();
  // Espera pela requisição falha e verifica a resposta
  cy.wait('@removeFromCartFailure', { timeout: 15000 }).then((interception) => {
    console.log(interception); // Log para depuração
    expect(interception.response.statusCode).to.eq(500);
  });
  cy.get('.page-title').should('be.visible').and('contain', 'Carrinho');
  cy.get("[title='Remove this item']").should('be.visible');
})

Cypress.Commands.add('atualizarQuantidadeDoCarrinho', () =>{
    const carrinhoPage = new CarrinhoPage();
    cy.intercept('POST', '**/?wc-ajax=get_refreshed_fragments').as('refreshCart');
    // Verifica se o input de quantidade está visível e altera o valor
    cy.get('input.qty').should('be.visible').clear().type('2');
    cy.get('.pull-right > .btn').click();
    // Aguarda que a requisição de atualização seja executada e valida o status
    cy.wait('@refreshCart', { timeout: 15000 }).then((interception) => {
        console.log(interception);
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get('.woocommerce-message').should('contain', 'Carrinho atualizado')
    cy.get('.cart-subtotal .amount').should('be.visible').and('contain', 'R$');
    cy.get('input.qty').should('have.value', '2');
});


