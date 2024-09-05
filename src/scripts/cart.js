import { cartStore } from "./store.js";
import { renderCart } from "./renderCart.js";



const headerCartBtn = document.querySelector('.header__cart-btn'); // цифра на иконке корзины
const cartClose = document.querySelector('.cart__close');
const cart = document.querySelector('.cart');


const toggleCart = () => {
  cart.classList.toggle('cart--open');

  if(cart.classList.contains('cart--open') && window.innerWidth > 1360){
    cart.scrollIntoView({   // скроллим плавно к корзине
      behavior: 'smooth'
    })
  }
};



export const initCart = async() => {

  await cartStore.init(); // асинхронная
  headerCartBtn.textContent = cartStore.getCart().length;
  headerCartBtn.addEventListener('click', toggleCart);
  renderCart();
  
  
  cartStore.subscribe(() => { // когда Корзина обновится, тогда вызовется переданная фнция
    headerCartBtn.textContent = cartStore.getCart().length;
  });

  
  cartClose.addEventListener('click', () => {
    cart.classList.remove('cart--open')
  });

}