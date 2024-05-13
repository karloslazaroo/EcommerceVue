<template>
  <div class="cart-container">
    <h2 class="cart-title">
      <i class="fas fa-shopping-cart"></i> Cart
    </h2>
    <ul class="cart-items">
      <li v-for="cartItem in cart" :key="cartItem._id" class="cart-item" @mouseover="hoverItem(true)" @mouseleave="hoverItem(false)">
        <div class="item-details">
          <div class="item-image-container">
            <img :src="cartItem.thumbnail" alt="" class="product-image">
          </div>
          <div class="item-info">
            <h3 class="item-name">{{ cartItem.product_name }}</h3>
            <p class="item-description">{{ cartItem.description }}</p>
            <div class="item-meta">
              <span class="item-price">Price: ₱{{ cartItem.price }}</span>
              <span class="item-quantity">Quantity: {{ cartItem.quantity }}</span>
            </div>
          </div>
        </div>
        <button class="remove-button" @click="removeItem(cartItem)">Remove</button>
      </li>
    </ul>
    
    <!-- Checkout button -->
    <button class="checkout-button" @click="showSummary">Checkout</button>
    
    <!-- Popup component -->
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <span class="close-button" @click="closeSummary">&times;</span>
        <h3>Summary</h3>
        <ul>
          <li v-for="item in cart" :key="item._id">
            <div class="summary-item">
              <img :src="item.thumbnail" alt="" class="summary-image">
              <div>
                <p>{{ item.product_name }}</p>
                <p>Quantity: {{ item.quantity }}</p>
                <p>Total: ₱{{ item.price * item.quantity }}</p>
              </div>
            </div>
          </li>
        </ul>
        <button class="checkout-button" @click="checkoutAndClose">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [], // Initialize cart as an empty array
      showPopup: false // Flag to control popup visibility
    };
  },
  methods: {
    hoverItem(hovered) {
      // Implement hover effects
    },
    removeItem(itemToRemove) {
      // Find index of item to remove
      const indexToRemove = this.cart.findIndex(cartItem => cartItem._id === itemToRemove._id);
      if (indexToRemove !== -1) {
        // Decrement quantity of item by 1
        if (this.cart[indexToRemove].quantity > 1) {
          this.cart[indexToRemove].quantity--;
        } else {
          // Remove item if quantity is 1
          this.cart.splice(indexToRemove, 1);
        }
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    },
    showSummary() {
      this.showPopup = true; // Show popup when checkout button is clicked
    },
    closeSummary() {
      this.showPopup = false; // Close popup when the user clicks close button
    },
    checkoutAndClose() {
      // Implement checkout logic
      // Close the popup after checkout
      this.showPopup = false;
    }
  },
  created() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }
};
</script>

<style scoped>
.cart-container {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 1000px;
}

.cart-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.cart-title i {
  margin-right: 10px;
  color: #333;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background-color: #fff;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image-container {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.product-image {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  margin-bottom: 5px;
  font-size: 1.2rem;
  color: #333;
}

.item-description {
  margin-bottom: 10px;
  color: #666;
}

.item-meta {
  display: flex;
  align-items: center;
}

.item-price {
  margin-right: 20px;
  font-weight: bold;
  color: #333;
}

.remove-button {
  border: none;
  background-color: #f44336;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #d32f2f;
}

/* Popup styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.checkout-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #d32f2f;
}

.summary-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.summary-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
