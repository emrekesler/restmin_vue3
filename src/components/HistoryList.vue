<template>
  <div class="row mb-3">
    <div class="col">
      <div class="text-center">
        <button type="button" class="btn btn-sm btn-pink float-center" @click="$store.commit('clearHistory')">
          <i class="bi bi-trash"></i>
          Clear
        </button>
      </div>
    </div>
  </div>

  <div class="card bg-dark text-white mb-2" v-for="item in history" :key="item">
    <div class="card-body">
      {{ item.request.method }}
      |
      {{ item.request.url }}

      <div class="btn-group float-end" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-sm btn-purple float-end ml-2" @click="retryRequest(item)">
          <i class="bi bi-arrow-return-left"></i>
          Retry
        </button>

        <button type="button" class="btn btn-sm btn-pink float-end ml-2" @click="$store.commit('deleteHistory', item)">
          <i class="bi bi-trash"></i>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import router from "@/router";

export default {
  computed: {
    ...mapGetters({
      history: "_history",
    }),
  },
  methods: {
    retryRequest(item) {
      this.$store.commit("retryRequest", item);
      router.push({ name: "Home" });
    },
  },
};
</script>

<style>
</style>