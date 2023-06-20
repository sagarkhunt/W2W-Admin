<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_all_the_users_that_have_assigned_to_specific_roles') }}</div>
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
        search
        :max-items="length"
        :data="users"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="role.role_name">{{ $t('role') }} </vs-th>
          <vs-th>{{ $t('profile_picture') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('name') }} </vs-th>
          <vs-th sort-key="user.email">{{ $t('email') }} </vs-th>
          <vs-th v-if="checkPermissionByIds([permissions.USERS_DELETE])">{{ $t('action') }} </vs-th>
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
            <div
              v-if="checkPermissionByIds([permissions.USERS_ADD])"
              @click="$router.push('/users/add')"
              class="btn-add-new p-2 md:mr-4 rounded-lg ml-auto cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
            >
              <span class="text-base text-primary">{{ $t('add_new_user') }}</span>
            </div>
          </div>
        </template>
        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ (tr.admin && tr.admin.role && tr.admin.role.role_name) || '-' }}
            </vs-td>
            <vs-td>
              <span v-if="tr.file_path">
                <img :src="tr.file_path" :alt="tr.full_name" class="img_rounded" height="80" width="80" />
              </span>
              <span v-else> - </span>
            </vs-td>
            <vs-td> {{ tr.full_name }} </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td v-if="checkPermissionByIds([permissions.USERS_DELETE]) || checkPermissionByIds([permissions.USERS_EDIT])">
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <div class="inline-flex" v-if="checkRoleId === tr.admin.id">
                  <vx-tooltip :text="$t('edit_user')" v-if="checkPermissionByIds([permissions.USERS_EDIT])">
                    <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.USERS_EDIT])" @click="editRecord(tr.id)" />
                  </vx-tooltip>
                </div>
                <div class="inline-flex" v-else-if="tr.admin.role.description == 'superAdmin'"></div>
                <div class="inline-flex" v-else>
                  <vx-tooltip :text="$t('edit_user')" v-if="checkPermissionByIds([permissions.USERS_EDIT])">
                    <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.USERS_EDIT])" @click="editRecord(tr.id)" />
                  </vx-tooltip>
                  <vx-tooltip :text="$t('tooltip.DeleteUser')" v-if="checkPermissionByIds([permissions.USERS_DELETE])">
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" v-if="checkPermissionByIds([permissions.USERS_DELETE])" @click="deleteRecord(tr.id)" />
                  </vx-tooltip>
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add City -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="cityPopup" :title="$t('add_user')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="city_name">{{ $t('user_name') }} </label>
          <vs-input id="city_name" class="w-full" name="User Name" v-model="city_form.city_name" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('User Name')">{{ errors.first('User Name') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="zip_code">{{ $t('password') }} </label>
          <vs-input id="zip_code" class="w-full" name="Paswword" v-model="city_form.zip_code" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Paswword')">{{ errors.first('Paswword') }}</span>
        </div>
        <div class="vx-row mb-2 mt-5">
          <label for="country">{{ $t('country') }}</label>
          <select-2
            id="country"
            class="w-full"
            :value="city_form.countryId"
            @input="(item) => (city_form.countryId = item && item.value)"
            name="Country"
            placeholder="Select Country"
            autocomplete
            action="getCountries"
            v-validate="'required'"
          />
          <span class="text-primary text-sm" v-show="errors.has('Location')">{{ errors.first('Location') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="cityPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addCityRecord" :disabled="!validateForm" type="submit">{{ $t('send') }}</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Add City -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'UsersList',
  components: {
    Select2
  },
  data() {
    return {
      cityPopup: false,
      updateCityPopup: false,
      page: 1,
      length: 10,
      city_form: {
        city_name: '',
        zip_code: '',
        countryId: ''
      },
      filters: '',
      cityRecordId: ''
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('users', ['loading', 'total', 'FilteredCount', 'users']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    validateForm() {
      return !this.errors.any()
    },
    checkRoleId() {
      return this.$store.state.auth.user.admin.id
    }
  },
  methods: {
    ...mapActions('users', {
      getAllAdminUsers: 'getAllAdminUsers',
      addCity: 'addCity',
      getCityById: 'getCityById',
      udateCity: 'udateCity',
      deleteUserRecord: 'deleteUserRecord'
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
      this.order = [key ? key : 'user.id', active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    getData() {
      this.getAllAdminUsers({
        limit: this.length,
        page: this.page,
        order: this.order,
        search: this.search
      })
    },

    async openCityPopup() {
      this.cityPopup = true
    },
    async addCityRecord() {
      try {
        const { message } = await this.addCity({
          ...this.city_form
        })
        this.cityPopup = false
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
    async getCityRecord(id) {
      this.updateCityPopup = true
      this.cityRecordId = id
      this.$store.dispatch('setting/getCityById', this.cityRecordId).then((res) => {
        const data = res.data.data
        this.city_form.city_name = data.city_name
        this.city_form.zip_code = data.zip_code
        this.city_form.countryId = data.countryId
      })
    },
    editRecord(id) {
      this.$router.push(`/user/${id}/edit`)
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
        accept: () => this.deleteUser(id),
        acceptText: 'Delete'
      })
    },
    async deleteUser(id) {
      try {
        const { message } = await this.deleteUserRecord(id)
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
    }
  }
}
</script>

<style lang="scss">
.vs-table.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 750px;
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
.img_rounded {
  border-radius: 0.7rem;
  overflow: hidden;
}
</style>
