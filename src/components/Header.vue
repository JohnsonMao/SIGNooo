<script setup>
import logo from "@/assets/images/logo.png";
import { inject } from "vue";

const openDialog = inject("openDialog");

const menus = [
  {
    logo: true,
    text: "SIGNooo",
  },
  {
    text: "服務介紹",
  },
  {
    text: "簽署文件",
    click: openDialog,
  },
  {
    text: "註冊",
  },
  {
    text: "登入",
  },
];
</script>

<template>
  <el-menu class="menu" mode="horizontal">
    <el-menu-item
      v-for="menu in menus"
      :key="menu.text"
      :index="menu.text"
      class="menu__item"
    >
      <template v-if="menu.logo">
        <h1>{{ menu.text }}</h1>
        <img :src="logo" alt="SIGNooo logo" />
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

    div {
      padding: 8px 24px;
      background: $black;
      border-radius: 4px;
      color: $white;
      transition: background 0.15s;

      &:hover {
        background: $primary-dark;
      }
    }
  }
}
</style>
