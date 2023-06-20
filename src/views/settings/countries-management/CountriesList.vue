<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_countries_and_cities_language_wise') }}</div>
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
        :data="countriesData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="country_name">{{ $t('country_name') }} </vs-th>
          <vs-th sort-key="country_code">{{ $t('country_code') }}</vs-th>
          <vs-th sort-key="country_citizen">{{ $t('nationality') }} </vs-th>
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
            <div @click="openCountryPopup" class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="text-base text-primary">{{ $t('add_new_country') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.country_name }}
            </vs-td>
            <vs-td>
              {{ tr.country_code }}
            </vs-td>
            <vs-td>
              {{ tr.country_citizen }}
            </vs-td>

            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditCountry')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getCountryRecord(tr.id)" />
                </vx-tooltip>

                <vx-tooltip :text="$t('tooltip.ViewCity')">
                  <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getCountryWiseCIty(tr.referenceId)" />
                </vx-tooltip>

                <vx-tooltip :text="$t('tooltip.DeleteCountry')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Country -->
    <AddCountrie v-if="isAddCountrieModal" :isModalShow.sync="isAddCountrieModalShow" @newInvList="getData()" />
    <!-- End Add Country -->

    <!-- Edit Country -->
    <EditCountrie v-if="isEditCountrieModal" :isModalShow.sync="isEditCountrieModalShow" @indList="getData()" :countryRecordId="countryRecordId" />
    <!-- End Edit Country -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import AddCountrie from '@/views/settings/countries-management/components/AddCountries'
import EditCountrie from '@/views/settings/countries-management/components/EditCountrie'

export default {
  name: 'CountryList',
  components: {
    Select2,
    AddCountrie,
    EditCountrie
  },
  data() {
    return {
      countryPopup: false,
      updateCountryPopup: false,
      page: 1,
      length: 10,
      search: '',
      countryRecordId: '',
      //add country modal
      isAddCountrieModal: false,
      isAddCountrieModalShow: false,
      //edit country
      isEditCountrieModal: false,
      isEditCountrieModalShow: false
    }
  },
  mounted() {
    this.getData()
    this.clearForm()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'countriesData', 'countryInfo']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapMutations('setting', { clearForm: 'CLEAR_FORM' }),
    ...mapActions('setting', {
      getAllCountries: 'getAllCountries',

      getCountryById: 'getCountryById',

      deleteCountryRecord: 'deleteCountryRecord'
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
      this.getAllCountries({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },
    async openCountryPopup() {
      this.isAddCountrieModal = true
      this.isAddCountrieModalShow = true
    },
    async getCountryRecord(id) {
      this.countryRecordId = id
      this.isEditCountrieModal = true
      this.isEditCountrieModalShow = true
    },

    async getCountryWiseCIty(id) {
      this.$router.push(`/manage-cities/${id}/list`)
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteCountry(id),
        acceptText: 'Delete'
      })
    },
    async deleteCountry(id) {
      try {
        const { message } = await this.deleteCountryRecord(id)
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
    isAddCountrieModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddCountrieModal = false
          }, 0)
        }
      }
    },
    isEditCountrieModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditCountrieModal = false
            this.qualificationId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddCountrieModalShow = false
    this.isEditCountrieModalShow = false

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
