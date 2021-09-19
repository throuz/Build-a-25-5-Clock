<script setup lang="ts">
import { ref, watch } from "vue";

const nextIsBreak = ref(true);
const isInProgress = ref(false);
const minutes = ref(25);
const seconds = ref(0);
const breakLength = ref(5);
const sessionLength = ref(25);
const timeOutAudio = new Audio(
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
);
let countdowner: number;

const formattedNumber = (value: number) => {
  return ("0" + value).slice(-2);
};

const startStopClick = () => {
  isInProgress.value = !isInProgress.value;
};

function startCountdown() {
  countdowner = setInterval(countdown, 1000);
}

const countdown = () => {
  if (seconds.value === 0 && minutes.value === 0) {
    timeOutAudio.play();
    minutes.value = nextIsBreak.value ? breakLength.value : sessionLength.value;
    nextIsBreak.value = !nextIsBreak.value;
    seconds.value = 0;
  } else if (seconds.value === 0) {
    minutes.value -= 1;
    seconds.value = 59;
  } else {
    seconds.value -= 1;
  }
};

function stopCountdown() {
  clearInterval(countdowner);
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
  nextIsBreak.value = true;
  isInProgress.value = false;
  minutes.value = 25;
  seconds.value = 0;
  breakLength.value = 5;
  sessionLength.value = 25;
  timeOutAudio.pause();
  timeOutAudio.currentTime = 0;
};

const breakIncrement = () => {
  !isInProgress.value && breakLength.value < 60 && (breakLength.value += 1);
};

const breakDecrement = () => {
  !isInProgress.value && breakLength.value > 1 && (breakLength.value -= 1);
};

const sessionIncrement = () => {
  if (!isInProgress.value && sessionLength.value < 60) {
    sessionLength.value += 1;
    minutes.value = sessionLength.value;
    seconds.value = 0;
    nextIsBreak.value = true;
    timeOutAudio.pause();
    timeOutAudio.currentTime = 0;
  }
};

const sessionDecrement = () => {
  if (!isInProgress.value && sessionLength.value > 1) {
    sessionLength.value -= 1;
    minutes.value = sessionLength.value;
    seconds.value = 0;
    nextIsBreak.value = true;
    timeOutAudio.pause();
    timeOutAudio.currentTime = 0;
  }
};
</script>

<template>
  <div class="timer-wrap">
    <div id="timer-label">{{ nextIsBreak ? "Session" : "Break" }}</div>
    <div id="time-left">
      {{ formattedNumber(minutes) }}:{{ formattedNumber(seconds) }}
    </div>
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
  cursor: pointer;
}
#reset {
  cursor: pointer;
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
  cursor: pointer;
}
</style>
