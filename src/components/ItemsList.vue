<template>
  <b-container>
    <b-row>
      <b-table
        class="table"
        striped
        hover
        foot-clone
        :fields="fields"
        :items="items"
        :bordered="true"
        :outlined="true"
        :sticky-header="true"
        :small="true"
        :busy="isLoading"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
          </div>
        </template>
        <template v-slot:cell(actions)="row">
          <div class="actionGroup">
            <b-button variant="primary" @click="openModal(row.item)">
              <MdCreateIcon />
            </b-button>
            <b-button variant="danger" @click="deleteItem(row.item)">
              <MdTrashIcon />
            </b-button>
          </div>
        </template>
        <template v-slot:foot(name)="data">
          <span>ИТОГО:</span>
        </template>
        <template v-slot:foot(amount)="data">
          <span>{{ total }}</span>
        </template>
        <template v-slot:foot()="data" />
      </b-table>
    </b-row>
    <b-row>
      <b-col class="add-section" cols="6" offset="3">
        <b-button @click="openModal(null)" variant="outline-primary">Добавить</b-button>
        <b-modal
          v-model="visible"
          ok-title="Сохранить"
          :title="modalTitle"
          cancel-title="Отмена"
          hide-footer
        >
          <EditForm :onClose="closeModal" :item="item" :handleSubmit="createOrEdit" />
        </b-modal>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import EditForm from "./EditForm";
import { CATEGORY_LABELS } from "../constants/categories";
import { formatMoney } from "../utils/formatters";
import MdCreateIcon from "vue-ionicons/dist/md-create.vue";
import MdTrashIcon from "vue-ionicons/dist/md-trash.vue";

export default {
  data() {
    return {
      visible: false,
      modalTitle: "",
      item: null,
      fields: [
        {
          key: "date",
          label: "Дата",
          formatter: "dateFormatter"
        },
        {
          key: "category",
          label: "Категория",
          formatter: "formatCategory"
        },
        {
          key: "name",
          label: "Наименование"
        },
        {
          key: "amount",
          label: "Сумма",
          formatter: "formatMoney"
        },
        {
          // A virtual column with custom formatter
          key: "actions",
          label: "Действия",
          formatter: (value, key, item) => {
            return new Date().getFullYear() - item.age;
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchItems", "addItem", "editItem", "deleteItem"]),
    openModal(item) {
      this.modalTitle = `${item ? "Редактирование" : "Создание"} записи`;
      this.item = item || {};
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
      this.item = null;
    },
    createOrEdit(item) {
      const save = item.id ? this.editItem : this.addItem;
      save({ data: item, callback: this.closeModal });
    },
    formatCategory(value) {
      return CATEGORY_LABELS[value];
    },
    formatMoney(value) {
      return formatMoney(value);
    },
    dateFormatter(value) {
      return moment(value).format("DD-MM-YYYY");
    }
  },
  computed: {
    ...mapState(["items", "isLoading"]),
    total() {
      const totalAmount = this.items.reduce(
        (acc, item) => acc + parseInt(item.amount),
        0
      );
      return formatMoney(totalAmount);
    }
  },
  components: {
    EditForm,
    MdCreateIcon,
    MdTrashIcon
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style lang="scss" scoped>
.add-section {
  margin-top: 20px;
}

.table {
  width: 100%;
}

.actionGroup > button {
  margin-left: 16px;
}
</style>
