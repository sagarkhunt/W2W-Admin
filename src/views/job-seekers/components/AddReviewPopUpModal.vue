<template>
  <div>
    <!-- Deductions Info -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('add_review')">
      <div class="con-exemple-prompt">
        <span class="text-primary text-sm" v-show="errors.has('Industry')">{{ errors.first('Industry') }}</span>
        <div class="">
          <label for="reviewer"> {{ $t('reviewer') }}</label>
          <div class="mb-2">
            <select-2
              class="w-full"
              :value="add_review_form.companyId"
              @input="(item) => (add_review_form.companyId = item && item.value)"
              name="Reviwer"
              placeholder="Select reviewer"
              autocomplete
              val="value"
              :options="reviewerOptions"
              v-validate="'required'"
              :ssr="true"
            />
            <span class="text-primary text-sm" v-show="errors.has('Reviwer')">{{ errors.first('Reviwer') }}</span>
          </div>
        </div>
        <div class="mt-3">
          <label for="reviewer_gig"> {{ $t('reviewer_gig') }}</label>
          <div class="mb-2">
            <select-2
              class="w-full"
              :value="add_review_form.jobProposalId"
              @input="(item) => (add_review_form.jobProposalId = item && item.value)"
              name="Reviwer Gig"
              placeholder="Select reviewer gig"
              autocomplete
              val="value"
              :options="reviwerGigOption"
              v-validate="'required'"
              :ssr="true"
              :disabled="this.reviwerGigOption.length == 0 ? true : false"
            />
            <span class="text-primary text-sm" v-show="errors.has('Reviwer Gig')">{{ errors.first('Reviwer Gig') }}</span>
          </div>
        </div>

        <div class="mt-3">
          <label for="deductionAmount"> {{ $t('rating') }} </label>
          <div class="rating-icon flex items-center justify-start">
            <span v-for="(item, index) in 5" :key="index">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :fill="star > index ? '#E4AA18' : '#9E9E9E'" class="start-width review-star" @click="star = item">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="mt-2">
          <label for="comment">{{ $t('review_text') }}</label>
          <vs-textarea id="comment" class="w-full" name="Review text" v-validate="'max:255'" v-model="add_review_form.comment" />
          <span class="text-primary text-sm" v-show="errors.has('Review text')">{{ errors.first('Review text') }}</span>
        </div>
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="isActive = false"> {{ $t('cancel') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="add_seeker_review" type="relief" :disabled="!validateForm">
          {{ $t('add') }}
        </button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { dateMixins } from '@/mixins/dateMixins.js'
import { backgrondScrollHandler } from '@/utils/functions'
import moment from 'moment'

export default {
  name: 'AddReviewGigs',
  components: {
    DatePicker,
    Select2
  },
  props: {
    isModalShow: Boolean,
    jobseeker: Object
  },
  data() {
    return {
      // Payslip Form
      reviewerOptions: [],
      reviwerGigOption: [],
      star: 5,
      add_review_form: {
        seekerId: this.$route.params.id,
        companyId: '',
        jobProposalId: '',
        rate: '',
        comment: ''
      },
      //invoice number
      invoiceNumber: [],
      range: {
        start: '',
        end: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store
      .dispatch('jobseeker/getReviewerName', this.$route.params.id)
      .then((res) => {
        this.reviewerOptions = res.data
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
    ...mapActions('jobseeker', {
      addRecordReviewGigs: 'addRecordReviewGigs'
    }),

    payslipReceiptFile(e) {
      this.payslip_form.payslip_receipt = e.target.files[0]
    },
    deductionReceiptFile(e) {
      this.payslip_form.deduction_receipt = e.target.files[0]
    },
    // get ReviewGig cities
    async getReviewGigList() {
      const { data } = await this.$store.dispatch('jobseeker/getReviewerGigName', { seekerId: this.$route.params.id, companyId: this.add_review_form.companyId })
      this.reviwerGigOption = data
    },

    async add_seeker_review() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.add_review_form.rate = this.star
      try {
        const { message } = await this.addRecordReviewGigs({
          ...this.add_review_form
        })
        this.$emit('done')
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
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#add-employer',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#add-employer > .con-vs-loading')
      }
    },

    'add_review_form.companyId': {
      immediate: true,
      handler() {
        if (this.add_review_form.companyId) {
          this.getReviewGigList()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.date-range {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.6rem 0.6rem 0.6rem 2rem !important;
}

.review-star:hover {
  fill: #e4aa18;
  cursor: pointer;
}
.start-width {
  width: 30px;
}
</style>
