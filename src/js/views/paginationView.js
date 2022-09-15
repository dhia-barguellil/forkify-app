import icons from 'url:../../img/icons.svg'; //Parcel2 : for any static assests , non programming file
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //PAGE 1 AND THERE ARE OTHER PAGES
    if (curPage === 1 && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--next" data-goto = "${
          curPage + 1
        }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }
    //LAST PAGE
    if (curPage === numPages && numPages > 1) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto = "${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    }
    //OTHER PAGE
    if (curPage < numPages) {
      return `
        <button class="btn--inline pagination__btn--prev" data-goto = "${
          curPage - 1
        }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-goto = "${
          curPage + 1
        }">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }
    //PAGE 1 AND THERE ARE NO OTHER PAGES
    return '';
  }
}

export default new PaginationView();
