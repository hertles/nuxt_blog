import {createVuetify} from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.css";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        theme: {
            defaultTheme: 'light'
        },
        defaults: {
            global: {
                ripple: true,
            },
            VSheet: {
                elevation: 4,
            },
        },
        components,
        directives,
        icons: {
            defaultSet: 'mdi'
        },
    })
    app.vueApp.use(vuetify);
})
