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
    addVisit(visit) {
      var data = this.$localStorage.get('visits')
      if (data != null) {
        data = [...data, visit]
      } else {
        data = [visit]
      }
      this.$localStorage.set('visits', data)
      this.visits = data;
    },
    deleteVisit(id) {
      var data = this.$localStorage.get('visits')
      console.log("id: " + id)
      console.log(data)
      if (data != null) {
        data = data.filter((visit) => visit.id !== id)
      }
      this.$localStorage.set('visits', data)
      this.visits = data;
    },
    toggleReminder(id) {
      //get the task we want to toggle
      const visitToToggle = this.fetchVisit(id);
      console.log(visitToToggle)
      //update it
      var data = this.$localStorage.get('visits')
      if (data != null) {
        data = data.map((visit) =>
        visit.id === id ? { ...visit, reminder: !visit.reminder } : visit
      );
      }
      this.$localStorage.set('visits', data)
      this.visits = data;
    },
    fetchVisits() {
      var data = this.$localStorage.get('visits')
      return data;
    },
    fetchVisit(id) {
      var data = this.$localStorage.get('visits')
      console.log(data)
      return data.find(visit => visit.id === id);
    },
  },
  async created() {
    this.visits = await this.fetchVisits();
  },
};
</script>