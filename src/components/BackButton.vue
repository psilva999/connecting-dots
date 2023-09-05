<script setup>
import homeImage from '../assets/images/backButton.png'
import { useRouter } from "vue-router";

const router = useRouter();
const pageName = defineProps(['name'])

const backPage = () => router.push(`${pageName.name}`);

// const backPage = () => {
//   if (pageName.name === 'home') {
//     router.push("/");
//   } else if (pageName.name === 'modes') {
//     router.push("/modes");
//   } else {
//     console.log("NÃO É ESSA ROTA");
//   }
// }
</script>

<template>
  <div class="backButton">
    <img @click="backPage" class="backButton__img" :src="homeImage" alt="Botão para voltar à tela anterior">
  </div>
</template>

<style scoped>
.backButton {
    position: absolute;
    left: 1rem;
    top: 1rem;
}

.backButton__img {
  cursor: pointer;
}
</style>
