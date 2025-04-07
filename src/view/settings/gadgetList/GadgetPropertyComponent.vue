<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { Property, PropertyAccessMode, PropertyDataType, homeEngine } from '@sinkapoy/home-core';
import { computed, onBeforeUnmount, onMounted, reactive, defineProps, watch, render, getCurrentInstance, ref } from 'vue';
const { prop, uuid } = defineProps<{ prop: Property<any>, uuid: string; }>();

const writeValue = (prop: Property<any>) => {
    const entity = homeEngine.getEntityByName(uuid);
    if (!entity) return;
    switch(prop.dataType){
        case PropertyDataType.float:
            prop.value = Number(prop.value);
        case PropertyDataType.int:
            prop.value = Math.round(Number(prop.value));
            break;
        // case PropertyDataType.boolean:
        //     prop.value = prop.value == 'true';
        //     break;
    }
    homeEngine.emit('writeGadgetProperty', entity, prop.id, prop.value);
};

const value = computed(() => prop.value);
const reference = prop;
let timer: number;
const propEnumOptions = computed(()=>{
    if(prop.enumData)
        return Object.keys(prop.enumData).map((key)=>{
            return {
                label: key,
                value: prop.enumData![key],
            }
        })
});

onMounted(() => {
    timer = setInterval(()=>{
        if(prop.value !== value.value){
            value.effect.run();
            for(const entry of (reference as unknown as {dep: Set<any>}).dep.values()){
                entry.fn()
            }
        }
    }, 235) as unknown as number;
});

onBeforeUnmount(() => {
    clearInterval(timer);
});

</script>

<template>
    <div class="property">
        <div>{{ prop.id }}</div>
        <div>{{ PropertyAccessMode[prop.accessMode] }}</div>
        <div>{{ PropertyDataType[prop.dataType] }}</div>
        <div v-if="prop.enumData && (prop.accessMode & PropertyAccessMode.write)">
            <Multiselect :mode="'single'" @select="writeValue(prop)" v-model="reference.value"
                :options="propEnumOptions" :can-clear="false" >
            </Multiselect>
        </div>
        <div v-else-if="prop.accessMode & PropertyAccessMode.write">
            <input v-model="reference.value">
            <span v-if="prop.units">{{ prop.units }}</span>
            <button @click="writeValue(prop)">-></button>
        </div>
        <div v-else-if="prop.accessMode & PropertyAccessMode.read">
            {{ reference.value }}
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