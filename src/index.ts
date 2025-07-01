import { globalRoutes, widgetsIndex } from '@sinkapoy/home-integrations-vue-components';
import { createRouter, createWebHashHistory } from 'vue-router';
import { configureNetworking } from '@sinkapoy/home-integrations-networking';
import { homeEngine } from '@sinkapoy/home-core';
import { createApp } from 'vue';
import App from './view/App.vue';
import WidgetsVue from './view/WidgetsView.vue';
import SettingsView from './view/settings/SettingsView.vue';
import SettingsGadgetsView from './view/settings/gadgetList/SettingsGadgetsListComponent.vue';
import { GadgetsViewModelSystem } from './model/GadgetsViewModelSystem';
import '@/view/styles/globals.scss';
import 'material-design-icons-iconfont/dist/material-design-icons.css';


import SwitchWidgetVue from './view/widgets/SwitchWidget.vue';
import FolderWidgetVue from './view/widgets/FolderWidget.vue';
import BindingWidgetVue from './view/widgets/BindingWidget.vue';
import { rootViewModel } from './viewmodel/rootViewModel';
import { soundManager } from './model/SoundManager';
// integrations
import '@sinkapoy/home-integrations-miot';
import '@sinkapoy/home-integrations-ai';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';
import { aliases, md } from 'vuetify/iconsets/md';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'md',
        aliases,
        sets: {
            md,
        },
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme: {
                dark: false,
                colors: {
                    background: '#FFFFFF',
                    surface: '#FFFFFF',
                    'surface-bright': '#FFFFFF',
                    'surface-light': '#EEEEEE',
                    'surface-variant': '#0076B3',
                    'on-surface': '#0076B3',
                    'on-surface-variant': '#EEEEEE',
                    primary: '#87AADE',
                    'primary-darken-1': '#0076B3',
                    secondary: '#0076B3',
                    'secondary-darken-1': '#0076B3',
                    error: '#B00020',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                    'input-padding-top': '0',
                    'input-padding-bottom': '0',
                }
            },
        }
    },
});

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
};
configureNetworking(NETWORK_CONFIG);

homeEngine.addSystem(new GadgetsViewModelSystem(), 1);

globalRoutes.addRoute('/widgets', WidgetsVue, 'Widgets');
globalRoutes.addRoute('/settings', SettingsView, 'Settings');
globalRoutes.addRoute('/settings/gadgets', SettingsGadgetsView, 'gadgets');
homeEngine.nextUpdate(()=>{
    const app = createApp(App);
    const router = createRouter({ history: createWebHashHistory(), routes: globalRoutes.getRoutes() });
    app.use(router);
    app.use(vuetify);
    (window as any).soundManager = soundManager;
    router.isReady().then(() => {
        soundManager.init();
        if (router.currentRoute.value.fullPath === '/') {
            router.push('/widgets');
        }
        app.mount('#app');
    });
    console.log(globalRoutes);
});


let oldTime = Date.now();
const ticker = () => {
    const newTime = Date.now();
    homeEngine.update(newTime - oldTime);
    oldTime = newTime;
    requestAnimationFrame(ticker);
};
ticker();

(window as any).engine = homeEngine;

const resizeObserver = new ResizeObserver(() => {
    if (matchMedia('(min-width: 30rem)').matches) {
        rootViewModel.portrait = false;
    } else {
        rootViewModel.portrait = true;
    }
});
resizeObserver.observe(document.body);


console.log(homeEngine);