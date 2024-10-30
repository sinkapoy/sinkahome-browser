import { uuidT, IProperty, IAction, IGadgetEvent, Property, ActionT } from "@sinkapoy/home-core";
export interface IGadgetViewModel {
    uuid: uuidT;
    properties: Record<string, Property<any>>;
    actions: Record<string, ActionT>;
    events: Record<string, IGadgetEvent>;
    parentFolder?: uuidT;
}