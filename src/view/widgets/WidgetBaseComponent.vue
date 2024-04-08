<script setup lang="ts">
import { computed } from "vue";
import { IGadgetViewModel } from "../../viewmodel/IGadgetViewModel";

const props = defineProps<{ widget: IGadgetViewModel , portrait: boolean}>();

const width = computed(() => {
    return props.widget.properties.get('width')?.value || 2;
});
const height = computed(() => {
    return props.widget.properties.get('height')?.value || 2;
});
const x = computed(() => {
    return props.widget.properties.get('x')?.value || 0;
});
const y = computed(() => {
    return props.widget.properties.get('y')?.value || 0;
});

</script>

<template>
    <template v-if="!props.portrait">
        <div class="widget widget-landscape container" :style="{
            width: width * 4 + (width - 1) * 0.5 + 'rem',
            height: height * 4 + (height - 1) * 0.5 + 'rem',
            'grid-row': (y + 1) + '',
            'grid-column': (x + 1) + '',
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

@keyframes show-widget {
    from {
        transform: scale(0%);
    }

    to {
        transform: scale(100%);
    }
}

.widget {
    animation: 0.4s cubic-bezier(.34, 1.56, .4, .98) show-widget;
}

.widget-landscape {
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