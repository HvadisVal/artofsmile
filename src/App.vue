<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';
import { RouterLink, RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';

import { auth } from './firebase.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'

import router from './router'
let isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log('User logged in', auth.currentUser)

    } else {
      isLoggedIn.value = false
      console.log('User logged out', auth.currentUser)

    }
  })
})

let logOut = () => {
  signOut(auth)
  .then(() => {
    console.log('User logged out', auth.currentUser)
    router.push('/login')
  })
  .catch((error) => {
    console.log(error)
  })
}

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


<template>


                                               <!-- Navigation Bar -->


  <header>
<div class="logo">
  <img src="@/assets/DentalLogo.png" alt="Logo"> 
</div>
    <div class="left-container">
    <nav class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/navguard" v-if="isLoggedIn">Appointments</RouterLink>
      <RouterLink to="/login" v-if="!isLoggedIn" class="login-button">Login</RouterLink> <!-- Styled as button -->
      <button @click="logOut" v-if="isLoggedIn">Log Out</button> <!-- Visible only when logged in -->
  </nav>
    </div>
    <div class="right-container">
      <button @click="toggleModal" class="book-appointment-button">Book Appointment</button>
    </div>
  </header>


                                              <!-- Modal -->

  <div v-if="showModal" class="modal" @click.self="toggleModal">
    <div class="modal-content" tabindex="-1">
      <span @click="toggleModal" class="close">&times;</span>
      <AppointmentForm @success="handleSuccess"/>
    </div>
  </div>

  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </Transition>
  </router-view>

                                              <!-- Footer -->
<Footer/>

</template>


<style scoped>

*{
  scroll-behavior: smooth;
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
  background: #faf9f6;
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
      box-shadow: 4px 4px 8px -2px #22A7DF;
}

.book-appointment-button:hover {
  background-color: #22A7DF; /* Hover color for appointment button */
  color: #00171F;
}



/* Navigation bar */
header {
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 40px;
  background-color: #FAF9F6; /* Light gray background as seen in the picture */
  box-shadow: 0 2px 8px #22A7DF;
  width: 100%; /* Ensure the header spans the full width */
  top: 0; /* Align the header at the top of the viewport */
  left: 0; /* Align the header to the left of the viewport */
  position: fixed; /* Fix position relative to the viewport */
  z-index: 1000; /* Higher z-index ensures it stays on top of other content */
}

.logo img {
  height: 60px; /* Adjust the logo size as needed */
}

.left-container {
      display: flex;
    justify-content: end;
    width: 60%;
}

.left-container nav {
  display: flex;
  align-items: center;
  gap: 5%;
}

.left-container a {
  margin: 0 15px;
  text-decoration: none;
  font-family: 'poppins', sans-serif; /* Ensures Poppins is specifically mentioned for clarity */
  font-weight: 400; /* Poppins Regular */
  font-style: normal; /* Ensuring the style is explicitly set to normal */
  color: #00171F; /* Optionally set the color for headings if needed */
}

.left-container a:hover {
  color: #22A7DF;
}

.right-container {
  display: flex;
  align-items: center;
  width: 10%;
    justify-content: end;
}

.book-appointment-button {
  padding: 10px 20px;
  background-color: #00171F; /* Green background color for the button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.book-appointment-button:hover {
  background-color: #22A7DF; /* Slightly darker green on hover */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .left-container nav {
    display: none; /* Optionally hide navigation on smaller screens */
  }

  header {
    justify-content: space-evenly;
  }

  .logo, .right-container {
    flex: 1;
    text-align: center;
  }
}


</style>
