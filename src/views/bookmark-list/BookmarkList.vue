<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title> ブックマーク一覧 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <template
          v-for="(bookmark, index) in state.bookmarkRecords"
          :key="bookmark.id"
        >
          <ion-item button @click="toEditor(index)">
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
  IonButtons,
  IonButton,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon,
  loadingController,
} from "@ionic/vue";
import { add, browsersOutline } from "ionicons/icons";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

const { Browser } = Plugins;

type DataType = {
  bookmarkRecords: Bookmark[];
};

const bookmarkRepository = new BookmarkRepository();

export default defineComponent({
  name: "BookmarkList",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButtons,
    IonButton,
    IonBackButton,
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
      const loading = await loadingController.create({
        duration: 1000
      });
      await loading.present();
      
      await Browser.open({ url });
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