// реакт компонент
export const OrderSuccess = (orderId) => (

  <div class="order__wrapper">
    <h2 class="order__title"> Заказ оформлен </h2>
    <p> Ваш номер заказа {orderId} </p>
  </div>
);