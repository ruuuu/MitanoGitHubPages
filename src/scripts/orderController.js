import { cartStore } from './store.js';
import { Order } from './Order.jsx';
import { sendOrder } from './API.js';
import { OrderSuccess } from './OrderSuccess.jsx';



const cartOrderBtn = document.querySelector('.cart__order-btn');
const cartElem = document.querySelector('.cart');



const openOrder = () => {

  const cart = cartStore.getCart();     // [ { price, quntity }, {} ]
  console.log('cart in openOrder: ', cart)

  const totalPriceValue = cart.reduce((acc, productCart) => {
    return acc + productCart.price * productCart.quantity
  }, 0); // нач знач acc=0


  const order = Order(totalPriceValue);
  //console.log('order : ', order)

  
  document.body.append(order);
  document.querySelector('.order').style.display = 'flex';

  order.addEventListener('click', ({ target }) => { // закрытие формы заказа
    console.log('target:  ',  target);
    if(target === order || target.closest('.order__close')){  // target- элемент на котрый надали
      order.remove();  // удаляет элемент
    }
  });


  const form = document.querySelector('.order__form');

  form.addEventListener('submit', async(evt) => {  // отправка данных формы на сервер
    evt.preventDefault();

    const formData = new FormData(form); // встроенный объект
    // formData.get('') венет значение поля


    const dataOrder = {
      buyer: {
        name: formData.get('name-buyer'), // передаем значение атрибута name у поля
        phone: formData.get('phone-buyer')
      },
      recipient: {
        name: formData.get('name-recipient'),
        phone: formData.get('phone-recipient')
      },
      address: `ул. ${formData.get('street')}, дом ${formData.get('house')}, кв ${formData.get('apartment')}`,
      paymentOnline: `${formData.get('payment-online') === 'true'}`,
      deliveryDate: formData.get('delivery-date'),
      deliveryTime: formData.get('delivery-time')
    }

    console.log('cartStore до отправки формы : ', cartStore)

    const result = await sendOrder(dataOrder);
    // console.log('result ', result) // { message: 'Order received and saved successfully', orderId: 'ae750edf-8fe5-4653-8b9f-2c4923714997' } 

    const orderSuccess = OrderSuccess(result.orderId);
    //console.log('orderSuccess: ', orderSuccess)
    order.textContent = ''; // очищаем
    order.append(orderSuccess);
    cartStore.clearCart();
    //console.log('cartStore after clearing: ', cartStore)
    cartElem.classList.remove('cart__open');
  });
};



export const initOrder = () => {

  const checkCart = () => {
    const cart = cartStore.getCart(); // [{},{}]
    console.log('cart in initOrder: ', cart)

    // cartOrderBtn.disabled = !cart.length ;
    // либо так:
    if(cart.length === 0){
      cartOrderBtn.disabled = true;  // дизейблим
    }
    else{
      cartOrderBtn.disabled = false; 
    }
  };


  cartStore.subscribe(checkCart) // когда Корзина обновится, тогда вызовется checkCart() 

  cartOrderBtn.addEventListener('click', openOrder); // кнопка Офрмить в Корзине
}