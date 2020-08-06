<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-gray-900 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <ce-icon class="mr-2" />
          <router-link to="/" class="font-semibold text-xl tracking-tight"
            >Crypto Exchange</router-link
          >
          <router-link
            v-for="link in links"
            :key="link.to"
            class="ml-3 text-sm uppercase text-gray-400"
            :to="link.to"
            >{{ link.title }}
          </router-link>
        </div>
        <div
          class="hidden sm:block w-full flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow"></div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import CeIcon from '@/components/CeIcon.vue'
export default {
  name: 'CEHeader',
  data() {
    return {
      links: [
        { title: 'BTC', to: '/coin/bitcoin' },
        { title: 'ETH', to: '/coin/ethereum' },
        { title: 'LTC', to: '/coin/litecoin' }
      ]
    }
  },
  components: {
    CeIcon
  }
}
</script>
