<template>
  <section class="services-section">
    <h1>Services</h1>
    <p>additional text will be insert here</p>
    <div class="services-container">
      <div class="service-wrap" v-for="(service, index) in services" :key="index" @click="selectService(service)">
        <div class="service-card" :class="{ 'service-card--reverse': index % 2 !== 0 }">
          <p>{{ service.title }}</p>
        </div>
      </div>
    </div>
    <ServicesBox :service="selectedService" :visible="modalVisible" @update:visible="modalVisible = $event"/>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ServicesBox from '@/components/ServicesBox.vue';

const services = ref([
  { title: 'Service 1', description: 'Description for Service 1' },
  { title: 'Service 2', description: 'Description for Service 2' },
  { title: 'Service 3', description: 'Description for Service 3' },
  { title: 'Service 4', description: 'Description for Service 4' },
  { title: 'Service 5', description: 'Description for Service 5' },
  { title: 'Service 6', description: 'Description for Service 6' },
]);

const selectedService = ref(null);
const modalVisible = ref(false);

function selectService(service) {
  selectedService.value = service;
  modalVisible.value = true;
}
</script>

<style scoped>
.services-section {
  text-align: center;
  padding: 10vh;
  font-size: 1.5em;
}

.services-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 60px;
  max-width: 1200px;
  margin: auto;
  padding-top: 2vh;
}

.service-wrap {
  flex: 1 1 30%;
  max-width: 30%; /* Max width for each card */
  min-width: 30%; /* Minimum width to prevent cards from getting too small */
  cursor: pointer;
  perspective: 100rem;
  display: flex; /* Ensures flex properties apply to children */
  justify-content: center; /* Center cards within the wrap */
}

.service-card {
  width: 100%;
  height: 50%;
  padding: 4rem;
  border-radius: 10px;
  background: linear-gradient(to bottom, #00171F, #00171F 70%, #00171F);
  transition: background-color 0.6s, transform 0.6s;
  box-shadow: 0 0 3rem 0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #ffffff; /* Adjust text color for visibility */
  font-size: 2.2rem;
}

.service-card--reverse {
  background: linear-gradient(to bottom, #00171F, #00171F 70%, #00171F);
}

.service-wrap:hover .service-card {
  background: linear-gradient(to bottom, #22A7DF, #22A7DF 70%, #22A7DF);
  transform: scale(1.05); /* Adding a scale effect to emphasize hover */
}
</style>
