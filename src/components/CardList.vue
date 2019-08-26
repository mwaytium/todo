<template>
    <div>
        <ul>
            <Card v-for="card in allCards" v-bind="card" v-bind:key="card.key"/>
            <Preloader v-if="preloader"/>
        </ul>
    </div>
</template>

<script>
    import Card from "./Card";
    import Preloader from "./Preloader";

    export default {
        name: "CardList",
        components: {
            Card,
            Preloader
        },
        computed: {
            allCards() {
                return this.$store.getters.allCards;
            },
            pageNumber() {
                return this.$route.params.pageNumber;
            },
            preloader() {
                return this.$store.getters.preloader;
            }
        },
        watch: {
            '$route' (to, from) {
                this.$store.commit('setPage', this.pageNumber);
                this.$store.dispatch('getCards', this.pageNumber);
            }
        },
        beforeCreate() {
            this.$store.commit('switchPreloader', true);
        },
        async created() {
            await this.$store.dispatch('updateCardsIndex');
            this.$store.dispatch('bindCardsSnapshot');
            this.$store.commit('setPage', this.pageNumber);
            await this.$store.dispatch('getCards');
        },
        
    }
</script>

<style scoped>
    ul {
        position: relative;
        margin: 0;
        padding: 0;
        list-style: none;
        min-height: 480px;
    }
</style>
