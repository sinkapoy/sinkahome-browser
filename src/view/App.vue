<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import panel from './Panel.vue';
import { rootViewModel } from '@/viewmodel/rootViewModel';
const vm = rootViewModel;
const route = useRoute();
</script>

<template>
    <div class="app">
        <panel />
        <router-view class="app__view" :route="route" :widgets="vm.widgets"/>
    </div>
</template>

<style lang="scss">
html, body {
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
    --text: var(--accent-color);
    --text-negative: white;
}

button {
    background-color: white;
    border: none;
    padding: 0.4rem;
    margin: 0.3rem;
    cursor: pointer;

    &:disabled {
    color: var(--main-color-soft)
    }

    &:hover {
        transform: scale(110%);
    }
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

.app {
    font-family: Roboto, Noto Sans, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--background-color);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 1rem;
    overflow-y: scroll;
    height: 100vh;
    width: 100vw;

    &__view{
        padding: 1rem;
    }
}

@keyframes show-container {
    from {
        transform: scale(0%);
    }
    to {
        transform: scale(100%);
    }
}

.container {
    background: var(--main-color, #94B7EB);
    color: var(--text-negative);
    box-shadow: 0.5rem 0.5rem 1.5rem 0rem rgba(0, 0, 0, 0.25);
    transition: 0.35s cubic-bezier(.34,1.56,.4,.98);
    animation:0.35s cubic-bezier(.34,1.56,.4,.98) show-container ;
}

.widget-landscape {
    background-color: var(--main-color);
    color: var(--text-negative);
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
