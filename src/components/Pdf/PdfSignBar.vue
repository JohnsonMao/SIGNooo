<script setup>
import { ref } from "vue";

const date = ref(new Date());
const text = ref("");
</script>

<template>
  <aside class="sign">
    <div>
      <h2>簽署文件</h2>
      <ul>
        <li>
          <div>您的簽名</div>
          <div class="bg">
            <img src="" alt="sign" />
          </div>
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
          </div>
        </li>
      </ul>
    </div>
    <div class="btnGroup">
      <el-button class="secondary-btn" size="large">儲存文件於草稿</el-button>
      <el-button class="primary-btn" size="large">確定簽署此文件</el-button>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_input.scss";

.sign {
  @include flex(space-between, flex-start, column);
  height: calc(var(--height) + 58px);

  h2 {
    font-size: 32px;
    line-height: 2;
    text-align: center;
    background: $black;
    color: $white;
    width: 100%;
  }

  ul {
    padding: 16px 24px;
  }

  li {
    padding: 8px 0px;
  }
}
.bg {
  --el-input-bg-color: transparent;

  margin: 8px 0;
  padding: 6px 10px;
  background: $primary-light;
  border-radius: 8px;
}
.btnGroup {
  padding: 16px 24px;

  button {
    margin: 8px 0;
    width: 100%;
    border-radius: 10px;
  }
}
</style>
