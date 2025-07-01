<script setup lang="ts">
import { rootViewModel } from '@/viewmodel/rootViewModel';
import {  Property } from '@sinkapoy/home-core';
import { reactive } from 'vue';
import GadgetPropertyComponent from './GadgetPropertyComponent.vue';
import GadgetActionComponent from './GadgetActionComponent.vue';

// todo: use router
const store = reactive({
    showProps: null as string | null,
    gadgetProps: [] as Property<any>[],
});
const vm = rootViewModel;

const clickSelectGadget = async (uuid: string) => {
    store.showProps = uuid;
    for (const prop of Object.values(rootViewModel.gadgets[uuid].properties)) {
        store.gadgetProps.push(prop);
        await Promise.resolve();
    }
};

const clickBack = () => {
    store.showProps = null;
};

</script>

<template>
    <v-sheet class="gadgets-window">
        <template v-if="!store.showProps">
            <div
                v-for="gadget in vm.gadgets"
                :key="gadget.uuid"
                class="container gadget"
                @click="clickSelectGadget(gadget.uuid)"
            >
                <div>
                    <h3>{{ gadget.uuid }}</h3>

                    <h4 v-if="gadget.properties['user-name']?.value">
                        {{ gadget.properties['user-name'].value }}
                    </h4>
                </div>
            </div>
        </template>
        <template v-else>
            <v-btn @click="clickBack">
                back
            </v-btn>
            <v-card
                class="gadget-settings"
                :title="store.showProps"
            >
                <v-card-text>
                    <div class="properties">
                        <h4>Properties</h4>
                        <div class="properties__content">
                            <GadgetPropertyComponent
                                v-for="property of rootViewModel.gadgets[store.showProps].properties"
                                :key="property.id"
                                :prop="property"
                                :uuid="store.showProps"
                            />
                        </div>
                    </div>
                    <div class="actions">
                        <h4>Actions</h4>
                        <div class="actions__content">
                            <GadgetActionComponent
                                v-for="action of rootViewModel.gadgets[store.showProps].actions"
                                :key="action.id"
                                :action="action"
                                :uuid="store.showProps"
                            />
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-sheet>
</template>

<style scoped lang="scss">
.gadgets-window {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    column-gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    background: white;
}

.gadget {
    overflow: clip;
    text-wrap: wrap;
    word-wrap: break-word;
    padding: 0.5rem;
    user-select: none;

    text-align: left;
}

.gadget-settings {
    overflow: auto;

    &__properies {
        display: flex;

    }
}

.properties {
    &__content {
        display: table;
    }
}

.actions {
    &__content {
        display: table;
    }
}
</style>