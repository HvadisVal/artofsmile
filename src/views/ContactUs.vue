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
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Follow Us</h3>
        <ul class="social-links">
          <li><a href="#"><i class="fa fa-facebook-f"></i> Facebook</a></li>
          <li><a href="#"><i class="fa fa-instagram"></i> Instagram</a></li>
          <li><a href="#"><i class="fa fa-linkedin-in"></i> LinkedIn</a></li>
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
</style>
