// карточка товара 
// import jsx from "@/jsx.js"; // вместо этого  в vite.config.js прописали  jsxInject: "import jsx from '@/jsx.js'", так мы связали jsx.jsx с этим компонентом ProductCard 

import { API_URL } from "./API.js";
import { cartStore } from "./store.js";


 // как в реакт (компонент jsx)
export const ProductCard = (product) => {
  
  // для каждого элемента будет вызыватья функция jsx из jsx.js:
  return ( 
      <li class="goods__item"> 
        <article class="goods__card card">
          <img class="card__image" src={`${API_URL}${product.photoUrl}`} alt={product.name} />
          <div class="card__content">
            <h3 class="card__title"> {product.name} </h3>
            <div class="card__footer">
              <p class="card__date-delivery"> сегодня&nbsp;в&nbsp;14:00 </p>
              {/* onMouseEnter- событие наведения(нажатия) мышки: */}
              <button class="card__button"  onMouseEnter={(evt) => {evt.target.textContent = "В Корзину"}}  onMouseLeave={(evt) => {evt.target.innerHTML = `${product.price}&nbsp;P`}}  onClick={() => { cartStore.addProductCart(product.id) }}> {product.price}&nbsp;P </button>
            </div>
          </div>
        </article>
      </li>
    )

}
  
 
