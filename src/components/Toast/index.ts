import './styles.css';

import { ObjectId } from './../../utils/miscellaneous_utils';
import $ from './../../utils/$';

const showToast = (toast: HTMLDivElement) =>
  toast.style.right = '0';

const hideToast = (toast: HTMLDivElement) =>
  toast.style.right = `-${toast.offsetWidth + 24}px`;

const removeToast = (toast: HTMLDivElement) => {
  hideToast(toast);

  setTimeout(() => toast.parentNode?.removeChild(toast), 1000);
}

const initiateToast = (toast: HTMLDivElement) => {
  hideToast(toast);

  setTimeout(() => {
    showToast(toast);

    selfDestructToast(toast, 3);
  }, 500);
}

const selfDestructToast = (toast: HTMLDivElement, selfDestructTime: number) => {
  toast.onclick = () => removeToast(toast);

  setTimeout(() => removeToast(toast), selfDestructTime * 1000);
}

const toast = {
  error: (message: string) => {
    const toastArea = <HTMLDivElement>$('#toast-area');

    const id = ObjectId();

    const htmlContent = `
      <div class="toast error" id="toast-${id}">
        <img src="/assets/icons/triangle-exclamation-solid.svg" alt="Erro" />
        <span>${message}</span>
      </div>
    `;

    toastArea.insertAdjacentHTML('beforeend', htmlContent);
  
    const toast = <HTMLDivElement>$(`#toast-${id}`);
    
    initiateToast(toast);
  }
};

export default toast;