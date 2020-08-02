<template>
  <div class="flex flex-col items-center justify-center">
    <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    <template class="w-full" v-if="asset.id && !isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center w-full">
        <div class="flex flex-col items-center">
          <img
            :src="
              `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`
            "
            :alt="asset.name"
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ asset.priceUsd | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ min | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ max | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ avg | dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            @click="toggleConverter"
          >
            {{ fromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full flex items-center" for="convertValue">
              <input
                id="convertValue"
                type="number"
                :placeholder="
                  fromUsd ? ` Valor en USD` : `Valor en ${asset.symbol}`
                "
                class="text-center mr-2 bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                v-model="convertValue"
              />
              {{ fromUsd ? `USD` : `${asset.symbol}` }}
            </label>
          </div>

          <span class="text-xl text-purple-600"
            >{{ convertResult }}
            {{ fromUsd ? ` ${asset.symbol}` : `USD` }}</span
          >
        </div>
      </div>
      <line-chart
        class="my-10"
        :colors="['orange']"
        :min="min"
        :max="max"
        :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])"
      />
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table class="w-full">
        <tr
          class="border-b"
          v-for="m in markets"
          :key="`${m.exchangeId}-${m.priceUsd}`"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <a v-if="m.url" target="_blank">{{ m.url }}</a>
            <ce-button :isLoading="m.isLoading" v-else @click="getWebsite(m)">
              <slot>Obtener link</slot>
            </ce-button>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import { getAsset, getAssetHistory } from '@/services/assets'
import { getMarkets, getExchange } from '@/services/markets'
import CeButton from '@/components/CeButton'

export default {
  name: 'CoinDetail',
  components: {
    CeButton
  },

  data() {
    return {
      asset: {},
      history: [],
      markets: [],
      isLoading: false,
      fromUsd: true,
      convertValue: null
    }
  },

  computed: {
    convertResult() {
      if (!this.convertValue) return 0

      const result = this.fromUsd
        ? this.convertValue / this.asset.priceUsd
        : this.convertValue * this.asset.priceUsd

      return result.toFixed(4)
    },

    min() {
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    max() {
      return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },

    avg() {
      return Math.abs(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    }
  },

  created() {
    this.getCoin()
  },
  watch: {
    $route() {
      this.getCoin()
    }
  },
  methods: {
    toggleConverter() {
      this.fromUsd = !this.fromUsd
    },
    getWebsite(exchange) {
      this.$set(exchange, 'isLoading', true)
      return getExchange(exchange.exchangeId)
        .then(res => {
          this.$set(exchange, 'url', res.exchangeUrl)
        })
        .finally(() => this.$set(exchange, 'isLoading', false))
    },
    getCoin() {
      const id = this.$route.params.id
      this.isLoading = true
      Promise.all([getAsset(id), getAssetHistory(id), getMarkets(id)])
        .then(([asset, history, markets]) => {
          this.asset = asset
          this.history = history
          this.markets = markets
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style scoped>
td {
  padding: 20px 10px;
  box-sizing: border-box;
  font-size: 0.6rem;
  text-align: center;
}

th {
  font-size: 0.6rem;
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
