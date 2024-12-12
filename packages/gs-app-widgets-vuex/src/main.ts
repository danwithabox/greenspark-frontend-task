import "./assets/main.scss";
import { createApp } from "vue";
import "floating-vue/dist/style.css";
import App from "./App.vue";
import { store } from "./store/store";

const app = createApp(App);

app.use(store);

app.mount("#app");
