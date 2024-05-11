<template>
<h1>Before & After Gallery</h1>
  <swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    navigation
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <!-- Proper HTML tag for images -->
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
     <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/dentist.jpg" alt="Description of image"></swiper-slide>
    <!-- Add more slides as necessary -->
  </swiper>
</template>

<script>
// Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination,  A11y, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, A11y, Autoplay], // include Autoplay module here
      swiperOptions: {
        slidesPerView: 5,
        spaceBetween: 5,
        loop: true,
        navigation: true,
       
        
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
      },
    };
  },
};
</script>




<style scoped>

h1 {
display: flex;
    justify-content: center;
color: #00171F; 
  font-size: 3.2rem; 
  font-weight: 600; 
  text-align: center; 
  margin-bottom: 20px;
  padding: 10px 0; 
  margin-left: auto; 
  margin-right: auto; 
}

/* General Swiper container styling for better spacing and alignment */
.swiper {
  width: 100%; /* Responsive width */
  /*max-width: 960px;*/ /* Maximum width to ensure it doesn't look too stretched on larger screens */
  margin: auto; /* Center align the swiper */
  /*box-shadow: 0 4px 15px rgba(0,0,0,0.2);*/ /* Subtle shadow for depth */
  border-radius: 8px; /* Rounded corners for a softer look */
  overflow: hidden; /* Ensures nothing hangs outside the rounded corners */
  height: auto;
}

/* Swiper Slide styling for consistent and appealing appearance */
.swiper-slide {
  display: flex; /* Flexbox for better control of items inside the slide */
  justify-content: center; /* Center horizontal alignment */
  align-items: center; /* Center vertical alignment */
  text-align: center; /* Ensures text inside is centered */
  font-size: 18px; /* Adequate font size */
  background: white; /* Light background for the slides */
  padding: 20px; /* Padding inside slides */
}

/* Styling for images inside swiper slides */
.swiper-slide img {
  width: 100%; /* Responsive image width */
  height: auto; /* Maintain aspect ratio */
  max-height: 300px; /* Maximum height to keep the swiper uniform */
}

/* Enhancements for navigation buttons */
.swiper-button-prev, .swiper-button-next {
  color: #007bff; /* Theme color for buttons */
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  padding: 10px; /* Padding for better touch area */
  border-radius: 50%; /* Circular buttons */
}

</style>


