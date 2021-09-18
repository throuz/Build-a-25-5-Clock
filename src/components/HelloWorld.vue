<script setup lang="ts">
import { ref, watch } from "vue";

const timerLabel = ref("Session");
const isInProgress = ref(false);
const minutes = ref(25);
const seconds = ref(0);
const breakLength = ref(5);
const sessionLength = ref(25);

const startStopClick = () => {
  isInProgress.value = !isInProgress.value;
};

let nIntervId: any;

function startCountdown() {
  nIntervId = setInterval(countdown, 1000);
}

const countdown = () => {
  if (seconds.value === 0) {
    minutes.value -= 1;
    seconds.value = 59;
  } else {
    seconds.value -= 1;
  }
};

function stopCountdown() {
  clearInterval(nIntervId);
}

watch(isInProgress, () => {
  if (isInProgress.value) {
    startCountdown();
  } else {
    stopCountdown();
  }
});
</script>

<template>
  <div class="timer-wrap">
    <div id="timer-label">{{ timerLabel }}</div>
    <div id="time-left">{{ minutes }}:{{ seconds }}</div>
    <Icon
      id="start_stop"
      :icon="isInProgress ? 'pause' : 'play'"
      size="lg"
      @click="startStopClick"
    />
    <Icon id="reset" icon="redo-alt" size="lg" />
  </div>
  <div class="controller-wrap">
    <div id="break-label">Break Length</div>
    <Icon class="icon" id="break-increment" icon="chevron-up" />
    <div id="break-length">{{ breakLength }}</div>
    <Icon class="icon" id="break-decrement" icon="chevron-down" />
  </div>
  <div class="controller-wrap">
    <div id="session-label">Session Length</div>
    <Icon class="icon" id="session-increment" icon="chevron-up" />
    <div id="session-length">{{ sessionLength }}</div>
    <Icon class="icon" id="session-decrement" icon="chevron-down" />
  </div>
</template>

<style scoped>
.timer-wrap {
  padding: 8% 0;
  margin: 5%;
  background: #abc;
}
#timer-label {
  font-size: 30px;
}
#time-left {
  font-size: 40px;
  padding: 5%;
}
#start_stop {
  margin-right: 5%;
}
.controller-wrap {
  padding: 3% 10%;
  margin: 0 5% 3% 5%;
  display: grid;
  grid-template-columns: 60% repeat(3, 1fr);
  background: #abc;
}
.icon {
  justify-self: center;
  align-self: center;
}
</style>
