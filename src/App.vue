<script>
import {
  defineComponent,
  ref,
  computed,
  watch,
} from "vue";
import { ElConfigProvider } from "element-plus";
import { RouterLink, RouterView, useRoute } from "vue-router";
import locale from "element-plus/lib/locale/lang/zh-tw";
import VLogin from "@/layouts/VLogin.vue";
import VIndex from "@/layouts/VIndex.vue";

export default defineComponent({
  components: {
    ElConfigProvider,
    VLogin,
    VIndex,
  },
  setup() {
    const route = useRoute();
    const layout = ref();
    const routeName = computed(() => route.name);

    function layoutWatchFunction() {
      layout.value = route.meta.layout ?? "VIndex";
    }

    watch(route, layoutWatchFunction);

    return { RouterLink, RouterView, locale, layout, routeName };
  },
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <transition name="fade" mode="out-in">
      <div class="container" :key="layout">
        <component :is="layout">
          <router-view #default="{ Component }">
            <transition name="component" mode="out-in" appear>
              <div
                :class="layout === 'VIndex' ? 'login' : 'index'"
                :key="routeName"
              >
                <component :is="Component" />
              </div>
            </transition>
          </router-view>
        </component>
      </div>
    </transition>
  </ElConfigProvider>
</template>

<style lang="scss" src="@/assets/style/global/_transition.scss"></style>
<style lang="scss" scoped>
.container {
  font-family: "微軟正黑體", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
}
</style>
