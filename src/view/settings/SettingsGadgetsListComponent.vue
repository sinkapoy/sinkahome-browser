<script setup lang="ts">
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { reactive } from 'vue';

const store = reactive({
    showProps: {} as Record<string, boolean>,
});
const vm = rootViewModel;

const showProps = (uuid: string) => {
    store.showProps[uuid] = !store.showProps[uuid];
}

</script>

<template>
    <div class="container window">
        <div class="container" v-for="gadget in vm.gadgets">
            <div>
                <h3>{{ gadget.uuid }}</h3>
            </div>
            <div class="props">
                <div class="props__header" @click="showProps(gadget.uuid)">properties</div>
                <ul v-if="store.showProps[gadget.uuid]">
                    <li v-for="prop in gadget.properties">
                        <label>{{ prop[0] }}:</label>
                        <label>{{ (prop[1].value + '').slice(0, 20) }}</label>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.window {
    display: flex;
    flex-direction: row;
    row-gap: 1rem;
    column-gap: 1rem;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    background: white;
}

.props {
    &__header {
        cursor: pointer;
        user-select: none;
    }
}
</style>