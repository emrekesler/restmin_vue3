<template>
  <button class="nav-link" :class="{ active: item.active }" @click.self="setActive(item)" data-bs-toggle="tab" style="min-width: 185px" type="button" role="tab">
    {{ tabTitle }}

    <i @click="$store.commit('closeTab', item)" class="bi bi-x"></i>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  methods: {
    setActive(item) {
      this.$store.commit("setActive", item);
    },
  },
  computed: {
    tabTitle() {
      return this.item.request.url == "" ? "Untitled Request" : this.item.request.url.substr(0, 20) + "...";
    },
  },
};
</script>