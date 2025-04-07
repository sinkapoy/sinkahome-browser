import { Entity, NodeList } from "@ash.ts/ash";
import { IClientDefaultSend, IServerDefaultSend, ISocketClientEvents } from "@sinkapoy/home-integrations-networking";
import { rootViewModel } from "@/viewmodel/rootViewModel";
import { GadgetNode, HomeEngineT, HomeSystem, IHomeCoreEvents, PropertiesComponent, Property, PropertyGadgetNode, homeEngine } from "@sinkapoy/home-core";
import { reactive } from "vue";
export class GadgetsViewModelSystem extends HomeSystem {

    private readonly updateTimer = 327;
    private updateCountdown = this.updateTimer;
    private nodeList!: NodeList<GadgetNode>;

    onInit(): void {
        this.nodeList = this.setupNodeList({
            node: GadgetNode,
            onAdd: this.onGadgetAdd,
            // onUpdate: this.onGadgetUpdate,
        });

        this.setupEvent('writeGadgetProperty', this.onPropertyWrite);
        this.setupEvent('invokeGadgetAction', (entity: Entity, actionId: string, ...args: any[])=>{
                console.debug(`call action for ${entity.name} ${actionId} with args ${args}`);
        });

        // @ts-expect-error
        this.setupEvent('networking:client-connection-established', () => {
            // @ts-expect-error
            this.engine.emit('networking:client-send', <IClientDefaultSend['gadget-list']>{
                comand: 'gadget-list',
            });
        });
    }

    onDestroy(): void {

    }

    onUpdate(dt: number): void {
        this.updateCountdown -= dt;
        if (this.updateCountdown > 0) return;
        this.updateCountdown = this.updateTimer;

        let node = this.nodeList.head;
        while (node) {
            this.onGadgetUpdate(node);
            node = node.next;
        }
    }

    private onGadgetUpdate = (node: GadgetNode) => {
        const vm = rootViewModel.gadgets[node.entity.name];

        if (vm?.properties) {
            for (const [id, prop] of node.properties.entries()) {
                const vmProp = vm.properties[id];
                if(vmProp){
                    //
                } else {
                    // inject reactivity to model
                    const p = reactive(prop);
                    vm.properties[id] = p;
                    node.properties.set(id, p);
                }
            }
        }

        if(vm.actions){
            for (const [id, action] of node.actions.entries()) {
                const vmAction = vm.properties[id];
                if (vmAction) {
                    // todo: set here invoke state and args with result
                } else {
                    vm.actions[id] = reactive(action);
                    node.actions.set(id, vm.actions[id]);
                }
            }
        }
    };

    private onGadgetAdd = (node: GadgetNode) => {
        const gadgetVm = reactive({
            uuid: node.data.uuid,
            properties: {},
            actions: {},
            events: {},
        });
        rootViewModel.gadgets[node.data.uuid] = gadgetVm;
    };

    private onPropertyWrite = (gadget: Entity, id: string, value: number | string | boolean) => {
        console.log('write property', gadget.name, id, value);

    };
}

const engine = homeEngine as HomeEngineT<ISocketClientEvents>;
engine.emit('networking:client-register-PAM', 'gadget-props', (msg: IServerDefaultSend['gadget-props'], ws) => {
    console.log(msg.props, msg.props.filter(prop => prop.id === 'widget'));
    if (msg.props.filter(prop => prop.id === 'widget').length) {
        const gadget = rootViewModel.gadgets[msg.gadget];
        if (!gadget) throw new Error('cant find gadget ' + msg.gadget);
        rootViewModel.widgets[msg.gadget] = gadget;
        gadget.parentFolder = msg.props.filter(prop => prop.id === 'parent')[0]?.value as string | undefined;

    }
});