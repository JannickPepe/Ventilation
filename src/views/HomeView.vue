<script setup lang="ts">
import HomeHeader from '@/components/organisms/home/HomeHeader.vue'
import HomeHero from '@/components/organisms/home/HomeHero.vue'
import HomeServices from '@/components/organisms/home/HomeServices.vue'
import HomeBenefits from '@/components/organisms/home/HomeBenefits.vue'
import HomeCta from '@/components/organisms/home/HomeCta.vue'
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <HomeHeader />
    <main>
      <HomeHero />
      <HomeServices />
      <HomeBenefits />
      <HomeCta />
    </main>
  </div>
</template>
