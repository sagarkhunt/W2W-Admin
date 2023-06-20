<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_see_all_the_roles_that_should_have_specific_access_levels') }}</div>
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
        :data="roles"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="role.role_name">{{ $t('role_name') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-2 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
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
            <div @click="openRolePopup" class="btn-add-new p-2 md:mr-4 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="text-base text-primary">{{ $t('add_new_role') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.role_name }}
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditRoleName')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getQualificationRecord(tr)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.EditRolePermission')">
                  <feather-icon icon="LockIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="sendToRoleEditPage(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteRole')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <RolePopUpModal v-if="isRoleModalMounted" :isModalShow.sync="isRoleModalShow" :roleId="selectedRole.id" @done="getData" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState } from 'vuex'
import RolePopUpModal from './components/RoleModal.vue'

export default {
  name: 'RolesList',
  components: {
    Select2,
    RolePopUpModal
  },
  data() {
    return {
      rolePopup: false,
      updateRolePopup: false,
      page: 1,
      length: 10,
      roles_form: {
        role_name: '',
        description: ''
      },
      role_form: {
        role_name: '',
        description: ''
      },
      add_form: {
        role_name: '',
        description: ''
      },
      roleId: '',
      filters: '',

      //role variables
      isRoleModalMounted: false,
      isRoleModalShow: false,
      selectedRole: {}
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('users', ['loading', 'roles', 'total', 'FilteredCount', 'qualificationInfo']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('users', {
      getAllRoles: 'getAllRoles',
      addRole: 'addRole',
      getRoleById: 'getRoleById',
      udateRoleInfo: 'udateRoleInfo',
      deleteRoleRecord: 'deleteRoleRecord'
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
      this.order = [key ? key : 'role.id', active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    getData() {
      this.getAllRoles({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order
      })
    },

    sendToRoleEditPage(id) {
      this.$router.push(`/users/Roles/${id}/edit`)
    },
    async openRolePopup() {
      this.isRoleModalMounted = true
      this.isRoleModalShow = true
    },
    async addRoleRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addRole({
          ...this.add_form
        })
        this.rolePopup = false
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
    async getQualificationRecord(data) {
      this.selectedRole = data
      this.isRoleModalMounted = true
      this.isRoleModalShow = true
    },
    async updateRoleNameRecord() {
      try {
        const { message } = await this.udateRoleInfo({
          id: this.roleId,
          data: {
            ...this.role_form
          }
        })
        this.updateRolePopup = false
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
        title: 'Confirm Delete',
        text: this.$t('delete_conformation.PermissionDelete'),
        accept: () => this.deleteRole(id),
        acceptText: 'Delete'
      })
    },
    async deleteRole(id) {
      try {
        const { message } = await this.deleteRoleRecord(id)
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
    isRoleModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.selectedRole = {}
            this.isRoleModalMounted = false
          }, 0)
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isRoleModalShow = false
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
