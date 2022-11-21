<script setup>
import { ref, inject } from "vue";
import { Plus, EditPen, Delete, Close } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import penSvg from "@/assets/images/pen.svg";
import dateSvg from "@/assets/images/date.svg";
import textSvg from "@/assets/images/text.svg";

const emit = defineEmits(["joinPdf", "download"]);

const date = ref(new Date().toLocaleDateString());
const text = ref("");
const signs = inject("signs");
const openDialog = inject("openDialog");
const activeMode = ref("");

function edit(sign) {
  sign.active = 1.5;

  openDialog(sign);
}

function add() {
  openDialog({ active: 1.5 });
}

function del({ name }, index) {
  ElMessageBox.confirm("確定要刪除此簽名檔？", "", {
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      signs.value.splice(index, 1);
      localStorage.removeItem(`SIGN_${name}`);
      ElMessage({
        type: "success",
        message: "刪除完成",
      });
    })
    .catch(() => {});
}

function join(data) {
  activeMode.value = "";
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

function submit() {
  emit("download");
}
</script>

<template>
  <aside class="sign">
    <h2>簽署文件</h2>
    <ul class="sign__mobile">
      <li>
        <el-button @click="activeMode = 'signMode'">
          <img :src="penSvg" alt="您的簽名" />
        </el-button>
      </li>
      <li>
        <el-button @click="activeMode = 'textMode'">
          <img :src="textSvg" alt="文字" />
        </el-button>
      </li>
      <li>
        <el-button @click="activeMode = 'dateMode'">
          <img :src="dateSvg" alt="日期" />
        </el-button>
      </li>
      <li>
        <el-button @click="openDialog">重選文件</el-button>
      </li>
    </ul>
    <ul :class="[activeMode, 'sign__desktop']">
      <li class="signModeTarget">
        <div class="target">
          您的簽名<el-icon @click="activeMode = ''"><Close /></el-icon>
        </div>
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
        <div>
          <button class="bg sign__add" @click="add" v-show="signs.length < 3">
            <el-icon><Plus /></el-icon>新增簽名檔
          </button>
        </div>
      </li>
      <li class="dateModeTarget">
        <div class="target">
          日期<el-icon @click="activeMode = ''"><Close /></el-icon>
        </div>
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
      <li class="textModeTarget">
        <div class="target">
          文字<el-icon @click="activeMode = ''"><Close /></el-icon>
        </div>
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
      <el-button class="primary-btn" size="large" @click="submit">
        簽署文件並下載
      </el-button>
      <footer>
        Copyright © 2022
        <a
          href="https://2022.thef2e.com/users/12061549261454740005"
          target="_blank"
          >irena</a
        >
        Design. &
        <a href="https://github.com/JohnsonMao" target="_blank">Mao</a> F2E.
      </footer>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_input.scss";
@import "@/assets/style/components/_button.scss";

.sign {
  height: calc(var(--height) + 58px);
  overflow: auto;

  @media (max-width: 767px) {
    height: initial;
    width: 100%;
  }

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

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__mobile {
    display: none;

    @media (max-width: 767px) {
      @include flex(center);
      padding: 0;
      background: $black;
      width: 100%;
      gap: 16px;
    }

    button {
      padding: 6px;
    }
  }

  &__desktop {
    padding: 16px 24px 68px;

    @media (max-width: 767px) {
      position: absolute;
      top: 0;
      padding: 0;
      height: 48px;
      width: 100%;
      overflow: auto;
      z-index: -1;
    }

    li {
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
  li {
    padding: 8px 0px;

    .target {
      position: relative;
      i {
        position: absolute;
        right: 0;
        display: none;

        @media (max-width: 767px) {
          display: inline-block;
        }
      }
    }
  }

  .signMode,
  .dateMode,
  .textMode {
    top: 100%;
    height: calc(100vh - 240px);
    z-index: 1;
  }
  .signMode .signModeTarget,
  .dateMode .dateModeTarget,
  .textMode .textModeTarget {
    background: $white;
    display: block;

    > div {
      margin: 4px 16px;
    }
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
  position: fixed;
  bottom: 0;
  padding: 6px 24px;
  background: #fff;
  width: 244px;

  @media (max-width: 767px) {
    width: calc(100% - 56px);
    padding-bottom: 16px;
  }

  button {
    margin: 8px 0;
    width: 100%;
    border-radius: 10px;
  }

  footer {
    font-size: 12px;
    text-align: center;

    a {
      color: $primary-dark;
    }
  }
}
</style>
