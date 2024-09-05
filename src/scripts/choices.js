import { debounce } from "./debounce.js";
import { productStore } from "./store.js";

// перемещение при адаптиве выпадающих списков Цена и Тип товара(Категории):

const adjustElementPosition = (elem, count = 0) => {
  const rect = elem.getBoundingClientRect(); // { bottom: , left: , width: , height: , right: , x: , y: }
  
  const viewportWidth = window.innerWidth;  // ширина окна браузера

  if(rect.left < 0){
    elem.style.left = "0";
    elem.style.right = "auto";
    elem.style.transform = "translateX(0)";
  }
  else if(rect.right > viewportWidth){
    elem.style.left = "auto";
    elem.style.right = "0";
    elem.style.transform = "translateX(0)";
  }
  else{
    elem.style.left = "50%";
    elem.style.right = "auto";
    elem.style.transform = "translateX(-50%)";
  }

  const postRect = elem.getBoundingClientRect();    // вернет  { bottom: , left: , width: , height: , right: , x: , y: }
  if((postRect.left < 0 || postRect.right > viewportWidth) && count < 3 ){
    count++;
    adjustElementPosition(elem, count);
  }
};




export const initChoices = () => {

  const choices = document.querySelectorAll('.choices');

  choices.forEach((choice) => {
    const btn = choice.querySelector('.choices__btn');
    const box = choice.querySelector('.choices__box');

    btn.addEventListener('click', () => {

      box.classList.toggle('choices__box--open');

      choices.forEach((otherChoice) => {
        if (otherChoice !== choice){
          if(otherChoice.querySelector('.choices__box').classList.contains('choices__box--open')){
            otherChoice.querySelector('.choices__box').classList.remove('choices__box--open');
          }
        }
      });
      
      adjustElementPosition(box);
    });


    window.addEventListener('resize', debounce(() => { 
      adjustElementPosition(box);
      }),
    );

    
    productStore.subscribe(() => adjustElementPosition(box)); // когда productStore обновится тогда вызовется переданная функция 


    document.addEventListener('click', ({ target }) => {  // деструткрирвали объект события evt
      let clickInside = target.closest('.choices'); // сам элемент или его потомок
      // console.log('clickInside ', clickInside)
      
      if(!clickInside){  // если клилкнули мимо clickInside
        choices.forEach((choice) => {
          choice.querySelector('.choices__box').classList.remove('choices__box--open')
        })
      }
    });


  });

}
