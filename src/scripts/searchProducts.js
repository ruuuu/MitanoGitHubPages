import { callbackWithPreload } from "./preload.js";
import { productStore } from "./store.js";

// Поиск:
export const initSearchProducts = () => {

  const headerForm =  document.querySelector('.header__form');
  const goodsTitle = document.querySelector('.goods__title');
  const goodSection = document.querySelector('.goods');

  headerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(headerForm); // встроенный 

    const searchQuery = formData.get('search').trim();  // получаем значнеие поля у котрого name="search", trim()-убирает пробелы

    if(searchQuery){
      goodsTitle.textContent = 'Результаты поиска';
      callbackWithPreload(goodSection, productStore.fetchProducts(), { search: searchQuery }); // отбражение и скрытие прелоадера
      // productStore.fetchProducts({ search: searchQuery }); 
    }
    // else{
    //   goodsTitle.textContent = '';
    //   productStore.fetchProducts;
    // }
  });

}