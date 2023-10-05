import { Entity } from "@ash.ts/ash";
import { IServerDefaultSend, ISocketClientEvents } from "@sinkapoy/home-integrations-networking";
import { rootViewModel } from "@/viewmodel/rootViewModel";
import { GadgetNode, HomeEngineT, HomeSystem, PropertyGadgetNode, homeEngine } from "@sinkapoy/home-core";
import { reactive } from "vue";
export class GadgetsViewModelSystem extends HomeSystem {
    onInit(): void {
        this.setupNodeList({
            node: GadgetNode,
            onAdd: this.onGadgetAdd,
            onUpdate: this.onGadgetUpdate,
        });

        this.setupEvent('writeGadgetProperty', this.onPropertyWrite);
    }

    onDestroy(): void {

    }

    onUpdate(dt: number): void {

    }

    private onGadgetUpdate = (node:GadgetNode)=>{
        const vm = rootViewModel.gadgets[node.entity.name];
        
        if(vm?.properties){
            for(const [id, prop] of node.properties.entries()){
                const vmProp = vm.properties.get(id);
                if(vmProp?.value !== prop.value){
                    console.log('UPDATE VM')
                }
                if(vmProp){
                    Object.assign(vmProp, prop);
                }
            }    
        } else {
            debugger;
        }
        
    }

    private onGadgetAdd = (node: GadgetNode) => {
        const gadgetVm = reactive({
            uuid: node.data.uuid,
            properties: node.properties,
            actions: node.actions,
            events: node.events,
        });
        rootViewModel.gadgets[node.data.uuid] = gadgetVm;
    }

    private onPropertyWrite = (gadget: Entity, id: string, value: number | string | boolean)=>{
        console.log('write property', gadget.name, id, value)
    }
}

const engine = homeEngine as HomeEngineT<ISocketClientEvents>;
engine.emit('networking:client-register-PAM', 'gadget-props', (msg: IServerDefaultSend['gadget-props'], ws) => {
    console.log(msg.props, msg.props.filter(prop => prop.id === 'widget'))
    if (msg.props.filter(prop => prop.id === 'widget').length) {
        const gadget = rootViewModel.gadgets[msg.gadget];
        if (!gadget) throw new Error('cant find gadget ' + msg.gadget);
        rootViewModel.widgets[msg.gadget] = gadget;
    }
});