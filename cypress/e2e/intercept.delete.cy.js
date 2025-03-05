
import CarrinhoPage from "../support/object-pages/fluxo-carrinho"; 
import CheckoutPage from "../support/object-pages/fluxo-checkout";
import "../support/commands";

describe('Adicionar e remover produto no carrinho', () => {
  const carrinhoPage = new CarrinhoPage();


  beforeEach(() => {
    // Visita a página de produtos e adiciona um produto ao carrinho antes de cada it
    cy.visit('produtos'); // Visita a página de produtos antes de adicionar o produto
    carrinhoPage.adicionaProdutoNoCarrinho(); // Adiciona o produto ao carrinho
    cy.visit("carrinho"); // Visita a página do carrinho
  });

  it('Deve remover o produto do carrinho', () => {
    // Intercepta a requisição de remoção do produto do carrinho
    cy.intercept('GET', '/carrinho/?removed_item=*').as('removeFromCart');

    // Log para depuração
    cy.log('Clicando no botão de remover produto');
    carrinhoPage.removerProdutoDoCarrinho();

    // Espera pela requisição de remoção do produto e valida a resposta
    cy.wait('@removeFromCart', { timeout: 15000 }).then((interception) => {
      console.log(interception); // Log para depuração
      expect(interception.response.statusCode).to.eq(200);
    });

    // Verificar se o carrinho está vazio ou o item foi removido
    cy.get('.cart-empty', { timeout: 10000 }).should('be.visible').should('contain', 'Seu carrinho está vazio.');
    cy.get('.product', { timeout: 10000 }).should('not.exist');  // Garantir que o produto foi removido
  });

  it('Deve falhar ao remover produto do carrinho', () => {
    // **Restaurar o produto** antes de simular o erro (assim o item estará presente)
    carrinhoPage.adicionaProdutoNoCarrinho();

    // Espera que o botão de remoção esteja visível
    cy.get("[title='Remove this item']", { timeout: 10000 }).should('be.visible').click();

    // Intercepta a requisição de remoção e simula um erro no servidor (status 500)
    cy.intercept('POST', '/?wc-ajax=get_refreshed_fragments', {
      statusCode: 500,
      body: { error: "Erro ao remover item" }, // Simula a falha
    }).as('removeFromCartFailure');

    // Espera pela requisição falha e verifica a resposta
    cy.wait('@removeFromCartFailure', { timeout: 15000 }).then((interception) => {
      console.log(interception); // Log para depuração
      expect(interception.response.statusCode).to.eq(500); // Verifica que a falha ocorreu
    });

    // Verifica se uma mensagem de erro foi exibida (depende do comportamento da aplicação)
    cy.get('.woocommerce-error').should('be.visible').and('contain', 'Erro ao remover item');
    
    // Verifique se o item ainda está no carrinho
    cy.get("[title='Remove this item']").should('be.visible'); // Produto não foi removido
  });
});

