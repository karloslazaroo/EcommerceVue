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
</style>
