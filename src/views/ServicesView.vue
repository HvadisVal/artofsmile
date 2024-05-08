<template>
  <section class="services-section">
    <h1>Services</h1>
    <p>additional text will be insert here</p>
    <div class="services-container">
      <!-- Row 1 -->
      <div class="service-wrap">
        <div class="service-card">
          <p>Service 1</p>
        </div>
      </div>
      <div class="service-wrap">
        <div class="service-card service-card--reverse">
          <p>Service 2</p>
        </div>
      </div>
      <div class="service-wrap">
        <div class="service-card">
          <p>Service 3</p>
        </div>
      </div>
      <!-- Row 2 -->
      <div class="service-wrap">
        <div class="service-card">
          <p>Service 4</p>
        </div>
      </div>
      <div class="service-wrap">
        <div class="service-card service-card--reverse">
          <p>Service 5</p>
        </div>
      </div>
      <div class="service-wrap">
        <div class="service-card">
          <p>Service 6</p>
        </div>
      </div>
    </div>
  </section>
</template>

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
