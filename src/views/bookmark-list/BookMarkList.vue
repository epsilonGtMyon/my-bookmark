<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> ブックマーク一覧 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <template
          v-for="(bookmark, index) in state.bookmarkRecords"
          :key="bookmark.id"
        >
          <ion-item @click="toEditor(index)">
            {{ bookmark.title }}
            <ion-button
              slot="end"
              color="primary"
              @click.stop="openUrl(bookmark.url)"
            >
              開く
              <ion-icon :icon="browsersOutline"></ion-icon>
            </ion-button>
          </ion-item>
        </template>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button router-link="/bookmark-editor">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import { Plugins } from "@capacitor/core";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add, browsersOutline } from "ionicons/icons";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

const { App, Browser } = Plugins;

type DataType = {
  bookmarkRecords: Bookmark[];
};

const bookmarkRepository = new BookmarkRepository();

export default defineComponent({
  name: "BookMarkList",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    const router = useRouter();

    const state = reactive<DataType>({
      bookmarkRecords: [],
    });

    const toEditor = (index: number) => {
      const bookmarkRecord = state.bookmarkRecords[index];
      const id = bookmarkRecord.id;

      router.push({ path: "/bookmark-editor", query: { id } });
    };
    const openUrl = async (url: string) => {
      const v = await App.canOpenUrl({ url });
      if (v.value) {
        await Browser.open({ url });
      }
    };

    const ionViewWillEnter = async () => {
      const records = await bookmarkRepository.findAll();
      state.bookmarkRecords = records;
    };

    return {
      state,
      //------
      add,
      browsersOutline,
      //------
      ionViewWillEnter,
      toEditor,
      openUrl,
    };
  },
});
</script>