<script setup lang="ts">
import { ref } from "vue";

const inProgress = ref(false);
const timerLabel = ref("Session");
</script>

<template>
  <div class="timer-wrap">
    <div id="timer-label">{{ timerLabel }}</div>
    <div id="time-left">25:00</div>
    <Icon id="start_stop" :icon="inProgress ? 'play' : 'pause'" size="lg" />
    <Icon id="reset" icon="redo-alt" size="lg" />
  </div>
  <div class="controller-wrap">
    <div id="break-label">Break Length</div>
    <Icon class="icon" id="break-increment" icon="chevron-up" />
    <div id="break-length">5</div>
    <Icon class="icon" id="break-decrement" icon="chevron-down" />
  </div>
  <div class="controller-wrap">
    <div id="session-label">Session Length</div>
    <Icon class="icon" id="session-increment" icon="chevron-up" />
    <div id="session-length">25</div>
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
  font-weight: bold;
}
#time-left {
  font-size: 40px;
  font-weight: bold;
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
