import Notiflix from 'notiflix';

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const callbackParams = {
      position,
      delay
    }

    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(callbackParams)
      } else {
        reject(callbackParams)
      }
    }, delay)
  })  
}


document.querySelector('[type=submit]').addEventListener('click', event => {

  event.preventDefault()
  
  let firstDelay = parseInt(document.querySelector('[name=delay]').value);
  const delay = parseInt(document.querySelector('[name=step]').value);
  const amount = document.querySelector('[name=amount]').value;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    
    firstDelay += delay;
  }

  document.querySelector('.form').reset()
  })
  
