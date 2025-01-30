
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function myPromise(delay, radioState) {
  const formData = {
    delay, 
    radioState
  };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioState === 'fulfilled' ) {
        resolve(formData);
      } else {
        reject(formData);
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  const form = event.target;
  const delay = Number(form.elements.delay.value);
  const radioState = form.elements.state.value;

  myPromise(delay, radioState)
  .then(({ delay }) => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay} ms`,
      });
  })
  .catch(({ delay }) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay} ms`,
      });
  });

  form.reset();

}