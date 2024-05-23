<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="modal-content">
    <button class="close-button" @click="close">×</button> 

      <h2>{{ service.title }}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  
      <!-- Trigger Button for Appointment Form Modal -->
      <button @click="bookAppointment">Book Appointment</button>

    </div>
  </div>
  <!-- Appointment Form Modal -->
  <appointment-form v-if="showAppointmentForm" @close="showAppointmentForm = false" :initial-service="service.title" />
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';
import { bus } from '@/utils/eventBus';


function bookAppointment() {
   bus.emit('toggleAppointmentModal', props.service.title);
}

const props = defineProps({
  service: Object,
  visible: Boolean
});
const emits = defineEmits(['update:visible']);

// Simulate persistence by reacting to changes
onMounted(() => {
  if(localStorage.getItem('modalVisible') === 'true') {
    emits('update:visible', true);
  }
});

function close() {
  emits('update:visible', false);
  localStorage.setItem('modalVisible', 'false');
}
</script>

<style scoped>
.modal {
  position: fixed;
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
  z-index: 10;  /* Lower z-index within the modal context */
  width: 50%; /* Maintain width */
  padding: 30px;
  background: #fff;
  border: 2px solid #00171F;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  overflow-y: auto;
}

button {
  padding: 10px 20px;
  background-color: #00171F;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: auto; /* Adjust button width */
  margin-top: auto; /* Keeps button at bottom */
  margin: 15px;
}

button:hover {
  background-color: #22A7DF;
}

.book-appointment-button {
  margin-top: 20px; /* Additional margin for better spacing */
}

.close-button {
    position: absolute;
  top: 10px; /* Adjust to position closer to the top-right corner */
  right: 10px; /* Adjust to position closer to the top-right corner */
  font-size: 24px; /* Make the 'X' larger */
  border: none; /* No border */
  background: none; /* No background */
  color: #00171F; /* Same color theme */
  cursor: pointer;
  font-size: 28px;
  font-weight: 700;
}

.close-button:hover,
.close-button:focus {
  color: #22A7DF;
  text-decoration: none;
  cursor: pointer;
  background: none; /* No background */
}

@media (max-width: 777px)  {
  .modal-content {
    width: 80%;
  }
}
@media (min-width: 778px)  {
  .modal-content {
    width: 50%;
  }
}
@media (min-width: 1200px)  {
  .modal-content {
    width: 50%;
  }
}
</style>
