const amazon = require('./cart.page.js')

describe('Add To Cart', function () {
  it('should add a product to cart', function () {
    browser.url('http://www.amazon.com');
    let asin = amazon.addToCart('Christmas Tree',100,150,true,10);
    cartAsin = amazon.goToCart();
    expect(parseInt($('.a-dropdown-prompt').getText())).to.equal(1)
    expect(cartAsin).to.equal(asin)
  })
})
