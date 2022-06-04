# Demo of displaying multiple images from an API

**Task: query an API and display multiple images whose src urls are retrieved from the API call**

## Solution

* getProductList in productList.js retrieves a JSON file from the API
* Store retrieved JSON file to data/productList.json for reference
* Products.jsx
  + Displays the Throbber when it first renders
  + Uses useEffect to call getProductList() to get data
  + Uses Promise.all() to load each imageUrl stored in productList.products
  + Generates an unordered list of images from the loaded files
  + Displays the generated `<ul>` when it is ready

## Possible improvements

Create a form page to allow the user to choose which items and which data is fetched from the API.

## Credits 

Throbber is designed by https://loading.io/css/

