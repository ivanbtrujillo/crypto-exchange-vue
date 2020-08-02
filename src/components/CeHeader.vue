<template>
  <header class="shadow w-screen">
    <nav>
      <nav
        class="flex items-center justify-between flex-wrap bg-purple-700 p-6"
      >
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <ce-icon class="mr-2" />
          <span class="font-semibold text-xl tracking-tight"
            >Crypto Exchange</span
          >
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
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
  components: {
    CeIcon
  }
}
</script>
