<template>
  <div>
    <h1>Bulgarian Parliament Elections 2021 - 4th April</h1>
    <p>Where can I vote?</p>
    <div style="width: 80%; margin: auto">
      <places
        v-model="form.country.label"
        placeholder="I live in ..."
        @change="
          (val) => {
            form.country.data = val;
            coordinates = val.latlng;
          }
        "
      >
      </places>
    </div>

    <gmap-map
      :center="coordinates"
      :zoom="12"
      style="width: 80%; height:700px; margin: auto"
    >
      <gmap-info-window
        class="info"
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened = false"
      >
        {{ infoContent }}
      </gmap-info-window>
      <gmap-marker
        v-for="section in sections"
        :key="section.id"
        :position="getPosition(section)"
        :clickable="true"
        @click="toggleInfo(section, section.id)"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import axios from "axios";
import Places from "vue-places";
export default {
  data() {
    return {
      sections: [],
      coordinates: {
        lat: 0,
        lng: 0,
      },
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      form: {
        country: {
          label: null,
          data: {},
        },
      },
    };
  },
  created() {
    axios
      .get("https://bulgarian-voting-map.herokuapp.com/sections")
      .then((response) => {
        this.sections = response.data;
      })
      .catch((error) => alert(error));

    this.$getLocation({})
      .then((coordinates) => {
        this.coordinates = coordinates;
      })
      .catch((error) => alert(error));
  },
  methods: {
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.coordinates.lat),
        lng: parseFloat(marker.coordinates.lng),
      };
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.title;
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
  },
  components: {
    Places,
  },
};
</script>

<style>
.style:focus {
  outline: none;
}
</style>
