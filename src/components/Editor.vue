<template>
  <div class="row">
    <div class="col">
      <div :id="'editor-' + item.id" style="height: 50vh"></div>
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