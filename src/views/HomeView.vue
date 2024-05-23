<template>

    <!-- Home Section -->

<div id="home" class="home-container"> 
  <div class="home-container">
    <div class="left-column">
      <div class="image-container">
        <img src="@/assets/dentist.jpg" alt="Dentist working on patient">
      </div>
    </div>
    <div class="right-column">
      <div class="content-box">
        <div class="text-content">
          <h1>A powerful way to improve your smile</h1>
          <p>Using advanced dental technologies to ensure that you receive the treatment you need with the least discomfort.The range of services varies from routine dental check-ups, cleanings, and orthodontic treatments, for both adults and children.</p>
          <div class="action-items">
            <div class="phone-number">
              <p style="color: #22A7DF;"> <strong>0789 837 8372 </strong> </p>
            </div>
            <button @click="toggleModal" class="book-appointment-button">Book Appointment</button>
          </div>
        </div>
      </div>
      <div class="content-box2">
        <h2>Follow us on Social Media</h2>
       <div class="social-media-icons">
  <a href="https://instagram.com" target="_blank">
    <i class='bx bxl-instagram'></i>
  </a>
  <a href="https://facebook.com" target="_blank">
    <i class='bx bxl-facebook-square'></i>
  </a>
  <a href="https://tiktok.com" target="_blank">
    <i class='bx bxl-tiktok'></i>
  </a>
</div>

      </div>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="modal" @click.self="toggleModal">
      <div class="modal-content" tabindex="-1">
        <span @click="toggleModal" class="close" aria-label="Close modal">&times;</span>
        <AppointmentForm @success="handleSuccess"/>
      </div>
    </div>
  </div>
  </div>
 <div id="services" class="services-container"> <!-- Services Section -->
    <ServicesView />
  </div>
  <div id="about" class="about-container"> <!-- About Section -->
    <AboutView />
  </div>
  <div id="gallery" class="gallery-container"> <!-- Gallery Section -->
    <GalleryBnA />
  </div>
  <FaqPage />
  <div id="contact" class="contact-container"> <!-- Contact Section -->
    <ContactUs />
     
  </div>  
</template>



<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';
import ServicesView from '@/views/ServicesView.vue';
import AboutView from '@/views/AboutView.vue';
import GalleryBnA from '@/components/GalleryBnA.vue';
import FaqPage from '@/components/FaqPage.vue';
import ContactUs from '@/views/ContactUs.vue';

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
  if (showModal.value) {
    nextTick(() => {
      document.querySelector('.modal-content').focus();
    });
  }
}

function handleEsc(event) {
  if (event.key === 'Escape' && showModal.value) {
    toggleModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEsc);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc);
});

function handleSuccess(success) {
  if (success) {
    showModal.value = false;
    alert('Appointment successfully booked!');
  }
}
</script>





<style scoped>

        /* Home styling */
.home-container {
  display: flex;
  align-items: flex-start; /* Align items at the start to prevent stretching */
  margin-top: 70px; /* Adjusted for fixed header */
  gap: 15px; /* Space between columns */
}

.left-column {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.right-column {
  width: 40%;
  display: flex;
  flex-direction: column;
}

/* Styling for the left column specifically for images */
.image-container img {
  height: 500px;
  border-radius: 10px;
}

/* Styling adjustments for the right column content */
.content-box, .content-box2 {
  background-color: #FAF9F6;
  border-radius: 10px;
  box-shadow: 4px 4px 8px -2px #22A7DF;
  margin-bottom: 20px; /* Space between boxes */
  text-align: center;
}

.content-box{
height: 295px;
padding: 20px;
}

.book-appointment-button {
  padding: 5px 20px; /* Reduced padding to make the button thinner */
  font-size: 16px; /* Adjusted font size if needed */
  width: auto; /* Adjust width as per content */
}

.content-box2{
height: 100px;
padding: 20px;
}

.text-content {
  padding: 10px;
}

.text-content h1 {
  font-size: 24px; /* Larger font size for headers */
}
.content-box2 h2 {
  margin-top: 5px;
}

.text-content p {
  font-size: 16px; /* Readable text size */
  padding: 10px;
}

.action-items {
display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 5px;
}

.social-media-icons a {
  text-decoration: none;
  color: #00171F; /* Change the color as needed */
  margin-right: 10px; /* Adds spacing between icons */
  
}
.social-media-icons a:hover {
  color: #22A7DF; /* Change the color as needed */
}
.social-media-icons i {
  margin-top: -5px;
  font-size: 44px; /* Adjust the size as needed */
}



        /* Modal styling */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  padding: 12px 20px;
  background: #faf9f6;
  /*border: 2px solid #00171F;*/
  border-radius: 40px;
  font-size: 20px;
  box-shadow: none;
  outline: none;
}
.modal-content:hover {
  border: 2px solid #22A7DF;
}

.close {
  color: #00171F;
  float: right;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #22A7DF;
  text-decoration: none;
  cursor: pointer;
}
button {
  padding: 8px 16px;
  background-color: #00171F; /* Button background */
  color: white; /* Button text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
}

button:hover {
  background-color: #22A7DF; /* Darker blue on hover */
}

.book-appointment-button {
  padding: 10px 20px;
  background-color: #00171F; /* Background color for appointment button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
      box-shadow: 4px 4px 8px -2px #22A7DF;
}

.book-appointment-button:hover {
  background-color: #22A7DF; /* Hover color for appointment button */
  color: #00171F;
}




        /* Media Querry */

@media (min-width: 1500px) {
  .left-column, .right-column {
    width: 100%; /* Adjust width to provide more space */
  }
 
}

/* Responsive adjustments for medium-large screens up to 1500px */
@media (max-width: 1500px) {


  .action-items, .social-media-icons {
    justify-content: space-around; /* Ensure items are spaced out evenly */
  }
   .text-content h1 {

    margin-top: -15px;
}
}

/* Responsive adjustments for medium screens such as tablets */
@media (min-width: 778px ) and (max-width: 1200px) {
  .home-container {
    flex-direction: column; /* Stack elements vertically for better readability on medium screens */
    align-items: center; /* Center align items for consistency */
  }

  .left-column, .right-column {
    width: 100%; /* Adjust width to provide more space */
    display: block; /* Default display to handle content better */
  }
  .right-column {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .left-column .image-container img {
    width: 100%; /* Ensure full usage of the allocated width */
    height: auto; /* Maintain aspect ratio of images */
  }

  .text-content h1 {
    font-size: 22px; /* Maintain a slightly smaller font size for headers */
     .text-content h1 {

    margin-top: -15px;
}
  }

  .text-content p {
    font-size: 14px; /* Smaller font size for paragraph text, ensuring readability */
  }

  .book-appointment-button {
    padding: 10px 15px; /* Adequate padding for a comfortable click/tap area */
    font-size: 14px; /* Smaller font size to fit within the design */
    width: auto; /* Adjust width as per content size */
  }

  .action-items {
    align-items: center; /* Center align the action items */
    gap: 10px; /* Provide spacing between items */
  }

  .social-media-icons i {
    font-size: 30px; /* Adjust icon size for medium screens */
  }

  .social-media-icons a {
    margin: 0 10px; /* Adjust margins around social media icons for neatness */
  }

  .right-column .content-box2 {
    width: 96%; /* Adjust the height based on new proportions */
  }
}

@media (min-width: 1200px) and (max-width: 1260px) {
      .text-content p {
      font-size: 13px !important;
      }

}

@media (min-width: 1200px) and (max-width: 1560px) {

 .right-column {
    background-color: #FAF9F6;
  }
.text-content h1 {

    margin-top: -15px;
}
  .text-content p {
    padding: 0px; /* Example padding adjustment */
    
    font-size: 16px; /* Smaller font size for paragraph text, ensuring readability */
  }
}


/* Responsive adjustments for medium screens */
@media only screen and (max-width: 778px) {
  .home-container {
    flex-direction: column; /* Stack elements vertically for better readability on medium screens */
    align-items: center; /* Center align items for consistency */
  }

  .left-column, .right-column {
    width: 100%; /* Adjust width to provide more space */
    display: block; /* Default display to handle content better */
  }
  .right-column {
    width: 90%;
    display: flex;
    align-items: center;
  }

  .left-column .image-container img, .right-column .content-box, .right-column .content-box2 {
    width: 100%; /* Ensure full usage of the allocated width */
    height: auto; /* Maintain aspect ratio of images */
  }

  .text-content h1 {
    font-size: 22px; /* Maintain a slightly smaller font size for headers */
  }

  .text-content p {
    font-size: 14px; /* Smaller font size for paragraph text, ensuring readability */
  }

  .book-appointment-button {
    padding: 10px 15px; /* Adequate padding for a comfortable click/tap area */
    font-size: 14px; /* Smaller font size to fit within the design */
    width: auto; /* Adjust width as per content size */
  }

  .action-items {
    align-items: center; /* Center align the action items */
    gap: 10px; /* Provide spacing between items */
  }

  .social-media-icons i {
    font-size: 30px; /* Adjust icon size for medium screens */
  }

  .social-media-icons a {
    margin: 0 10px; /* Adjust margins around social media icons for neatness */
  }
}

/* Very small devices adjustments */
@media only screen and (max-width: 480px) {
  .home-container {
    flex-direction: column; /* Stack the columns vertically */
    align-items: center; /* Center align the content */
    gap: 10px; /* Reduce the gap for tighter layout */
  }

  .left-column, .right-column {
    width: 100%; /* Make each column take full width */
    display: flex;
  }

  .right-column{
    margin-top: -70px;

  }

  .image-container img {
    width: 100%; /* Ensure image spans the full width of its container */
    height: auto; /* Maintain aspect ratio */
  }

  .book-appointment-button {
    font-size: 14px; /* Adjust font size to maintain usability */
    padding: 8px 16px; /* Adjust padding for smaller screen */
  }

  .action-items {
    align-items: center; /* Center align the items */
    gap: 5px; /* Reduce the gap between items */
  }

  .text-content {
    padding: 5px; /* Reduce padding to save space */
  }

  .text-content h1 {
    font-weight: 400px;
    font-size: 25px;
  }

  .text-content p {
    font-size: 14px; /* Smaller font size for paragraphs */
  }

  .content-box, .content-box2 {
    padding: 15px; /* Adjust padding inside content boxes */
    
  }

  .social-media-icons i {
    font-size: 32px; /* Reduce icon size to fit better */
  }
}

</style>
