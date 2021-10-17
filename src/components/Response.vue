<template>
  <div class="row">
    <div class="col-12">
      <div class="text-end" id="status">
        <span class="text-end">
          Status: <span>{{ item.statusCode }}</span> - Time: <span>{{ item.elapsedTime }}</span> - Size: <span>{{ item.size }}</span>
        </span>
      </div>
    </div>
  </div>
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
};
</script>