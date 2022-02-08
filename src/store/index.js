import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    tabs: [],
    history: [],
    editors: [],
  },
  mutations: {
    addTab(state) {
      state.tabs.forEach(function (item) {
        item.active = false;
      });

      state.tabs.push({
        active: true,
        id: (Math.random() + 1).toString(36).substring(2),
        editor: {},
        request: {
          url: "",
          method: "GET",
          body: "",
          bodyType: "None",
          headers: [
            {
              checked: true,
              key: "Content-Type",
              value: "application/json",
            },
          ],
        },
        response: {
          statusCode: "",
          elapsedTime: "",
          size: "",
        },
      });
    },
    closeTab(state, item) {
      state.tabs = state.tabs.filter((x) => x.id != item.id);
      state.tabs.forEach(function (item) {
        item.active = false;
      });
      state.tabs[state.tabs.length - 1].active = true;
    },
    setEditor(_, { tab, editor }) {
      tab.editor = editor;
    },
    setActive(state, item) {
      state.tabs.forEach(function (item) {
        item.active = false;
      });

      item.active = true;
    },
    setHeader(_, { tab, key = "", value = "" }) {
      tab.request.headers.push({
        checked: true,
        key: key,
        value: value,
      });
    },
    setRequestMethod(_, { method, request }) {
      request.method = method;
    },
    setRequestUrl(_, { tab, value }) {
      tab.request.url = value;
    },
    setHistory(state, tab) {
      let copyItem = JSON.parse(JSON.stringify(tab));
      copyItem.id = (Math.random() + 1).toString(36).substring(2);
      copyItem.active = false;
      state.history.push(copyItem);
    },
    clearHistory(state) {
      state.history = [];
    },
    deleteHistory(state, history) {
      state.history = state.history.filter((x) => x.id != history.id);
    },
    retryRequest(state, history) {
      state.tabs.forEach(function (item) {
        item.active = false;
      });
      let copyItem = JSON.parse(JSON.stringify(history));
      copyItem.id = (Math.random() + 1).toString(36).substring(2);
      copyItem.active = true;
      state.tabs.push(copyItem);
    },
  },
  actions: {},
  modules: {},
  getters: {
    _tabs: (state) => state.tabs,
    _history: (state) => state.history,
    _editors: (state) => state.editors,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
