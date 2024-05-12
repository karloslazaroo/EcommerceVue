<template>
    <div>
      <h2>Admin Page</h2>
      <form @submit.prevent="submitForm">
        <!-- Add product form fields -->
        <input type="text" v-model="formData.product_name" placeholder="Product Name">
        <input type="text" v-model="formData.thumbnail" placeholder="Thumbnail URL">
        <input type="number" v-model="formData.quantity" placeholder="Quantity">
        <input type="text" v-model="formData.description" placeholder="Description">
        <input type="text" v-model="formData.size" placeholder="Size">
        <input type="number" v-model="formData.price" placeholder="Price">
  
        <button type="submit">Add Product</button>
      </form>
  
      <!-- Display existing products -->
      <div v-if="products.length">
        <h3>Existing Products</h3>
        <ul>
          <li v-for="product in products" :key="product._id">
            {{ product.product_name }} - {{ product.price }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        products: [],
        formData: {
          product_name: '',
          thumbnail: '',
          quantity: 0,
          description: '',
          size: '',
          price: 0
        }
      };
    },
    created() {
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        axios.get('http://localhost:4000/api/product')
          .then(response => {
            this.products = response.data;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      },
      submitForm() {
        axios.post('http://localhost:4000/api/product', this.formData)
          .then(response => {
            console.log('Product added successfully:', response.data);
            // Clear form fields after successful submission
            this.formData = {
              product_name: '',
              thumbnail: '',
              quantity: 0,
              description: '',
              size: '',
              price: 0
            };
            // Update product list
            this.fetchProducts();
          })
          .catch(error => {
            console.error('Error adding product:', error);
          });
      }
    }
  };
  </script>
  