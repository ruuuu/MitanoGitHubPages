import { cartStore } from "./store.js";
import { CartElem } from "./CartElem.jsx";


// отрисовка Корзины:
export const renderCart = () => {

  const cartList = document.querySelector('.cart__list');
  const cartPriceTotal = document.querySelector('.cart__price--total');

  const updateList = () => {
    const cart = cartStore.getCart();  // [{},{},{}]
    cartList.textContent = '';

    if(cart.length === 0){
      const messageItem = document.createElement('li');
      messageItem.textContent = 'Корзина пуста';
      messageItem.classList.add('cart__no-product');
      cartList.append(messageItem);
      cartPriceTotal.textContent = '0';
      return; // выход из метода
    }

    const productCards = cart.map((item) => CartElem(item)); // либо так cart.map(CartElem);
    cartList.append(...productCards);
    console.log('productCards ', productCards); // [li.cart__item, li.cart__item, li.cart__item]
    console.log('...productCards ', ...productCards);

    const totalPriceValue = cart.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0); // нач знач acc=0

    cartPriceTotal.innerHTML = `${totalPriceValue}&nbsp;₽`;
  };


  cartStore.subscribe(updateList);

  updateList();
};