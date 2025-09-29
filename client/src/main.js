import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
// optional icons
import "@mdi/font/css/materialdesignicons.css";
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

store.dispatch("auth/initAuth").finally(() => {
    app.use(store).use(router).use(vuetify).mount("#app");
})
