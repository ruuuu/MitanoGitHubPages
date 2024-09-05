// прелоадер:
export const callbackWithPreload = async(elem, cb, ...params) => { // elem- элемент отнсительного котрого распололагаем прелоадер, cb - функция
  // console.log('...params: ', ...params) // {type: 'bouquets', minPrice: '2000'}

  const preload = document.createElement('div');
  preload.classList.add('preload');
  elem.append(preload);
  elem.style.position = 'relative';
  preload.style.display = 'flex';

  try{
    const result = await cb(...params);
    return result;
  }
  finally{
    preload.style.display = 'none';
    preload.remove(); // удаляет элемент
    elem.style.position = '';
  }

}