<script setup>
import { computed, inject } from "vue";
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue";
import { useModel } from "@/composables";

const props = defineProps({
  fileName: {
    type: String,
    default: "",
  },
  maxPage: {
    type: Number,
    default: 0,
  },
  curPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:fileName", "update:curPage", "pageChange"]);

const openDialog = inject("openDialog");

const fileName = useModel(props, emit, "fileName");
const curPage = useModel(props, emit, "curPage");
const initPage = computed(() => (props.maxPage ? 1 : 0));

function goPage(step) {
  emit("pageChange", (curPage.value += step));
}

function handleChange(e) {
  emit("pageChange", e);
}
</script>

<template>
  <header class="toolbar">
    <el-input
      v-model="fileName"
      class="toolbar__input"
      placeholder="請輸入文件名稱"
    />
    <el-input-number
      v-model="curPage"
      :min="initPage"
      :max="maxPage"
      :controls="false"
      step-strictly
      class="toolbar__page"
      @change="handleChange"
    />
    <span class="toolbar__pageMax">/ {{ maxPage }}</span>
    <div class="toolbar__pageControl">
      <el-button @click="goPage(1)" circle :disabled="curPage === maxPage">
        <el-icon><ArrowDownBold /></el-icon>
      </el-button>
      <el-button @click="goPage(-1)" circle :disabled="curPage === 1">
        <el-icon><ArrowUpBold /></el-icon>
      </el-button>
    </div>
    <el-button class="resetBtn" @click="openDialog">重選文件</el-button>
  </header>
</template>

<style scoped lang="scss">
.toolbar {
  @include flex();
  position: sticky;
  top: 57px;
  padding: 0.8rem 1rem;
  background: $gray-900;
  gap: 0.5rem;

  &__input {
    margin-right: 0.5rem;
    flex: 0 1 240px;
  }

  &__page {
    flex: 0 0 60px;

    &Max {
      margin-right: 0.5rem;
      color: $white;
    }

    &Control {
      margin-right: 0.5rem;

      button {
        padding: 6px;
        height: initial;

        & + button {
          margin-left: 6px;
        }
      }
    }
  }
}

@media (max-width: 870px) {
  .resetBtn {
    display: none;
  }
}
</style>
