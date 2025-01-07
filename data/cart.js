export const cart = [];

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
