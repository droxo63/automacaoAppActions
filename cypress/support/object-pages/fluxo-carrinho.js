class CarrinhoPage{
// Definindo os seletores

productChoiceButton = '.product-block';
sizeButton = '.button-variable-item-S';
colorButton = '.button-variable-item-Blue';
addCartButton = '.single_add_to_cart_button';
messageButton = '.woocommerce-message > .button';
checkoutButton = '.checkout-button';


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
          // Supondo que o seletor do botão de remoção seja `.product-remove`
         cy.visit("http://lojaebac.ebaconline.art.br/carrinho/")
          cy.get("[title='Remove this item']").click();
        }
    }

    


export default CarrinhoPage;