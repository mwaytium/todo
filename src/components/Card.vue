<template>
    <li>
        <div class="card">
            <div @dblclick="edit(description)" class="text">{{ description }}</div>
            <input  ref="input" @blur="saveCard(description)" @keyup.esc="discard()"  v-if="show" type="text" v-model="currentText">
            <div class="delete">
                <button v-on:click="deleteCard">✖</button>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "Card",
        props: {
            id: String,
            description: String,
        },
        data() {
            return {
                show: false,
                currentText: '',
                isEdited: true
            }
        },
        methods: {
            edit(description) {
                this.currentText = description;
                this.show = true;
                this.$nextTick(function () {
                    this.$refs.input.focus();
                });
            },
            saveCard(description) {
                if (!this.isEdited) {
                    this.isEdited = true;
                    return;
                }
                this.$store.dispatch('update', { id: this.id, description: this.currentText });
                this.show = false;
            },
            discard() {
                this.isEdited = false; 
                this.show = false;
            },
            deleteCard() {
                this.$store.dispatch('delete', this.id);
            }
        }
    }
</script>

<style scoped>
    .text, input {
        font-size: 16px;
        padding: 15px 0 15px 20px;
    }
    .card {
        display: flex;
        position: relative;
        flex-direction: row;
    }
    .text {
        flex-grow: 7;
    }
    .delete {
        display: flex;
        position: relative;
        margin: 0;
        padding: 0;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
    }
    button {
        display: none;
        font-size: 18px;
        border: none;
        color: lightgray;
        background-color: inherit;
        margin: auto;
        padding: 0;
    }
    .card:hover button {
        display: block;
        position: absolute;
        cursor: pointer;
    }
    button:hover {
        color: red;
    }
    input {
        position: absolute;
        width: 84%;
    }
</style>
