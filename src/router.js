import Vue from "vue";
import VueRouter from "vue-router";
import CardList from "./components/CardList"

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/card/:pageNumber', component: CardList },
        { path: '*', redirect: '/card/1'}
    ]
});
