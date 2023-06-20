<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateBenefit')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="benefitTitle">{{ $t('benefit_title') }}</label>
          <vs-input id="benefitTitle" class="w-full" name="benefit title" v-model="edit_form.title" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('benefit title')">{{ errors.first('benefit title') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="benefitPoint">{{ $t('benefit_point') }}</label>
          <vs-input id="benefitPoint" type="number" class="w-full" name="benefit point" v-model="edit_form.benefit_point" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('benefit point')">{{ errors.first('benefit point') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="claim_url">{{ $t('benefit_url') }}</label>
          <vs-input class="w-full" name="benefit url" v-model="edit_form.claim_url" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('benefit url')">{{ errors.first('benefit url') }}</span>
        </div>
        <div class="vx-row mb-2">
          <label for="benefit_description">{{ $t('benefit_description') }}</label>
          <vs-textarea id="benefit_description" class="w-full" name="benefit description" v-validate="'required|max:255'" v-model="edit_form.description" />
          <span class="text-primary text-sm" v-show="errors.has('benefit description')">{{ errors.first('benefit description') }}</span>
        </div>
        <img :src="profile_preview" alt="" height="120" width="120" />
        <div class="vx-row mb-2">
          <label for="">{{ $t('benefit_logo') }}</label>
          <input type="file" ref="banner" accept="image/jpeg, image/png" @change="handleProfileUpload" icon-pack="feather" name="benefit logo" class="vs-inputx vs-input--input normal w-full" />
          <span class="text-primary text-sm" v-show="errors.has('benefit logo')">{{ errors.first('benefit logo') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="isActive = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateBenefitRecord" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'EditBenefitPopup',
  props: {
    isModalShow: Boolean,
    benefitId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      profile_preview: null,
      edit_form: {
        title: '',
        claim_url: '',
        description: '',
        profile_image: '',
        benefit_point: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getBenefitById', this.benefitId).then((res) => {
      const data = res.data.data
      this.edit_form.title = data.title
      this.edit_form.benefit_point = data.benefit_point
      this.edit_form.claim_url = data.claim_url
      this.edit_form.description = data.description
      this.edit_form.profile_image = data.file_path
      this.profile_preview = data.file_path
    })
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
      updateBenefit: 'updateBenefit'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateBenefitRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()
      data.append('title', this.edit_form.title)
      data.append('benefit_point', this.edit_form.benefit_point)
      data.append('claim_url', this.edit_form.claim_url)
      data.append('description', this.edit_form.description)
      data.append('document', this.edit_form.profile_image)

      try {
        const { message } = await this.updateBenefit({
          id: this.benefitId,
          data
        })
        this.$emit('indList')
        this.isActive = false

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
      }
    },

    //profile image set
    handleProfileUpload(e) {
      this.edit_form.profile_image = e.target.files[0]
      this.profile_preview = URL.createObjectURL(e.target.files[0])
    },

    // remove logo image
    removeProfileImageHandler() {
      this.$refs.profileimage.filesx = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
