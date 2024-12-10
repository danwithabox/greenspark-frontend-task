import "./assets/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "floating-vue/dist/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
