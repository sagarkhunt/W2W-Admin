<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_all_the_benefits_for_the_system') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="benefitFilteredCount"
        pagination
        :max-items="length"
        search
        :data="benefitData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="title">{{ $t('benefit_title') }} </vs-th>
          <vs-th>{{ $t('benefit_description') }} </vs-th>
          <vs-th sort-key="claim_url">{{ $t('benefit_url') }} </vs-th>
          <vs-th>{{ $t('benefit_logo') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (benefitFilteredCount && 1)) }}
                    -
                    {{ benefitFilteredCount - page * length > 0 ? page * length : benefitFilteredCount }}
                    {{ $t('of') }} {{ benefitFilteredCount }}
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
            <div
              v-if="checkPermissionByIds([permissions.BENEFITS_ADD])"
              @click="openLanguagePopup"
              class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
            >
              <span class="text-base text-primary">{{ $t('add_benefit') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <p @click="viewBenefitClaim(tr.id)">
                {{ tr.title }}
              </p>
            </vs-td>
            <vs-td>
              {{ tr.description }}
            </vs-td>
            <vs-td>
              {{ tr.claim_url }}
            </vs-td>
            <vs-td>
              <span v-if="tr.file_path">
                <img :src="tr.file_path" :alt="tr.full_name" class="img_rounded" height="40" width="40" />
              </span>
              <span v-else> - </span>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.Editbenefit')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.BENEFITS_EDIT])" @click="getBenefitRecord(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.Deletebenefit')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.BENEFITS_DELETE])" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Language -->
    <AddBenefitPopup v-if="isAddBenefitModal" :isModalShow.sync="isAddBenefitModalShow" @newInvList="getData()" />
    <!-- End Add Language -->

    <!-- Edit Language -->
    <EditBenefitPopup v-if="isEditBenefitModal" :isModalShow.sync="isEditBenefitModalShow" @indList="getData()" :benefitId="benefitId" />
    <!-- End Edit Language -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import AddBenefitPopup from '@/views/settings/benefit-management/components/AddBenefitPopup.vue'
import EditBenefitPopup from '@/views/settings/benefit-management/components/EditBenefitPopup.vue'

export default {
  name: 'BenefitList',
  components: {
    AddBenefitPopup,
    EditBenefitPopup
  },
  data() {
    return {
      languagePopup: false,
      updateLanguagePopup: false,
      page: 1,
      length: 10,
      search: '',
      skillId: '',
      //add benefit modal
      isAddBenefitModal: false,
      isAddBenefitModalShow: false,
      //edit benefit
      isEditBenefitModal: false,
      isEditBenefitModalShow: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'benefitTotal', 'benefitFilteredCount', 'benefitData']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllBenefit: 'getAllBenefit',
      deleteBenefitRecord: 'deleteBenefitRecord'
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
      this.getAllBenefit({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    async openLanguagePopup() {
      this.isAddBenefitModal = true
      this.isAddBenefitModalShow = true
    },
    async getBenefitRecord(id) {
      this.benefitId = id
      this.isEditBenefitModal = true
      this.isEditBenefitModalShow = true
    },

    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteLanguage(id),
        acceptText: 'Delete'
      })
    },
    async deleteLanguage(id) {
      try {
        const { message } = await this.deleteBenefitRecord(id)
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
    viewBenefitClaim(id) {
      this.$router.push(`/benefit/${id}/claim`)
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
    page() {
      this.handleChangePage(this.page)
    },
    isAddBenefitModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddBenefitModal = false
          }, 0)
        }
      }
    },
    isEditBenefitModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditBenefitModal = false
            this.benefitId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddBenefitModalShow = false
    this.isEditBenefitModalShow = false
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
