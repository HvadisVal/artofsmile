<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
      <button @click="toggleFaq(index)" class="faq-question">
        {{ faq.question }}
        <span class="faq-icon">{{ faq.open ? '-' : '+' }}</span>
      </button>
      <div v-if="faq.open" class="faq-answer">
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          question: 'What is orthodontics?',
          answer: 'Orthodontics is a specialized branch of dentistry focused on the diagnosis, prevention, and treatment of dental and facial irregularities.',
          open: false
        },
        {
          question: 'At what age should orthodontic treatment begin?',
          answer: 'Orthodontic treatment can begin at any age, but the typical age is between 8 and 14 years due to the developmental stage of the jaws and teeth.',
          open: false
        },
        {
          question: 'How long does orthodontic treatment take?',
          answer: 'The duration of orthodontic treatment can vary based on individual needs, but it typically ranges from 12 to 36 months.',
          open: false
        },
        {
          question: 'Are braces painful?',
          answer: 'Braces can cause discomfort initially and when adjusted, but this discomfort is temporary and usually resolves within a few days.',
          open: false
        },
        {
          question: 'Can adults wear braces?',
          answer: 'Yes, adults can wear braces. Orthodontic treatment is possible at any age as long as the gums and bone structure are healthy.',
          open: false
        },
        // Add more FAQs as needed
      ]
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    }
  }
};
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: auto;
  padding-top: 70px;
}

.faq-question {
  background: #00171F;
  color: #ffffff;
  padding: 10px;
  width: 100%;
  text-align: left;
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  font-size: 18px;
}

.faq-question:hover {
  background: #22A7DF;
}

.faq-icon {
  float: right;
}

.faq-answer {
  padding: 10px;
  background: #f9f9f9;
  margin: 5px 0 10px;
  border-radius: 5px;
}
</style>
