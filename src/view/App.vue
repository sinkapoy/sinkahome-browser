<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import panel from './PanelComponent.vue';
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { VApp } from 'vuetify/components';
const vm = rootViewModel;
const route = useRoute();
</script>

<template>
    <v-app
        class="app"
        :class="vm.portrait ? 'app-portrait' : ''"
    >
        <panel class="panel" />
        <router-view
            class="app__view"
            :route="route"
            :widgets="vm.widgets"
        />
    </v-app>
</template>

<style lang="scss">
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
    height: 100vh; //todo: fix for old browsers
    height: 100dvh;
    width: 100%;

    .v-application__wrap {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 1rem;
        overflow-y: scroll;
        height: 100vh; //todo: fix for old browsers
        height: 100dvh;
    }

    &__view {
        padding: 1rem;
    }
}


.app-portrait {

    // flex-direction: column-reverse;
    .v-application__wrap {
        display: grid;
        height: 100%;
        min-width: 100%;
        grid-template-columns: 100%;
        grid-template-rows: calc(100% - 2rem) 1rem;
        overflow-y: unset;

        .panel {
            grid-row: 2;
        }

        .app__view {
            grid-row: 1;
        }
    }
}



// .slider-tooltip, .slider-connect {
//     background-color: var(--main-color, #94B7EB);
//     border-color: var(--main-color, #94B7EB);
// }</style>
