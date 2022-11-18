import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Component from "./assets/plugins";

import "./assets/style/global/_reset.scss";
import "element-plus/theme-chalk/el-message.css";

const app = createApp(App);

app.use(router);
app.use(Component);

app.mount("#app");
