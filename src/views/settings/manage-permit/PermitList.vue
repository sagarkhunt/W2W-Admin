<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_mange_permits_language_wise') }}</div>
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
        :data="permitList"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="permit_name">{{ $t('permit_name') }} </vs-th>
          <vs-th>{{ $t('language') }} </vs-th>
          <vs-th sort-key="description">{{ $t('translated_permit_name') }} </vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.PERMIT_EDIT]) || checkPermissionByIds([permissions.PERMIT_DELETE])">{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-8 ag-grid-table-actions-left md:w-auto w-full">
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
          <div class="vx-row mb-2">
            <select-2 class="w-full" :value="languageId" @input="(item) => (languageId = item && item.value)" name="Language" placeholder="Select language" autocomplete action="getLanguage" />
          </div>
          <div
            v-if="languageId === 1 && checkPermissionByIds([permissions.PERMIT_ADD])"
            @click="openQualificationPopup"
            class="btn-add-new p-2 md:ml-8 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
          >
            <span class="ml-2 text-base text-primary">{{ $t('add_permit') }}</span>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.permit_name }}
            </vs-td>
            <vs-td>
              {{ tr.language && tr.language.language_name }}
            </vs-td>
            <vs-td>
              {{ tr.description }}
            </vs-td>

            <vs-td v-if="checkPermissionByIds([permissions.PERMIT_EDIT]) || checkPermissionByIds([permissions.PERMIT_DELETE])">
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditPermit')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getQualificationRecord(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeletePermit')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Permit -->
    <AddPermit v-if="isAddPermitModal" :isModalShow.sync="isAddPermitModalShow" @newInvList="getData()" />
    <!-- End Add Permit -->

    <!-- Edit Permit -->
    <EditPermit v-if="isEditPermitModal" :isModalShow.sync="isEditPermitModalShow" @indList="getData()" :permitId="permitId" />
    <!-- End Edit Permit -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import AddPermit from '@/views/settings/manage-permit/components/AddPermit'
import EditPermit from '@/views/settings/manage-permit/components/EditPermit'
export default {
  name: 'PermitList',
  components: {
    Select2,
    AddPermit,
    EditPermit
  },
  data() {
    return {
      qualificationPopup: false,
      updateQualificationPopup: false,
      length: 10,
      page: 1,
      search: '',
      languageId: null,
      order: [],

      permitId: '',
      //add permit modal
      isAddPermitModal: false,
      isAddPermitModalShow: false,
      //edit permit
      isEditPermitModal: false,
      isEditPermitModalShow: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'permitList']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllPermit: 'getAllPermit',
      deletePermitRecord: 'deletePermitRecord'
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
      this.getAllPermit({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        languageId: this.languageId
      })
    },
    async openQualificationPopup() {
      this.isAddPermitModal = true
      this.isAddPermitModalShow = true
    },

    async getQualificationRecord(id) {
      this.permitId = id
      this.isEditPermitModal = true
      this.isEditPermitModalShow = true
    },
  
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteKeyword(id),
        accept: () => this.deletePermit(id),
        acceptText: 'Delete'
      })
    },
    async deletePermit(id) {
      try {
        const { message } = await this.deletePermitRecord(id)
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
    isAddPermitModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddPermitModal = false
          }, 0)
        }
      }
    },
    isEditPermitModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditPermitModal = false
            this.permitId = null
          }, 0)
        }
      }
    },
    languageId: {
      handler(newval) {
        if (newval) {
          this.getData()
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddPermitModalShow = false
    this.isEditPermitModalShow = false
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
  margin-left: 0;

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
