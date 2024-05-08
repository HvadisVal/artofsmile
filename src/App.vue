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

</script>

<template>
  <header>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
 <RouterLink to="/navguard" v-if="isLoggedIn">Appointments</RouterLink>
       <RouterLink to="/login" v-if="!isLoggedIn">Login</RouterLink> <!-- Visible only when not logged in -->
        <button @click="logOut" v-if="isLoggedIn">Log Out</button> <!-- Visible only when logged in -->
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

</style>
