<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          :value="value"
          :label="label"
          :prepend-icon="mdiCalendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        :value="value"
        @input="input"
        v-bind="datePickerProps"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { mdiCalendar } from "@mdi/js";

@Component
export default class PlayerInfo extends Vue {
  private menu: boolean = false;
  private mdiCalendar = mdiCalendar;

  @Prop(String)
  value!: string;

  @Prop(String)
  label!: string;

  @Prop(Object)
  datePickerProps!: any;

  @Emit()
  input(value: string) {
    this.menu = false;
    return value;
  }
}
</script>
