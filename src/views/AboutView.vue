<template>
  <section class="about-section">
    <h1>About Us</h1>
    <div class="content-container">
      <div class="image-container">
        <img src="@/assets/as.jpg" alt="Our Clinic">
      </div>
      <div class="content">
        <h2>Dr. Andriana Sallum</h2>
        <p>Using advanced dental technologies to ensure that you receive the treatment you need with the least discomfort.The range of services varies from routine dental check-ups, cleanings, and fillings to more complex procedures such as surgical and orthodontic treatments, for both adults and children.</p>
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
}

.about-section h1 {
  color: #22A7DF; /* Dark shade for contrast against lighter backgrounds */
  font-size: 30px;
  font-weight: 600; /* Semi-bold weight for emphasis */
  text-align: center; /* Centers the heading in the section */
  margin-top: 0; /* Removes default margin from the top */
  margin-bottom: 20px; /* Adds space below the heading */
  padding: 10px 0; /* Adds vertical padding without horizontal padding */
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
  top: 4%; 
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
  background: #FAF9F6;
  padding: 20px; /* Reduced padding for a 20% smaller container */
  border-radius: 8px;
  box-shadow: 4px 4px 8px -2px #22A7DF;
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
  font-size: 23px;
  margin-bottom: 15px;
}

.content p {
  color: #666;
  font-size: 20px;
  line-height: 1.8;
  margin-bottom: 10px;
}

/* Responsive adjustments for medium screens such as tablets */

@media (max-width: 950px) {
  .content-container {
    flex-direction: column;
    align-items: center;
  }

  .image-container {
    position: static; /* Reset positioning to flow naturally */
    order: 1; /* Image appears first */
    width: 80%; /* Adjust width to fit mobile view better */
    display: flex;
    justify-content: center;
  }

  .content {
    order: 2; /* Content appears second */
    margin-left: 0; /* Center content below image */
    width: 100%; /* Adjust width to fit mobile view */
    padding: 20px; /* Adjust padding as necessary */
  }

  .content h2 {
    font-size: 30px;
  }

  .content p {
    font-size: 20px;
  }
}

@media (min-width: 950px) and (max-width: 1300px) {
  .content-container {
    flex-direction: row; /* Set content items to lay out horizontally */
    justify-content: space-around; /* Space items nicely */
    align-items: center; /* Align items vertically in center */
  }

  .image-container {
    width: 50%; /* Adjust image container to take half the width */
    position: static; /* Remove absolute positioning */
    order: 1; /* Ensure image appears on the left */
  }

  .content, .content-box2 {
    width: 45%; /* Each content box takes less than half the space to fit side by side */
    margin-left: 0%; /* Optional: add margin for spacing */
    order: 2; /* Content appears on the right */
  }

  .image-container img {
    max-width: 100%; /* Image uses full width of its container */
  }

  .content h2, .content p {
    font-size: 1.8rem; /* Slightly smaller font size for content */
  }

  .content p {
    font-size: 1.2rem; /* Smaller text for detailed content */
  }
}

</style>