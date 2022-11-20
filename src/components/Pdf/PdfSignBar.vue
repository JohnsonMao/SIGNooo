<script setup>
import { ref, inject } from "vue";
import { Plus, EditPen, Delete } from "@element-plus/icons-vue";

const emit = defineEmits(["joinPdf"]);

const date = ref(new Date().toLocaleDateString());
const text = ref("");
const signs = inject("signs");
const openDialog = inject("openDialog");

function edit(sign) {
  sign.active = 1.5;

  openDialog(sign);
}

function add() {
  openDialog({ active: 1.5 });
}

function del({ name }, index) {
  signs.value.splice(index, 1);
  localStorage.removeItem(`SIGN_${name}`);
}

function join(data) {
  switch (data.action) {
    case "date":
      data.item = date.value;
      break;

    case "text":
      data.item = text.value;
      break;
  }
  emit("joinPdf", data);
}
</script>

<template>
  <aside class="sign">
    <h2>簽署文件</h2>
    <ul>
      <li>
        <div>您的簽名</div>
        <template v-for="(sign, index) in signs" :key="index">
          <div class="sign__title">{{ sign.name }}</div>
          <div
            class="bg sign__container"
            @click="join({ action: 'sign', item: sign })"
          >
            <span>
              <img :src="sign.img" :alt="sign.name" width="160" />
            </span>
            <el-button link class="edit" @click.stop="edit(sign)">
              <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button link class="delete" @click.stop="del(sign, index)">
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </template>
        <button class="bg sign__add" @click="add" v-show="signs.length < 3">
          <el-icon><Plus /></el-icon>新增簽名檔
        </button>
      </li>
      <li>
        <div>日期</div>
        <div class="bg">
          <el-date-picker
            v-model="date"
            type="date"
            :clearable="false"
            :editable="false"
            format="YYYY/MM/DD"
            class="bg-transparent"
          />
          <el-icon class="plus" @click="join({ action: 'date' })"
            ><Plus
          /></el-icon>
        </div>
      </li>
      <li>
        <div>文字</div>
        <div class="bg">
          <el-input
            v-model="text"
            class="bg-transparent"
            placeholder="增加文字方塊"
          />
          <el-icon class="plus" @click="join({ action: 'text' })"
            ><Plus
          /></el-icon>
        </div>
      </li>
    </ul>
    <div class="btnGroup">
      <el-button class="secondary-btn" size="large">儲存文件於草稿</el-button>
      <el-button class="primary-btn" size="large">確定簽署此文件</el-button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_input.scss";

.sign {
  height: calc(var(--height) + 58px);
  overflow: auto;

  h2 {
    position: sticky;
    top: 0;
    font-size: 32px;
    line-height: 2;
    text-align: center;
    background: $black;
    color: $white;
    width: 100%;
    z-index: 2;
  }

  ul {
    padding: 16px 24px;
  }

  li {
    padding: 8px 0px;
  }

  &__title {
    margin-bottom: -6px;
    padding-top: 6px;
    font-size: 14px;
  }

  &__container {
    @include flex(center);
    position: relative;
    cursor: pointer;

    span {
      background: $white;
      border-radius: 4px;
      overflow: hidden;
    }

    .edit,
    .delete {
      position: absolute;
      right: 6px;

      * {
        pointer-events: none;
      }

      &:hover,
      &:active,
      &:focus {
        color: $primary-dark;
      }
    }
    .edit {
      top: 6px;
    }
    .delete {
      bottom: 6px;
    }
  }

  &__add {
    width: 100%;
    line-height: 4;
    border: none;
  }
}

.bg {
  --el-input-bg-color: transparent;

  position: relative;
  margin: 8px 0;
  padding: 6px 10px;
  background: $primary-light;
  border-radius: 8px;

  .plus {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      color: $primary-dark;
    }
  }
}
.btnGroup {
  position: sticky;
  bottom: 0;
  padding: 6px 24px;
  background: #fff;

  button {
    margin: 8px 0;
    width: 100%;
    border-radius: 10px;
  }
}
</style>
