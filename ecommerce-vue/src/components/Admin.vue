<template>
  <div>
    <div v-if="!loggedIn" class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username" class="label">Username:</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" class="form-control">
        </div>
        <div class="form-group">
          <label for="password" class="label">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
    <div v-else>
      <h2>Admin Page</h2>
      <form @submit.prevent="submitForm" class="product-form">
        <div class="form-container">
          <!-- Product Name -->
          <div class="form-group">
            <label for="product_name">Product Name:</label>
            <input type="text" id="product_name" v-model="formData.product_name" placeholder="Enter product name">
          </div>

          <!-- Thumbnail URL -->
          <div class="form-group">
            <label for="thumbnail">Thumbnail URL:</label>
            <input type="text" id="thumbnail" v-model="formData.thumbnail" placeholder="Enter thumbnail URL">
          </div>

          <!-- Quantity -->
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" v-model="formData.quantity" placeholder="Enter quantity">
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description">Description:</label>
            <input type="text" id="description" v-model="formData.description" placeholder="Enter description">
          </div>

          <!-- Size -->
          <div class="form-group">
            <label for="size">Size:</label>
            <input type="text" id="size" v-model="formData.size" placeholder="Enter size">
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="price">Price:</label>
            <input type="number" id="price" v-model="formData.price" placeholder="Enter price">
          </div>
        </div>
        <button type="submit">Add Product</button>
      </form>

      <!-- Display existing products -->
      <div v-if="products.length">
        <h3>Existing Products</h3>
        <ul>
          <li v-for="product in products" :key="product._id">
            <img :src="product.thumbnail" alt="" class="product-image">
            {{ product.description }}-{{ product.product_name }} - {{ product.price }}
            <button @click="removeProduct(product)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loggedIn: false,
      username: '',
      password: '',
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
  methods: {
    login() {
      // Hard-coded authentication (replace with your actual authentication logic)
      if (this.username === 'admin' && this.password === 'password') {
        this.loggedIn = true;
        this.fetchProducts(); // Fetch products after successful login
      } else {
        alert('Invalid username or password');
      }
    },
    fetchProducts() {
      // Fetch products only when logged in
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
    },
    removeProduct(product) {
      axios.delete(`http://localhost:4000/api/product/${product._id}`)
        .then(response => {
          console.log('Product removed successfully:', response.data);
          // Update the products list by fetching it again from the server
          this.fetchProducts();
        })
        .catch(error => {
          console.error('Error removing product:', error);
        });
    }
  }
};
</script>

<style scoped>

.login-container {
  width: 800px;
  margin: auto;

  border-radius: 8px;
  margin-top: 90px;
  height: 1000px;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

.input-group {
  margin-bottom: 20px;
}

.form-control {
  
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

.btn {
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}
.product-form {
  max-width: 400px;
  margin: auto; /* Center the form horizontally */
  padding: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the form vertically */
}



label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

.product-image {
  max-width: 100px;
  height: auto;
}
</style>
