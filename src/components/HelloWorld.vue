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
  nIntervId = setInterval(countdown, 10);
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

const resetClick = () => {
  stopCountdown();
  isInProgress.value = false;
  minutes.value = 25;
  seconds.value = 0;
  breakLength.value = 5;
  sessionLength.value = 25;
};

const breakIncrement = () => {
  !isInProgress.value && breakLength.value < 60 && (breakLength.value += 1);
};

const breakDecrement = () => {
  !isInProgress.value && breakLength.value > 0 && (breakLength.value -= 1);
};

const sessionIncrement = () => {
  if (!isInProgress.value && sessionLength.value < 60) {
    sessionLength.value += 1;
    minutes.value = sessionLength.value;
    seconds.value = 0;
  }
};

const sessionDecrement = () => {
  if (!isInProgress.value && sessionLength.value < 60) {
    sessionLength.value -= 1;
    minutes.value = sessionLength.value;
    seconds.value = 0;
  }
};
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
    <Icon id="reset" icon="sync-alt" size="lg" @click="resetClick" />
  </div>
  <div class="controller-wrap">
    <div id="break-label">Break Length</div>
    <Icon
      class="icon"
      id="break-increment"
      icon="chevron-up"
      @click="breakIncrement"
    />
    <div id="break-length">{{ breakLength }}</div>
    <Icon
      class="icon"
      id="break-decrement"
      icon="chevron-down"
      @click="breakDecrement"
    />
  </div>
  <div class="controller-wrap">
    <div id="session-label">Session Length</div>
    <Icon
      class="icon"
      id="session-increment"
      icon="chevron-up"
      @click="sessionIncrement"
    />
    <div id="session-length">{{ sessionLength }}</div>
    <Icon
      class="icon"
      id="session-decrement"
      icon="chevron-down"
      @click="sessionDecrement"
    />
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
