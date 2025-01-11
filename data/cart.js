export let cart = [
  {
    productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 3,
  },
];

export function addtocart(productId, cart) {
  const addedMessageTimeouts = {};
  let matchingitem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingitem = item;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  const quantity = Number(quantitySelector.value);

  if (matchingitem) {
    matchingitem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add("added-to-cart-visible");

  const previousTimeoutId = addedMessageTimeouts[productId];
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId);
  }

  setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
}

export function removecart(productID) {
  const new_cart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productID !== productID) {
      new_cart.push(cartItem);
    }
  });
  cart = new_cart;
}
