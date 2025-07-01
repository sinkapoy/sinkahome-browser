<script setup lang="ts">
import { widgetsIndex, IWidgetViewModel } from '@sinkapoy/home-integrations-vue-components';
import { defineProps } from 'vue';

const props = defineProps<{ widgets: IWidgetViewModel[]; portrait: boolean; }>();
const getType = function (widget: IWidgetViewModel) {
    return widget.properties['type']?.value;
};

</script>

<template>
    <div
        class="v-card folder-layout"
        :class="props.portrait ? 'folder-layout-portrait' : ''"
    >
        <template
            v-for="widget in props.widgets"
            :key="widget.uuid"
        >
            <component
                :is="widgetsIndex.typeAlias[getType(widget)]"
                :widget="widget"
                :portrait="props.portrait"
            />
        </template>
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
    width: auto;
    align-items: center;
    // width: 100%;
    margin-top: 0.6rem;
    flex-direction: column;
    flex-wrap: nowrap;
    row-gap: 1rem;
    padding: 0.5rem;
}
</style>