<template>
  <div class="about">
    <div class="content">
      <h1>Welcome to Our Clinic</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque, mauris vel vehicula aliquet, libero justo laoreet risus, ut vehicula metus dolor sit amet felis. Maecenas pretium, dolor eget vulputate luctus, lorem libero volutpat velit, et dictum nunc justo sit amet risus.</p>
      <p>Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Vivamus commodo, nisl vel auctor aliquet, dolor lorem pretium nunc, quis pretium ligula ante quis purus.</p>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(135, 222, 253, 0.8), rgba(182, 244, 146, 0.8));
  padding: 50px; /* Adds padding around the content for better spacing */
  box-sizing: border-box; /* Includes padding in the width and height calculations */
}

.content {
  max-width: 800px; /* Limits the width of the content for better readability */
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Subtle shadow for depth */
  text-align: center; /* Centers the text within the content box */
}

.content h1 {
  color: #333;
  font-size: 2.5rem; /* Larger font size for the heading */
  margin-bottom: 20px; /* Space below the heading */
}

.content p {
  color: #666;
  font-size: 1.2rem; /* Comfortable reading size for paragraphs */
  line-height: 1.6; /* Increases line height for better readability */
  margin-bottom: 15px; /* Space between paragraphs */
}
</style>
