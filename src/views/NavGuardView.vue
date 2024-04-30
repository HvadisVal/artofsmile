<template>
  <div>
    <h1>Appointments</h1>
    <div>
      <button @click="archiveSelected">Archive Selected</button>
      <button @click="reactivateSelected">Reactivate Selected</button>
      <button @click="deleteSelected">Delete Selected</button>
    </div>
    <button @click="showOnlyActive">Show Active</button>
    <button @click="showOnlyArchived">Show Archived</button>
    <!-- Master checkbox to select/deselect all -->
    <div>
      <input type="checkbox" @change="toggleAll" :checked="areAllSelected"/>
      <label>Select/Deselect All</label>
    </div>
    
    <ul v-if="filteredAppointments.length">
      <li v-for="appointment in filteredAppointments" :key="appointment.id" :class="{ archived: appointment.isArchived }">
        <!-- Individual checkbox for each appointment -->
        <input type="checkbox" v-model="selectedAppointments" :value="appointment.id"/>
        <p><strong>Name:</strong> {{ appointment.name }}</p>
        <p><strong>Email:</strong> {{ appointment.email }}</p>
        <p><strong>Phone:</strong> {{ appointment.phone }}</p>
        <p><strong>Existing Notes:</strong> {{ appointment.notes }}</p>
        <ul>
          <li v-for="(note, index) in appointment.myNotes" :key="index">
            {{ note }} 
            <button @click="deleteMyNote(appointment.id, index)">X</button>
          </li>
        </ul>
        <input type="text" v-model="appointment.newMyNote" placeholder="Add new personal note" />
        <button @click="addMyNote(appointment.id, appointment.newMyNote)">Add My Note</button>
      </li>
    </ul>
    <p v-else>No appointments to display.</p>
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

    const showOnlyActive = () => {
      displayArchived.value = false;
    };

    const showOnlyArchived = () => {
      displayArchived.value = true;
    };

    onUnmounted(() => {
      unsubscribe();
    });

    return {
      filteredAppointments,
      selectedAppointments,
      areAllSelected,
      toggleAll,
      addMyNote,
      deleteMyNote,
      archiveSelected,
      reactivateSelected,
      showOnlyActive,
      showOnlyArchived
    };
  }
};
</script>

<style>
/* Your existing styles */
//.archived {
  background-color: #f8f9fa;
  color: #6c757d;
}
button, input[type="checkbox"] {
  margin: 10px;
}
</style>
