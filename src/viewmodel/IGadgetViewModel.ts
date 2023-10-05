import { uuidT, PropertiesComponent, ActionsComponent, EventsComponent } from "@sinkapoy/home-core";
export interface IGadgetViewModel {
    uuid: uuidT;
    properties: PropertiesComponent;
    actions: ActionsComponent;
    events: EventsComponent;
}