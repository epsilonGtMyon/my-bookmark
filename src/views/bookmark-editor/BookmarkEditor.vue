<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title> ブックマーク登録 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="floating">タイトル:</ion-label>
          <ion-input v-model="state.titleText"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">URL:</ion-label>
          <ion-input v-model="state.urlText"></ion-input>
        </ion-item>
      </ion-list>

      <ion-button
        color="primary"
        @click="registerBookmark"
        :disabled="hasEmptyInput"
      >
        登録
        <ion-icon :icon="createOutline" slot="end"></ion-icon>
      </ion-button>

      <template v-if="isDeletable">
        <ion-button color="danger" @click="confirmDeleteBookmark">
          削除
          <ion-icon :icon="trash" slot="end"></ion-icon>
        </ion-button>
      </template>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  alertController,
  toastController,
  loadingController,
} from "@ionic/vue";
import { createOutline, trash } from "ionicons/icons";
import { computed, defineComponent, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

//---------------

type DataType = {
  id: string;
  titleText: string;
  urlText: string;
};

const bookmarkRepository = new BookmarkRepository();

export default defineComponent({
  name: "BookmarkEditor",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive<DataType>({
      id: "",
      titleText: "",
      urlText: "",
    });

    //-----------------------
    //private

    const deleteBookmark = async () => {
      const loading = await loadingController.create({});
      await loading.present();
      await bookmarkRepository.deleteById(state.id);

      const toast = await toastController.create({
        message: "削除しました",
        duration: 1500,
      });
      await toast.present();
      router.back();

      await loading.dismiss();
    };
    //-----------------------

    const registerBookmark = async () => {
      const loading = await loadingController.create({});
      await loading.present();

      const bookmark: Bookmark = {
        id: state.id,
        title: state.titleText,
        url: state.urlText,
      };

      if (bookmark.id === "") {
        await bookmarkRepository.add(bookmark);
      } else {
        await bookmarkRepository.modify(bookmark);
      }

      const toast = await toastController.create({
        message: "登録しました",
        duration: 1500,
      });
      toast.present();
      router.back();

      await loading.dismiss();
    };

    const confirmDeleteBookmark = async () => {
      const alert = await alertController.create({
        header: "確認",
        message: "削除しますか？",
        buttons: [
          {
            text: "Cancel",
          },
          {
            text: "Ok",
            handler: async () => {
              await deleteBookmark();
            },
          },
        ],
      });
      alert.present();
    };

    const ionViewWillEnter = async () => {
      const id = route.query.id as string | null;
      if (id != null) {
        const bookmark = await bookmarkRepository.findById(id);
        if (bookmark != null) {
          state.id = bookmark.id ?? "";
          state.titleText = bookmark.title;
          state.urlText = bookmark.url;
        }
      }
    };

    const hasEmptyInput = computed(() => {
      return state.titleText === "" || state.urlText === "";
    });

    const isDeletable = computed(() => {
      return state.id !== "";
    });

    return {
      state,
      //----------
      createOutline,
      trash,
      //----------
      hasEmptyInput,
      isDeletable,
      //----------
      ionViewWillEnter,
      registerBookmark,
      confirmDeleteBookmark,
    };
  },
});
</script>