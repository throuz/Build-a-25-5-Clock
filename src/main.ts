import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronUp,
  faChevronDown,
  faPlay,
  faPause,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronUp, faChevronDown, faPlay, faPause, faSyncAlt);

createApp(App).component("Icon", FontAwesomeIcon).mount("#app");
