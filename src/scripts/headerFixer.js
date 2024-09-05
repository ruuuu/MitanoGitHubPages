import { debounce } from "./debounce.js";



export const initHeaderFixer = () => {

  const header = document.querySelector('.header');
  const body = document.body;
  let headerHeight = header.offsetHeight;


  const updateHeaderHeight = () => {
    headerHeight = header.offsetHeight;
  }


  const handleScroll = () => {
    
    const scrollDistance = window.scrollY; // какое расстояние проскролили
    //console.log('scrollDistance ', scrollDistance)
  
    if(scrollDistance > 200){
      header.classList.add('header--fixed');
      body.style.paddingTop = `${headerHeight}px`; 
    }else{
      header.classList.remove('header--fixed');
      body.style.paddingTop = '0';
    }
  }

  

  // событие скролла:
  window.addEventListener('scroll', debounce(handleScroll, 250));  // window- это браузер, debounce(handleScroll) вернет фукнцию котая вызвется пр скролле.

  // событие  наступит когда меняется размер окна:
  window.addEventListener('resize', debounce(updateHeaderHeight, 100));  // updateHeaderHeight вызоветс через каждые 100 ms. 

};