<script setup>
import { onMounted, ref } from "vue";

const width = window.innerWidth * 0.8 - 90;
// const height = window.innerHeight * 0.8 - 40;
const height = width / 3;

const canvas = ref(null);
const ctx = ref(null);
const signName = ref("");
const isMouseDown = ref(false);
const isStart = ref(false);
let lastXY = { x: 0, y: 0 };
let lastTime = 0;
let lastLineWidth = -1;
let strokeColor = "black";

onMounted(() => {
  ctx.value = canvas.value.getContext("2d");

  canvas.value.width = width;
  canvas.value.height = height;
});

function clear() {
  ctx.value.clearRect(0, 0, width, height);
  isStart.value = false;
}

function getXY(x, y) {
  const box = canvas.value.getBoundingClientRect();

  return { x: ~~(x - box.left), y: ~~(y - box.top) };
}

function calcDistance(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

const maxLineWidth = 4;
const minLineWidth = 1;
const maxStrokeV = 10;
const minStrokeV = 0.1;

function calcLineWidth(t, s) {
  const v = s / t;
  let result = null;

  if (v <= minStrokeV) result = maxLineWidth;
  else if (v >= maxStrokeV) result = minLineWidth;
  else
    result =
      maxLineWidth -
      ((v - minStrokeV) / (maxStrokeV - minStrokeV)) *
        (maxLineWidth - minLineWidth);

  if (lastLineWidth === -1) return result;

  return (lastLineWidth * 2 + result) / 3;
}

function getPoint(e) {
  return e.type.includes("mouse")
    ? {
        x: e.clientX,
        y: e.clientY,
      }
    : {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
}

function beginStroke(e) {
  e.preventDefault();
  const point = getPoint(e);

  isStart.value = true;
  isMouseDown.value = true;
  lastXY = getXY(point.x, point.y);
  lastTime = new Date().getTime();
}

function endStroke(e) {
  e.preventDefault();
  isMouseDown.value = false;
}

function moveStroke(e) {
  e.preventDefault();
  if (!isMouseDown.value) return;

  const point = getPoint(e);
  const currentXY = getXY(point.x, point.y);
  const currentTime = new Date().getTime();

  // 利用距離與時間 計算寫的粗細
  const s = calcDistance(currentXY, lastXY);
  const t = currentTime - lastTime;
  const lineWidth = calcLineWidth(t, s);

  ctx.value.beginPath();
  ctx.value.moveTo(lastXY.x, lastXY.y);
  ctx.value.lineTo(currentXY.x, currentXY.y);
  ctx.value.strokeStyle = strokeColor;
  ctx.value.lineWidth = lineWidth;
  ctx.value.lineCap = "round";
  ctx.value.lineJoin = "round";
  ctx.value.stroke();

  lastXY = currentXY;
  lastTime = currentTime;
  lastLineWidth = lineWidth;
}

const activeName = ref("draw");
</script>

<template>
  <div class="sign">
    <div class="sign__name">
      <label for="signName">簽名檔名稱</label>
      <el-input id="signName" v-model="signName" />
    </div>

    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="繪製簽名檔" name="draw">
        <div class="sign__control">
          <canvas
            ref="canvas"
            class="sign"
            @mousedown="beginStroke"
            @mouseup="endStroke"
            @mouseout="endStroke"
            @mousemove="moveStroke"
            @touchstart="beginStroke"
            @touchmove="moveStroke"
            @touchend="endStroke"
          ></canvas>
          <div class="sign__control__buttons">
            <el-button class="primary-btn" :disabled="!isStart">重做</el-button>
            <el-button class="primary-btn" @click="clear" :disabled="!isStart">
              刪除
            </el-button>
          </div>
          <span class="sign__control__placeholder" v-show="!isStart">
            請在此空白畫布簽下您的簽名
          </span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上傳簽名檔" name="upload">upload</el-tab-pane>
    </el-tabs>

    <el-button class="primary-btn sign__submit" :disabled="!isStart">
      確認新增簽名檔
    </el-button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_tabs.scss";
@import "@/assets/style/components/_button.scss";
.sign {
  height: 100%;

  &__name {
    width: 30%;

    label {
      margin-bottom: 8px;
      display: block;
    }
  }

  &__control {
    position: relative;

    canvas {
      border-radius: var(--border-radius);
      background: $white;
    }

    &__buttons {
      @include position(absolute, initial, 24px, 24px, initial);
      @include flex(center, center, column);
      gap: 12px;

      button {
        margin: 0;
        border-radius: 10px;
      }
    }

    &__placeholder {
      @include position(absolute, 16px, 16px, initial, initial);
      color: $gray-800;
      animation: flashing 0.3s ease-out infinite alternate;
      opacity: 0.6;

      @keyframes flashing {
        100% {
          opacity: 0.3;
        }
      }
    }
  }

  &__submit {
    display: block;
    margin: 16px auto;
    width: 200px;
  }
}
</style>
