<template>
  <TabLayout v-model="activeTab">
    <TabLayoutItem
      :active="activeTab === 'Photos'"
      value="Photos"
    >
      <template #default="{ iconClass, labelClass }">
        <IconGrid :class="iconClass" />
        <span :class="labelClass">
          Photos
        </span>
      </template>
    </TabLayoutItem>
  </TabLayout>
</template>

<script>
import { TabLayout } from '@/components/TabLayout'
import { TabLayoutItem } from '@/components/TabLayoutItem'
import IconGrid from '@/assets/icons/grid.svg?vue'
export default {
  components: {
    TabLayout,
    TabLayoutItem,
    IconGrid,
  },
  data () {
    return {
      activeTab: 'Photos',
    }
  },
}
</script>
