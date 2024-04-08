import { createRouter, createWebHashHistory } from "vue-router";
import { ISocketClientEvents, configureNetworking } from "@sinkapoy/home-integrations-networking";
import { globalRoutes } from "@sinkapoy/home-integrations-vue-router";
import { HomeEngineT, homeEngine } from "@sinkapoy/home-core";
import { createApp } from "vue";
import App from "./view/App.vue";
import WidgetsVue from "./view/WidgetsView.vue";
import SettingsView from "./view/settings/SettingsView.vue"
import { GadgetsViewModelSystem } from "./model/GadgetsViewModelSystem";
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import { widgetsIndex } from "@sinkapoy/home-integrations-vue-widgets";
import SwitchWidgetVue from "./view/widgets/SwitchWidget.vue";
import FolderWidgetVue from "./view/widgets/FolderWidget.vue";
import BindingWidgetVue from "./view/widgets/BindingWidget.vue";
import { rootViewModel } from "./viewmodel/rootViewModel";

widgetsIndex.typeAlias.switch = SwitchWidgetVue;
widgetsIndex.typeAlias.folder = FolderWidgetVue;
widgetsIndex.typeAlias.binding = BindingWidgetVue;

const NETWORK_CONFIG = {
    port: 18956,
    clientsConfig: [
        {
            url: `ws://${localStorage.getItem('host') ? localStorage.getItem('host') : window.location.hostname}`
        }
    ]
}
configureNetworking(NETWORK_CONFIG);

homeEngine.addSystem(new GadgetsViewModelSystem(), 1);

globalRoutes.addRoute('/widgets', WidgetsVue, 'Widgets');
globalRoutes.addRoute('/settings', SettingsView, 'Settings');
const app = createApp(App);
const router = createRouter({ history: createWebHashHistory(), routes: globalRoutes.getRoutes() });
app.use(router);
router.isReady().then(() => {
    if (router.currentRoute.value.fullPath === '/') {
        router.push('/widgets');
    }
    app.mount('#app');
});


let oldTime = Date.now();
const ticker = () => {
    const newTime = Date.now();
    homeEngine.update(newTime - oldTime);
    oldTime = newTime;
    requestAnimationFrame(ticker);
}
ticker();

console.log(process.env);
setTimeout(() => {
    (homeEngine as unknown as HomeEngineT<ISocketClientEvents>).emit('networking:client-send', { comand: 'gadget-list' });
}, 200)

const resizeObserver = new ResizeObserver(() => {
    if (matchMedia('(min-width: 30rem)').matches) {
        rootViewModel.portrait = false;
    } else {
        rootViewModel.portrait = true;
    }
});
resizeObserver.observe(document.body);


