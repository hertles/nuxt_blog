import {createVuetify} from "vuetify";
import {aliases, mdi} from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
    })
    app.vueApp.use(vuetify);
})