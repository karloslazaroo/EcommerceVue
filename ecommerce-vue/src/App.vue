<template>
  <div id="app">
    <header>
      <img src="./assets/pictures/logo.png" alt="South Street Logo" class="logo">
      <h1>South Street</h1>
      <nav>
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
  margin-right: 10px; /* Add some spacing between logo and text */
}

header {
  background-color: #ffffff; /* Example background color for header */

}

nav {
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: center;
  width: 100%;
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
  grid-row-start: auto;
  grid-row-end: auto;
  grid-column-start: 1;
  grid-column-end: -1;
}
</style>
