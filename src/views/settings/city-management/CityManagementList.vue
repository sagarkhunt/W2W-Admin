<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card md:p-8 p-6">
      <vs-table
        class="vs-con-loading__container"
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
        :data="citiesData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="city_name">{{ $t('city_name') }} </vs-th>
          <vs-th sort-key="zip_code">{{ $t('zip_code') }} </vs-th>
          <vs-th sort-key="is_popular">{{ $t('is_popular') }} </vs-th>
          <vs-th>{{ $t('status') }} </vs-th>
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
            <div @click="openCityPopup" class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="ml-2 text-base text-primary">{{ $t('add_new_city') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.city_name }}
            </vs-td>
            <vs-td>
              {{ tr.zip_code }}
            </vs-td>
            <vs-td>
              {{ tr.is_popular }}
            </vs-td>
            <vs-td>
              {{ tr.is_active == true ? 1 : 0 }}
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditCity')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 text-primary cursor-pointer" @click="getCityRecord(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteCity')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add City -->
    <AddCity v-if="isAddCityModal" :isModalShow.sync="isAddCityModalShow" @newInvList="getData()" />

    <!-- End Add City -->

    <!-- Edit City -->
    <EditCity v-if="isEditCityModal" :isModalShow.sync="isEditCityModalShow" @indList="getData()" :cityRecordId="cityRecordId" />
    <!-- End Edit City -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import AddCity from '@/views/settings/city-management/components/AddCity'
import EditCity from '@/views/settings/city-management/components/EditCity'

export default {
  name: 'CityList',
  components: {
    Select2,
    AddCity,
    EditCity
  },
  data() {
    return {
      cityPopup: false,
      updateCityPopup: false,
      page: 1,
      length: 10,
      search: '',
      cityRecordId: '',
      order: [],
      //add city modal
      isAddCityModal: false,
      isAddCityModalShow: false,
      //edit city
      isEditCityModal: false,
      isEditCityModalShow: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'citiesData', 'cityinfo']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllCity: 'getAllCity',

      getCityById: 'getCityById',

      deleteCityRecord: 'deleteCityRecord'
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
      const payload = {
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      }

      this.getAllCity({ id: this.$route.params.id, payload })
    },
    async openCityPopup() {
      this.isAddCityModal = true
      this.isAddCityModalShow = true
    },

    async getCityRecord(id) {
      this.cityRecordId = id
      this.isEditCityModal = true
      this.isEditCityModalShow = true
    },
    async updateCityRecord() {
      try {
        const { message } = await this.udateCity({
          id: this.cityRecordId,
          data: {
            ...this.city_form
          }
        })
        this.updateCityPopup = false
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
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteCity(id),
        acceptText: 'Delete'
      })
    },
    async deleteCity(id) {
      try {
        const { message } = await this.deleteCityRecord(id)
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
    isAddCityModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddCityModal = false
          }, 0)
        }
      }
    },
    isEditCityModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditCityModal = false
            this.cityRecordId = null
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddCityModalShow = false
    this.isEditCityModalShow = false

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
</style>
