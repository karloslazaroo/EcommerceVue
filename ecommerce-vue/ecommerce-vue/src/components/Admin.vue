<template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Product Name:</label>
        <input type="text" id="name" v-model="formData.product_name">
      </div>
      <div>
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" v-model="formData.quantity">
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="formData.description"></textarea>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="formData.price">
      </div>
      <div>
        <label for="size">Size:</label>
        <input type="number" id="size" v-model="formData.size">
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" ref="thumbnail">
      </div>
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          product_name: '',
          quantity: 0,
          description: '',
          price: 0.0,
          size: '',
          thumbnail: '' // Store the image path here
        }
      };
    },
    methods: {
      async submitForm() {
        const formData = new FormData();
        formData.append('product_name', this.formData.product_name);
        formData.append('quantity', this.formData.quantity);
        formData.append('description', this.formData.description);
        formData.append('price', this.formData.price);
        formData.append('size', this.formData.size);
        formData.append('image', this.$refs.thumbnail.files[0]);
  
        try {
          const response = await axios.post('http://localhost:4000/api/product', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          // Assuming the response contains the path where the image is stored
          this.formData.thumbnail = response.data.thumbnail;
          console.log('Product added successfully:', this.formData);
        } catch (error) {
          console.error('Error adding product:', error);
        }
      }
    }
  };
  </script>
  