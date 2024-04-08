<script setup lang="ts">
import { IGadgetViewModel } from '@/viewmodel/IGadgetViewModel';
import { widgetsIndex } from '@sinkapoy/home-integrations-vue-widgets';
import { onMounted, reactive, ref, watch, defineProps } from 'vue';

const props = defineProps<{ widgets: IGadgetViewModel[], portrait: boolean }>();
const getType = function (widget: IGadgetViewModel) {
    console.log(widget.properties.get('type')?.value, widgetsIndex.typeAlias[widget.properties.get('type')?.value])
    return widget.properties.get('type')?.value;
}
const data = reactive({
    currentCount: 0,
    interval: -1 as unknown as NodeJS.Timeout,
});
const show = () => {
    clearInterval(data.interval);
    data.interval = setInterval(() => {
        data.currentCount++;
        if (data.currentCount >= Object.keys(props.widgets).length) {
            clearInterval(data.interval);
            data.interval = -1 as any;
        }
    }, 100);
}




watch(props.widgets, () => {
    show();
});

onMounted(() => {
    data.currentCount = 0;
    // show();
});
</script>

<template>
    <div class="folder-layout" :class="props.portrait ? 'folder-layout-portrait' : ''">
        <component v-for="widget, index in props.widgets" :is="widgetsIndex.typeAlias[getType(widget)]" :widget="widget"
            :portrait="props.portrait"></component>
    </div>
</template>

<style scoped lang="scss">
.folder-layout {
    row-gap: 0.2rem;
    column-gap: 0.2rem;
    overflow: hidden;

    width: 100%;
    height: 100%;
    margin: 0px;
    display: grid;
    grid-template-rows: repeat(auto-fill, 4rem);
    grid-template-columns: repeat(auto-fill, 4rem);
    gap: 0.5rem;
    padding: 0rem;
}

.folder-layout-portrait {
    display: flex;
    width: 100%;
    margin-top: 0.6rem;
    flex-direction: column;
    flex-wrap: nowrap;
    row-gap: 1rem;
    padding: 0.5rem;
    padding-bottom: 4rem;
}
</style>