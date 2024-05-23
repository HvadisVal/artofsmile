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
          // Adding breakpoints for responsiveness
        breakpoints: {
          // when window width is <= 480px
          480: {
            slidesPerView: 1, // Only one slide per view on small screens
            spaceBetween: 10 // Smaller space between slides
          },
          // Adjust for tablets
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // Default settings
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        },
      },
    };
  },
};


</script>



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
    <swiper-slide><img src="@/assets/gallery/1.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/2.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/3.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/4.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/5.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/6.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/1.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/2.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/3.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/4.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/5.png" alt="Description of image"></swiper-slide>
    <swiper-slide><img src="@/assets/gallery/6.png" alt="Description of image"></swiper-slide>
    <!-- Add more slides as necessary -->
  </swiper>
</template>





<style scoped>

h1{
  text-align: center;
  font-size: 30px;
    font-weight: 600;
    text-align: center;
    margin-top: 40px;
    padding: 10px 0;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
}

/* General Swiper container styling for better spacing and alignment */
.swiper {
  width: 100%; /* Responsive width */
  margin: auto; /* Center align the swiper */
  overflow: hidden; /* Ensures nothing hangs outside the rounded corners */
  padding: 20px 0; /* Extra padding to avoid touching the edges */
}

/* Swiper Slide styling for consistent and appealing appearance */
.swiper-slide {
  display: contents;
  text-align: center; /* Ensures text inside is centered */
  font-size: 18px; /* Adequate font size */
  background: white; /* Light background for the slides */
  padding: 20px; /* Padding inside slides */
  min-height: 300px; /* Set a minimum height to ensure images have room to grow */
  height: 100%; /* Ensuring slide has a height to scale img appropriately */
}

/* Styling for images inside swiper slides */
.swiper-slide img {
  width: 100%; /* Full width of the slide */
  height: auto; /* Maintain aspect ratio */
  max-height: 300px; /* Adjust as needed to ensure visibility and aesthetic */
}

/* Enhancements for navigation buttons */
.swiper-button-prev, .swiper-button-next {
  color: #007bff; /* Theme color for buttons */
  background: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
  padding: 10px; /* Padding for better touch area */
  border-radius: 50%; /* Circular buttons */
}



</style>


