<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <HistoryList />
      </div>
    </div>
  </div>
</template>

<script>
import HistoryList from "@/components/HistoryList";

export default {
  name: "Home",
  components: {
    HistoryList,
  },
};
</script>
