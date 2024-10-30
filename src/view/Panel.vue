<script setup lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router';
import { rootViewModel } from '@/viewmodel/rootViewModel';

const router = useRouter();
const navigate = (route: RouteLocationRaw)=>{
    router.push(route);
}
</script>

<template>
    <div :class="rootViewModel.portrait ? 'panel-portrait':'panel-landscape'">
        <button class="container" @click="navigate(route)" v-for="route of router.getRoutes()" :key="route.name">{{ route.name }}</button>
    </div>
</template>

<style scoped lang="scss">
.panel-landscape {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 2rem 1rem;
    row-gap: 1rem;
    overflow: auto;
    min-width: 5rem;

    button {
        height: 2rem;
        min-width: 4rem;
        width: 100%;
        margin: 0rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        text-align: left;
    }
} 

.panel-portrait {
    width: 100%;
    display: flex;
    flex-direction: row;
    column-gap: 0.1rem;
    min-width: 5rem;

    button {
        height: 2rem;
        // min-width: 4rem;
        // width: 100%;
        margin: 0rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        text-align: left;
    }
} 
</style>