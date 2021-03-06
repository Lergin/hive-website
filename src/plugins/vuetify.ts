import Vue from "vue";
import Vuetify, { Scroll } from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify, {
  directives: {
    Scroll
  }
});

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.blue.base,
        secondary: colors.lightGreen.base,
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      },
      dark: {
        primary: colors.lightBlue.base,
        secondary: colors.lightGreen.accent2,
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: "mdiSvg"
  }
});
