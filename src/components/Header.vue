<template>
    <header>
        <h1>{{ title }}</h1>
        <Button 
        v-show="homePage" 
        @toggle-add-visit="$emit('toggle-add-visit')" 
        :text="showAddVisit ? 'Close' : 'Add Visit'" 
        :color="showAddVisit ? 'red' : 'green'" 
        />
    </header>
</template>

<script>
import Button from './Button'

    export default {
        name: 'Header',
        props: {
            title: String,
            showAddVisit: Boolean
        },
        components:{
            Button
        },
        computed: {
            homePage() {
                if(this.$route.path === '/'){
                    return true
                }else{
                    return false
                }
            }
        }
    }
    
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>