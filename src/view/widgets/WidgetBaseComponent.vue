<script setup lang="ts">
import { computed } from "vue";
import { IWidgetViewModel } from '@sinkapoy/home-integrations-vue-widgets';

const props = defineProps<{ widget: IWidgetViewModel, portrait: boolean; }>();

const width = computed(() => {
    return props.widget.properties['width']?.value as number || 2;
});
const height = computed(() => {
    return props.widget.properties['height']?.value as number || 2;
});
const x = computed(() => {
    return props.widget.properties['x']?.value as number || 0;
});
const y = computed(() => {
    return props.widget.properties['y']?.value as number || 0;
});



</script>

<template>
    
    <template v-if="!props.portrait">
        <div class="widget widget-landscape container" :style="{
            width: width * 4 + (width - 1) * 0.5 + 'rem',
            height: height * 4 + (height - 1) * 0.5 + 'rem',
            'grid-area': `${(y + 1)}/${(x + 1)}/${y + 1 + height}/${x + 1 + width}`,
        }
            ">
            <audio autoplay>
            <source src="pop.mp3" />
            </audio>
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