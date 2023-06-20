<template>
  <div id="page-add-role">
    <vs-card id="data-loading" class="vs-con-loading__container">
      <div class="vx-row">
        <div class="vx-col flex items-end mb-5">
          <feather-icon icon="AwardIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium text-sm lg:text-lg">{{ $t('role_information') }}</span>
        </div>
      </div>
      <div class="vx-row w-full">
        <div class="vx-col w-full">
          <div class="lg:w-1/2 w-full px-8">
            <vs-input icon="icon icon-home" v-model="form.role_name" icon-pack="feather" class="w-full mb-2" :label="$t('role_name')" name="Role Name" v-validate="'required|min:3|max:30'" disabled />
            <span class="text-primary text-sm" v-show="errors.has('Role Name')">{{ errors.first('Role Name') }}</span>
          </div>

          <div class="flex items-end mt-10">
            <feather-icon icon="LockIcon" class="mr-2" svgClasses="w-5 h-5" />
            <span class="leading-none font-medium text-sm lg:text-lg">{{ $t('permissions') }}</span>
          </div>

          <vs-table class="flex items-end mt-6" stripe :data="Object.values(permissions)">
            <template slot="thead">
              <vs-th>{{ $t('sr') }}</vs-th>
              <vs-th>{{ $t('module') }}</vs-th>
              <vs-th>{{ $t('select_all') }}</vs-th>
              <vs-th>{{ $t('permissions') }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :key="i" v-for="(tr, i) in data">
                <vs-td> {{ i + 1 }}. </vs-td>

                <vs-td>
                  {{ Object.keys(permissions)[i] }}
                </vs-td>

                <vs-td>
                  <vs-checkbox :checked="selectAll[i]" @input="(e) => changeInput(!selectAll[i], i)">{{ $t('select_all') }}</vs-checkbox>
                </vs-td>

                <vs-td>
                  <vs-checkbox class="py-2" :key="x" v-for="(td, x) in tr" v-model="form.permissions" :vs-value="td.permissionId">{{ x }}</vs-checkbox>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>

          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2 vs-con-loading__container" id="add-role-button" type="relief" @click="save_changes" :disabled="!validateForm || loading">{{
                  $t('update_permissions')
                }}</vs-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'

export default {
  name: 'EditRole',
  components: {
    Select2
  },
  data: () => ({
    form: {
      role_name: '',
      permissions: []
    },
    processing: false
  }),
  async mounted() {
    this.getAllRoles()
    this.$store
      .dispatch('users/getRoleById', this.$route.params.id)
      .then((res) => {
        const data = res.data.data
        this.form.role_name = data.role_name
      })
      .catch((err) => {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      })
  },
  computed: {
    ...mapState('users', ['loading', 'permissions']),
    selectAll() {
      return Object.values(this.permissions).map((module) => {
        return Object.values(module).filter(({ permissionId }) => this.form.permissions.includes(permissionId)).length === Object.values(module).length
      })
    },
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('users', { getAllRoles: 'getAllRoles', getRoleById: 'getRoleById', udateRolePermission: 'udateRolePermission' }),
    changeInput(e, i) {
      Object.values(Object.values(this.permissions)[i]).forEach((x) => {
        if (e) {
          if (!this.form.permissions.includes(x.permissionId)) {
            this.form.permissions.push(x.permissionId)
          }
        } else {
          const t = this.form.permissions.indexOf(x.permissionId)
          if (t !== -1) {
            this.form.permissions.splice(t, 1)
          }
        }
      })
    },
    async save_changes() {
      try {
        const { message } = await this.udateRolePermission({
          id: this.$route.params.id,
          data: {
            ...this.form
          }
        })
        this.$router.push({
          name: 'roles-list'
        })
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
          color: 'primary',
          color: 'primary'
        })
      }
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-role-button',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-role-button > .con-vs-loading')
      }
    },
    permissions() {
      Object.values(this.permissions).forEach((module) => {
        Object.values(Object.values(module)).forEach((x) => {
          if (!this.form.permissions.includes(x.permissionId) && x.status) {
            this.form.permissions.push(x.permissionId)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.vs-card--content {
  padding: 25px;
  font-size: 0.8rem;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    padding: 15px;
  }
}
.vs-table.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 750px;
  }
}
.vs-checkbox {
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
}
.vs-con-table .vs-con-tbody .con-vs-checkbox {
  -webkit-box-pack: unset !important;
  justify-content: unset !important;
}
</style>
