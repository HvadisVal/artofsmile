<template>
  <div class="container">
    <div class="login-box">
      <h1>Login</h1>
      <!-- Form added here -->
      <form @submit.prevent="logIn">
        <!-- Username and password inputs -->
        <input type="text" v-model="email" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <p v-if="errMsg">{{ errMsg }}</p>
        <!-- Submit button -->
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>




<script setup>
import { ref } from 'vue'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword } from 'firebase/auth';

import router from '../router'

let email = ref ('')
let password = ref ('')
const errMsg = ref ('')

let logIn = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((data) => {
    console.log("test data", data)
    router.push('/navguard')
  })
  .catch((error) => {
    switch(error.code) {
      case "auth/invalid-email":
        errMsg.value = "Invalid email address format."
        break;
      case "auth/user-disabled":
        errMsg.value = "This user has been disabled."
        break;
      case "auth/user-not-found":
        errMsg.value = "User not found."
        break;
      case "auth/wrong-password":
        errMsg.value = "Invalid password."
        break;
      default:
        errMsg.value = "An undefined error occured."
    }
  })
}
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
  width:100%;
}

.login-box {
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px; /* Adjust font size for better readability */
}

input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #999; /* Light grey placeholder text */
  opacity: 1; /* Firefox */
}

input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #999;
}

input::-ms-input-placeholder { /* Microsoft Edge */
  color: #999;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #00171F;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #02283A;
}

p {
  color: red;
  margin-top: 5px;
}
</style>
