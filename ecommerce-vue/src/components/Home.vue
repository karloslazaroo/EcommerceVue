<template>
  <div>
    <h2>Welcome to Our Store</h2>
    <div class="banner">
      <!-- Add your banner content here -->
      <img src="../assets/header.jpg" alt="Banner Image">
    </div>
    <h2>Our Products</h2>
    <div class="product-grid">
      <div v-for="(product, index) in displayedProducts" :key="product._id" @click="goToProductPage(product._id)">
        <img :src="product.thumbnail" alt="" class="product-image">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      displayedProducts: [] // Only show 3 products
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('https://ecommercevue.onrender.com/api/product')
        .then(response => {
          this.products = response.data;
          this.displayedProducts = this.products.slice(0, 3); // Limit to 3 products
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    goToProductPage(productId) {
      this.$router.push(`/products/${productId}`);
    }
  }
};
</script>

<style>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 150px;
}

.product-grid > div {
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  padding: 10px;
}

.product-grid > div:hover {
  background-color: #f0f0f0;
}

.product-image {
  max-width: 100%; /* Ensure the image fits the container */
  height: auto; /* Maintain aspect ratio */
  margin-bottom: 10px; /* Add some spacing between the image and text */
}

h3 {
  margin-bottom: 5px; /* Add spacing below the product name */
}

.banner {
  margin-top: 75px;
  text-align: center;
  margin-bottom: 250px;
/* Add some space between the banner and the product grid */
}

.banner img {
  max-width: 100%; 

  /* Ensure the banner image fits the container */
}
</style>
