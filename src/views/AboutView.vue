<template>
  <section class="about-section">
    <h1>About Us</h1>
    <div class="content-container">
      <div class="image-container">
        <img src="@/assets/your.jpg" alt="Our Clinic">
      </div>
      <div class="content">
        <h2>Welcome to Our Clinic</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque, mauris vel vehicula aliquet, libero justo laoreet risus, ut vehicula metus dolor sit amet felis. Maecenas pretium, dolor eget vulputate luctus, lorem libero volutpat velit, et dictum nunc justo sit amet risus.</p>
        <p>Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Vivamus commodo, nisl vel auctor aliquet, dolor lorem pretium nunc, quis pretium ligula ante quis purus.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  background: #00171F;
}

.about-section h1 {
    color: #22A7DF; /* Dark shade for contrast against lighter backgrounds */
  font-size: 3.2rem; /* Large size for clear section headings */
  font-weight: 600; /* Semi-bold weight for emphasis */
  text-align: center; /* Centers the heading in the section */
  margin-top: 0; /* Removes default margin from the top */
  margin-bottom: 20px; /* Adds space below the heading */
  padding: 10px 0; /* Adds vertical padding without horizontal padding */
  border-bottom: 2px solid #22A7DF; /* Adds a subtle underline with accent color */
  width: max-content; /* Ensures the border-bottom only spans the text width */
  margin-left: auto; /* Centers the heading when width is max-content */
  margin-right: auto; /* Centers the heading when width is max-content */
}

.content-container {
  display: flex;
  width: 100%;
  max-width: 1200px; /* Full width control */
  align-items: center;
  position: relative; /* Allows for absolute positioning inside */
  padding-top: 40px;
}

.image-container {
  flex: 1; /* Balances the flex items */
  position: absolute;
 left: 11%;
    top: 16%; 
    z-index: 2;
}

.image-container img {
  max-width: 300px; /* Adjusts size of the image */
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.content {
  flex: 2; /* Larger space allocation */
  background: #ffffff;
  padding: 20px; /* Reduced padding for a 20% smaller container */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;
  margin-left: 35%; /* Ensures it does not overlap the image */
}


.content h2, .content p {
  position: relative;
  z-index: 1; /* Maintains stacking context above the background */
}

.content h2 {
  color: #00171F;
  font-size: 2.8rem; /* Adjusted for smaller container */
  margin-bottom: 15px;
}

.content p {
  color: #666;
  font-size: 1.6rem; /* Smaller text for smaller container */
  line-height: 1.8;
  margin-bottom: 10px;
}
</style>