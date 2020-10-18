<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> ブックマーク登録 </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
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
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BookMarkEditor",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
});
</script>