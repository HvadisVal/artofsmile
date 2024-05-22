<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';
import { RouterLink, RouterView } from 'vue-router';
import Footer from '@/components/Footer.vue';
import { bus } from '@/utils/eventBus';


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

const initialService = ref('');

onMounted(() => {
  bus.on('toggleAppointmentModal', (serviceTitle) => {
  showModal.value = true;
  initialService.value = serviceTitle;  // Ensure this is set before the modal opens
  console.log("Event received with service:", serviceTitle);
});
});

onUnmounted(() => {
  bus.off('toggleAppointmentModal');
});

function handleToggleAppointmentModal() {
  showModal.value = false;
  initialService.value = ''; // Reset after closing the modal
}

const burgerMenuOpen = ref(false);

function toggleBurgerMenu() {
  burgerMenuOpen.value = !burgerMenuOpen.value;
}

</script>


<template>


                                               <!-- Navigation Bar -->


   <header>
    <div class="logo">
  <router-link to="/">
    <img src="@/assets/DentalLogo.png" alt="Logo">
  </router-link>
</div>
    <button @click="toggleBurgerMenu" class="burger-menu">&#9776;</button>
    <div v-if="burgerMenuOpen" class="burger-menu-modal">
      <button @click="toggleBurgerMenu" class="close-button">&times;</button>
      <nav class="burger-nav">
        <RouterLink to="/" @click="toggleBurgerMenu">Home</RouterLink>
        <RouterLink to="/services" @click="toggleBurgerMenu">Services</RouterLink>
        <RouterLink to="/about" @click="toggleBurgerMenu">About</RouterLink>
        <RouterLink to="/contact" @click="toggleBurgerMenu">Contact</RouterLink>
        <RouterLink to="/navguard" v-if="isLoggedIn" @click="toggleBurgerMenu">Appointments</RouterLink>
        <RouterLink to="/login" v-if="!isLoggedIn" @click="toggleBurgerMenu">Login</RouterLink>
        <button v-if="isLoggedIn" @click="logOut">Log Out</button>
      </nav>
    </div>
    <div class="left-container">
      <nav class="navigation">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/navguard" v-if="isLoggedIn">Appointments</RouterLink>
        <RouterLink to="/login" v-if="!isLoggedIn" class="login-button">Login</RouterLink>
        <button @click="logOut" v-if="isLoggedIn">Log Out</button>
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



/* Navigation bar */

header {
  display: flex;
  justify-content: space-between;
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
  gap: 20px
}

.left-container a, .left-container button {
  text-decoration: none;
  font-family: 'poppins', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #00171F;
  margin: 0 15px;
}

.left-container button{
  color: #FAF9F6;
}

.left-container a:hover, .left-container button:hover {
  color: #22A7DF;
}

.right-container {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 60px;
}

.book-appointment-button {
  padding: 10px 20px;
  background-color: #00171F; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.book-appointment-button:hover {
  background-color: #22A7DF; 
}



/* BurgerMenu Open */

@media (min-width: 1070px) {
.burger-menu {
  display: none; /* Initially hidden */
}

.burger-menu-modal {
  display: none; /* Managed by Vue's v-if */
}
}


@media (max-width: 1070px) {

header {
    justify-content: center; /* Centers all elements */
  }

  .left-container {
    display: none;
  }

  .right-container {
    order: 2; /* Push to the end */
    flex: 1; /* Allow to take available space */
    justify-content: flex-end; /* Align the button to the right */
  }

.book-appointment-button {
    order: 1; /* Center this button */
  }

  .burger-menu {
    display: block;
    order: 3; /* Position after the appointment button */
    margin-left: 20px; /* Space between the button and the menu */
    margin-right: 60px;
  }

.burger-menu-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.burger-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.burger-nav a, .burger-nav button {
  padding: 15px;
  font-size: 24px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  color: #00171F;
  text-decoration: none;
}

.burger-nav button{
  color: #FAF9F6;
}

.burger-nav a:hover, .burger-nav button:hover {
  color:#22A7DF;
  background: none;

}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 28px;
  font-weight: 700;
  color: #00171F;
  background: none;
  border: none;
  cursor: pointer;
}

.close-button:hover, .close-button:focus {
  color: #22A7DF;
  background: none;

} }

@media (max-width: 500px) {
.burger-menu {
    margin-left: -42px; /* Space between the button and the menu */
  }
 .modal-content {
 width: 80%;
    height: 700px;
    font-size: inherit;  
}
}

@media (max-width: 400px) {
.burger-menu {
    margin-left: -55px; /* Space between the button and the menu */
  }}

@media (max-width: 1190px) {
.left-container button{
  margin-right: -40px;
  margin-left: -10px;
}}
  
  @media (min-width: 600px) {
 .modal-content {
 width: 50%;
    height: 700px;
    font-size: inherit;  
}}


</style>
