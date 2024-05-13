<template>
  <div>
    
    <ul>
      <div class="view-cart-container">
      <router-link to="/cart">
        <button class="view-cart-button">
          View Cart <i class="fas fa-shopping-cart"></i> <span class="cart-count">{{ cart.length }}</span>
        </button>
      </router-link>
    </div>
      <div class="product-grid">
        <li v-for="item in items" :key="item._id">
          <img :src="item.thumbnail" alt="" class="product-image">
          <div class="product-card">
            <div class="product-details">
              <h2 class="product-name">{{ item.product_name }}</h2>
              <p class="product-description">{{ item.description }}</p>
              <div class="product-price">Price: ₱{{ item.price }}</div>
              <button class="add-to-cart-button" @click="addToCart(item)">
                {{ itemAddedToCart(item) ? 'Added to Cart' : 'Add to Cart' }}
              </button>
            </div>
          </div>
        </li>
      </div>
      
    </ul>
    <div v-if="showCart">
      <h2>Cart</h2>
      <ul>
        <li v-for="cartItem in cart" :key="cartItem._id">
          {{ cartItem.product_name }} - ₱{{ cartItem.price }} (Quantity: {{ cartItem.quantity }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style-type: none;
}

.product-card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.view-cart-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 80px /* Adjust margin as needed */
}
.view-cart-button {
  background-color: #b3b3b3;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-cart-button:hover {
  background-color: #000000;
  color: #fff;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.5em;
  font-size: 0.8em;
  margin-left: 5px;
}


.product-image {
  width: 80%;
  height: auto;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.product-description {
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
}

.add-to-cart-button {
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 450px;
}

.add-to-cart-button:hover {
  background-color: #7e7e7e;
  color: #ffffff;
}
</style>

<script>
import axios from 'axios';
import Cart from './Cart.vue';

export default {


  data() {
    return {
      items: [],
      cart: [],
      showCart: false // Flag to control cart visibility
    };
  },
  methods: {
    addToCart(item) {
      const existingItem = this.cart.find(cartItem => cartItem._id === item._id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }

      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    itemAddedToCart(item) {
      return this.cart.some(cartItem => cartItem._id === item._id);
    }
  },
  created() {
    axios.get('https://ecommercevue.onrender.com/api/product')
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Load cart data from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }
};
</script>