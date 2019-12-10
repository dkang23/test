//adds product to cart
class Amzn {
  //go to cart page, return most recent added item
  goToCart() {
    if($('#attach-sidesheet-view-cart-button > span > input').isExisting()) {
      $('#attach-sidesheet-view-cart-button > span > input').click()
    }
    else {$('#nav-cart').click()
    }
    //let cartList = []
    //let numCartItems = this.countCartItems()
    return $('#activeCartViewForm > div.a-row.a-spacing-mini.sc-list-body.sc-java-remote-feature > div:nth-child(3) > div.sc-list-item-content > div > div.a-column.a-span10 > div > div > div.a-fixed-left-grid-col.a-col-right > ul > li:nth-child(1) > span > a').getAttribute('href').split('/')[5]
  }
  //helper function to count number of items in cart
  /*countCartItems(){
    let i = 1
    for(i; $('#activeCartViewForm > div.a-row.a-spacing-mini.sc-list-body.sc-java-remote-feature > div:nth-child('+i+2+') > div.sc-list-item-content > div > div.a-column.a-span10 > div > div > div.a-fixed-left-grid-col.a-col-right > ul > li:nth-child(1) > span > a').isExisting(); i++)
    {}
    return i
  }
  */
  //helper function to count number of products displayed on the page
  countProducts(){
    let i = 1
    for(i; $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+')').isExisting() ; i ++)
    {}
    return i
  }

  addToCart(productName, minPrice, maxPrice, prime = true, maxPages = 5){
    const searchBox = $('#twotabsearchtextbox');
    searchBox.setValue(productName)
    $('#nav-search > form > div.nav-right > div').click()
  //maybe add click prime button
    let price = 0
    let priceText = ''; //price identifier
    let primeText = ''; //prime identifier
    let isPrime = false;
    let currPage = 1;
    let addedToCart = false
    let numProds = this.countProducts() //count of products on page
    let asinID = 0 //unique Amazon product code
    while(currPage < maxPages){
      for (let i = 1; i< numProds; i++){
        //check sponsored products
        if($('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > span > div > div > div > div > div:nth-child(2) > div:nth-child(3) > div > div.a-section.a-spacing-none.a-spacing-top-small > div > span.a-size-base.a-color-secondary').isExisting()) {
          priceText = $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > span > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.a-section.a-spacing-none.a-spacing-top-small > div > div > a > span > span:nth-child(2) > span.a-price-whole')
          primeText = $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > span > div > div > div > div > div:nth-child(2) > div:nth-child(4) > div > div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-base.a-color-secondary.s-align-children-center > div.a-row.s-align-children-center > span > span.aok-relative.s-icon-text-medium.s-prime > i')
        }
        //check normal products
        else{
          priceText = $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > span > div > div > div:nth-child(2) > div:nth-child(4) > div > div.a-section.a-spacing-none.a-spacing-top-small > div > div > a > span > span:nth-child(2) > span.a-price-whole')
          primeText = $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(5) > div.s-result-list.s-search-results.sg-row > div:nth-child('+i+') > div > span > div > div > div:nth-child(2) > div:nth-child(4) > div > div.a-section.a-spacing-none.a-spacing-top-micro > div.a-row.a-size-base.a-color-secondary.s-align-children-center > div.a-row.s-align-children-center > span > span.aok-relative.s-icon-text-medium.s-prime > i')
        }
        //check amazon prime
        try{isPrime = primeText.getAttribute('aria-label') === 'Amazon Prime' }
          catch(error){}
        try {price = parseInt(priceText.getText(),10)}
          catch(error){}

      //going to product and adding to cart
        if (price >= minPrice && price <= maxPrice && isPrime == prime){
          priceText.click()
          asinID = browser.getUrl().split('/')[5]
          $('#add-to-cart-button').click()
          addedToCart = true;
          currPage = maxPages;//getting out of the while loop since we found our product
          break;
        }

      }
      //go to the next page if we haven't found anything on this one
      if (!addedToCart){
        $('#search > div.sg-row > div:nth-child(2) > div > span:nth-child(10) > div > span > div > div > ul > li.a-last > a').click()}
        currPage++;
  }//while loop -- page flipper
    return asinID;
  }//addToCart
}//class Amzn


module.exports = new Amzn();
