
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const submitBtn = document.querySelector('button');
const delayRef = document.querySelector('[name="delay"]');
const stepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

submitBtn.addEventListener('click', onSubmitBtnClick);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitBtnClick(evt) {
  evt.preventDefault();
  // let delay = +delayRef.value
  // let step = +stepRef.value
  // let amount = +amountRef.value
    for (let position = 0; position < +amountRef.value; position += 1) {
      createPromise(position, (+delayRef.value + position * +stepRef.value))
        .then(({ position, delay }) => {
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
        Notify.failure(` Rejected promise ${position} in ${delay}ms`);
        })
    }
  } 


