import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import bus from "./bus"

const app = createApp(App)
app.config.globalProperties.$bus = bus
app.use(store).use(router).mount('#app')
