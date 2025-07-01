<script setup lang="ts">
import { onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';
import { IBindingLayout } from './IBingingLayout';
import { IBindingInfo } from './IBindingInfo';

const props = defineProps<{
    store: IBindingLayout;
    name: string;
    binding: IBindingInfo;
    isAlbum: boolean;
}>();
const emits = defineEmits(['write']);
const model = { value: props.store.realValue };
const unwatch = watch(props.store, (_s) => {
    if (model.value !== props.store.realValue) {
        model.value = props.store.realValue;
    }

    onBeforeUnmount(unwatch);
});
</script>

<template>
    <span>{{ props.store.realValue + props.store.units }}</span>
    <div
        v-if="store.writable"
        class="binding-input-field"
    >
        <v-text-field
            v-model="model.value"
            :size="props.store.widgetWidth * 4"
        />
        <button
            class="ok-button"
            @click="emits('write', model.value)"
        >
            →
        </button>
    </div>
</template>

<style lang='scss'>
.binding-input-field {
    display: flex;
    flex-direction: row;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    column-gap: 0.5;
}

.ok-button {
    width: 1.5rem;
    height: 1.5rem;
    padding: 0px;
    font-weight: 900;
    background-color: var(--main-color);
    color: var(--background-color);
    border: 0.1rem solid var(--background-color);
    border-radius: 50%;
}
</style>