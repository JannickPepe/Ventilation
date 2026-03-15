<script setup lang="ts">
import { onMounted, watch } from 'vue'
import HomeHeader from '@/components/organisms/home/HomeHeader.vue'
import HomeHero from '@/components/organisms/home/HomeHero.vue'
import HomeServices from '@/components/organisms/home/HomeServices.vue'
import HomeBenefits from '@/components/organisms/home/HomeBenefits.vue'
import HomeVentilationConcepts from '@/components/organisms/home/HomeVentilationConcepts.vue'
import HomeFaq from '@/components/organisms/home/HomeFaq.vue'
import HomeCta from '@/components/organisms/home/HomeCta.vue'
import AppFooter from '@/components/templates/AppFooter.vue'
import { useFaqStore } from '@/stores/faqStore'
import { useLocaleStore } from '@/stores/localeStore'

const faqStore = useFaqStore()
const localeStore = useLocaleStore()

onMounted(() => {
  faqStore.fetchFaq(localeStore.locale)
})
watch(
  () => localeStore.locale,
  (locale) => {
    faqStore.fetchFaq(locale)
  }
)
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <HomeHeader />
    <main id="main-content" role="main">
      <HomeHero />
      <HomeServices />
      <HomeBenefits />
      <HomeVentilationConcepts />
      <HomeFaq />
      <HomeCta />
    </main>
    <AppFooter />
  </div>
</template>
