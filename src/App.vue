<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';
import { RouterLink, RouterView } from 'vue-router';

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
  <header>
  <div class="logo">
  <img src="@/assets/DentalLogo.png" alt="Logo"> 
</div>
    <div class="left-container">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/about">About Us</RouterLink>
        <RouterLink to="/contact">Contact Us</RouterLink>
        <RouterLink to="/navguard" v-if="isLoggedIn">Appointments</RouterLink>
       <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink> <!-- Visible only when not logged in -->
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
</template>


<style scoped>
* {
  margin-top: 10px;
}
/* General header styling */
header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center; /* Ensures vertical centering of all items in the header */
    justify-content: space-between; /* Distribute space between children */
  padding: 0 20px; /* Adjust padding as needed */
}

.logo {
  width: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 20px;
}

.left-container {
 width: 60%;
  display: flex;
  justify-content: space-around; /* Changed to space-around for better control */
  align-items: center; /* Aligns items vertically in the center */
}

.nav-link {
  margin: 0 15px; /* Adjust the margin as needed for more or less space */
  text-decoration: none;
  color: #00171F; /* Example color */
  font-size: 16px; /* Example font size */
}

.right-container {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 20px;
}

/* Styling for buttons and links */
button, .nav-link {
  padding: 8px 16px; /* Example padding */
  background-color: transparent; /* No background for text links */
  border: none;
  cursor: pointer;
}

button:hover, .nav-link:hover {
  background-color: #22A7DF; /* Example hover effect */
  color: white; /* Change text color on hover */
}

.logo img {
  max-width: 30%; /* Ensures the logo does not overflow its container */
  height: auto;
}

/* Navigation and button styling */
nav, button {
  display: flex;
  align-items: center;
}

nav a {
  margin-right: 15px; /* Spacing between links */
  text-decoration: none; /* Removes underline from links */
  color: #00171F; /* Color adjusted for better contrast */
  font-size: 16px; /* Font size for navigation links */
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #22A7DF; /* Highlight color for active link */
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
</style>
