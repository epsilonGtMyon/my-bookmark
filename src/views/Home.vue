<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item button router-link="/bookmark-list"
          >ブックマーク一覧
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Plugins } from "@capacitor/core";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  useBackButton,
  useIonRouter,
} from "@ionic/vue";
import { defineComponent } from "vue";

const { App } = Plugins;

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
  },
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(10, (processNextHandler) => {
      if (ionRouter.canGoBack()) {
        processNextHandler();
      } else {
        App.exitApp();
      }
    });
  },
});
</script>
