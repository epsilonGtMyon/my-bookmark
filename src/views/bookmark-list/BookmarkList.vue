<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>

        <ion-title> ブックマーク一覧 </ion-title>

        <ion-buttons slot="end">
          <template v-if="state.disabledReorder">
            <ion-button @click="startReorder">
              <ion-icon :icon="reorderThreeOutline"></ion-icon>
            </ion-button>
          </template>
          <template v-else>
            <ion-button @click="finishReorder">
              <ion-icon :icon="saveOutline"></ion-icon>
            </ion-button>
            <ion-button @click="cancelReorder">
              <ion-icon :icon="closeOutline"></ion-icon>
            </ion-button>
          </template>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-reorder-group
          :disabled="state.disabledReorder"
          @ionItemReorder="reordered"
        >
          <template
            v-for="(bookmark, index) in state.bookmarkRecords"
            :key="bookmark.id"
          >
            <ion-item :button="state.disabledReorder" @click="toEditor(index)">
              {{ bookmark.title }}
              <ion-button
                v-if="state.disabledReorder"
                slot="end"
                color="primary"
                @click.stop="openUrl(bookmark.url)"
              >
                開く
                <ion-icon :icon="browsersOutline"></ion-icon>
              </ion-button>
              <ion-reorder slot="end"></ion-reorder>
            </ion-item>
          </template>
        </ion-reorder-group>
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
  IonReorder,
  IonReorderGroup,
  loadingController,
  toastController,
} from "@ionic/vue";
import {
  add,
  reorderThreeOutline,
  closeOutline,
  saveOutline,
  browsersOutline,
} from "ionicons/icons";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

const { Browser } = Plugins;

type DataType = {
  bookmarkRecords: Bookmark[];
  /** 並び替えモード開始時に最初の状態を退避しておくもの */
  tempBookmarkRecords: Bookmark[];
  disabledReorder: boolean;
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
    IonReorder,
    IonReorderGroup,
  },
  setup() {
    const router = useRouter();

    const state = reactive<DataType>({
      bookmarkRecords: [],
      tempBookmarkRecords: [],
      disabledReorder: true,
    });

    /**
     * 画面開いたとき
     */
    const ionViewWillEnter = async () => {
      const records = await bookmarkRepository.findAll();
      state.bookmarkRecords = records;
    };

    /**
     * 編集画面に遷移
     */
    const toEditor = (index: number) => {
      if (!state.disabledReorder) {
        return;
      }
      const bookmarkRecord = state.bookmarkRecords[index];
      const id = bookmarkRecord.id;

      router.push({ path: "/bookmark-editor", query: { id } });
    };

    /**
     * URLを開く
     */
    const openUrl = async (url: string) => {
      const loading = await loadingController.create({
        duration: 1000,
      });
      await loading.present();

      await Browser.open({ url });
    };

    /**
     * 並び替えモード開始
     */
    const startReorder = () => {
      state.disabledReorder = false;
      state.tempBookmarkRecords = [...state.bookmarkRecords];
    };

    /**
     * 並び替えモード終了(確定)
     */
    const finishReorder = async () => {
      state.disabledReorder = true;
      state.tempBookmarkRecords = [];

      bookmarkRepository.replaceAll(state.bookmarkRecords);
      const toast = await toastController.create({
        message: "並び替えました",
        duration: 1500,
      });
      await toast.present();
    };

    /**
     * 並び替えモードキャンセル
     */
    const cancelReorder = () => {
      state.disabledReorder = true;
      state.bookmarkRecords = [...state.tempBookmarkRecords];
      state.tempBookmarkRecords = [];
    };

    /**
     * 並び変えた
     */
    const reordered = (event: CustomEvent) => {
      state.bookmarkRecords = event.detail.complete(state.bookmarkRecords);
    };

    return {
      state,
      //------
      //icon
      add,
      reorderThreeOutline,
      closeOutline,
      saveOutline,
      browsersOutline,
      //-------------
      //method
      ionViewWillEnter,
      toEditor,
      openUrl,
      startReorder,
      finishReorder,
      cancelReorder,
      reordered,
    };
  },
});
</script>