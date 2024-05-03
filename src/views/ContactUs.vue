<template>
  <div class="contact-us">
    <h1>Contact Us</h1>
    <div class="contact-content">
      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required>

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="form.email" required>

          <label for="message">Message:</label>
          <textarea id="message" v-model="form.message" required></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <div class="contact-info">
        <h3>Our Address</h3>
        <p>123 Example St, City, Country</p>
        <h3>Phone</h3>
        <p>+123 456 7890</p>
        <h3>Email</h3>
        <p>info@example.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Here you would handle form submission, like sending data to a server
      console.log(this.form); // Example of what might be done
      alert('Message sent!');
      this.form = { name: '', email: '', message: '' }; // Reset form after submission
    }
  }
}
</script>

<style scoped>
.contact-us {
  padding: 20px;
  text-align: center;
}

.contact-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
}

.contact-form {
  flex-basis: 50%;
}

.contact-form form {
  display: flex;
flex-direction: clolumn;
align-items: flex-start;
gap: 10px; /* Spacing between each form element */
}

.contact-form label {
margin-bottom: 5px;
font-weight: bold;
}

.contact-form input, .contact-form textarea {
width: 100%; 
padding: 8px;
border: 1px solid #ccc; 
border-radius: 4px; 
}

.contact-form button {
background-color: #0056b3; 
color: white; 
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s;
}

.contact-form button:hover {
background-color: #003d7a; /* Darker blue on hover */
}

.contact-info {
flex-basis: 40%;
text-align: left;
}

.contact-info h3 {
color: #333; /* Dark grey color for subheadings */
margin-top: 0;
}

.contact-info p {
margin-top: 5px;
}

@media (max-width: 1024px) {
.contact-content {
flex-direction: column;
align-items: center;
}

.contact-form, .contact-info {
flex-basis: 100%; 
max-width: 500px; 
margin-bottom: 20px; 
}
}
</style>