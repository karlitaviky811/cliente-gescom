<script setup lang="ts">
const props = defineProps(['cardTitle'])
</script>

<template>
  <div
    class="rounded-sm bg-white shadow-default dark:border-strokedark dark:bg-boxdark bg-white drop-shadow-1"
  >
    <div class="px-6.5 dark:border-strokedark">
      <h3 class="font-medium text-black dark:text-white px-6.5 m-2">{{ props.cardTitle }}</h3>
    </div>
    <slot></slot>
  </div>
</template>
