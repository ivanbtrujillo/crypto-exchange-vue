<template>
  <div class="flex flex-col items-end  h-full w-full p-4">
    <div class="flex items-center  mb-2">
      <label>Search</label>
      <input
        class="border text-black border-gray-400 h-6 p-2 ml-2 rounded-md"
        v-model="search"
        value=""
      />
    </div>
    <div class="overflow-x-auto w-full " style="height: calc(100vh - 200px)">
      <table class="overflow-auto border border-gray-900 w-full">
        <thead class="sticky top-0 w-full">
          <tr class="bg-gray-900  border rounded-md border-gray-900 w-full">
            <th>Coin</th>
            <th
              class="cursor-pointer hover:bg-gray-700"
              :class="sort"
              @click="sortByRanking"
            >
              <span>Ranking</span>
            </th>
            <th>Name</th>
            <th class="text-right">Price ($)</th>
            <th class="text-right">Market Capital</th>
            <th class="text-right">Value Change (24h)</th>

            <td class="hidden sm:block"></td>
          </tr>
        </thead>

        <tbody class=" ">
          <tr
            v-for="a in filteredAssets"
            :key="a.name"
            class="border-b border-gray-900 hover:bg-gray-700"
          >
            <td class="flex justify-center">
              <img
                class="w-6 h-6 "
                :src="
                  `https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`
                "
                :alt="a.name"
              />
            </td>
            <td>#{{ a.rank }}</td>
            <td>
              <router-link
                class="text-blue-400 hover:underline hover:text-blue-600"
                :to="{ name: 'coin-detail', params: { id: a.id } }"
                >{{ a.name }}</router-link
              ><span class="uppercase text-sm text-bold text-gray-600 ml-2 ">{{
                a.symbol
              }}</span>
            </td>
            <td class="text-right">{{ a.priceUsd | dollar }}</td>

            <td class="text-right">{{ a.marketCapUsd | dollar }}</td>
            <td
              class="text-right"
              :class="
                a.changePercent24Hr.includes('-')
                  ? 'text-red-600'
                  : 'text-green-600'
              "
            >
              {{ a.changePercent24Hr | percent }}
            </td>

            <td class="hidden sm:block">
              <ce-button @click="goToCoin(a.id)"
                ><span>Details</span></ce-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
const sortDesc = (a, b) => {
  if (Number(a.rank) > Number(b.rank)) return 1
  if (Number(a.rank) < Number(b.rank)) return -1
  if (Number(a.rank) === Number(b.rank)) return 0
}

const sortAsc = (a, b) => {
  if (Number(a.rank) < Number(b.rank)) return 1
  if (Number(a.rank) > Number(b.rank)) return -1
  if (Number(a.rank) === Number(b.rank)) return 0
}

import CeButton from '@/components/CeButton'
export default {
  name: 'PxAssetsTable',
  components: {
    CeButton
  },
  data() {
    return {
      sort: 'down',
      search: ''
    }
  },
  props: {
    assets: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    sortByRanking() {
      this.assets = this.assets.sort(this.sort === 'down' ? sortAsc : sortDesc)
      this.sort = this.sort === 'up' ? 'down' : 'up'
    },
    goToCoin(id) {
      this.$router.push(`/coin/${id}`)
    }
  },
  computed: {
    filteredAssets: function() {
      return this.assets.filter(
        asset =>
          asset.name.toLowerCase().includes(this.search.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  }
}
</script>

<style scoped>
.up::after {
  content: '👆 ';
}

.down::after {
  content: '👇 ';
}

td {
  padding: 20px 10px;
  box-sizing: border-box;
  font-size: 0.6rem;
  text-align: center;
}

th {
  font-size: 0.6rem;
}

td,
th {
  font-size: 1rem;
  min-width: 200px;
}

@media (min-width: 640px) {
  td,
  th {
    font-size: 1rem;
    text-align: start;
    min-width: 200px;
  }

  th {
    padding: 10px 10px;
    box-sizing: border-box;
  }
}
</style>
