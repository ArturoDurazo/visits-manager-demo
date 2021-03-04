<template>
<div @dblclick="$emit('toggle-reminder', visit.id)" :class="[visit.reminder ? 'reminder' : '', 'visit']">
    <h3>{{visit.text}}
        <i @click="$emit('delete-visit', visit.id)" class="fas fa-times"></i>
    </h3>
    <p>{{visit.day}}</p>
</div>
    
</template>

<script>
export default {
    name: 'Visit',
    props: {
        visit: Object
    },
}
</script>

<style scoped>
.fas {
  color: red;
}
.visit {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.visit.reminder {
  border-left: 5px solid green;
}
.visit h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>