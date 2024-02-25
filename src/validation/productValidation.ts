/** */
// Define a function called productValidation that takes in a product object as a parameter.
// The product object contains properties like title, description, imageURL, and price.
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) => {
  // Initialize an object called errors to store any validation errors.
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  // Check if the imageURL is a valid URL using a regular expression.
  const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  // Validate the title property of the product object.
  // If it is not trimmed, empty, or between 10 and 80 characters in length, add an error message.
  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product Title Must Be Between 10 And 80 Characters!";
  }

  // Validate the description property of the product object.
  // If it is not trimmed, empty, or between 10 and 900 characters in length, add an error message.
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product Description Must Be Between 10 And 900 Characters!";
  }

  // Validate the imageURL property of the product object.
  // If it is not trimmed, empty, or a valid URL, add an error message.
  if (!product.imageURL.trim() || !validURL) {
    errors.imageURL = "Valid Image URL Is Required";
  }
  // Validate the price property of the product object.
  // If it is not trimmed, empty, or a valid number, add an error message.
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid Price Is Required";
  }
  // Return the errors object.
  return errors;
};
