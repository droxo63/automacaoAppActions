
import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import  "../support/commands";
describe('Adicionar produto no carrinho e fazer checkout', () => {
  const carrinhoPage = new CarrinhoPage();
  const checkoutPage = new CheckoutPage();
  before(() => {
    cy.visit('produtos')
  });
  it('Fluxo de produto no carrinho', () => {
    
    cy.Carrinho();
    cy.Checkout();
    
  })
})