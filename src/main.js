import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Component from "./assets/plugins";

import "./assets/style/global/_reset.scss";
import "./assets/style/global/_base.scss";
import "element-plus/theme-chalk/el-message.css";
import "pdfjs-dist/web/pdf_viewer.css";

const app = createApp(App);

app.use(router).use(Component).mount("#app");
