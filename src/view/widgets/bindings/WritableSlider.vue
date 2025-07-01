<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits, ref } from 'vue';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';
import { VSlider } from 'vuetify/components';

const props = defineProps<{
    store: IBindingLayout;
    name: string;
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emit = defineEmits(['write']);
const model = ref(props.store.realValue || 0);
const unwatch = watch(props.store, (_s) => {
    setTimeout(() => {
        if (model.value !== props.store.realValue) {
            model.value = props.store.realValue;
        }
    }, 0);
});
const onChange = () => {
    setTimeout(() => emit('write', model.value), 10);
};

onBeforeUnmount(unwatch);
</script>

<template>
    <label v-if="props.store.widgetHeight >= 2">{{ props.store.realValue + store.units }}</label>
    <v-slider 
        v-model="model" 
        class="slider" 
        :class="isAlbum ? 'slider-album' : ''" 
        :color="isAlbum ? 'surface' : 'primary'" 
        :step="binding.step" 
        :min="binding.min || 0" 
        :max="binding.max || 1"
        thumb-label
        @end="onChange"
    />
</template>

<style scoped lang="scss">

.slider {
    flex: 1;
    // width: 100%;
    // margin-top: 1.5rem;
}

.slider-album {
    height: 1rem;
    width: 80%;
    margin-top: 0.5rem;

    .v-slider-thumb__label {
        background-color: black;
    }
}
</style>