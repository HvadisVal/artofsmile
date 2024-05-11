<template>
  <div class="nav-guard-container">
    <router-link to="/" class="home-button">Go to Home</router-link>
    <h1>Existing Appointments</h1>
    <div class="controls">
      <button @click="archiveSelected">Archive Selected</button>
      <button @click="reactivateSelected">Reactivate Selected</button>
      <button @click="deleteSelected">Delete Selected</button>
      <div class="controls">
      <button @click="showOnlyActive" :class="displayArchived ? 'default-button' : 'active-button'">{{ displayArchived ? 'Show Active' : 'Active' }}</button>
<button @click="showOnlyArchived" :class="displayArchived ? 'active-button' : 'default-button'">{{ displayArchived ? 'Archived' : 'Show Archived' }}</button>

    </div>
    </div>
    <div class="table">
      <div class="table-header">
        <div class="table-cell checkbox">
          <input type="checkbox" @change="toggleAll" :checked="areAllSelected"/>
          <label>Select/Deselect All</label>
        </div>
        <div class="table-cell">Name</div>
        <div class="table-cell">Email</div>
        <div class="table-cell">Phone</div>
        <div class="table-cell">Existing Notes</div>
        <div class="table-cell">Additional Notes</div>
      </div>
      <div class="table-row" v-for="appointment in filteredAppointments" :key="appointment.id" :class="{ archived: appointment.isArchived }">
        <div class="table-cell checkbox">
          <input type="checkbox" v-model="selectedAppointments" :value="appointment.id"/>
        </div>
        <div class="table-cell">{{ appointment.name }}</div>
        <div class="table-cell">{{ appointment.email }}</div>
        <div class="table-cell">{{ appointment.phone }}</div>
        <div class="table-cell">{{ appointment.notes }}</div>
        <div class="table-cell">
          <ul>
            <li v-for="(note, index) in appointment.myNotes" :key="index">
              {{ note }} <button @click="deleteMyNote(appointment.id, index)">X</button>
            </li>
          </ul>
          <input type="text" v-model="appointment.newMyNote" placeholder="Add new personal note" />
          <button @click="addMyNote(appointment.id, appointment.newMyNote)">Add My Note</button>
        </div>
      </div>
    </div>
    
  </div>
</template>


<script>
import { ref, computed, onUnmounted } from 'vue';
import { db } from '@/firebase';
import { collection, onSnapshot, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
  setup() {
    const appointments = ref([]);
    const displayArchived = ref(false);
    const selectedAppointments = ref([]);

    const appointmentsCollectionRef = collection(db, 'appointments');
    const q = query(appointmentsCollectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      appointments.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        newMyNote: '',
        myNotes: doc.data().myNotes || [],
        ...doc.data()
      }));
    });

    const filteredAppointments = computed(() => {
      return appointments.value.filter(appointment => displayArchived.value ? appointment.isArchived : !appointment.isArchived);
    });

    const areAllSelected = computed(() => {
      return filteredAppointments.value.length && filteredAppointments.value.every(app => selectedAppointments.value.includes(app.id));
    });

    const toggleAll = () => {
      if (areAllSelected.value) {
        selectedAppointments.value = [];
      } else {
        selectedAppointments.value = filteredAppointments.value.map(app => app.id);
      }
    };



     // Show only active (non-archived) appointments
    const showOnlyActive = () => {
      displayArchived.value = false;
      console.log("Active View: ", displayArchived.value); // Debugging
    };

    // Show only archived appointments
    const showOnlyArchived = () => {
      displayArchived.value = true;
      console.log("Archived View: ", displayArchived.value); // Debugging
    };


    const deleteSelected = async () => {
      if (selectedAppointments.value.length) {
        const deletionPromises = selectedAppointments.value.map(id => {
          return deleteDoc(doc(db, 'appointments', id));
        });
        try {
          await Promise.all(deletionPromises);
          console.log('Selected appointments deleted successfully');
          // Refresh or fetch the data again here if needed
        } catch (error) {
          console.error('Error deleting appointments:', error);
        }
      } else {
        console.log('No appointments selected for deletion');
      }
    };

    const addMyNote = async (appointmentId, note) => {
      const appointmentDocRef = doc(db, 'appointments', appointmentId);
      if (note.trim() !== '') {
        const existingAppointment = appointments.value.find(appt => appt.id === appointmentId);
        if (!existingAppointment) {
          console.error('Appointment not found!');
          return;
        }
        const updatedNotes = [...existingAppointment.myNotes, note];
        await updateDoc(appointmentDocRef, {
          myNotes: updatedNotes
        }).then(() => {
          console.log('Note added:', note);
        }).catch(error => {
          console.error('Error adding note:', error);
        });
      } else {
        console.log('Empty note was not added');
      }
    };

    const deleteMyNote = async (appointmentId, noteIndex) => {
      const appointmentDocRef = doc(db, 'appointments', appointmentId);
      const existingAppointment = appointments.value.find(appt => appt.id === appointmentId);
      if (!existingAppointment) {
        console.error('Appointment not found!');
        return;
      }
      const updatedNotes = existingAppointment.myNotes.filter((note, index) => index !== noteIndex);
      await updateDoc(appointmentDocRef, {
        myNotes: updatedNotes
      }).then(() => {
        console.log('Note deleted at index', noteIndex);
      }).catch(error => {
        console.error('Error deleting note:', error);
      });
    };

   const bulkUpdate = async (field, value) => {
  if (!selectedAppointments.value.length) {
    console.log("No appointments selected for operation:", value ? "archiving" : "reactivating");
    operationMessage.value = "No appointments selected.";
    operationError.value = true;
    return;
  }
  console.log(`Attempting to ${value ? 'archive' : 'reactivate'} selected appointments:`, selectedAppointments.value);
  const updates = selectedAppointments.value.map(id => {
    const docRef = doc(db, 'appointments', id);
    return updateDoc(docRef, { [field]: value });
  });
  try {
    await Promise.all(updates);
    operationMessage.value = `All selected appointments have been ${value ? 'archived' : 'reactivated'}`;
    operationError.value = false;
    // Refresh the appointments to reflect changes
    selectedAppointments.value = [];
  } catch (error) {
    operationMessage.value = 'Error updating documents: ' + error.message;
    operationError.value = true;
    console.error('Error updating documents: ', error);
  }
};

    const archiveSelected = () => bulkUpdate('isArchived', true);
    const reactivateSelected = () => bulkUpdate('isArchived', false);


    onUnmounted(() => {
      unsubscribe();
    });

    return {
      filteredAppointments,
      selectedAppointments,
      areAllSelected,
      toggleAll,
      deleteSelected,
      addMyNote,
      deleteMyNote,
      archiveSelected,
      reactivateSelected,
      displayArchived,
      showOnlyActive,
      showOnlyArchived
    };
  }
};
</script>

<style scoped>
/* Styling the main container for appointments */
.nav-guard-container {
  margin-top: 100px;
  padding-top: 10px;
  font-family: Arial, sans-serif;
  background-color: #fff; /* Light background for better readability */
  border-radius: 10px; /* Rounded corners similar to modal */
  border: 2px solid #00171F; /* Solid border like a modal */
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Subtle shadow for depth */
}

.nav-guard-container h1 {
  text-align: center; /* Centers text horizontally */
 
  transform: translateY(-50%); /* Adjusts the position up by 50% of its own height to center it perfectly */
}

/* Controls section styling with buttons inspired by modal buttons */
.controls {
  text-align: center; /* Center the control buttons */
  margin-bottom: 20px; /* Space between controls and table */
}

.controls button {
  padding: 10px 20px;
  background-color: #00171F;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px; /* Space between buttons */
}

.controls button:hover {
  background-color: #22A7DF; /* Lighter color on hover */
}

/* Table layout styling, inspired by clear modal content areas */
.table {
  display: flex;
  flex-direction: column;
  padding: 20px; /* Adequate padding for clarity */
}

.table-header, .table-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.table-cell {
  flex: 1;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd; /* Adds a subtle line between rows */
}

.table-cell.checkbox {
  flex: 0 0 50px; /* Fixed width for checkbox column */
}



/* Input and checkbox adjustments */
input[type="checkbox"], input[type="text"] {
  margin-right: 5px;
}

input[type="text"] {
  width: calc(100% - 20px); /* Full width minus padding */
  padding: 10px; /* Consistent padding for input fields */
}

/* Button styling within the table for actions like delete and add note */
.table button {
  padding: 8px 16px;
  margin-top: 10px; /* Space above button for clarity */
  background-color: #00171F;
  color: white;
  border: none;
  border-radius: 5px;
}

.table button:hover {
  background-color: #22A7DF;
}

/* Style for the home button at the top for navigation */
.home-button {
  padding: 10px 20px;
  background-color: #007bff; /* Blue color for standout home button */
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px; /* Separate from the rest of the content */
}

.home-button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}


.controls {
  padding-top:10px;
}

/* Additional button styling */
button {
  padding: 10px 20px;
  background-color: #00171F; /* Default button background */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px; /* Space between buttons */
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #0056b3; /* Hover state for button */
}

.active-button {
  background-color: #22A7DF !important; /* Different background for active state */
  color: white;
}

.default-button {
  background-color: #00171F; /* Default background color */
  color: white;
}
</style>
