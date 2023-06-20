<template>
  <div id="table-loading" class="vs-con-loading__container industries_list">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_industries_and_status_language_wise') }}</div>
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
        :data="industriesData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="industry_name">{{ $t('industry_name') }} </vs-th>
          <vs-th>{{ $t('language') }} </vs-th>
          <vs-th>{{ $t('no._of_employers_listing') }} </vs-th>
          <vs-th>{{ $t('status') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="md:whitespace-no-wrap lg:mb-3 md:mb-1 mb-3 xl:mr-4 mr-0 w-auto ag-grid-table-actions-left mb-2">
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
          <div class="flex md:flex-no-wrap flex-wrap items-end mb-3 xl:w-full lg:w-auto w-full order-3 lg:order-0">
            <div class="width xl:mr-4 md:mr-2 mr-0 md:mb-0 mb-2">
              <select-2
                id="active"
                class=""
                :value="activeBlocked"
                @input="(item) => (activeBlocked = item && item.value)"
                placeholder="Select status"
                name="Select filterby"
                autocomplete
                :options="ActiveBlocked.map(x=>({...x, label: $t(x.label)}))"
              />
            </div>

            <div class="width xl:mr-4 md:mr-2 mr-0">
              <select-2 class="w-full" :value="languageId" @input="(item) => (languageId = item && item.value)" name="Language" placeholder="Select language" autocomplete action="getLanguage" />
            </div>

            <div class="md:mb-0 mr-0.5 ag-grid-table-actions-left lg:mt-0 mt-2 lg:w-auto w-full">
              <div
                v-if="languageId === 1"
                @click="addIndustryRecord()"
                class="btn-add-new p-2 xl:mr-4 xl:ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
              >
                <span class="text-base text-primary">{{ $t('add_new_industry') }}</span>
              </div>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.industry_name }}
            </vs-td>
            <vs-td>
              {{ tr.language && tr.language.language_name }}
            </vs-td>
            <vs-td>
              <div v-if="tr.company" class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <p @click="viewEmployerList(tr.id)">
                  {{ tr.company }}
                </p>
              </div>
              <div v-else>-</div>
            </vs-td>

            <vs-td>
              <vs-switch color="primary" v-model="tr.industryStatus" vs-value="active" @input="updateIndustryStatus(tr.id, tr.industryStatus)">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditIndustry')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getIndustry(tr)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteIndustry')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.referenceId)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <AddIndustry v-if="isAddFileModalMounted" :isModalShow.sync="isAddFileModalShow" @newInvList="getData()" />
    <!-- End Industry  -->
    <EditIndustry v-if="isEditFileModalMounted" :isModalShow.sync="isEditFileModalShow" @indList="getData()" :industryDetails="industryDetails" />
    <!-- Update Industry -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import AddIndustry from '@/views/settings/industry/components/AddIndustry'
import EditIndustry from '@/views/settings/industry/components/EditIndustry'

export default {
  name: 'industriesList',
  components: {
    Select2,
    AddIndustry,
    EditIndustry
  },
  data() {
    return {
      viewIndustry: false,
      order: [],
      length: 10,
      page: 1,
      search: '',
      val: '',
      form: {
        edit_industry_name: null
      },
      add_form: {
        add_industry_name: null
      },
      activeBlocked: '',
      topIndustry: '',
      getRecordId: '',
      //ad file modal
      isAddFileModalMounted: false,
      isAddFileModalShow: false,
      //edit file modal
      isEditFileModalMounted: false,
      isEditFileModalShow: false,
      industryDetails: {},
      languageId: null
    }
  },
  mixins: [dateMixins],
  async mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'industries', 'addIndustry', 'ActiveBlocked']),
    industriesData() {
      return this.industries.reduce((acc, item) => {
        item.industryTopStatus = item.is_top === false ? false : true
        item.industryStatus = item.is_active === false ? false : true
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
      getAllIndustries: 'getAllIndustries',
      topIndustryStatus: 'topIndustryStatus',
      industryStatus: 'industryStatus',
      deleteIndustryRecord: 'deleteIndustryRecord',
      getindustryById: 'getindustryById',
      udateIndustryRecord: 'udateIndustryRecord'
    }),
    sendToEditEmployer(id) {
      this.$router.push(`/jobseeker/${id}/edit`)
    },
    addIndustryRecord() {
      this.isAddFileModalMounted = true
      this.isAddFileModalShow = true
    },
    viewEmployerList(id) {
      this.$router.push({
        name: 'employers-list-industryId',
        params: {
          id
        }
      })
    },

    getIndustry(tr) {
      this.viewIndustry = true
      this.industryDetails = tr
      this.isEditFileModalMounted = true
      this.isEditFileModalShow = true
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
      this.getAllIndustries({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        activeBlocked: this.activeBlocked,
        topIndustry: this.topIndustry,
        languageId: this.languageId
      })
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteIndustry(id),
        acceptText: 'Delete'
      })
    },
    async deleteIndustry(id) {
      try {
        const { message } = await this.deleteIndustryRecord(id)
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
    async updateTopindustry(id, is_top) {
      try {
        const { message } = await this.topIndustryStatus({
          id,
          is_top
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
    async updateIndustryStatus(id, is_active) {
      try {
        const { message } = await this.industryStatus({
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
    isAddFileModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddFileModalMounted = false
          }, 0)
        }
      }
    },
    isEditFileModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditFileModalMounted = false
            this.industryDetails = null
          }, 0)
        }
      }
    },
    activeBlocked: {
      handler(newVal) {
        this.getData()
      }
    },
    topIndustry: {
      handler(newVal) {
        this.getData()
      }
    },
    languageId: {
      handler(newval) {
        if (newval) {
          this.getData()
        }
      }
    },

    $route: {
      deep: true,
      handler() {
        this.getData()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddFileModalShow = false
    this.isEditFileModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.industries_list {
  .vs-table--header {
    @media (max-width: 768px) {
      display: flex;
      flex-wrap: wrap;
    }
    @media (min-width: 1024px) {
      flex-wrap: nowrap;
    }
    @media (max-width: 992px) {
      flex-wrap: wrap;
    }
  }
  .vs-table--search {
    max-width: 200px;
    order: 3;
    @media (max-width: 768px) {
      order: 2;
    }
    @media (max-width: 425px) {
      max-width: 63%;
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
  .vs-con-table {
    .vs-table--header {
      .vs-table--search {
        padding: 0;
        margin: 0 0 0.75rem 0;
        @media (max-width: 992px) {
          margin-bottom: 2px;
        }
        @media (max-width: 575px) {
          margin-bottom: 10px;
        }
      }
    }
  }

  .lg\:order-0 {
    @media (min-width: 992px) {
      order: 0 !important;
    }
  }
  .width {
    @media (max-width: 1024px) {
      width: 206px;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      width: 100%;
    }
    @media (max-width: 425px) {
      margin-top: 0px;
    }
  }

  .btn-add-new {
    @media (max-width: 768px) {
      width: 100%;
      text-align: center;
    }
  }
}

.vuesax-app-is-ltr {
  .industries_list {
    .vs-table--search {
      @media (max-width: 768px) {
        margin-left: 17px;
        width: 100%;
        max-width: 200px;
      }
      @media (max-width: 575px) {
        margin-left: 17px;
        width: 100%;
        max-width: 60%;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 767px) {
    margin-top: 0px !important;
  }
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
