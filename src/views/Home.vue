<template>
  <div class="flex items-center justify-center flex-1 h-full">
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <ce-assets-table class=" h-full" v-if="!isLoading" :assets="assets" />
  </div>
</template>

<script>
import CeAssetsTable from '@/components/CeAssetsTable.vue'
import { getAssets } from '@/services/assets'
export default {
  name: 'Home',
  data() {
    return {
      assets: [],
      isLoading: false
    }
  },
  components: {
    CeAssetsTable
  },
  created() {
    this.isLoading = true
    getAssets()
      .then(assets => (this.assets = assets))
      .finally(() => (this.isLoading = false))
  }
}
</script>
