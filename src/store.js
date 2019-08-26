import Vue from "vue";
import Vuex from 'vuex'
import db from './data/firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cardsIndex: [],
        cards: [],
        lastVisitedPage: 1,
        preloadSwitcher: false
    },
    getters: {
        allCards: state => {
            return state.cards;
        },
        preloader: state => {
            return state.preloadSwitcher;
        },
        countPages: state => {
            return Math.ceil(state.cardsIndex.length / 10);
        }
    },
    mutations: {
        initCardIndex(state, dates) {
            state.cardsIndex = dates;
        },
        changeCardIndex(state, { newIndex, oldIndex, doc, type }) {
            const date = doc.data().date;
            switch (type) {
                case "added":
                    state.cardsIndex.splice(newIndex, 0, date);
                    break;
                case "modified":
                    state.cardsIndex.splice(oldIndex, 1);
                    state.cardsIndex.splice(newIndex, 0, date);
                    break;
                case "removed":
                    state.cardsIndex.splice(oldIndex, 1);
                    break;
            }
        },
        setCards(state, cards) {
            state.cards = cards;
        },
        updateCards(state, {id, description}) {
            for (const key in state.cards) {
                if (state.cards[key].id === id) {
                    state.cards[key].description = description;
                }
            }
        },
        switchPreloader(state, payload) {
            state.preloadSwitcher = payload;
        },
        setPage(state, num) {
            state.lastVisitedPage = num;
        }
    },
    actions: {
        bindCardsSnapshot({ dispatch, commit }) {
            db.collection('cards').orderBy('date', 'desc').onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    const { newIndex, oldIndex, doc, type } = change;
                    if (type == "added" && !Object.values(this.state.cardsIndex).includes(doc.data().date)) {
                        commit('changeCardIndex', { newIndex, oldIndex, doc, type });
                        dispatch('getCards');
                    }
                    if (type == "removed") {
                        commit('changeCardIndex', { newIndex, oldIndex, doc, type });
                        dispatch('getCards');
                    }
                })
            })
        },
        async updateCardsIndex({ commit }) {
            const dates = [];
            const collection = await db.collection('cards').orderBy('date', 'desc').get();
            collection.docs.forEach(doc => {
                dates.push(doc.data().date);
            });
            commit('initCardIndex', dates);
        },
        create({ commit }, { description, date }) {
            db.collection('cards').add({ description, date });
        },
        update({ commit }, { id, description }) {
            db.collection('cards').doc(id).update({ id, description });
            commit('updateCards', { id, description });
        },
        delete({ commit }, id) {
            db.collection('cards').doc(id).delete();
        },
        async getCards({ commit }, pageNumber = +Object.values(this.state.lastVisitedPage)[0]) {
            if (Object.values(this.state.cardsIndex).length == 0) {
                commit('setCards', []);
                commit('switchPreloader', false);
                return;
            }

            commit('switchPreloader', true);
            const cards = [];
            const partOfCollection = await db.collection('cards')
                .orderBy('date', 'desc')
                .startAt(Object.values(this.state.cardsIndex)[(pageNumber - 1) * 10])
                .limit(10);

            partOfCollection.get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    cards.push({ id: doc.id, ...doc.data()});
                })
            });
            commit('setCards', cards);
            setTimeout(() => commit('switchPreloader', false), 300);
        }
    }
})
