import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

export const toast = {
  info(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: "top",
      position: "right",
      close: true,
      style: {
        background: "#0288d1",
      },
    }).showToast();
  },

  success(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: "top",
      position: "right",
      close: true,
      style: {
        background: "#388e3c",
      },
    }).showToast();
  },

  error(message) {
    Toastify({
      text: message,
      duration: 5000,
      gravity: "top",
      position: "right",
      close: true,
      style: {
        background: "#d32f2f",
      },
    }).showToast();
  }
}