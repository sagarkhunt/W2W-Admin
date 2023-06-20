<template>
  <div>
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.ActivityPoints')">
      <div class="con-exemple-prompt">
        <vs-input type="number" name="Activity Point" class="mt-3 w-full" v-validate="'required'" v-model="form.activity_point" />
        <span class="text-primary text-sm" v-show="errors.has('Activity Point')">{{ errors.first('Activity Point') }}</span>
      </div>

      <div class="footer text-right">
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="SaveActivityPoints" type="relief">
          {{ 'Save' }}
        </button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions } from 'vuex'
export default {
  name: 'ActivityPointModal',

  props: {
    isModalShow: Boolean,
    activityPoint: {
      type: Number,
      default: null
    }
  },

  components: {
    Select2
  },
  data() {
    return {
      name: 1234,
      form: {
        activity_point: null,
        seekerId: this.$route.params.id
      }
    }
  },
  computed: {
    // For Validation
    validateForm() {
      return !this.errors.any()
    },
    isActive: {
      get() {
        return this.isModalShow
      },
      set(val) {
        this.$emit('update:isModalShow', val)
      }
    }
  },
  methods: {
    ...mapActions('jobseeker', {
      addActivePoint: 'addActivePoint'
    }),

    async SaveActivityPoints(id) {
      if (!(await this.$validator.validate())) {
        return false
      }
      try {
        const { message } = await this.addActivePoint({
          ...this.form
        })
        this.invoiceDataPopup = false
        this.$emit('done')
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
          color: 'primary'
        })
      } finally {
        this.isActive = false
      }
    }
  },
  mounted() {
    this.form.activity_point = this.activityPoint
  }
}
</script>
