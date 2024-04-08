<script setup lang="ts">
import { Property, PropertyAccessMode, PropertyDataType, homeEngine } from '@sinkapoy/home-core';
import { computed, onBeforeUnmount, onMounted, reactive, defineProps } from 'vue';
const { prop, uuid } = defineProps<{ prop: Property<any>, uuid: string }>();

const writeValue = (prop: Property<any>) => {
    const entity = homeEngine.getEntityByName(uuid);
    if (!entity) return;
    switch(prop.dataType){
        case PropertyDataType.float:
            prop.value = Number(prop.value);
        case PropertyDataType.int:
            prop.value = Math.round(prop.value);
            break;
        case PropertyDataType.boolean:
            prop.value = prop.value == 'true';
            break;
    }
    homeEngine.emit('writeGadgetProperty', entity, prop.id, prop.value);
}

</script>

<template>
    <div class="property">
        <div>{{ prop.id }}</div>
        <div>{{ PropertyAccessMode[prop.accessMode] }}</div>
        <div v-if="prop.enumData && (prop.accessMode & PropertyAccessMode.write)">
            
        </div>
        <div v-else-if="prop.accessMode & PropertyAccessMode.write">
            <input v-model="prop.value">
            <span v-if="prop.units">{{ prop.units }}</span>
            <button @click="writeValue(prop)">write</button>
        </div>
        <div v-else-if="prop.accessMode & PropertyAccessMode.read">
            {{ prop.value }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.property {
    display: table-row;

    div {
        display: table-cell;
    }
}
</style>