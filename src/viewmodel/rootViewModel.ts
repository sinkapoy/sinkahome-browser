import { reactive } from "vue";
import { IGadgetViewModel } from "./IGadgetViewModel";
import { uuidT } from "@sinkapoy/home-core";

export class RootViewModel {
    gadgets: Record<uuidT, IGadgetViewModel> = {};
    widgets: Record<uuidT, IGadgetViewModel> = {};
}

export const rootViewModel = reactive(new RootViewModel());

if (process.env['environment'] === 'development') {
    (window as any).rootViewModel = rootViewModel;
}