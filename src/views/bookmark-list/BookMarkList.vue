<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> ブックマーク一覧 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BookMarkList",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    return {
      add,
    };
  },
});
</script>