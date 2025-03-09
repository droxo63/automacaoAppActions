class CarrinhoPage{
// Definindo os seletores

productChoiceButton = '.product-block';
sizeButton = '.button-variable-item-S';
colorButton = '.button-variable-item-Blue';
addCartButton = '.single_add_to_cart_button';
messageButton = '.woocommerce-message > .button';
checkoutButton = '.checkout-button';
quantityInput =  'input.qty';
updateCartButton = '.pull-right > .btn';
addProductButton = '.product .add-to-cart-button';
updateCartMessage = '.woocommerce-message';
subtotalCart = '.cart-subtotal .amount';
removeProductButton = '.cart-remove-button';

    adicionaProdutoNoCarrinho(){
            cy.get(this.productChoiceButton, {timeout: 4000}).eq(0).click()
            cy.get('.button-variable-item-Green').click()
            cy.get(this.sizeButton).click()
            cy.get(this.colorButton).click()
            cy.get('.input-text').clear().type("3")
            cy.get(this.addCartButton).click()
          }

          irParaCheckout(){
            cy.get(this.messageButton).click()
            cy.get(this.checkoutButton).click()
        }

        removerProdutoDoCarrinho() {

         
          cy.get("[title='Remove this item']").click();
        }

        adicionarNoCarrinho() {
          cy.get(this.addProductButton).click();
        }
      
        alterarQuantidadeCarrinho(quantidade) {
          cy.get(this.quantityInput).clear().type(quantidade);
        }
      
        atualizarCarrinho() {
          cy.get(this.updateCartButton).click();
        }
        removerDoCarrinho() {
          cy.get(this.removeProductButton).click();
        }
        
      }




    


export default CarrinhoPage;