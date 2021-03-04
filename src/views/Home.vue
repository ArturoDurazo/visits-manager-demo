<template>
    <AddVisit 
    v-if="showAddVisit"
    @add-visit="addVisit" 
    />

  <Visits
    @toggle-reminder="toggleReminder"
    @delete-visit="deleteVisit"
    :visits="visits"
  />
</template>

<script>
import Visits from "../components/Visits";
import AddVisit from "../components/AddVisit";

export default {
  name: "Home",
  props: {
      showAddVisit: Boolean,
  },
  components: {
    Visits,
    AddVisit,
  },
  data() {
    return {
      visits: [],
    };
  },
  methods: {
    async addVisit(visit) {
      const res = await fetch("api/visits", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(visit),
      });
      const data = await res.json();
      this.visits = [...this.visits, data];
    },
    async deleteVisit(id) {
      if (confirm("Are you sure?")) {
        const res = await fetch(`api/visits/${id}`, {
          method: "DELETE",
        });
        res.status === 200
          ? (this.visits = this.visits.filter((visit) => visit.id !== id))
          : alert("Error deleting task");
      }
    },
    async toggleReminder(id) {
      //get the task we want to toggle
      const visitToToggle = await this.fetchVisit(id);
      //update it
      const updatedVisit = {
        ...visitToToggle,
        reminder: !visitToToggle.reminder,
      };
      //send updated visit on put
      const res = await fetch(`api/visits/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedVisit),
      });
      const data = await res.json();
      //change local array
      this.visits = this.visits.map((visit) =>
        visit.id === id ? { ...visit, reminder: data.reminder } : visit
      );
    },
    async fetchVisits() {
      const res = await fetch("api/visits");

      const data = await res.json();
      return data;
    },
    async fetchVisit(id) {
      const res = await fetch(`api/visits/${id}`);

      const data = await res.json();
      return data;
    },
  },
  async created() {
    this.visits = await this.fetchVisits();
  },
};
</script>