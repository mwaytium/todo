<template>
    <div>
        <router-link v-for="n in countPages" :key="n" :class="['btn', { active: isActive }]" :to="`/card/${n}`">{{ n }}</router-link>
    </div>
</template>

<script>
    export default {
        name: "Paginator",
        computed: {
            countPages() {
                return this.$store.getters.countPages;
            },
            isActive() {
                return this.countPages <= 1;
            }
        }        
    }
</script>

<style scoped>
    div {
        text-align: center;
        padding: 20px;
    }
    .btn {
        text-decoration: none;
        color: black;
        outline: none;
        font-size: 18px;
        padding: 5px;
        margin: 2px;
        background-color: lightgray;
        border-radius: .2rem;
    }
    .btn:hover {
        background-color: #3498db;
        color: white;
    }
    .btn:focus {
        border: solid 1px #3498db;
    }
    .active {
        opacity: .2;
    }
</style>
