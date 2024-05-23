<script setup>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure path is correct

const appointment = ref({
  name: '',
  email: '',
  phone: '',
  notes: '',
  service: ''
});

const services = ref([
    { title: 'Service 1', description: 'Description for Service 1' },
    { title: 'Service 2', description: 'Description for Service 2' },
    { title: 'Service 3', description: 'Description for Service 3' },
    { title: 'Service 4', description: 'Description for Service 4' },
    { title: 'Service 5', description: 'Description for Service 5' },
    { title: 'Service 6', description: 'Description for Service 6' },
    { title: 'Other', description: 'Other Services' }
]);

const submitAppointment = async () => {
  try {
    await addDoc(collection(db, 'appointments'), appointment.value);
    emit('success', true);
    appointment.value = { name: '', email: '', phone: '', notes: '', service: '' };
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Error: ' + error.message);
  }
}
</script>

<template>
<div class="container">
<h1>Contact Us</h1>
  <div class="form-container">
    <form @submit.prevent="submitAppointment" class="appointment-form">
      <input type="text" v-model="appointment.name" placeholder="Name" required>
      <input type="email" v-model="appointment.email" placeholder="Email" required>
      <input type="text" v-model="appointment.phone" placeholder="Phone Number" required>
      <textarea v-model="appointment.notes" placeholder="Additional Notes"></textarea>
       <!-- Dropdown for selecting service, with preselected value if provided -->
      <select v-model="appointment.service" required>
        <option disabled value="">Services</option>
        <option v-for="service in services" :key="service.title" :value="service.title">{{ service.title }}</option>
      </select>
      <button type="submit">Book Appointment</button>
    </form>
  </div>
  </div>
</template>

<style scoped>

.container {
  margin-top: 100px;
  margin-bottom: 50px;
}

.form-container {
  display: flex;
  flex-direction: column; /* Ensure the direction is column to stack elements */
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* Provide some top margin for overall spacing */
}

.contact-info {
  text-align: center;
  max-width: 500px; /* Align the width with the form */
}
.contact-info p {
  margin-top: 5px;    /* Reduces the space above each paragraph */
  margin-bottom: 5px; /* Reduces the space below each paragraph */
}

.appointment-form {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 8px;

  box-shadow: 4px 4px 8px -2px #22A7DF;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.appointment-form input,
.appointment-form select,
.appointment-form textarea {
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.appointment-form textarea {
  height: 120px;
  resize: none;
}


.appointment-form select {
  margin-left: 20px; /* Adds left margin to the select element */
  width: calc(100% - 20px); /* Adjust width to maintain form alignment */
}

.appointment-form button {
  padding: 10px 20px;
  background-color: #00171F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-left: 21px;
}

.appointment-form button:hover {
  background-color: #22A7DF;
  color: #00171F;
}
h1 {
text-align: center;
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    
}


/* Rensponsivnes */

/* Phones (max-width: 600px) */
@media only screen and (max-width: 600px) {
  .appointment-form {
    padding: 15px;
    width:100%;
  }
  .appointment-form input,
.appointment-form textarea {
  width: 95%;
  }
  .appointment-form select,
  .appointment-form button{
    width: 90%;
  }
}

/* Laptops/Desktops (min-width: 993px) */
@media only screen and (min-width: 993px) {
  .appointment-form {
    max-width: 500px; /* Fixed max width for larger screens */
    padding: 40px;
  }
}


</style>
