<script setup>
import { ref } from 'vue';
import AppointmentForm from '@/components/AppointmentForm.vue';

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<template>
  <main>
    <h1>Home</h1>
    <button @click="toggleModal">Book Here</button>
    
    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="toggleModal" class="close">&times;</span>
        <AppointmentForm />
      </div>
    </div>
  </main>
</template>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px; /* Adjust based on your preference */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
