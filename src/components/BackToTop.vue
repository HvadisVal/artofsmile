<template>
  <div v-show="isVisible" class="back-to-top" @click="scrollToTop">
    ↑
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.toggleVisibility);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.toggleVisibility);
  },
  methods: {
    toggleVisibility() {
      this.isVisible = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #22A7DF;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 4px 4px 8px -2px #22A7DF;
  z-index: 1000; /* Add a higher z-index value */
}
</style>