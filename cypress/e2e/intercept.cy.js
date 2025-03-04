
import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import  "../support/commands";
describe('Interceptar ações de adicionar, remover e atualiar produtos no carrinho', () => {
beforeEach(() => {
    cy.visit('produtos')
  });

  it('Adicionar produto no carrinho', () => {
 
  //  cy.intercept('GET', '**/produtos/', {fixture: 'produtos.json'})
    cy.Carrinho();
   // cy.get("[data-testid^='search-category-']").should("have.length.greaterThan", 1)
  });

})