import { API_URL } from "./API.js";
import { cartStore } from "./store.js";
import { debounce } from "./debounce.js";



// товар Корзины: комопнент реакт, вернет верстку
export const CartElem = (cartProduct) => (  //  cartProduct = {id, image, title, quantity}

    <li class="cart__item">
      <img class="cart__image" src={`${API_URL}${cartProduct.photoUrl}`} alt={cartProduct.name} />
      <h4 class="cart__item-title"> {cartProduct.name} </h4>
      <div class="cart__counter">
        {/* повесили обработчик: */}
        <button onClick = {() => { 
          cartStore.postCart({id: cartProduct.id, quantity: cartProduct.quantity - 1}) }
          }> - </button>

        <input class="cart__counter-input" type="number" min="0" max="99" value={cartProduct.quantity}  
        onInput = {   
          debounce(({ target }) => { 
            cartStore.postCart({
              id: cartProduct.id, 
              quantity: !isNaN(parseInt(target.value)) ? parseInt(target.value) : cartProduct.quantity });  
            target.value = isNaN(parseInt(target.value)) ? parseInt(target.value) : cartProduct.quantity}, 500)
          }
         />        {/* onInput событие ввода в поле, { target } это <input>, дестуткририровали evt */}
         
        {/* повесили обработчик: */}
        <button onClick = {() => { 
          cartStore.postCart({id: cartProduct.id, quantity: cartProduct.quantity +1}) }
          }> + </button>
      </div>
      <p class="cart__price"> {cartProduct.price * cartProduct.quantity}&nbsp;₽ </p>
    </li>
);