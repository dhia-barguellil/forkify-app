import View from './View.js';
import icons from 'url:../../img/icons.svg'; //Parcel2 : for any static assests , non programming file

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';
  _modal = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal();
  }

  toggleModal() {
    this._overlay.classList.toggle('hidden');
    this._modal.classList.toggle('hidden');
  }

  _addHandlerShowModal() {
    this._openBtn.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerHideModal() {
    this._closeBtn.addEventListener('click', this.toggleModal.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //FormData : is a modern browser API, we need to pass into it a form
      const dataArray = [...new FormData(this)];
      //.fromEntries() : transform an array entries to an object(ES2019)
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
}

export default new AddRecipeView();
