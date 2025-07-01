<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import {globalRoutes} from '@sinkapoy/home-integrations-vue-components';


const route = useRoute();
const router = useRouter();
</script>

<template>
    <div :class="'settings-view'">
        <div class="header">
            <v-btn
                v-for="path in globalRoutes.getAvailableRoutes('/settings')"
                :key="path.path"
                @click="router.push(path)"
            >
                {{ path.name }}
            </v-btn>
        </div>
        <router-view
            class="content"
            :route="route"
        />
    </div>
</template>

<style scoped lang="scss">
.settings-view{
    display: flex;
    width: auto;
    flex-direction: column;
    row-gap: 1rem;
    flex: 1;
    flex-wrap: nowrap;
}

.header {
    display: flex;
    flex-direction: row;
    row-gap: 1rem;
    column-gap: 1rem;
}

.content {
    width: 100%;
    align-items: stretch;
    overflow-y: auto;   
}
</style>