<template>
    <div class="cart-container">
      <h2 class="cart-title">
        <i class="fas fa-shopping-cart"></i> Cart
      </h2>
      <ul class="cart-items">
        <li v-for="cartItem in cart" :key="cartItem._id" class="cart-item" @mouseover="hoverItem(true)" @mouseleave="hoverItem(false)">
          <div class="item-details">
            <span class="item-name">{{ cartItem.product_name }}</span>
            <span class="item-price">₱{{ cartItem.price }}</span>
          </div>
          <span class="item-quantity">Quantity: {{ cartItem.quantity }}</span>
          <button class="remove-button" @click="removeItem(cartItem)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: [] // Initialize cart as an empty array
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
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
  }
  
  .cart-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .cart-title i {
    margin-right: 5px;
  }
  
  .cart-items {
    list-style-type: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    transition: background-color 0.3s ease;
  }
  
  .cart-item:hover {
    background-color: #f9f9f9;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-weight: bold;
  }
  
  .item-price {
    font-weight: bold;
  }
  
  .item-quantity {
    color: #666;
  }
  </style>
  