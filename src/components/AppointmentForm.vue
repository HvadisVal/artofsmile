<script setup>
import { ref, watch, defineProps } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure path is correct

const props = defineProps({
  initialService: String
});

const appointment = ref({
  name: '',
  email: '',
  phone: '',
  notes: '',
  service: '' // Initial value for the service
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

// Watch for changes to initialService prop to set the default service
watch(() => props.initialService, (newService, oldService) => {
  if (newService) {
    appointment.value.service = newService;
  }
}, { immediate: true });


const submitAppointment = async () => {
  try {
    await addDoc(collection(db, 'appointments'), appointment.value);
    emit('success', true);
    appointment.value = { name: '', email: '', phone: '', notes: '', service: '' };
    console.log('Appointment booked successfully!');
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
        <!-- Dropdown for selecting service, with preselected value if provided -->
      <select v-model="appointment.service" required>
        <option disabled value="">Please select a service</option>
        <option v-for="service in services" :key="service.title" :value="service.title">{{ service.title }}</option>
      </select>
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
  margin-left: 20px;
      box-shadow: 4px 4px 8px -2px #22A7DF;
}

.appointment-form button:hover {
  background-color: #22A7DF; /* Darker shade of blue on hover */
  color: #00171F;
}
</style>
