<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomButton from '@/components/atoms/Button.vue'
import AtomBadge from '@/components/atoms/Badge.vue'
import AtomDivider from '@/components/atoms/Divider.vue'
import AtomIcon from '@/components/atoms/Icon.vue'
import MoleculeSectionHeader from '@/components/molecules/SectionHeader.vue'

const services = [
  { key: 'setup', icon: 'wrench' as const },
  { key: 'repair', icon: 'wrench' as const },
  { key: 'inspection', icon: 'clipboard-check' as const },
  { key: 'maintenance', icon: 'gears' as const }
]
</script>

<template>
  <section
    id="services"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0 }"
    transition="transition-all duration-600 ease-out"
    class="container mx-auto px-4 py-20"
  >
    <MoleculeSectionHeader
      :title="$t('home.services.title')"
      :subtitle="$t('home.services.subtitle')"
      align="left"
    />
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article
        :id="`service-${svc.key}`"
        v-for="svc in services"
        :key="svc.key"
        v-motion
        :initial="{ opacity: 0, y: 24 }"
        :visible-once="{ opacity: 1, y: 0 }"
        transition="transition-all duration-500 ease-out"
        class="rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-lg dark:hover:shadow-violet-900/10 transition-all duration-300"
      >
        <div
          class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-3 text-violet-600 dark:text-violet-400"
        >
          <AtomIcon :name="svc.icon" size="md" />
        </div>
        <AtomBadge variant="default" size="sm" class="mb-3">
          {{ $t(`home.services.items.${svc.key}.label`) }}
        </AtomBadge>
        <AtomTitle as="h3" size="lg" class="mb-2">
          {{ $t(`home.services.items.${svc.key}.title`) }}
        </AtomTitle>
        <AtomTitle tag="p" size="sm" color="muted" class="mb-4">
          {{ $t(`home.services.items.${svc.key}.desc`) }}
        </AtomTitle>
        <AtomDivider spacing="sm" class="my-4" />
        <AtomButton variant="outline" size="sm">
          {{ $t('home.services.learnMore') }}
        </AtomButton>
      </article>
    </div>
  </section>
</template>
