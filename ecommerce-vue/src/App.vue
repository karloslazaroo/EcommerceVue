<template>
  <div id="app">
    <header class="header">
      <div class="logo-container">
        <img src="./assets/pictures/logo.png" alt="South Street Logo" class="logo">
        <h1 class="title">South Street</h1>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/products" class="nav-link">Products</router-link>
        <router-link to="/cart" class="nav-link">Cart</router-link>
        <router-link to="/admin" class="nav-link">Admin</router-link>
      </nav>
    </header>
    <router-view></router-view>
    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 South Street. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.logo {
  width: 100px; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
}

.title {
  font-size: 24px;
  margin-left: 10px; /* Add some spacing between logo and text */
}

.header {
  background-color: #ffffff; /* Example background color for header */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ccc; /* Add border to the bottom of the header */
}

.nav {
  display: flex;
  border-left: 2px solid #ccc; /* Add border to the left of the nav */
  padding-left: 20px; /* Add some padding to the left of the nav */
}

.nav-link {
  font-size: 18px;
  color: #333;
  text-decoration: none;
  margin-right: 20px; /* Add right margin between links */
  transition: color 0.3s ease;
}

.nav-link:last-child {
  margin-right: 0; /* Remove right margin from the last link */
}

.nav-link:hover {
  color: #ffa5a5;
}

.footer {
  background-color: #000000;
  color: white;
  padding: 20px;
  text-align: center;
}
</style>
