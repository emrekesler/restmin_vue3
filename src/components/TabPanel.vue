<template>
  <div class="tab-pane fade" :class="{ 'show active': tab.active }" :id="'request-' + tab.id" role="tabpanel">
    <div class="row">
      <div class="col-12">
        <div class="input-group mb-3 mt-3">
          <InputGroup :item="tab" />
        </div>
      </div>

      <div class="col-12">
        <nav>
          <div class="nav nav-tabs">
            <button class="nav-link secondary active" data-bs-toggle="tab" :data-bs-target="'#header' + tab.id" type="button" role="tab">Headers</button>

            <button class="nav-link secondary" data-bs-toggle="tab" :data-bs-target="'#body' + tab.id" type="button" role="tab">Body</button>
          </div>
        </nav>
        <div class="tab-content">
          <div class="tab-pane secondary fade show active" :id="'header' + tab.id" role="tabpanel">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-2 mt-2">
              <button class="btn btn-sm btn-purple" type="button" @click="setHeader('', '')">Add New Header</button>

              <button class="btn btn-sm btn-purple" type="button" @click="setHeader('Authorization', 'Bearer ')">Add Bearer Header</button>

              <button class="btn btn-sm btn-purple" type="button" @click="setHeader('Authorization', 'Basic ')">Add Basic Header</button>
            </div>

            <table class="table table-sm table-dark table-bordered">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Key</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="header in tab.request.headers" :key="header">
                  <th scope="row">
                    <input type="checkbox" class="form-check-input checkbox" v-model="header.checked" />
                  </th>
                  <td>
                    <input type="text" class="form-control dark form-control-sm" v-model="header.key" />
                  </td>
                  <td>
                    <input type="text" class="form-control dark form-control-sm" v-model="header.value" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="tab-pane secondary fade" :id="'body' + tab.id" role="tabpanel">
            <div class="form-check form-check-inline">
              <label class="form-check-label" :for="'bodyTypeNone' + tab.id">
                None
                <input class="form-check-input" :id="'bodyTypeNone' + tab.id" type="radio" name="bodyType" v-model="tab.request.bodyType" value="None" />
              </label>
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label" :for="'bodyTypeRaw' + tab.id">
                Raw
                <input class="form-check-input" :id="'bodyTypeRaw' + tab.id" type="radio" name="bodyType" v-model="tab.request.bodyType" value="Raw" />
              </label>
            </div>

            <div class="form-check form-check-inline">
              <label class="form-check-label" :for="'bodyTypeFormData' + tab.id">
                Form Data (Not Supported Yet)
                <input class="form-check-input" :id="'bodyTypeFormData' + tab.id" type="radio" name="bodyType" value="FormData" disabled />
              </label>
            </div>

            <div class="form-floating mt-3">
              <textarea class="form-control dark" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 200px"></textarea>
              <label for="floatingTextarea2">Body</label>
            </div>
          </div>

          <Response :item="tab.response" class="mt-3" />

          <Editor :item="tab" class="mt-3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Response from "@/components/Response";
import Editor from "@/components/Editor";
import InputGroup from "@/components/InputGroup";

export default {
  components: {
    Response,
    Editor,
    InputGroup,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      tab: this.item,
    };
  },
  computed: {
    tabTitle() {
      return this.item.request.url == "" ? "Untitled Request" : this.item.request.url.substr(0, 20) + "...";
    },
  },
  methods: {
    setHeader(key = "", value = "") {
      let tab = this.tab;
      this.$store.commit("setHeader", { tab, key, value });
    },
  },
};
</script>

