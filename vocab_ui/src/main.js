import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "semantic-ui-css/semantic.min.css";

createApp(App).use(router).mount("#app");
