import { MODAL_CLOSE_SEC } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    //Getting the id from the #
    const id = window.location.hash.slice(1);
    if (!id) return;

    //Render spinner
    recipeView.renderSpinner();
    //UPDATE RESULTS VIEW TO MARK SELECTED SEARCH RESULT
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    // loading recipe
    await model.loadRecipe(id);
    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //RENDER SPINNEER
    resultsView.renderSpinner();
    //GET SEARCH QUERY
    const query = searchView.getQuery();
    if (!query) return;
    //LOAD SEARCH RESULTS
    await model.loadSearchResult(query);
    //RENDER RESULTS
    // resultsView.render(model.state.search.results); //ALL THE RESULT
    resultsView.render(model.getSearchResultPage()); //THE FIRST 10 RESULT
    //RENDER THE INITIAL PAGINATION BUTTONS
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe servings (in the state)
  model.updateServings(newServings);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //ADD OR REMOVE BOOKMARKS
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //UPDATE RECIPE VIEW
  recipeView.update(model.state.recipe);
  //RENDER THE BOOKMARKS
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //RENDER LOADING SPINNER
    addRecipeView.renderSpinner();
    //UPLOAD THE NEW RECIPE DATA
    await model.uploadRecipe(newRecipe);
    //RENDER RECIPE
    recipeView.render(model.state.recipe);
    //SUCCESS MESSAGE
    addRecipeView.renderMessage();
    //RENDER BOOKMARK VIEW
    bookmarksView.render(model.state.bookmarks);

    //CHANGE ID IN TH URL USING TH HISTORY API OF THE BROWSER
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //CLOSE MODAL
    setTimeout(function () {
      addRecipeView.toggleModal();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('!!!!!!!!!!', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
