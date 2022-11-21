<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import DrawSvg from "@/assets/images/draw.vue";
import StepVue from "@/components/Step.vue";
import s from "@/assets/images/s.png";
import i from "@/assets/images/i.png";
import g from "@/assets/images/g.png";
import n from "@/assets/images/n.png";
import dot from "@/assets/images/dot.svg";
import logo from "@/assets/images/logo.png";

const router = useRouter();

function goPdf() {
  router.push({ name: "Main" });
}

function random(isRound, MAX = 40) {
  let number = Math.floor(Math.random() * MAX);

  if (number > MAX / 2 && isRound) number += MAX;

  return number;
}

const letters = [s, i, g, n, dot, logo];
</script>

<template>
  <div class="container">
    <img
      v-for="(_, i) in 12"
      :key="i"
      :src="letters[i % letters.length]"
      alt="sign"
      :class="['letter', { reverse: i % 2 }]"
      :style="{
        '--time': random(false, 10) + 12 + 's',
        '--delay': random(false, 12) * -1 + 's',
        top: random(true) + '%',
        left: random(true) + '%',
        filter: `contrast(${
          i % letters.length > 3 ? 1 : random(false, 10) / 10 + 0.3
        })`,
      }"
    />
    <div class="home">
      <transition name="slice" mode="out-in" appear>
        <div>
          <h2>
            {{ "隨時隨地都能簽，\nSIGNooo幫你省下大筆時間！" }}
            <DrawSvg />
          </h2>
          <StepVue class="home__step" :active="-1" />
          <h3>只需三步驟，立即簽署您的文件！</h3>
          <div class="flex-center">
            <el-button @click="goPdf">立即簽署文件</el-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <footer>
    Copyright © 2022
    <a href="https://2022.thef2e.com/users/12061549261454740005" target="_blank"
      >irena</a
    >
    Design. &
    <a href="https://github.com/JohnsonMao" target="_blank">Mao</a> F2E.
  </footer>
</template>

<style scoped lang="scss">
@import "@/assets/style/components/_button.scss";
.container {
  position: relative;
  height: calc(100vh - 57px);
  overflow: hidden;

  .letter {
    position: absolute;
    pointer-events: none;
    user-select: none;

    animation: round var(--time) var(--delay) infinite linear;
  }
  .reverse {
    animation-direction: reverse;
  }
}
.home {
  padding: 20px;
  background: #2b2b2b;
  color: $white;
  height: calc(100vh - 57px);

  h2 {
    position: relative;
    margin: 5vh 0 15vh;
    text-align: center;
    font-size: 5vw;
    white-space: pre-wrap;
    line-height: 1.5;
    z-index: 1;
  }

  svg {
    position: absolute;
    top: 105%;
    right: 20%;
    width: 30%;
    z-index: 1;
    transform: translateY(-50%);
  }

  &__step {
    position: relative;
    margin: 8vh auto;
    width: 75%;
    z-index: 1;
  }

  h3 {
    position: relative;
    font-size: 12px;
    text-align: center;
    z-index: 1;
  }

  .flex-center {
    @include flex(center);
    position: relative;
    margin: 8px;
    z-index: 1;
  }

  button {
    padding: 12px 48px;
    border-radius: 10px;
    font-size: 24px;
    font-weight: bold;
    height: initial;
  }
}

footer {
  position: fixed;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  color: $white;
  white-space: nowrap;

  a {
    color: $primary-normal;
  }
}

@keyframes round {
  0% {
    transform: rotate(0deg) scale(0.8) translate(-200px, 200px);
    opacity: 0;
  }
  50% {
    transform: rotate(180deg) scale(1.2) translate(0, 0);
    opacity: 0.7;
  }
  100% {
    transform: rotate(360deg) scale(0.8) translate(200px, -200px);
    opacity: 0;
  }
}
</style>
