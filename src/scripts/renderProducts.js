import { ProductCard } from "./ProductCard.jsx";
import {productStore } from "./store.js";


export const renderProducts =  () => {

  const goodsList = document.querySelector('.goods__list');

  const updateList = () => {
    const products = productStore.getProducts(); // вместо await fetchProducts(), товары получаем уже не  с сервера,  а с хранилища
    goodsList.innerHTML = '';

    if(products.length === 0 && !productStore.loading){
        const messgeItem = document.createElement('li');
        messgeItem.classList.add('goods__no-product');
        messgeItem.textContent = 'Товары не найдены'; 
        goodsList.append(messgeItem);
    }
    else{
      products.forEach((product) => {
        const productCard = ProductCard(product); // комопнент 
        goodsList.append(productCard);
      });
    }
  };


  productStore.subscribe(updateList);
  updateList(); // вызов в первый раз
}