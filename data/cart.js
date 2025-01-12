// Retrieve the cart from localStorage or initialize with a default value
export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryoptionsid: "1",
  },
  {
    productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3,
    deliveryoptionsid: "2",
  },
];

// Save the cart to localStorage
export function savetostorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updatecart() {
  if (cart.length == 0) {
    document.querySelector(".js-return-to-home-link").innerHTML = "";
  } else {
    let totalquantity = 0;
    cart.forEach((cartItem) => {
      totalquantity += cartItem.quantity;
    });
    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${totalquantity} items`;
  }
}

// Remove an item from the cart by productID
export function removecart(productID) {
  cart = cart.filter((cartItem) => cartItem.productID !== productID);
  savetostorage(cart);
  updatecart();
}

// Timeout storage for "Added to Cart" messages
const addedMessageTimeouts = {};

// Add an item to the cart
export function addtocart(productID, cart) {
  let matchingItem = cart.find((item) => item.productID === productID);

  // Get the quantity from the corresponding input field
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productID}`
  );
  if (!quantitySelector) {
    console.error(`Quantity selector for productID ${productID} not found.`);
    return;
  }
  const quantity = Number(quantitySelector.value);

  // Update quantity if the item exists, or add a new item
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productID: productID, quantity: quantity });
  }

  // Update the total cart quantity display
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.innerHTML = cartQuantity;
  }

  // Show the "Added to Cart" message
  const addedMessage = document.querySelector(`.js-added-to-cart-${productID}`);
  if (addedMessage) {
    addedMessage.classList.add("added-to-cart-visible");

    // Clear any existing timeout for this productID
    if (addedMessageTimeouts[productID]) {
      clearTimeout(addedMessageTimeouts[productID]);
    }

    // Hide the message after 2 seconds
    addedMessageTimeouts[productID] = setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);
  }

  // Save the updated cart to localStorage
  savetostorage(cart);
}
