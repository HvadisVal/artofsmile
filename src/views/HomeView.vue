<template>
  <div class="home-container">
    <div class="left-column">
      <div class="image-container">
        <img src="@/assets/dentist.jpg" alt="Dentist working on patient">
      </div>
    </div>
    <div class="right-column">
      <div class="content-box">
        <div class="text-content">
          <h1>A powerful way to straighten your smile</h1>
          <p>There’s no need for metal brackets or wires or long NHS waiting lists. With Invisalign® treatment, we can straighten your smile quickly, discreetly and accurately using virtually invisible aligners.</p>
          <div class="action-items">
            <div class="phone-number">
              0789 837 8372
            </div>
            <button @click="toggleModal" class="book-appointment-button">Book Appointment</button>
          </div>
        </div>
      </div>
      <div class="content-box2">
        <h2>Follow us on Social Media</h2>
        <div class="social-media-icons">
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <a href="https://tiktok.com" target="_blank">TikTok</a>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';

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
.home-container {
  display: flex;
  justify-content: center;
  /*align-items: center;*/
 /* padding: 20px; */
  gap: 26px; /* Adds space between the image and the content box */
}
.left-column {
  flex: 1; /* Control width as needed */
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.image-container img {
  width: 100%;
  /* max-width: 600px; */ /* Adjust the width as needed */ 
  height: auto; /* Maintain aspect ratio */
}

.content-box {
    display: flex;
  flex-direction: column;
  justify-content: space-between; /* Aligns text content to center and action items to bottom */
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  width: 100%;
  max-width: 600px; /* Ensures the box does not grow too large */
  height: 70%;
}

.content-box2 {
    display: flex;
  flex-direction: column;
  justify-content: space-between; /* Aligns text content to center and action items to bottom */
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  width: 100%;
  max-width: 600px; /* Ensures the box does not grow too large */
  height: 30%;
}
.text-content {
  flex-grow: 1; /* Allows text content to expand and push action items to the bottom */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically centers the text in the available space */
}

.action-items {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}

.phone-number {
  display: flex;
  align-items: center;
  gap: 10px;
}

.social-media {
  margin-top: 20px;
  text-align: center;
}

.icons a {
  margin: 0 10px;
}

.icons img {
  width: 40px; /* Adjust the size of the social media icons */
}

.social-media-icons  {
  display: flex ;
    justify-content: space-evenly;
  margin-top: 5px;
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
  height: 50%;
  width: 40%;
  padding: 12px 20px;
  background: transparent;
  border: 2px solid #00171F;
  border-radius: 40px;
  font-size: 1.2em;
  color: #fff;
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
  font-weight: bold;
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
}

.book-appointment-button:hover {
  background-color: #22A7DF; /* Hover color for appointment button */
  color: #00171F;
}
</style>
