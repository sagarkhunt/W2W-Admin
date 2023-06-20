<template>
  <!-- Role Info -->
  <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="roleId ? $t('model.UpdateRole') : $t('model.AddRole')">
    <div class="con-exemple-prompt">
      <div class="vx-row mb-2 px-4">
        <label for="role_name">{{ $t('role_name') }}</label>
        <vs-input id="role_name" class="w-full" name="Role Name" v-model="role_name" v-validate="'required|min:3|max:30'" />
        <span class="text-primary text-sm" v-show="errors.has('Role Name')">{{ errors.first('Role Name') }}</span>
      </div>
    </div>
    <div class="footer text-right">
      <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="isActive = false"> {{ $t('cancel') }} </vs-button>
      <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="add_record_invoice_deducation" type="relief" :disabled="!validateForm">
        {{ roleId ? 'Update' : 'Add' }}
      </button>
    </div>
  </vs-popup>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapState } from 'vuex'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'RolePopUpModal',

  props: {
    isModalShow: Boolean,
    roleId: Number
  },

  components: {
    Select2
  },

  data() {
    return {
      role_name: ''
    }
  },

  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    if (this.roleId) {
      this.$store.dispatch('users/getRoleById', this.roleId).then(({ data }) => {
        this.role_name = data.data.role_name
      })
    }
  },

  computed: {
    ...mapState('jobseeker', ['VatTypes']),

    // For Validation
    validateForm() {
      return !this.errors.any()
    },

    isActive: {
      get() {
        return this.isModalShow
      },
      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    }
  },

  methods: {
    async add_record_invoice_deducation() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const payload = {
        url: this.roleId ? 'users/udateRoleInfo' : 'users/addRole',
        data: this.roleId
          ? {
              id: this.roleId,
              data: {
                role_name: this.role_name
              }
            }
          : { role_name: this.role_name }
      }
      this.$store
        .dispatch(payload.url, payload.data)
        .then(({ message }) => {
          this.$emit('done')
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })

          this.isActive = false
        })
        .catch(({ message }) => {
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        })
    }
  }
}
</script>

<style lang="scss"></style>
