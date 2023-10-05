<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import panel from './Panel.vue';

const route = useRoute();
const router = useRouter();
</script>

<template>
    <div class="app">
        <panel />
        <router-view :route="route" />
    </div>
</template>

<style lang="scss">
html body {
    width: 100vw;
    height: 100vh;
    padding: 0px;
    margin: 0px;
    overflow-x: hidden;
    overflow-y: hidden;
    color: var(--text);

    --main-color: #87AADE;
    --accent-color: #0076b3;
    --background-color: #fafafa;
    --main-color-soft: #a9c0e4;
    --text: black;
    --text-negative: white;
}

button {
    background-color: white;
    border: none;
    padding: 0.4rem;
    border-radius: 0.6rem;
    margin: 0.3rem;
    cursor: pointer;
}

button :disabled {
    color: var(--main-color-soft)
}

h1,h2,h3,h4,h5 {
    margin: 0.1rem;
}

h1 {
    font-size: 120%;
    margin: 0px;
}

h2 {
    font-size: 110%;
}

ul {
    margin: 0px;
    padding: 0.2rem;
    li {
        margin: 0px;
        list-style-type: none;
    }
}

#app {
    width: 100%;
    height: 100%;
}

.app {
    font-family: Noto Sans, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background-color);
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}

.widget-landscape {
    background-color: var(--main-color);
    color: white;
    text-align: center;
    width: 4rem;
    height: 4rem;
    display: block;
    box-shadow: boxShadow(0.1rem);
}

.widget-portrait {
    width: calc(100% - 2rem);
    height: auto;
    box-shadow: boxShadow(1rem);
}
</style>
