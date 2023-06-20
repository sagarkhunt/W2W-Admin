<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_all_the_mails_that_are_queue') }}</div>

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
        :data="emailScheduledRecords"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="language_name">{{ $t('language') }}</vs-th>
          <vs-th sort-key="statement">{{ $t('statement') }}</vs-th>
          <vs-th sort-key="template_type">{{ $t('template_type') }}</vs-th>
          <vs-th sort-key="repeats">{{ $t('repeats') }}</vs-th>
          <vs-th sort-key="recurs">{{ $t('recurs') }} </vs-th>
          <vs-th sort-key="send_time">{{ $t('sendTime') }} </vs-th>
          <vs-th sort-key="start_date">{{ $t('startDate') }}</vs-th>
          <vs-th sort-key="occurrences">{{ $t('occurrence') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
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
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td> {{ tr.language && tr.language.language_name }} </vs-td>
            <vs-td> {{ tr.statement }} </vs-td>
            <vs-td>{{ tr.template_type }}</vs-td>
            <vs-td> {{ tr.repeats }}</vs-td>
            <vs-td> {{ tr.recurs || '-' }}</vs-td>
            <vs-td> {{ tr.send_time || '-' }} GMT+3</vs-td>
            <vs-td> {{ formatDate(tr.start_date) || '-' }}</vs-td>
            <vs-td> {{ tr.occurrences || '-' }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <!-- Add Email Template start -->
    <AddTemplatePopup v-if="isAddTemplateModal" :isModalShow.sync="isAddTemplateModalShow" @newInvList="getData()" />
    <!-- Add Email Template End -->

    <!-- Update Email Template Start-->
    <EditTemplatePopup v-if="isEditTemplateModal" :isModalShow.sync="isEditTemplateModalShow" @indList="getData()" :getRecordId="getRecordId" />
    <!-- Update Email Template end-->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import AddTemplatePopup from '@/views/settings/email-templates/components/AddTemplate'
import EditTemplatePopup from '@/views/settings/email-templates/components/EditTemplate'

export default {
  name: 'ScheduledEmailList',
  components: {
    Select2,
    AddTemplatePopup,
    EditTemplatePopup
  },
  data() {
    return {
      viewEmail: false,
      addEmailModal: false,
      order: [],
      length: 10,
      page: 1,
      search: '',
      val: '',

      getRecordId: '',
      //add template modal
      isAddTemplateModal: false,
      isAddTemplateModalShow: false,
      //edit template
      isEditTemplateModal: false,
      isEditTemplateModalShow: false
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('emailschedule', ['loading', 'total', 'FilteredCount', 'emailScheduledRecords']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('emailschedule', {
      getAllEmailScheduledRecords: 'getAllEmailScheduledRecords',
      getEmailTemplateById: 'getEmailTemplateById',
      addEmailTemplate: 'addEmailTemplate',
      updateEmail: 'updateEmail',
      deleteEmailTemplateRecord: 'deleteEmailTemplateRecord'
    }),
    addEmailTemplateRecord() {
      this.isAddTemplateModal = true
      this.isAddTemplateModalShow = true
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addEmailTemplate({
          ...this.add_form
        })
        this.addEmailModal = false
        this.getData()
        this.$vs.notify({
          title: 'Success',
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
    getEmailTemplate(id) {
      this.getRecordId = id
      this.isEditTemplateModal = true
      this.isEditTemplateModalShow = true
    },
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
      this.getAllEmailScheduledRecords({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },

    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.scheduleDelete'),
        accept: () => this.deleteEmailTemplate(id),
        acceptText: 'Delete'
      })
    },
    async deleteEmailTemplate(id) {
      try {
        const { message } = await this.deleteEmailTemplateRecord(id)
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
    },
    async updateEmailRecordInfo() {
      try {
        const { message } = await this.updateEmailRecords({
          id: this.getRecordId,
          data: {
            ...this.form
          }
        })
        this.viewEmail = false
        this.getData()
        this.$vs.notify({
          title: 'Success',
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

    showEmailPreview(tr) {
      const x = window.open()
      x.document.write(tr.content)
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
    isAddTemplateModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddTemplateModal = false
          }, 0)
        }
      }
    },
    isEditTemplateModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditTemplateModal = false
            this.getRecordId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddTemplateModalShow = false
    this.isEditTemplateModalShow = false
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
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
