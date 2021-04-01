import Vue from "vue";
import App from "./App.vue";
import VueGeolocation from "vue-browser-geolocation";
import * as VueGoogleMaps from "vue2-google-maps";
require("dotenv").config();

Vue.use(VueGeolocation);
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_API_KEY,
    libraries: "places",
  },
});
// The following components are automatically installed globally
// If you would like to define your own component names,
// see below
// GmapMap
// GmapMarker
// GmapCluster
// GmapInfoWindow
// GmapPolyline
// GmapPolygon
// GmapCircle
// GmapRectangle
// GmapPlaceInput

new Vue({
  render: (h) => h(App),
}).$mount("#app");
