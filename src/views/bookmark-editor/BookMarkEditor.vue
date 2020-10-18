<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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
  IonButton,
} from "@ionic/vue";
import { computed, defineComponent, onMounted, reactive } from "vue";

type DataType = {
  titleText: string;
  urlText: string;
};

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
    IonButton,
  },
  setup() {
    const state = reactive<DataType>({
      titleText: "",
      urlText: "",
    });

    const register = () => {
      //
      console.log(state);
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