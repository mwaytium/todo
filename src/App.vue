<template>
    <div id="app">
        <Header />
        <router-view></router-view>
        <Paginator />
    </div>
</template>

<script>
    import Header from "./components/Header";
    import CardList from "./components/CardList";
    import Paginator from "./components/Paginator";

    export default {
        name: 'app',
        components: {CardList, Header, Paginator},
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        flex-direction: column;
        max-width: 550px;
        margin: 50px auto;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }
    @media screen and (max-width: 576px) {
        #app {
            margin: auto;
            width: 100%;
            min-width: 500px;
            max-width: none;
            box-shadow: none;
        }        
    }
</style>
