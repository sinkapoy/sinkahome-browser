<script setup lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router';
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { VList, VBtn, VMenu } from 'vuetify/components';
import { globalRoutes } from '@sinkapoy/home-integrations-vue-components';
const router = useRouter();
const navigate = (route: RouteLocationRaw) => {
    router.push(route);
};
setTimeout(()=>{
    console.debug('available roots', globalRoutes.getAvailableRoutes('/'));
}, 10);
</script>

<template>
    <template v-if="rootViewModel.portrait">
        <div class="v-toolbar panel panel-portrait">
            <v-menu location="top">
                <template #activator="{ props }">
                    <v-btn
                        class="panel__menu"
                        icon="md:menu"
                        color="primary"
                        v-bind="props"
                    />
                </template>
                <v-list style="display: flex; flex-wrap: nowrap; flex-direction: column;min-height: 4rem;">
                    <v-list-item
                        v-for="route of globalRoutes.getAvailableRoutes('/')"
                        :key="route.name"
                    >
                        <v-btn @click="navigate(route)">
                            {{ route.name }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            {{ router.currentRoute.value.name }}
        </div>
    </template>
    <template v-else>
        <v-list :class="rootViewModel.portrait ? 'panel-portrait' : 'panel-landscape'">
            <v-btn
                v-for="route of globalRoutes.getAvailableRoutes('/')"
                :key="route.name"
                @click="navigate(route)"
            >
                {{ route.name
                }}
            </v-btn>
        </v-list>
    </template>
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
    }
}

.panel {
    &__menu {
        padding-left: 0rem;
        padding-right: 0rem;
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

        text-align: left;
    }

    .v-list {
        flex-direction: column;
        height: auto;
    }
}
</style>