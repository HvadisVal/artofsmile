<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure path is correct

const appointment = ref({
  name: '',
  email: '',
  phone: '',
  notes: ''
});

const submitAppointment = async () => {
  try {
    await addDoc(collection(db, 'appointments'), appointment.value);
    emit('success', true);
    appointment.value = { name: '', email: '', phone: '', notes: '' };
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Error: ' + error.message);
  }
}
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitAppointment" class="appointment-form">
      <input type="text" v-model="appointment.name" placeholder="Name" required>
      <input type="email" v-model="appointment.email" placeholder="Email" required>
      <input type="text" v-model="appointment.phone" placeholder="Phone Number" required>
      <textarea v-model="appointment.notes" placeholder="Additional Notes"></textarea>
      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.appointment-form {
  width: 100%;
  max-width: 500px; /* Sets a max-width for the form */
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Adds subtle shadow */
  border-radius: 8px; /* Rounded corners for the form */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between form elements */
}

.appointment-form input,
.appointment-form textarea {
  padding: 10px; /* Padding inside input and textarea */
  border: 2px solid #ccc; /* Light grey border for inputs */
  border-radius: 4px; /* Rounded corners for inputs and textarea */
  font-size: 16px; /* Increases font size for better readability */
  width: 100%; /* Ensures inputs take up available width */
}

.appointment-form textarea {
  height: 120px; /* Sets a fixed height for the textarea */
  resize: none; /* Disables resizing of the textarea */
}

.appointment-form button {
  padding: 10px 20px;
  background-color: #00171F; /* Blue background for the button */
  color: white; /* White text color */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px; /* Matching font size of input for consistency */
  transition: background-color 0.3s;
}

.appointment-form button:hover {
  background-color: #22A7DF; /* Darker shade of blue on hover */
  color: #00171F;
}
</style>
