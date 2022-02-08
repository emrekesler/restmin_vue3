<template>
  <button class="btn btn-outline-yellow dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {{ tab.request.method }}
  </button>

  <ul class="dropdown-menu">
    <li>
      <a class="dropdown-item" @click="setRequestMethod('GET', tab.request)">GET</a>
    </li>
    <li>
      <a class="dropdown-item" @click="setRequestMethod('POST', tab.request)">POST</a>
    </li>
    <li>
      <a class="dropdown-item" @click="setRequestMethod('PUT', tab.request)">PUT</a>
    </li>
    <li>
      <a class="dropdown-item" @click="setRequestMethod('DELETE', tab.request)">DELETE</a>
    </li>
  </ul>
  <input type="text" class="form-control dark" placeholder="Enter request URL" v-model="requestUrl" />

  <button class="btn btn-outline-yellow" type="button" @click="sendRequest(tab)">Send</button>
</template>
<script>
import axios from "axios";
import * as monaco from "monaco-editor";

axios.interceptors.request.use((request) => {
  request.meta = request.meta || {};
  request.meta.requestStartedAt = new Date().getTime();
  return request;
});

let editorList = [];

export default {
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
    requestUrl: {
      get() {
        return this.item.request.url;
      },
      set(value) {
        let tab = this.item;
        this.$store.commit("setRequestUrl", { tab, value });
      },
    },
  },
  methods: {
    setRequestMethod(method, request) {
      this.$store.commit("setRequestMethod", { method, request });
    },
    send(tab) {
      this.sendRequest(tab);
    },
    sendRequest(tab) {
      this.$store.commit("setHistory", tab);

      var activeHeaders = tab.request.headers.filter((item) => {
        return item.checked === true;
      });

      var config = {
        method: tab.request.method,
        url: tab.request.url,
        transformResponse: (res) => {
          return res;
        },
      };

      if (activeHeaders.length > 0) {
        config.headers = activeHeaders.reduce(function (map, obj) {
          map[obj.key] = obj.value;
          return map;
        }, {});
      }

      if (tab.request.bodyType != "None") {
        if (tab.request.body.length > 0) {
          config.data = JSON.stringify(JSON.parse(tab.request.body));
        }
      }

      axios(config)
        .then((response) => {
          this.setEditor(tab, response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            this.setEditor(tab, error.response);
            return;
          }

          let editor = this.getEditor(tab.id, "text");
          let editorModel = editor.getModel();
          editorModel.setValue("Could not send request");

          tab.response = {
            statusCode: error,
            elapsedTime: 0,
            size: 0,
          };
        });
    },
    setEditor(tab, response) {
      let editor = this.getEditor(tab.id, response.headers["content-type"]);

      let editorModel = editor.getModel();
      editorModel.setValue(response.data);

      tab.response = {
        statusCode: response.status,
        elapsedTime: `${new Date().getTime() - response.config.meta.requestStartedAt} ms`,
        size: this.humanFileSize(JSON.stringify(response.data).length),
      };
    },
    getEditor(id, contentType) {
      let editor = editorList.find((item) => {
        return item.id == id;
      })?.editor;

      if (!editor) {
        editor = monaco.editor.create(document.getElementById("editor-" + id), {
          language: this.getMonacoLang(contentType),
          automaticLayout: true,
          minimap: { enabled: false },
          theme: "vs-dark",
        });

        editorList.push({
          id: id,
          editor: editor,
        });
      }

      return editor;
    },
    getMonacoLang(contentType) {
      if (contentType == undefined) {
        return "plaintext";
      }

      switch (true) {
        case contentType.includes("application/json"):
          return "json";
        case contentType.includes("text/html"):
          return "html";
        case contentType.includes("text/plain"):
          return "plaintext";
        default:
          return "json";
      }
    },
    humanFileSize(size) {
      var i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
    },
  },
};
</script>