<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section logo-section">
        <a href="index.html">
          <img src="@/assets/Logo.png" alt="Company Logo" class="footer-logo">
        </a>
      </div>
      <div class="footer-section">
        <h3>Useful Links</h3>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul class="social-links">
  <li><a href="https://facebook.com" target="_blank" aria-label="Visit our Facebook">
    <i class='bx bxl-facebook-square'></i>
  </a></li>
  <li><a href="https://instagram.com" target="_blank" aria-label="Visit our Instagram">
    <i class='bx bxl-instagram'></i>
  </a></li>
   <li><a href="https://tiktok.com" target="_blank">
    <i class='bx bxl-tiktok'></i>
  </a></li>
</ul>

      </div>
      <div class="footer-section">
        <h3>Address</h3>
        <p>Cluj-Napoca, Romania</p>
        <p>+123 456 7890</p>
        <p>info@example.com</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Dr. Andriana Sallum. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #00171F;
  color: #ffffff;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-section {
  margin: 20px;
  flex: 1;
  min-width: 250px;
}

.logo-section img.footer-logo {
  max-width: 250px; /* Adjust the size of the logo */
  padding-top: 20px;
  margin-right: 30px;
}

.footer-section h3 {
  color: #22A7DF;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 5px;
}

.footer-section a {
  color: #ffffff;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #22A7DF;
}

.social-links{
  display: flex;
    justify-content: center;
}
.social-links a {
  display: flex;
  align-items: center;
}

.social-links i {
  margin-right: 8px;
}

.footer-bottom {
  margin-top: 20px;
  font-size: 14px;
}

.social-links {
  list-style: none;
  padding: 0;
}

.social-links li {
  display: inline-block;
}

.social-links a {
  text-decoration: none;
  color: #22A7DF; /* Change the color as needed */
  margin-right: 10px; /* Adds spacing between icons */
}

.social-links i {
  font-size: 24px; /* Adjust the size as needed */
}

</style>