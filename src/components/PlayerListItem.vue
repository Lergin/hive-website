<style scoped>
a {
  color: inherit;
  text-decoration: inherit;
}
</style>

<template>
  <router-link :to="`/players/ebdf264aabda45708f61f2d7a2bb4758`">
    <v-list-item>
      <v-list-item-avatar>
        <hive-minecraft-avatar
          :uuid="uuid"
          :name="name"
          :size="48"
        ></hive-minecraft-avatar>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ name }}</v-list-item-title>
        <v-list-item-subtitle v-if="$vuetify.breakpoint.smAndUp">
          <slot name="subtitle"><uuid-format :uuid="uuid"></uuid-format></slot>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action v-if="!hideInfoIcon">
        <v-btn icon>
          <v-icon color="grey lighten-1">{{ mdiInformation }}</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";
import "@/components/uuid-format";
import { mdiInformation } from "@mdi/js";

export default Vue.extend({
  props: {
    uuid: String,
    name: String,
    rank: String,
    hideInfoIcon: Boolean
  },

  data: () => ({
    mdiInformation: mdiInformation
  })
});
</script>
