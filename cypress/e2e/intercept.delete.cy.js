
import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import "../support/commands";

describe('Interceptar remoção de produto do carrinho', () => {
  const carrinhoPage = new CarrinhoPage();

  beforeEach(() => {

    cy.visit('produtos');
    carrinhoPage.adicionaProdutoNoCarrinho();
    cy.visit("carrinho");
  });

  it('Deve remover um produto do carrinho e validar a requisição', () => {
   cy.removerProdutoNoCarrinho();
  });

  it('Deve falhar ao tentar remover um produto do carrinho', () => {
    cy.falhaAoRemoverProduto();
  });
});

