<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        pagination
        :max-items="length"
        search
        :data="prohibitedKeywordData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th>{{ $t('heading') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCount && 1)) }}
                    -
                    {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                    {{ $t('of') }} {{ FilteredCount }}
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="remove-tip">
                  <vs-dropdown-item @click="handleChangeLength(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
            <div @click="openKeywordPopup" class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="text-base text-primary">{{ $t('add_keyword') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.keyword }}
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditKeyword')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getQualificationRecord(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteKeyword')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Keyword -->
    <AddKeywordPopup v-if="isAddKeyWordModal" :isModalShow.sync="isAddKeyWordModalShow" @newInvList="getData()" />
    <!-- End Add Keyword -->

    <!-- Edit Keyword -->
    <EditKeywordPopup v-if="isEditKeyWordModal" :isModalShow.sync="isEditKeyWordModalShow" @indList="getData()" :keywordId="keywordId" />
    <!-- End Edit Keyword -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AddKeywordPopup from '@/views/settings/manage-keywords/components/AddKeywordPopup'
import EditKeywordPopup from '@/views/settings/manage-keywords/components/EditKeywordPopup'

export default {
  name: 'KeywordList',
  components: {
    AddKeywordPopup,
    EditKeywordPopup
  },
  data() {
    return {
      keywordPopup: false,
      updateKeywordPopup: false,
      page: 1,
      length: 10,
      search: '',

      keywordId: '',
      //add keyword modal
      isAddKeyWordModal: false,
      isAddKeyWordModalShow: false,
      isEditKeyWordModal: false,
      isEditKeyWordModalShow: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'prohibitedKeywordData']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllkeywords: 'getAllkeywords',

      getkeywordById: 'getkeywordById',

      deletekeywordRecord: 'deletekeywordRecord'
    }),
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },

    handleChangePage(page) {
      this.page = page
      this.getData()
    },

    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },

    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    getData() {
      this.getAllkeywords({
        limit: this.length,
        page: this.page,
        search: this.search
      })
    },
    async openKeywordPopup() {
      this.isAddKeyWordModal = true
      this.isAddKeyWordModalShow = true
    },
    async addKeywordRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addkeyword({
          ...this.add_keyword_form
        })
        this.keywordPopup = false
        this.getData()
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    async getQualificationRecord(id) {
      this.keywordId = id
      this.isEditKeyWordModal = true
      this.isEditKeyWordModalShow = true
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteKeyword(id),
        acceptText: 'Delete'
      })
    },
    async deleteKeyword(id) {
      try {
        const { message } = await this.deletekeywordRecord(id)
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#table-loading',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    },
    isAddKeyWordModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddKeyWordModal = false
          }, 0)
        }
      }
    },
    isEditKeyWordModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditKeyWordModal = false
            this.cityRecordId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddKeyWordModalShow = false
    this.isEditKeyWordModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
.vuesax-app-is-ltr .vs-table--search {
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
}

.vs-table--search-input {
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  font-size: 0.7rem;
  width: 200px;
  color: rgba(0, 0, 0, 0.7);
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
}
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vh-hight-table {
  .vs-con-tbody {
    max-height: calc(100vh - 110px) !important;
  }
}
</style>
