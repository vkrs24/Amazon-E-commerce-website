export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
    },
  ];
}

export function savetostorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function removecart(productID) {
  const new_cart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productID !== productID) {
      new_cart.push(cartItem);
    }
  });
  cart = new_cart;
  savetostorage();
}
export function addtocart(productId, cart) {
  const addedMessageTimeouts = {};
  let matchingitem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
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

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);

  addedMessageTimeouts[productId] = timeoutId;
  savetostorage();
}
