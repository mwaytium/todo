<template>
    <div>
        <input @keyup.enter="save" v-model="text" type="text" placeholder="Enter your text here and press 'Enter'">
        <button @click="save">+</button>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                text: ''
            }
        },
        methods: {
            async save() {
                await this.$store.dispatch('create', { 
                    description: this.text,
                    date: Date.now()});
                this.text = '';
                if (this.$route.params.pageNumber != 1) {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style scoped>
    div {
        position: relative;
    }
    input {
        width: 90%;
        height: 20px;
        border: none;
        padding: 5% 6% 5% 4%;
        font-size: 18px;
        font-style: italic
    }
    input::placeholder {
        color: lavender;
    }
    button {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        font-size: 50px;
        border: none;
        background: none;
        color: green;
        opacity: .1;
        cursor: pointer;
    }
    button:hover {
        opacity: 1;
    }
</style>
