<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import WidgetBaseComponent from './WidgetBaseComponent.vue';
import { IWidgetViewModel } from "@sinkapoy/home-integrations-vue-widgets";
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { WritePropertyCommand } from '@sinkapoy/home-integrations-commands';
import { PropertyAccessMode } from '@sinkapoy/home-core';

//todo: refactoring
const vm = rootViewModel;
const props = defineProps<{ widget: IWidgetViewModel, portrait: boolean }>();
const binding = {
    uuid: props.widget.properties.get('targetUuid')?.value,
    propId: props.widget.properties.get('targetProperty')?.value,
    placeholder: props.widget.properties.get('placeholder')?.value,
}

const store = reactive({
    destroyed: false,
    realValue: '',
    inputValue: '',
    writable: false,
});

const name = computed(() => props.widget.properties.get('name')?.value || 'untitled');
const width = computed(() => {
    return props.widget.properties.get('width')?.value || 2;
});
const checker = () => {
    const prop = vm.gadgets[binding.uuid]?.properties.get(binding.propId);
    store.writable = !!((prop?.accessMode || 0) & PropertyAccessMode.write);
    store.realValue = prop?.value ?? binding.placeholder;
}
const writeClickCallback = () => {
    new WritePropertyCommand(binding.uuid, binding.propId, store.inputValue).execute();
}

const interval = setInterval(checker, 400);

onMounted(() => {
    store.destroyed = false;
    name.effect.run();
    checker();
    store.inputValue = store.realValue;

});
onBeforeUnmount(() => {
    store.destroyed = true;
    clearInterval(interval);
});

</script>

<template>
    <WidgetBaseComponent :widget="props.widget" :portrait="props.portrait">
        <template #landscape>
            <div class="binding binding-landscape">
                <label>{{ name }}</label>
                <label>{{ store.realValue }}</label>
                <div v-if="store.writable">
                    <input v-model="store.inputValue" :size="width * 4" />
                    <button @click="writeClickCallback">ok</button>
                </div>

            </div>

        </template>

        <template #portrait>
            <div class="binding binding-portrait">
                <div class="binding binding-landscape">
                    <label>{{ name }}</label>
                    <label>{{ store.realValue }}</label>
                    <div v-if="store.writable">
                        <input v-model="store.inputValue" :size="width * 4" />
                        <button @click="writeClickCallback">ok</button>
                    </div>

                </div>
            </div>
        </template>
    </WidgetBaseComponent>
</template>

<style scoped lang="scss">
@import "../styles/variables";

.binding {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;

    input {
        max-width: 100%;
    }
}

.binding-landscape {
    width: inherit;
    height: inherit;
    padding: 0px;
}

.binding-portrait {
    display: flex;
    flex-direction: row;
    max-height: 6rem;
    border-top: solid 0.1rem var(--main-color);
    border-bottom: solid 0.1rem var(--main-color);
}

.led-on {
    background: var(--accent-color);
}
</style>