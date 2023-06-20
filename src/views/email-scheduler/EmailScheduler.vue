<template>
  <div id="page-add-emaployer">
    <div class="mb-6 desc">{{ $t('here_you_can_send_mail_that_needs_to_be_scheduled') }}</div>
    <vs-card class="p-2">
      <div class="sm:grid lg:grid-cols-2 lg:gap-3 gap-6">
        <div class="">
          <div class="w-full">
            <div class="">
              <label class="font-semibold" for="gender">{{ $t('choose_mail_type') }}</label>
              <select-2
                id="choose_mail_type"
                placeholder="Choose sent mail"
                icon-pack="feather"
                name="choose mail type"
                v-validate="'required'"
                :value="form.template_type"
                @input="(item) => (form.template_type = item && item.value)"
                :options="emailTemplateTypes"
                :disabled="emailTemplateTypes.length == 0 ? true : false"
              />
              <span class="text-primary text-sm" v-show="errors.has('choose mail type')">{{ errors.first('choose mail type') }}</span>
            </div>

            <div class="grid xxl:grid-cols-4 sm:grid-cols-3 col-gap-4 my-2">
              <div class="col-span-1 sm:mb-0 mb-2">
                <label for="" class="font-semibold">{{ $t('repeats') }}</label>
                <select-2
                  id="repeats"
                  placeholder="Repeats"
                  icon-pack="feather"
                  class="w-full mt-1"
                  name="repeats"
                  v-validate="'required'"
                  :value="form.repeats"
                  @input="(item) => (form.repeats = item && item.value)"
                  :options="repeats_type.map(x=>({...x, label: $t(x.label)}))"
                />
                <span class="text-primary text-sm" v-show="errors.has('repeats')">{{ errors.first('repeats') }}</span>
              </div>
              <div class="col-span-1">
                <label for="" class="font-semibold">{{ $t('recurs') }}</label>
                <select-2
                  id="recurs"
                  placeholder="Recurs type"
                  icon-pack="feather"
                  class="w-full mt-1"
                  name="recurs"
                  v-validate="'required'"
                  :value="form.recurs"
                  @input="(item) => (form.recurs = item && item.value)"
                  :options="repeatsType"
                  :disabled="!form.repeats"
                />
                <span class="text-primary text-sm" v-show="errors.has('recurs')">{{ errors.first('recurs') }}</span>
              </div>
            </div>

            <div class="grid my-2">
              <p class="font-semibold">{{ $t('on_day_of_the_week') }}</p>
              <ul class="flex w-full gap-2 mt-2" id="selected_box">
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="sunday" value="Sun" class="input-checked" v-model="form.day_of_week" />
                    <label for="sunday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Su</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="Monday" value="Mon" class="input-checked" v-model="form.day_of_week" />
                    <label for="Monday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Mo</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="Tuesday" value="Tue" class="input-checked" v-model="form.day_of_week" />
                    <label for="Tuesday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Tu</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="wednesday" value="Wed" class="input-checked" v-model="form.day_of_week" />
                    <label for="wednesday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">We</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="Thursday" value="Thu" class="input-checked" v-model="form.day_of_week" />
                    <label for="Thursday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Th</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="friday" value="Fri" class="input-checked" v-model="form.day_of_week" />
                    <label for="friday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Fr</label>
                  </div>
                </li>
                <li class="">
                  <div class="relative week-wrapper">
                    <input type="checkbox" name="Day" v-validate="'required'" id="saturday" value="Sat" class="input-checked" v-model="form.day_of_week" />
                    <label for="saturday" class="lable-checked font-semibold text-base flex justify-center items-center h-full w-full">Sa</label>
                  </div>
                </li>
              </ul>
              <span class="text-primary text-sm" v-show="errors.has('Day')">{{ errors.first('Day') }}</span>
            </div>

            <div class="grid my-2 sm:grid-cols-4">
              <div class="col-span-1">
                <label class="font-semibold">{{ $t('sendTime') }}</label>
                <div>
                  <v-date-picker
                    v-validate="'required'"
                    id="add_start_time"
                    name="send time"
                    class="dropdown-color"
                    placeholder="Select time"
                    v-model="form.send_time"
                    type="time"
                    format="hh:mm"
                  ></v-date-picker>
                </div>
                <span class="text-primary text-sm" v-show="errors.has('send time')">{{ errors.first('send time') }}</span>
              </div>
            </div>
            <div class="sm:grid my-2 xxl:grid-cols-4 grid-cols-3 xxl:col-gap-4 col-gap-2">
              <span v-if="this.form.repeats == 'weekly'">
                <div class="col-span-1 sm:mb-0 mb-2">
                  <label class="font-semibold">{{ $t('startDate') }}</label>
                  <v-date-picker
                    v-validate="'required'"
                    name="start date"
                    class="w-full mt-1"
                    placeholder="Select Start Date"
                    v-model="form.start_date"
                    type="date"
                    format="MMMM  D , YYYY"
                    :disabled-date="(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))"
                  ></v-date-picker>
                  <span class="text-primary text-sm" v-show="errors.has('start date')">{{ errors.first('start date') }}</span>
                </div>
              </span>
              <span v-if="this.form.repeats == 'monthly'">
                <div class="col-span-1 sm:mb-0 mb-2">
                  <label class="font-semibold">{{ $t('startMonth') }}</label>

                  <v-date-picker
                    v-validate="'required'"
                    name="start month"
                    class="w-full mt-1"
                    placeholder="Select Start Month"
                    v-model="form.start_month"
                    type="month"
                    format="MMM,YYYY"
                    :disabled-date="(date) => date <= new Date(new Date().setMonth(new Date().getMonth() - 1))"
                  ></v-date-picker>
                  <span class="text-primary text-sm" v-show="errors.has('start month')">{{ errors.first('start month') }}</span>
                </div>
              </span>
              <div class="col-span-1 sm:mb-0 mb-2">
                <label for="" class="font-semibold">{{ $t('ends') }}</label>
                <select-2
                  id="ends"
                  placeholder="Select ends"
                  icon-pack="feather"
                  class="w-full mt-1"
                  name=""
                  v-validate="'required'"
                  :value="form.ends_with"
                  @input="(item) => (form.ends_with = item && item.value)"
                  :options="ends_type.map(x=>({...x, label: $t(x.label)}))"
                />
              </div>
              <div v-if="form.ends_with == 'select_date'" class="col-span-1 sm:mb-0 mb-2">
                <span v-if="this.form.repeats == 'weekly'">
                  <label class="font-semibold">{{ $t('select_end_date') }}</label>

                  <v-date-picker
                    v-validate="'required'"
                    name="End Date"
                    class="w-full payment_date"
                    placeholder="Select End Date"
                    v-model="form.end_date"
                    type="date"
                    format="MMMM  D , YYYY"
                    :disabled-date="(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))"
                  ></v-date-picker>
                </span>
                <span class="text-primary text-sm" v-show="errors.has('End Date')">{{ errors.first('End Date') }}</span>

                <span v-if="this.form.repeats == 'monthly'">
                  <label class="font-semibold">{{ $t('select_end_month') }}</label>

                  <v-date-picker
                    v-validate="'required'"
                    name="End month"
                    class="w-full mt-1"
                    placeholder="Select End Month"
                    v-model="form.end_month"
                    type="month"
                    format="MMM,YYYY"
                    :disabled-date="(date) => date <= new Date(new Date().setMonth(new Date().getMonth() - 1))"
                  ></v-date-picker>
                </span>
                <span class="text-primary text-sm" v-show="errors.has('End month')">{{ errors.first('End month') }}</span>
              </div>
            </div>

            <div class="my-2">
              <label class="font-semibold">{{ $t('occurrence') }}</label>
              <div class="mt-1 flex items-center">
                <p class="mr-3">{{ $t('after') }}</p>
                <div class="relative occurrence-wrapper flex justify-center mr-3">
                  <input type="number" v-model="form.occurrence_value" class="inpult-area" :disabled="form.ends_with !== 'after_occurrence'" name="occurrence" />
                </div>
                <p class="mr-3">{{ $t('occurrence') }}</p>
              </div>
            </div>
          </div>
          <div class="">
            <div class="vx-col w-full">
              <div class="">
                <label for="">{{ $t('content') }}</label>
                <ckeditor v-model="form.content" :config="editorConfig" style="height: auto; min-height: 150px" v-validate="'required'" name="content"></ckeditor>
              </div>
              <span class="text-primary text-sm" v-show="errors.has('content')">{{ errors.first('content') }}</span>
            </div>
          </div>
          <!-- Save & Reset Button -->
          <div class="vx-row mt-5">
            <div class="vx-col w-full">
              <div class="flex flex-wrap items-center md:justify-start justify-center">
                <vs-button class="mr-2 vs-con-loading__container" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('schedule') }}</vs-button>
              </div>
            </div>
          </div>

          <span class="text-primary text-sm" v-show="errors.has('content')">{{ errors.first('content') }}</span>
        </div>
        <div class="">
          <div class="p-0 mb-1">
            <div>
              <label for="" class="font-semibold">{{ $t('select_language') }}</label>
              <div>
                <select-2
                  class="w-full mt-0"
                  :value="languageId"
                  @input="(item) => (languageId = item && item.value)"
                  name="language"
                  placeholder="Select language"
                  v-validate="'required'"
                  autocomplete
                  action="getLanguage"
                />
                <span class="text-primary text-sm" v-show="errors.has('language')">{{ errors.first('language') }}</span>
              </div>
            </div>
            <div class="mt-5">
              <label for="" class="font-semibold">{{ $t('statement') }}</label>
              <select-2
                id="statement"
                placeholder="Select statement"
                class="w-full mt-2"
                name="statement"
                :value="form.statement"
                v-validate="'required'"
                @input="(item) => (form.statement = item && item.value)"
                :options="StatementName.map(x=>({...x, label: $t(x.label)}))"
                :ssr="true"
              />
              <span class="text-primary text-sm" v-show="errors.has('statement')">{{ errors.first('statement') }}</span>
            </div>
          </div>
          <div class="attachment_file p-2">
            <vs-upload :limit="1" :value="form.document" ref="profileimage" text="Add Attachments" :show-upload-button="false" @on-delete="removeProfileImageHandler" accept="image/jpeg,image/png" />
          </div>

          <div class="mt-5">
            <label for="" class="font-semibold">{{ $t('email_preview') }}</label>
            <div class="vx-col w-full sm:px-8 px-5 sm:py-6 py-4 email-preview mt-1 sm:mb-0 mb-5 pb-5">
              {{ $t('email_preview') }}
            </div>
          </div>
        </div>
      </div>
    </vs-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import moment from 'moment'
import VDatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

export default {
  name: 'EmailScheduler',
  components: {
    quillEditor,
    Select2,
    DatePicker,
    moment,
    VDatePicker
  },
  data() {
    return {
      countries: [],
      emailTemplateTypes: [],
      emailTemplateContent: null,
      monthYear: { month: 1, year: 1983 },
      form: {
        content: '',
        document: '',
        user_type: '',
        template_type: '',
        emailList: null,
        statement: null,
        repeats: null,
        recurs: null,
        send_time: '',
        ends_with: '',
        occurrence_value: null,
        end_date: '',
        end_month: '',
        start_date: '',
        start_month: '',
        day_of_week: []
      },
      languageId: null,
      editorConfig: {
        // The configuration of the editor.
        fullPage: true,
        dangerousHtml: true,
        allowedContent: true
      }
    }
  },

  mounted() {},

  created() {
    this.$validator.extend('min_time', {
      getMessage: (field) => 'minimum task time is 15 minutes.',
      validate: (value) => {
        return Number(value) > 0
      }
    })
  },

  computed: {
    ...mapState('leDocument', ['StatementName', 'repeats_type', 'recursTypeWeeks', 'recursTypeMonths', 'ends_type']),
    validateForm() {
      return !this.errors.any()
    },

    repeatsType() {
      if (this.form.repeats == 'weekly') {
        return this.recursTypeWeeks.map(x=>({...x, label: this.$t(x.label)}))
      } else if (this.form.repeats == 'monthly') {
        return this.recursTypeMonths.map(x=>({...x, label: this.$t(x.label)}))
      }
    },
    
  },
  methods: {
    ...mapActions('emailschedule', { setEmailScheduler: 'setEmailScheduler' }),

    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const data = new FormData()

      data.append('day_of_week', this.form.day_of_week)
      if (this.form.start_date) {
        data.append('start_date', moment(this.form.start_date).format('YYYY-MM-DD') || null)
      }
      if (this.form.start_month) {
        data.append('start_month', moment(this.form.start_month).format('YYYY-MM') || null)
      }
      data.append('ends_with', this.form.ends_with)
      if (this.form.ends_with === 'after_occurrence') {
        data.append('occurrence', this.form.occurrence_value)
      }
      if (this.form.ends_with === 'select_date') {
        if (this.form.end_date) {
          data.append('end_date', moment(this.form.end_date).format('YYYY-MM-DD') || null)
        }
        if (this.form.end_month) {
          data.append('end_month', moment(this.form.end_month).format('YYYY-MM') || null)
        }
      }
      data.append('send_time', moment(this.form.send_time).format('hh:mm'))
      data.append('recurs', this.form.recurs)
      data.append('repeats', this.form.repeats)
      data.append('statement', this.form.statement)
      data.append('content', this.form.content)
      data.append('languageId', this.languageId)
      data.append('template_type', this.emailTemplateTypes.find((x) => x.value === this.form.template_type).label)

      let selectId = document.getElementById('selected_box')
      let inputSelect = selectId.getElementsByTagName('input')
      for (let i = 0; i < inputSelect.length; i++) {
        if (inputSelect[i].checked) {
          this.form.day_of_week.filter((x) => this.form.day_of_week.includes(inputSelect[i].value))
        }
      }

      this.$refs['profileimage'] &&
        this.$refs['profileimage'].filesx.forEach((file) => {
          data.append('attachment', file)
        })
      this.$refs['emailList'] &&
        this.$refs['emailList'].filesx.forEach((file) => {
          data.append('email_file', file)
        })

      try {
        const { message } = await this.setEmailScheduler(data)

        this.form.content = ''
        this.form.user_type = ''
        this.form.occurrence_value = ''

        if (this.$refs.profileimage) {
          this.$refs.profileimage.value = null
        }

        if (this.$refs.emailList) {
          this.$refs.emailList.value = null
        }

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        window.location.href = `/scheduled-email/list/`
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

    // get email template type
    async getEmailTemplateTypes(languageId) {
      this.$store
        .dispatch('setting/getAllEmailTypes', {
          languageId: languageId
        })
        .then((res) => {
          this.emailTemplateTypes = res.data.map((x) => ({ label: x.template_type, value: x.id }))
        })
    },

    // get email template by template id
    async getEmailTemplateById(id) {
      this.$store.dispatch('setting/getEmailTemplateById', id).then(({ data }) => {
        this.emailTemplateContent = data.data.content
        this.form.content = data.data.content
        this.handleEmailPreview()
      })
    },

    // handle email preview
    async handleEmailPreview() {
      if (document.querySelector('.email-preview')) {
        document.querySelector('.email-preview').innerHTML = this.form.content
      }
    },

    filterKey(e) {
      const key = e.key

      // If is '.' key, stop it
      if (key === '.') return e.preventDefault()

      // OPTIONAL
      // If is 'e' key, stop it
      if (key === 'e') return e.preventDefault()
    },

    // This can also prevent copy + paste invalid character
    filterInput(e) {
      e.target.value = e.target.value.replace(/[^0-9]+/g, '')
    },

    // remove email list
    removeEmailListHandler() {
      this.$refs.emailList.value = null
    },

    // remove profile image
    removeProfileImageHandler() {
      this.$refs.profileimage.filesx = []
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

    'form.template_type': {
      immediate: true,
      handler() {
        if (this.form.template_type) {
          this.getEmailTemplateById(this.form.template_type)
        }
      }
    },
    'form.ends_with': {
      handler() {
        this.form.occurrence_value = null
        if (this.form.ends_with == 'select_date') {
          const repeats = this.form.repeats == 'weekly' ? 'w' : 'M'
          const days =
            this.form.recurs == 'one_weeks' || this.form.recurs == 'one_month'
              ? 1
              : this.form.recurs == 'two_weeks' || this.form.recurs == 'two_month'
              ? 2
              : this.form.recurs == 'three_weeks' || this.form.recurs == 'three_month'
              ? 3
              : this.form.recurs == 'four_weeks' || this.form.recurs == 'four_month'
              ? 4
              : ''
        } else {
          this.form.select_Date = ''
        }
      }
    },

    'form.content': {
      immediate: true,
      handler() {
        this.handleEmailPreview()
      }
    },
    'form.repeats': {
      immediate: true,
      handler() {
        this.form.ends_with = ''
        this.form.recurs = ''
        this.form.end_date = ''
        this.form.end_month = ''
        this.form.start_date = ''
        this.form.start_month = ''
      }
    },

    languageId: {
      handler(newval) {
        if (newval) {
          this.form.template_type = ''
          this.getEmailTemplateTypes(newval)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.email_list {
  background-color: #f5f5f5;
  border-radius: 0.8rem;

  .con-upload {
    @media (max-width: 1024px) {
      width: 210px;
    }

    .con-img-upload {
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;

      .con-input-upload {
        border: 1px dashed rgba(var(--vs-primary), 0.5);
        height: 45px;
        margin-bottom: 0 !important;
        margin-top: 0 !important;
        order: 1;

        @media (max-width: 575px) {
          width: 100%;
        }
      }

      .img-upload {
        margin: 15px 15px 0 0px;
        order: 2;
      }
    }
  }

  .con-input-upload.disabled-upload {
    display: flex !important;
    opacity: 1 !important;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.attachment_file {
  background-color: #f5f5f5;
  border-radius: 0.8rem;

  .con-img-upload {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;

    .con-input-upload {
      border: 1px dashed rgba(var(--vs-primary), 0.5);
      height: 45px;
      margin-bottom: 0 !important;
      margin-top: 0 !important;
      order: 1;

      @media (max-width: 575px) {
        width: 100%;
      }
    }

    .img-upload {
      width: 400px;
      margin: 15px 15px 0 0px;
      order: 2;

      @media (max-width: 575px) {
        width: 100%;
      }

      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
}

.file-browse {
  input::-webkit-file-upload-button {
    visibility: hidden;
  }
}

#page-add-emaployer {
  .con-img-upload {
    margin-top: 0;
    background-color: transparent !important;

    .con-input-upload {
      margin: 5px 15px 15px 0;
      padding: 20px;
      background: transparent !important;
      border: 1px dashed #e49393;
    }
  }

  .payment_date {
    .vs-con-input {
      .vs-input--placeholder {
        &.normal {
          padding: 0.4rem 0.55rem !important;
        }
      }
    }
  }

  .vs-button {
    @media (max-width: 575px) {
      width: 100%;
    }
  }

  .vs-card--content {
    margin-bottom: 0;
  }

  .select-lang {
    height: 40%;
    background-color: #ddd;
    border-radius: 1rem;
  }

  .add-attachment-view {
    height: 60%;
    background-color: #ddd;
    border-radius: 1rem;
  }

  .form-control {
    width: 100%;
    padding: 8px 15px;
    background-color: #f7f5f4;
    border-radius: 10px;
    height: 40px;
    border: transparent;

    .dropdown-color {
      .con-select {
        .input-select-con {
          input {
            background-color: #f7f5f4;
            border: transparent;
          }
        }
      }
    }
  }
}

.email-preview {
  height: 100%;
  background-color: rgba(221, 221, 221, 0.52);
  border-radius: 1rem;
}

.dropdown-color {
  .con-select {
    .input-select-con {
      .input-select {
        background-color: #f7f5f4;
        border: transparent;
      }
    }
  }
}

.dropdown-color {
  .vs-con-input {
    .vs-inputx {
      background-color: #f7f5f4;
      border: transparent !important;
    }
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

.occurrence-wrapper {
  display: inline-block;
  border-radius: 10px;
  border: 2px solid #e4e6e7;

  .inpult-area {
    outline: none;
    padding: 0 8px;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background-color: #f7f5f4;
    border: transparent !important;
    text-align: center;
  }
}

.week-wrapper {
  height: 43px;
  width: 43px;

  @media (max-width: 575px) {
    height: 38px;
    width: 38px;
  }

  input {
    &.input-checked {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      opacity: 0;

      &:checked {
        ~ label {
          background-color: #7e7e7f;
          color: #fff;
        }
      }
    }
  }

  .lable-checked {
    background-color: #f7f5f4;
    border-radius: 10px;
    border: 2px solid #e4e6e7;
  }
}
</style>
