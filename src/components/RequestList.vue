<template>
  <nav>
    <div class="nav nav-tabs">
      <TabLink v-for="tab in tabs" :key="tab" :item="tab" />

      <button class="nav-link pink plus-icon" @click="addTab">+</button>
    </div>
  </nav>
  <div class="tab-content">
    <TabPanel v-for="tab in tabs" :key="tab" :item="tab" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TabLink from "@/components/TabLink";
import TabPanel from "@/components/TabPanel";

export default {
  name: "App",
  components: { TabLink, TabPanel },
  computed: {
    ...mapGetters({
      tabs: "_tabs",
    }),
  },
  methods: {
    addTab() {
      this.$store.commit("addTab");
    },
  },
};
</script>
