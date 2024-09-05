export const debounce = (fn ,ms) => {  // вернет фунцию
  
  let idTimeout;

  return (...args) => { 
    clearTimeout(idTimeout);        //  сбрасывает timeout
    idTimeout = setTimeout(() => {  // setTimeout() функция поставится в очередь на выполнение через х ms
      fn(...args)
    }, ms)  // вызовется переданная функция  через каждые x ms
  }
};