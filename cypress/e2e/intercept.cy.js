
  import CarrinhoPage from "../support/object-pages/fluxo-carrinho"; 
  import CheckoutPage from "../support/object-pages/fluxo-checkout";
  import "../support/commands";

  describe('Adicionar produto no carrinho e fazer checkout', () => {
    const carrinhoPage = new CarrinhoPage();
    const checkoutPage = new CheckoutPage();

    before(() => {
      cy.visit('produtos');
    });

    it('Fluxo de produto no carrinho', () => {
      // Interceptando a requisição de adicionar produto ao carrinho
      cy.intercept('POST', '/?wc-ajax=get_refreshed_fragments').as('addProductToCart');

      // Adicionando produto no carrinho
      carrinhoPage.adicionaProdutoNoCarrinho();
      
      // Espera pela requisição de adicionar o produto ao carrinho e valida a resposta
      cy.wait('@addProductToCart', { timeout: 15000 }).then((interception) => {
        // Verifica que o status code e o corpo da resposta
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('fragments'); 
      });

      // Valida se a mensagem de sucesso aparece no site
      cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.');

      // Vai para a página de checkout
      carrinhoPage.irParaCheckout();
      
      // Intercepta a requisição de atualização do pedido durante o checkout
      cy.intercept('POST', '/?wc-ajax=update_order_review').as('updateOrderReview');

      // Espera pela requisição de atualização do pedido e valida a resposta
      cy.wait('@updateOrderReview', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200); // Verifica que o status é 200 (sucesso)
      });
      // Verificar se há uma mensagem indicando que o pedido foi recebido
      cy.get('.page-title').should('contain', 'Checkout');
    });


    it('Deve remover produto do carrinho com sucesso', () => {
      // Interceptando a requisição de remoção do produto no carrinho
      cy.intercept('POST', '/?wc-ajax=remove_from_cart').as('removeFromCart');
  
      // Adicionando produto no carrinho antes de testar a remoção
      carrinhoPage.adicionaProdutoNoCarrinho();
  
      // Espera a requisição de adicionar produto ao carrinho
      cy.wait('@addProductToCart', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
  
      // Remover o produto do carrinho
      carrinhoPage.removeProdutoDoCarrinho();
  
      // Espera a requisição de remoção do produto
      cy.wait('@removeFromCart', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
  
      // Verificar se o carrinho está vazio ou se o item foi removido corretamente
      cy.get('.cart-empty').should('be.visible'); // Verifica se o carrinho está vazio
      cy.get('.cart-contents').should('not.contain', 'Abominable Hoodie'); // Verifica se o produto foi removido
    });

  });
 

