import { useState, useEffect } from "react";
import Throbber from "../Throbber/Throbber";
import getProductList from "./productList";

let Display = Throbber;

const Products = () => {
  let products;

  // Use useState to trigger a re-render after useEffect completes.
  // The variable itself is not required.
  const [, setUseList] = useState(false);

  // Replace Throbber with a list of retrieved images
  const createImageList = (imgArray) => {
    const imageList = imgArray.map((img, index) => {
      const alt = products[index].name;
      return (
        <li key={products[index].id}>
          {<img src={img.src} alt={alt} title={alt} />}
        </li>
      );
    });

    // Replace Throbber with a function that returns the list
    Display = () => <ul>{imageList}</ul>;

    // Trigger a re-render
    setUseList(true);
  };

  const getImages = () => {
    // A useEffect function cannot be async, because an async
    // function returns a promise, and useEffect may only return
    // a clean-up function. The async function must be wrapped.
    //
    // You can use an IIFE (Immediately Invoked Function Expression),
    // as shown below or you could write this as a regular async
    // function and call it like just after you declare it:
    //
    // const fetchData = async () => { ... }
    // fetchData()

    (async () => {
      // Call the API (asynchronously) to get the product list
      const productList = await getProductList();
      // (See data/productList.json for the values returned)

      // Each item in productList.products has an imageURL property
      products = productList.products;

      // Preload ALL the product images before showing any of them
      const images = products.map((productInfo) => productInfo.imageUrl);

      const fetchArray = images.map((src, index) => {
        const image = new Image();
        image.src = "//" + src;

        return image;
      });

      // Create a list of images to replace the Throbber when
      // all images have been preloaded
      Promise.all(fetchArray).then(createImageList);
    })();
  };

  useEffect(getImages);

  // Display may be Throbber or a list of images
  return <Display />;
};


export default Products;
