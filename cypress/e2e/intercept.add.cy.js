
import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import "../support/commands";

describe('Interceptar adição de produto ao carrinho', () => {
  const carrinhoPage = new CarrinhoPage();

  before(() => {
    cy.visit('produtos');
  });

  it('Deve adicionar um produto ao carrinho e validar a requisição', () => {
    cy.adicionarNoCarrinho();
  });
});