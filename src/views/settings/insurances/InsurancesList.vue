<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_insurance') }}</div>
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
        :data="insuranceData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="insurance_name">{{ $t('insurance_name') }} </vs-th>
          <vs-th sort-key="insurance_number">{{ $t('insurance_number') }} </vs-th>
          <vs-th sort-key="insurance_email">{{ $t('email') }} </vs-th>
          <vs-th sort-key="insurance_website">{{ $t('website') }} </vs-th>
          <vs-th sort-key="insurance_packages">{{ $t('insurance_packages') }} </vs-th>
          <vs-th>{{ $t('status') }}</vs-th>
          <vs-th>{{ $t('action') }}</vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3">
            <div class="mb-4 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
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
            <div @click="addInsuranceRecord()" class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="text-base text-primary">{{ $t('add_new_insurance') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <p @click="viewInsuranceUser(tr.id)">
                {{ tr.insurance_name }}
              </p>
            </vs-td>
            <vs-td>
              {{ tr.insurance_number }}
            </vs-td>
            <vs-td>
              {{ tr.insurance_email }}
            </vs-td>
            <vs-td>
              {{ tr.insurance_website || '-' }}
            </vs-td>
            <vs-td>
              {{ tr.insurance_packages || '-' }}
            </vs-td>

            <vs-td>
              <vs-switch color="primary" v-model="tr.is_active" vs-value="active" @input="updateInsuranceStatus(tr.id, tr.is_active)">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditInsurance')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getInsurance(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteInsurance')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Insurance start -->
    <AddInsurance v-if="isAddInsurModal" :isModalShow.sync="isInsuranceModalShow" @newInvList="getData()" />
    <!-- Add Insurance  end-->

    <!-- Update Insurance start-->
    <EditInsurance v-if="isEditInsuranceModal" :isModalShow.sync="isEditInsuranceModalShow" @indList="getData()" :insuranceId="insuranceId" />
    <!-- Update Insurance start-->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import AddInsurance from '@/views/settings/insurances/components/AddInsurance'
import EditInsurance from '@/views/settings/insurances/components/EditInsurance'
export default {
  name: 'insuranceList',
  components: {
    Select2,
    AddInsurance,
    EditInsurance
  },
  data() {
    return {
      viewInsurance: false,
      order: [],
      length: 10,
      page: 1,
      search: '',
      val: '',
      getRecordId: '',
      //add insurance
      isAddInsurModal: false,
      isInsuranceModalShow: false,
      //edit file modal
      isEditInsuranceModal: false,
      isEditInsuranceModalShow: false,
      insuranceId: null
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'FilteredCount', 'total', 'insurances']),
    insuranceData() {
      return this.insurances.reduce((acc, item) => {
        item.insuranceStatus = item.is_active === false ? false : true
        acc.push(item)
        return acc
      }, [])
    },
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllInsurances: 'getAllInsurances',
      insuranceStatus: 'insuranceStatus',
      deleteInsuranceRecord: 'deleteInsuranceRecord',
      getInsuranceBgetAllInsurancesyId: 'getInsuranceById'
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
      this.getAllInsurances({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    addInsuranceRecord() {
      this.isAddInsurModal = true
      this.isInsuranceModalShow = true
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addInsurance({
          ...this.add_form
        })
        this.addInsuranceModal = false
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
    getInsurance(id) {
      this.insuranceId = id
      this.isEditInsuranceModal = true
      this.isEditInsuranceModalShow = true
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteInsurance(id),
        acceptText: 'Delete'
      })
    },
    async deleteInsurance(id) {
      try {
        const { message } = await this.deleteInsuranceRecord(id)
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
    async updateInsuranceStatus(id, is_active) {
      try {
        const { message } = await this.insuranceStatus({
          id,
          is_active
        })
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },
    viewInsuranceUser(id) {
      this.$router.push(`/insurances/${id}/view`)
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
    isInsuranceModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddInsurModal = false
          }, 0)
        }
      }
    },
    isEditInsuranceModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditInsuranceModal = false
            this.insuranceId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isInsuranceModalShow = false
    this.isEditInsuranceModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
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
