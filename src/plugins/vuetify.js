import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#048127",
        secondary: "#ffe221",
        accent: "#ff8401",
        error: "#b71c1c",
      },
    },
  },
};

export default new Vuetify(opts);
