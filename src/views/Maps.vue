<template>
  <hive-app>
    <div class="full-height">
      <hive-loading-circular
        :loading="data.length === 0"
      ></hive-loading-circular>

      <v-timeline :dense="$vuetify.breakpoint.smAndDown" v-if="data.length > 0">
        <v-timeline-item v-for="map in loadedData" :key="map.worldName">
          <template v-slot:opposite>
            <strong>
              {{ map.date | timestampToString }}
            </strong>
          </template>
          <v-card class="elevation-2">
            <v-card-title class="font-weight-light"
              >{{ map.gameType | gameTypeToName }} -
              {{ map.mapName }}</v-card-title
            >
            <v-card-text>
              <div class="caption mt-n2" v-if="$vuetify.breakpoint.mdAndUp">
                {{ map.worldName }}
              </div>
              <div class="caption mt-n2" v-if="$vuetify.breakpoint.smAndDown">
                {{ map.date | timestampToString }} - {{ map.worldName }}
              </div>
              <div class="body-1 mt-2 text--primary">{{ map.author }}</div>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
      <infinite-loading @infinite="loadMore" v-if="data.length > 0">
        <hive-loading-circular
          class="mt-2"
          loading
          slot="spinner"
        ></hive-loading-circular>
      </infinite-loading>
    </div>
  </hive-app>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { GameTypes, GameType } from "hive-api/dist/hive.min.js";
import InfiniteLoading, { StateChanger } from "vue-infinite-loading";

@Component({
  components: {
    InfiniteLoading
  },
  filters: {
    timestampToString: (timestamp: number) => {
      if (timestamp < 1504610000000) {
        return "A long time ago";
      }
      return new Date(timestamp).toLocaleDateString();
    },
    gameTypeToName: (gameType: string) => {
      return ((GameTypes as any) as { [key: string]: GameType })[gameType].name;
    }
  },
  metaInfo: {
    title: "Maps",
    meta: [
      {
        vmid: "og:title",
        name: "og:title",
        content: `Maps`
      }
    ]
  }
})
export default class TeamChanges extends Vue {
  private data: {
    date: number;
    author: string;
    gameType: string;
    mapName: string;
    worldName: string;
  }[] = [];
  private loadedData: {
    date: number;
    author: string;
    gameType: string;
    mapName: string;
    worldName: string;
  }[] = [];

  async mounted() {
    this.data = await this.fetchMaps();
  }

  fetchMaps(
    page: number = 0
  ): Promise<
    {
      date: number;
      author: string;
      gameType: string;
      mapName: string;
      worldName: string;
    }[]
  > {
    return fetch(`/api/lergin/maps`).then(res => res.json());
  }

  loadMore($state: StateChanger) {
    this.loadedData = this.data.slice(0, this.loadedData.length + 20);

    if (this.loadedData.length >= this.data.length) {
      $state.complete();
    } else {
      $state.loaded();
    }
  }
}
</script>
