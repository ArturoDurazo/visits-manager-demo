<template>
    <div :key="visit.id" v-for="visit in visits">
        <Visit @toggle-reminder="$emit('toggle-reminder', visit.id)" 
        @delete-visit="$emit('delete-visit', visit.id)" 
        :visit="visit" />
    </div>
</template>

<script>
import Visit from './Visit'
export default {
    name: 'Visits',
    props: {
        visits: Array
    },
    components: {
        Visit
    },
    emits: ['delete-visit','toggle-reminder'],
}
</script>