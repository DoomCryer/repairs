import Vue from "vue";
import Vuex from "vuex";
import fb from "../fire";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { items: [], isLoading: false },
  mutations: {
    setItems(state, val) {
      state.items = val;
    },
    setLoading(state, val) {
      state.isLoading = val;
    }
  },
  actions: {
    fetchItems({ commit }) {
      commit("setLoading", true);
      fb.itemsCollection.get().then(docs => {
        let items = [];
        docs.forEach(doc => {
          let item = doc.data();
          item.id = doc.id;
          items.push(item);
        });
        commit("setItems", items);
        commit("setLoading", false);
      });
    },
    addItem({ dispatch }, { data, callback }) {
      fb.itemsCollection.add(data).then(() => {
        dispatch("fetchItems");
        callback();
      });
    },
    editItem({ dispatch }, { data, callback }) {
      fb.itemsCollection
        .doc(data.id)
        .set(data)
        .then(() => {
          dispatch("fetchItems");
          callback();
        });
    },
    deleteItem({ dispatch }, { id }) {
      fb.itemsCollection
        .doc(id)
        .delete()
        .then(dispatch("fetchItems"));
    }
  },
  modules: {}
});
