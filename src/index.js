'use strict';

/* global fetchEtsy */

/**
 * Takes a single result from Etsy and creates a DOM element to represent it
 *
 * @param  Object: result Object representing a SINGLE store item
 *   For format look at `docs/shop-item.json`
 * @return Element: resulting Element representing a SINGLE store item
 *   This function should not insert the element into the DOM
 *   See basic HTML format `docs/shop-item.html`
 *     (You will need more wrapping elements to style things)
 */
function createResultShopItem(result) {
  const shopItem = document.createElement(`article`);
  shopItem.classList.add(`shop-item`);
  shopItem.innerHTML =
  `<h3 class="shop-item__title">${result.title}</h3>
  <h4 class="shop-item__shop-name">${result.Shop.shop_name}</h4>
  <img class="shop-item__pic" src="${result.Images[0].url_fullxfull}" alt="${result.title}">
  <p class="shop-item__price">$${result.price}</p>`;

  return shopItem;
}

/**
 * Takes a full result payload object and renders it to the DOM
 * @param  Object response Data from Etsy or source
 *   Format is {
 *     results: [
 *       // Array of objects that follow the format `docs/shop-item.json`
 *     ]
 *   }
 * @return undefined
 */
function showAllResults(response) {
  // Get the products element from the DOM
  const products = document.querySelector(`#products`);

  // Clear the contents of the products element
  products.innerHTML = ``;
  // Set 'items' to the results array from the response
  const items = response.results; // 2 is only here to stop an error

  for (let i = 0; i < items.length; i++) {
    // Create a new shop item element for each item in items
    const shopItem = createResultShopItem(items[i]);
    // Append current shop item element to the products element
    const itemsList = products.appendChild(shopItem);
  }
}

/**
 * Function should look up a searchTerm using the `getData` function
 *   and then render the results to the DOM
 * @param  String searchTerm
 * @param  Function getData
 *   Looks up data given an argument 'searchTerm' and returns a promise when complete
 * @return undefined
 */
function searchEtsy(searchTerm, getData = fetchEtsy) {
  return getData(searchTerm).then((results) => {
    showAllResults(results);
  });
}

/**
 * Tells the app when to start & connects the application to the DOM
 */
function start() {
  searchEtsy(`Yoshi`);
  // Lookup the search bar button element

  // Listen for click on search button
  // When clicked
  //   * Look up value for search bar input
  //   * Lookup results for search term and render results to the DOM
}
