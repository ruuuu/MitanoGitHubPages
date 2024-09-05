
const jsx = (tag, attributes = {}, ...children) => { // ...children - дочерние элементы, attributes = { class: '', src: '', alt: '', for: '',  }

  attributes = attributes || {};
  //console.log('tag: ', tag, ', attributes: ', attributes, ', children: ', children );

  if(typeof tag === 'function'){  // если тэг это фукнция
    return tag(attributes, ...children);
  }

  const element = document.createElement(tag);

  // attributes = { class: 'card__image',  src: '/img/flower1.jpg',  alt: 'Наименование' }
  //console.log(Object.entries(attributes))   // [ ['class' 'card__image',]  ['src', '/img/flower1.jpg'],  ['alt', 'Наименование'] ]
  
  // перебираем объект:
  Object.entries(attributes).forEach(([ key, value ]) => {
    if(key === 'class'){
      // value='goods__card card'
      // сперва выполнится value.trim().split(' '), полуим массив ['goods__card', 'card'] 
      // потом ..., полуим goods__card', 'card':
      element.classList.add(...value.trim().split(' '));
    }
    else if(key.startsWith('on') && key.toLowerCase() in window){  // если key это обработчик события, ex: onSubmit, onClick и если событие есть в объекте window
      element.addEventListener(key.toLowerCase().substring(2), value);        // value это  функция - обработчки
    }
    else if(key === 'style' && typeof value === 'object'){
      Object.assign(element.style, value);
    }
    else{
      element.setAttribute(key, value); // <element key='value'>
    }
  });


  children.forEach((child) => { 
    if(typeof child === 'string' || typeof child === 'number'){
      element.append(document.createTextNode(child.toString()))
    } 
    else if(Array.isArray(child)){  // если child это массив
      child.forEach((innerChild) => element.append(innerChild));
    }
    else{
      element.append(child);
    }
  });


  return element;
}



export default jsx;