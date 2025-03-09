import CarrinhoPage from "../support/object-pages/fluxo-carrinho";
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import "../support/commands";

describe('Interceptar atualização da quantidade de produtos no carrinho', () => {
    const carrinhoPage = new CarrinhoPage();
    beforeEach(() => {
        cy.visit('produtos');
        carrinhoPage.adicionaProdutoNoCarrinho();
        cy.visit("carrinho");
    });

    it('Deve atualizar a quantidade do produto no carrinho e validar a requisição', () => {
        cy.atualizarQuantidadeDoCarrinho();
    });

});

