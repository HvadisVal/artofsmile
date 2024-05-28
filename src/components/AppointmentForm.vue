<script setup>
import { ref, watch, defineProps } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // make sure path is correct
import { defineEmits } from 'vue'

const emit = defineEmits(['success'])
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
              <!-- Contact Information -->
   <div class="contact-info">
      <p><strong>Pentru programări telefonice, apelați: </strong></p>
      <p style="color: #22A7DF;"> <strong>0753610154 </strong> </p>
      <p>Sau</p>
      <p>Completează formularul de programare și noi te vom contacta:</p>
    </div>

             <!-- Appointment Form -->
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



/* Rensponsivnes */

/* Phones (max-width: 400px) */
@media only screen and (max-width: 400px) {
  .appointment-form {
    padding: 15px;
    width:100%;
  }
  
}

/* Tablets (min-width: 601px and max-width: 992px) */
@media only screen and (min-width: 601px) and (max-width: 992px) {
  .appointment-form {
    max-width: 100%; /* Use the maximum available width */
    padding: 20px;
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
