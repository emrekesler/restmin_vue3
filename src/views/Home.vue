<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <RequestList />
      </div>
    </div>
  </div>
</template>

<script>
import RequestList from "@/components/RequestList";

export default {
  name: "Home",
  components: {
    RequestList,
  },
};
</script>
