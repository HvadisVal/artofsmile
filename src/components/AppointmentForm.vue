<template>
  <div>
    <form @submit.prevent="submitAppointment">
      <input type="text" v-model="appointment.name" placeholder="Name" required>
      <input type="email" v-model="appointment.email" placeholder="Email" required>
      <input type="text" v-model="appointment.phone" placeholder="Phone Number" required>
      <textarea v-model="appointment.notes" placeholder="Additional Notes"></textarea>
      <button type="submit">Book Appointment</button>
    </form>
  </div>
</template>

<script>
//import { db } from '../firebase/init';

export default {
  data() {
    return {
      appointment: {
        name: '',
        email: '',
        phone: '',
        notes: ''
      }
    };
  },
  methods: {
    submitAppointment() {
      db.collection('appointments').add(this.appointment)
        .then(() => {
          alert('Appointment booked successfully!');
        })
        .catch(error => {
          alert('Error: ' + error.message);
        });
    }
  }
}
</script>
