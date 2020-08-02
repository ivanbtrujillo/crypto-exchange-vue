<template>
  <main>
    <ce-header />
    <ce-assets-table />
  </main>
</template>

<script>
import CeHeader from '@/components/CeHeader.vue'
import CeAssetsTable from '@/components/CeAssetsTable.vue'
export default {
  name: 'App',
  components: {
    CeHeader,
    CeAssetsTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
