<template>
  <main
    class="flex flex-col h-screen w-screen overflow-y-auto overflow-x-hidden bg-gray-800 text-gray-300"
  >
    <ce-header class="top-0 sticky" />
    <router-view class="px-5 sm:px-20 py-5 flex justify-center" />
  </main>
</template>

<script>
import CeHeader from '@/components/CeHeader.vue'
export default {
  name: 'App',
  components: {
    CeHeader
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

html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: 14px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1a202d;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
