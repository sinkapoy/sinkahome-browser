<script setup lang="ts">
import { reactive } from 'vue';
import SettingsGadgetsListComponent from './SettingsGadgetsListComponent.vue';

const data = reactive({
    currentTab: 0,
})
const tabs = [
    { name: 'gadgets', component: SettingsGadgetsListComponent }
]
const selectTab = (tab: number)=>{
    data.currentTab = tab >= 0 ? tab : 0;
}

</script>

<template>
    <div class="settings-view">
        <div class="header">
            <button v-for="tab, index in tabs" class="container" @click="selectTab(index)">{{ tab.name }}</button>
        </div>
        <component :is="tabs[data.currentTab].component" class="content" />
    </div>
</template>

<style scoped lang="scss">
.settings-view{
    display: flex;
    
    flex-direction: column;
    row-gap: 1rem;
    
}

.header {
    display: flex;
    flex-direction: row;
    row-gap: 1rem;
    column-gap: 1rem;
}

.content {
    width: 100%;
    flex-wrap: wrap;
}
</style>