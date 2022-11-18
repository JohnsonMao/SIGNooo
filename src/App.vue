<script>
import { defineComponent, ref, computed, watch } from "vue";
import { ElConfigProvider } from "element-plus";
import { RouterLink, RouterView, useRoute } from "vue-router";
import locale from "element-plus/lib/locale/lang/zh-tw";
import Layout from "@/layouts/Layout.vue";

export default defineComponent({
  components: {
    ElConfigProvider,
    Layout,
  },
  setup() {
    const route = useRoute();
    const layout = ref();
    const routeName = computed(() => route.name);

    function layoutWatchFunction() {
      layout.value = route.meta.layout ?? "Index";
    }

    watch(route, layoutWatchFunction);

    return { RouterLink, RouterView, locale, layout, routeName };
  },
});
</script>

<template>
  <ElConfigProvider :locale="locale">
    <transition name="fade" mode="out-in">
      <div :key="layout">
        <component :is="layout">
          <router-view #default="{ Component }">
            <transition name="component" mode="out-in" appear>
              <div :key="routeName">
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
<style lang="scss" scoped></style>
