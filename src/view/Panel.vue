<script setup lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const navigate = (route: RouteLocationRaw)=>{
    router.push(route);
}
</script>

<template>
    <div class="panel">
        <div class="menu">
            <button>Menu</button>
            <ul>
                <li @click="navigate(route)" v-for="route of router.getRoutes()" :key="route.name">{{ route.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.panel {
    width: 100%;
    background-color: var(--main-color);
    color: var(--text-negative);
    text-align: left;
    display: flex;
    flex-direction: row;
}

.menu {

    ul {
        display: none;
        background-color: var(--background-color)55;
        backdrop-filter: blur(0.5rem);
        border: solid 0.1rem var(--main-color);
        user-select: none;
        li:hover {
            background-color: var(--main-color);
            color: var(--text-negative)
        }
    }
    &:hover ul {
        position: absolute;
        display: flex;
        flex-direction: column;
        color: var(--text);
    }
}
</style>