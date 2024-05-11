<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="modal-content">
      <h2>{{ service.title }}</h2>
      <!-- Lorem ipsum text filling the center -->
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <!-- Close button at the bottom -->
      <button class="book-appointment-button" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted } from 'vue';

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
  z-index: 1000;
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
  width: 50%; /* Maintain width */
  height: 60%; /* Increased height */
  padding: 20px;
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
}

button:hover {
  background-color: #22A7DF;
}

.book-appointment-button {
  margin-top: 20px; /* Additional margin for better spacing */
}

</style>
