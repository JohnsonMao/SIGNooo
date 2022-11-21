<script setup>
import { inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import logo from "@/assets/images/logo.png";
import github from "@/assets/images/github.png";

const route = useRoute();
const router = useRouter();
const openDialog = inject("openDialog");
const signs = inject("signs");

function open() {
  if (route.name === "Main") openDialog({ active: 0 });
  else router.push({ name: "Main" });
}

const menus = [
  {
    logo: true,
    text: "SIGNooo",
    click: () => router.push({ name: "Home" }),
  },
  {
    text: "簽署文件",
    click: open,
  },
  {
    text: "快速登入",
    click: () => {}, // TODO: 串接 firebase 第三方服務
    disabled: true,
  },
  {
    text: "清除紀錄",
    click: () => {
      ElMessageBox.confirm("確定要清除所有紀錄？", "", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          signs.value = [];
          ElMessage({
            type: "success",
            message: "刪除完成",
          });
        })
        .catch(() => {});
    },
  },
  {
    img: github,
    click: () => window.open("https://github.com/JohnsonMao/SIGNooo"),
  },
];
console.log(github);
</script>

<template>
  <el-menu class="menu" mode="horizontal">
    <el-menu-item
      v-for="menu in menus"
      :key="menu.text"
      :index="menu.text"
      :disabled="menu.disabled"
      class="menu__item"
    >
      <template v-if="menu.logo">
        <h1>{{ menu.text }}</h1>
        <img :src="logo" alt="SIGNooo logo" @click="menu.click" />
      </template>
      <template v-else-if="menu.img">
        <img
          :src="github"
          class="github"
          alt="Github"
          width="32"
          @click="menu.click"
        />
      </template>
      <template v-else>
        <div @click="menu.click">
          {{ menu.text }}
        </div>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.menu {
  position: sticky;
  top: 0;
  padding: 8px 20px;
  align-items: center;
  gap: 20px;
  z-index: 10;

  &__item {
    border-bottom: none;

    &.is-active {
      border-bottom: none;
    }

    &:first-child {
      @include flex();
      margin-right: auto;

      h1 {
        width: 0;
        overflow: hidden;
      }

      img {
        height: 40px;
        transition: transform 0.15s;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
    &:not(:first-child) {
      transition: filter 0.2s;
      filter: invert(0);

      &:hover {
        filter: invert(1);
      }
    }

    div {
      padding: 8px 24px;
      background: $black;
      border-radius: 4px;
      color: $white;
      transition: background 0.15s;
    }
  }
}
</style>
