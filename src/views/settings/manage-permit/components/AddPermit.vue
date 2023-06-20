<template>
  <div class="add__permit">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.PermitManagement')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="permit">{{ $t('permit_name') }}</label>
          <vs-input id="permit" class="w-full" name="Permit" v-validate="'required|max:60'" v-model="add_permit.permit_name" />
          <span class="text-primary text-sm" v-show="errors.has('Permit')">{{ errors.first('Permit') }}</span>
        </div>

        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="addPermitRecord" :disabled="!validateForm" type="submit">{{ $t('add') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'AddPermit',
  components: {
    Select2
  },
  props: {
    isModalShow: Boolean
  },
  data() {
    return {
      add_permit: {
        permit_name: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
  },
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      addPermit: 'addPermit'
    }),
    //add records permit
    async addPermitRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/addPermit', {
          ...this.add_permit
        })
        .then(({ message }) => {
          this.$emit('newInvList')
          this.isActive = false
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
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

<style lang="scss" scoped></style>
