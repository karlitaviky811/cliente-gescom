
<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import Banner from '@/components/BannerApp.vue'
import Cards from '@/components/CardsApp.vue'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})

</script>

<template>
  <div class="about bg-white drop-shadow-1">
    <!-- Banner -->
    <Banner/>

    <!-- Cards Info -->
    <Cards/>
    
  </div>
</template>

