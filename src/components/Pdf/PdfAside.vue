<script setup>
import { ref } from "vue";

defineProps({
  curPage: {
    type: Number,
    default: 1,
  },
  imagePages: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["pageChange"]);
const isShow = ref(true);

function handlePage(page) {
  emit("pageChange", +page);
}
</script>

<template>
  <aside :class="['pages', { show: isShow }]">
    <ul>
      <li
        v-for="(url, page) in imagePages"
        :key="page"
        :title="`第 ${page + 1} 頁`"
        :class="{ active: curPage === +page + 1 }"
        @click="handlePage(page + 1)"
      >
        <img :src="url" :alt="`第 ${page + 1} 頁`" width="100" />
        <span>{{ page + 1 }}</span>
      </li>
    </ul>
    <button @click="isShow = !isShow"></button>
  </aside>
</template>

<style scoped lang="scss">
.pages {
  position: relative;
  background: $gray-900;
  flex: 0 0 0;
  height: var(--height);
  color: $white;
  overflow: auto;
  transition: 0.3s;

  button {
    position: fixed;
    bottom: 0;
    left: 0;
    height: var(--height);
    width: 16px;
    background: $white;
    background-image: url("../../assets/images/triggle.svg");
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    box-shadow: 2px 0 2px #0003;
    transform: rotate(-180deg);
    transition: left 0.3s;

    &:hover {
      mix-blend-mode: exclusion;
    }
  }

  &.show {
    flex: 0 0 var(--aside-width);

    button {
      left: var(--aside-width);
      transform: rotate(0);
    }
  }

  ul {
    @include flex(center, center, column);
    padding: 1rem;
    gap: 1rem;
  }
  li {
    @include flex(center, center, column);
    cursor: pointer;
    gap: 0.25rem;

    &:hover,
    &.active {
      img {
        box-shadow: 0 0 2px 2px $primary-normal;
      }
      span {
        color: $primary-normal;
      }
    }
  }
}
</style>
