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
          <ion-item @click="toEditor(index)">{{ bookmark.title }}</ion-item>
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
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import { Bookmark } from "@/storage/entity/Bookmark";
import { BookmarkRepository } from "@/storage/repository/BookmarkRepository";

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

      router.push("/bookmark-editor");
    };

    onMounted(async () => {
      const records = await bookmarkRepository.findAll();
      state.bookmarkRecords = records;
    });

    return {
      state,
      add,
      toEditor,
    };
  },
});
</script>