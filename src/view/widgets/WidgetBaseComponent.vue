<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, reactive } from "vue";
import { IGadgetViewModel } from "../../viewmodel/IGadgetViewModel";

const props = defineProps<{ widget: IGadgetViewModel }>();

const store = reactive({ isPortrait: false });

const queryChecker = () => {
    store.isPortrait = window.matchMedia('(orientation: portrait)').matches
};


onBeforeMount(() => {
    window.addEventListener('resize', queryChecker);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', queryChecker);
})

queryChecker();

const width = computed(() => {
    return props.widget.properties.get('width')?.value || 2;
});
const height = computed(() => {
    return props.widget.properties.get('height')?.value || 2;
});

</script>

<template>
    <template v-if="!store.isPortrait">
        <div class="widget-landscape" :style="{
            width: width * 4 + 'rem',
            height: height * 4 + 'rem',
        }
            ">
            <slot name="landscape" />
        </div>
    </template>
    <template v-else>
        <div class="widget-protrait">
            <slot name="portrait" />
        </div>
    </template>
</template>

<style scoped lang="scss">
@import "../styles/variables";

.widget-landscape {
    background-color: $mainColor;
    color: white;
    text-align: center;
    width: $widgetBlockSize;
    height: $widgetBlockSize;
    display: block;
    box-shadow: boxShadow(0.1rem);
}

.widget-portrait {
    width: calc(100% - 2rem);
    height: auto;
    box-shadow: boxShadow(1rem);
}
</style>