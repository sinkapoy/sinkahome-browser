<script setup lang="ts">
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { PropertiesComponent, Property } from '@sinkapoy/home-core';
import { reactive } from 'vue';
import GadgetPropertyComponent from './GadgetPropertyComponent.vue';

// todo: use router
const store = reactive({
    showProps: null as string | null,
    gadgetProps: [] as Property<any>[],
});
const vm = rootViewModel;

const clickSelectGadget = async (uuid: string)=>{
    store.showProps = uuid;
    store.gadgetProps = [];
    for(const prop of rootViewModel.gadgets[uuid].properties.values()){
        store.gadgetProps.push(prop);
        await Promise.resolve();
    }
}

const clickBack = ()=>{
    store.showProps = null;
}

</script>

<template>
    <div class="container window">
        <template v-if="!store.showProps">
            <div class="container gadget" v-for="gadget in vm.gadgets" @click="clickSelectGadget(gadget.uuid)">
            <div>
                <h3>{{ gadget.uuid }}</h3>
            </div>
        </div>
        </template>
        <div v-else class="container gadget-settings">
            <button @click="clickBack">back</button>
            <div> <h3>{{ store.showProps }}</h3> </div>
            <div class="properties">
                <h4>Properties</h4>
                <div class="properties__content">
                    <GadgetPropertyComponent v-for="property of store.gadgetProps" :prop="property" :uuid="store.showProps"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.window {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    column-gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    background: white;
    width: 100%;
}

.gadget {
    overflow: hidden;
    text-wrap:wrap;
    word-wrap:break-word;
    padding: 0.5rem;
    user-select: none;
}

.gadget-settings {
    overflow: auto;

    &__properies{
        display: flex;

    }
}

.properties {
    &__content {
        display: table;
    }
}
</style>