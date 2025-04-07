<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue';
import WidgetBaseComponent from './WidgetBaseComponent.vue';
import { IWidgetViewModel } from "@sinkapoy/home-integrations-vue-widgets";
import { rootViewModel } from '@/viewmodel/rootViewModel';
import { WritePropertyCommand } from '@sinkapoy/home-integrations-commands';
import { PropertyAccessMode } from '@sinkapoy/home-core';
import { bindingLayouts, getBindingTypeByProperty } from './bindings/bindingLayouts';

//todo: refactoring
const vm = rootViewModel;
const props = defineProps<{ widget: IWidgetViewModel, portrait: boolean; }>();
const binding = props.widget.properties['bindInfo']?.value ?? {};
const width = computed(() => {
    return props.widget.properties['width']?.value || 2;
});
const height = computed(() => {
    return props.widget.properties['height']?.value || 2;
});
const store = reactive({
    destroyed: false,
    realValue: '',
    inputValue: '',
    writable: false,
    units: '',
    widgetWidth: width,
    widgetHeight: height,
    type: 'readable'
});

const name = computed(() => props.widget.properties['name']?.value || 'untitled');

const checker = () => {
    const prop = vm.gadgets[binding.uuid]?.properties[binding.property];
    store.writable = !!((prop?.accessMode || 0) & PropertyAccessMode.write);
    store.realValue = prop?.value as any ?? binding.placeholder;
    store.units = prop?.units ?? '';
    if (prop)
        store.type = getBindingTypeByProperty(prop, binding);
};
const writeClickCallback = (value: any) => {
    new WritePropertyCommand(binding.uuid, binding.property, value).execute();
};

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
                <component :is="bindingLayouts[store.type]" :store="store" :name="name" :binding="binding" :isAlbum ="true" @write="writeClickCallback"/>
            </div>

        </template>

        <template #portrait>
            <div class="binding binding-portrait">
                <div class="binding ">
                    <component :is="bindingLayouts[store.type]" :store="store" :name="name" :binding="binding" @write="writeClickCallback" :isAlbum="false"/>
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
    --slider-connect-bg: var(--background-color);
    --slider-bg: var(--accent-color)
}

.binding-portrait {
    display: flex;
    flex-direction: row;
    max-height: 6rem;
    border-top: solid 0.1rem var(--main-color);
    border-bottom: solid 0.1rem var(--main-color);
    --slider-connect-bg: var(--main-color);
    --slider-bg: var(--accent-color)
}

.led-on {
    background: var(--accent-color);
}
</style>