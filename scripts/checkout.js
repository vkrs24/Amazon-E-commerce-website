import { cart, removecart, updatecart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utiles/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryoptionsId } from "../data/deliveryoptions.js";

updatecart();
// Build the cart summary HTML
const today = dayjs();
const deliverydate = today.add(7, "days");
console.log(deliverydate.format("dddd,MMMM D"));
let cartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productID;
  const matchingProduct = products.find((product) => product.id === productId);

  if (matchingProduct) {
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProduct.id
      }">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" alt="${
      matchingProduct.name
    }">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(
              matchingProduct.priceCents
            )}</div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${
                  cartItem.quantity
                }</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input" name="delivery-option-${
                matchingProduct.id
              }">
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${
                matchingProduct.id
              }">
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input" name="delivery-option-${
                matchingProduct.id
              }">
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
});

// Insert the cart summary into the DOM
const orderSummaryElement = document.querySelector(".js-order-summary");
if (orderSummaryElement) {
  orderSummaryElement.innerHTML = cartSummaryHTML;
} else {
  console.error("Order summary container not found.");
}

// Add event listeners to delete buttons
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productID = link.dataset.productId; // Access data-product-id correctly
    if (!productID) {
      console.error("Product ID not found in dataset.");
      return;
    }

    // Remove item from cart and update storage
    removecart(productID);

    // Remove the corresponding container
    const container = document.querySelector(
      `.js-cart-item-container-${productID}`
    );
    if (container) {
      container.remove();
    } else {
      console.error(
        `Cart item container for productID ${productID} not found.`
      );
    }
  });
});
