<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Дата:" label-for="date">
        <b-form-input id="date" v-model="form.date" type="date"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Категория:" label-for="category">
        <b-form-select id="category" v-model="form.category" :options="categories"></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Наименование:" label-for="name">
        <b-form-input id="name" v-model="form.name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Сумма:" label-for="amount">
        <b-form-input id="amount" v-model="form.amount" type="number"></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>-->

      <div class="button-group">
        <b-button type="reset">Отмена</b-button>
        <b-button type="submit" variant="primary">Сохранить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { CATEGORIES, CATEGORY_LABELS } from "../constants/categories";

const categories = Object.keys(CATEGORIES).map(key => ({
  text: CATEGORY_LABELS[CATEGORIES[key]],
  value: CATEGORIES[key]
}));

export default {
  props: ["onClose", "handleSubmit", "item"],
  data() {
    return {
      form: {
        date: "",
        name: "",
        amount: "",
        category: null
      },
      categories,
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.handleSubmit(this.form);
    },

    onReset() {
      this.onClose();
      // evt.preventDefault();
      // // Reset our form values
      // this.form.date = "";
      // this.form.name = "";
      // this.form.category = null;
      // this.form.amount = "";
      // // Trick to reset/clear native browser form validation state
      // this.show = false;
      // this.$nextTick(() => {
      //   this.show = true;
      // });
    }
  },
  created() {
    this.form = this.item;
  }
};
</script>

<style lang="scss" scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
  & > button {
    margin-left: 16px;
  }
}
</style>