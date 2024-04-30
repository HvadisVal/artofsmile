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
  <form @submit.prevent="submitAppointment">
    <input type="text" v-model="appointment.name" placeholder="Name" required>
    <input type="email" v-model="appointment.email" placeholder="Email" required>
    <input type="text" v-model="appointment.phone" placeholder="Phone Number" required>
    <textarea v-model="appointment.notes" placeholder="Additional Notes"></textarea>
    <button type="submit">Book Appointment</button>
  </form>
</template>
