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

      <ion-button color="primary" @click="register" :disabled="hasEmptyInput"
        >登録</ion-button
      >
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
} from "@ionic/vue";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

//---------------

type DataType = {
  titleText: string;
  urlText: string;
};

const bookmarkRepository = new BookmarkRepository();

export default defineComponent({
  name: "BookMarkEditor",
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
  },
  setup() {
    const router = useRouter();
    const state = reactive<DataType>({
      titleText: "",
      urlText: "",
    });

    const register = async () => {
      const bookmark: Bookmark = {
        id: null,
        title: state.titleText,
        url: state.urlText,
      };

      await bookmarkRepository.add(bookmark);

      router.back();
    };

    onMounted(() => {
      state.titleText = "title init";
      state.urlText = "url init";
    });

    const hasEmptyInput = computed(() => {
      return state.titleText === "" || state.urlText === "";
    });

    return {
      state,
      register,
      hasEmptyInput,
    };
  },
});
</script>