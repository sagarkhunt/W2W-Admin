<template>
  <div id="page-add-emaployer">
    <div class="mb-6 desc">{{ $t('here_you_can_send_important_doc_to_LE_who_is_selected') }}</div>
    <vs-card class="p-2">
      <div class="vx-row pt-5 px-5">
        <div class="vx-col w-full lg:w-full lg:gap-x-10 gap-x-5 px-6 grid lg:grid-cols-2">
          <div class="vx-row mb-2">
            <label for="">{{ $t('title') }}</label>
            <vs-input class="w-full" v-validate="'required'" name="Title" v-model="form.title" />
            <span class="text-primary text-sm" v-show="errors.has('Title')">{{ errors.first('Title') }}</span>
          </div>
          <div class="vx-row mb-2">
            <label for="">{{ $t('description') }}</label>
            <vs-input class="w-full" v-validate="'required'" name="Description" v-model="form.description" />
            <span class="text-primary text-sm" v-show="errors.has('Description')">{{ errors.first('Description') }}</span>
          </div>
          <div class="mb-2">
            <label for="">{{ $t('attach_file') }}</label>
            <div class="vx-row mb-2 mt-1">
              <vs-upload :value="form.document" ref="document" text="Upload Document" :show-upload-button="false" />
            </div>
          </div>
          <div class="vx-row flex-col">
            <label>{{ $t('select_seeker') }}</label>
            <v-select
              :placeholder="$t('select_seeker')"
              v-model="form.slectedSeeker"
              @search="handleSearchSeeker"
              :menu-props="{ maxHeight: '400' }"
              :options="seekerOption"
              class="border-input"
              multiple
            />
            <span class="text-primary text-sm" v-show="errors.has('seeker')">{{ errors.first('seeker') }}</span>
          </div>
        </div>
      </div>
      <!-- Save & Reset Button -->
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="mt-2 lg:ml-4 flex flex-wrap items-center lg:justify-start justify-center">
            <vs-button class="mr-2 vs-con-loading__container" id="add-employer" @click="save_changes" type="relief" :disabled="!validateForm">{{ $t('send_documents') }}</vs-button>
            <vs-button @click="cancelForm" color="dark" type="border" class="text-left text-black">{{ $t('cancel') }} </vs-button>
          </div>
        </div>
      </div>
    </vs-card>

    <!-- <vs-card> -->
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
        :max-items="this.length"
        search
        :data="allLEDocuments"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="created_at">{{ $t('sent_on') }}</vs-th>
          <vs-th sort-key="title">{{ $t('title') }} </vs-th>
          <vs-th>{{ $t('description') }}</vs-th>
          <vs-th>{{ $t('seeker_name') }}</vs-th>
          <vs-th>{{ $t('status') }}</vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 sm:w-auto w-full">
            <div class="mb-4 md:mb-0 sm:mr-4 ag-grid-table-actions-left w-auto">
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
                <vs-dropdown-menu>
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
            <div class="mb-4 md:mb-0 sm:mr-4 ag-grid-table-actions-left ml-auto">
              <vs-row vs-justify="flex-end">
                <vx-tooltip :text="$t('tooltip.DownloadPdf')">
                  <vs-button class="mr-1 vs-con-loading__container" id="doc_pdf" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="downloadDocPdf(allLEDocuments)">{{
                    $t('pdf')
                  }}</vs-button>
                </vx-tooltip>
              </vs-row>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td> {{ formatDate(tr.created_at) }} </vs-td>
            <vs-td> {{ tr.title }} </vs-td>
            <vs-td> {{ tr.description }} </vs-td>
            <vs-td>
              <p @click="viewSingleEntrepreneur(tr.seekerId, tr.userId)">{{ tr.full_name || '-' }}</p></vs-td
            >
            <vs-td> {{ tr.is_seen }} </vs-td>

            <vs-td>
              <div class="flex">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Viewdocument')">
                    <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewLEDocumentRecord(tr.file_path)" />
                  </vx-tooltip>
                </div>
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Deletedocument')">
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                  </vx-tooltip>
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>

    <!-- View Le Document Record-->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="viewDocumentPopup" :title="$t('model.ViewLEDocument')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="name">{{ $t('sent_on') }}</label>
          <vs-input id="name" class="w-full" name="name" v-model="document_form.sent_on" disabled />
        </div>
        <div class="vx-row mb-2">
          <label for="name">{{ $t('name') }} </label>
          <vs-input id="name" class="w-full" name="name" v-model="document_form.title" disabled />
        </div>
        <div class="vx-row mb-2">
          <label for="description">{{ $t('description') }}</label>
          <vs-input id="description" class="w-full" name="description" v-model="document_form.description" disabled />
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="viewDocumentPopup = false"> {{ $t('close') }} </vs-button>
        </div>
      </div>
    </vs-popup>
    <!-- End View Le Document Record-->

    <!-- pdf container -->
    <div id="pdf-container"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import SendLelDocument from '../pdf/sendLelDocument.vue'
import Vue from 'vue'
export default {
  name: 'SendLeEDocument',
  data() {
    return {
      countries: [],
      seekerOption: [],
      order: [],
      length: 10,
      page: 1,
      form: {
        title: null,
        description: null,
        document: null,
        slectedSeeker: []
      },
      viewDocumentPopup: false,
      document_form: {
        title: '',
        description: '',
        sent_on: ''
      },

      employerFilters: {
        page: 1,
        limit: 20,
        search: null
      },
      generating: false
    }
  },
  mixins: [dateMixins],
  async mounted() {
    this.getData()

    this.fetchSeekerList()
  },
  computed: {
    ...mapState('employer', ['loading', 'total', 'FilteredCount', 'allLEDocuments']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('employer', { sendLEDocument: 'sendLEDocument', getLEDocuments: 'getLEDocuments', deleteLeDocument: 'deleteLeDocument' }),

    // fetch seeker list
    async fetchSeekerList() {
      await this.$store
        .dispatch('employer/getSeeker', this.employerFilters)
        .then((res) => {
          this.seekerOption = res.data
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

    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },
    handleChangePage(page) {
      this.page = page
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    async downloadDocPdf(docData) {
      this.generating = true

      setTimeout(() => {
        const ap = document.querySelector('#mount-node')
        if (ap) {
          ap.remove()
        }
        const elem = document.querySelector('#pdf-container')
        const mounteNode = document.createElement('div')
        mounteNode.id = 'mount-node'
        elem.append(mounteNode)

        const pdfEmp = Vue.extend(SendLelDocument)
        new pdfEmp({
          propsData: {
            sendLeDocData: docData
          }
        })
          .$on('downloaded', () => {
            setTimeout(() => {
              this.generating = false
            }, 2000)
          })
          .$mount('#mount-node')
      }, 100)
    },
    getData() {
      this.getLEDocuments({
        limit: this.length,
        page: this.page,
        order: this.order,
        search: this.search
      })
    },
    //delete job seeker
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteLeDocumentRecord(id),
        acceptText: 'Delete'
      })
    },
    async deleteLeDocumentRecord(id) {
      try {
        const { message } = await this.deleteLeDocument(id)
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
    },

    //view light Entrepreneur
    viewSingleEntrepreneur(seekerId, userId) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: userId
      })
      localStorage.setItem('seekerProfileInfoId', userId)
      this.$router.push(`/jobseeker/${seekerId}/info`)
    },

    viewLEDocumentRecord(data) {
      window.open(data)
    },
    viewLEDocumentViewRecord(id) {
      this.$router.push(`/send/le-documents/view-seeker/${id}`)
    },
    async save_changes() {
      if (!(await this.$validator.validate())) {
        return false
      }
      const seekerId = []
      this.form.slectedSeeker.map((element) => {
        return seekerId.push(element.value)
      })
      const data = new FormData()
      data.append('title', this.form.title)
      data.append('description', this.form.description)
      data.append('seekerIds', JSON.stringify(seekerId))
      this.$refs['document'].filesx.forEach((file) => {
        data.append('document', file)
      })
      try {
        const { message } = await this.sendLEDocument(data)
        this.form.title = ''
        this.form.description = ''
        this.$refs.document.value = null
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        window.location.href = `/send/le-documents/`
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

    // handle search seeker
    handleSearchSeeker(val) {
      if (this.employerFilters.search !== val) {
        this.employerFilters.search = val

        this.fetchSeekerList()
      }
    },

    cancelForm() {
      this.$router.go()
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '.vx-card',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('.vx-card > .con-vs-loading')
      }
    },
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#doc_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#doc_pdf  > .con-vs-loading')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.file-browse {
  input::-webkit-file-upload-button {
    visibility: hidden;
  }
}

.desc {
  margin-top: -1.25rem !important;

  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
<style lang="scss">
.con-img-upload {
  margin-top: 0;
  padding-top: 0;

  .con-input-upload,
  .img-upload {
    margin: 5px 15px 15px 0;
  }
}

.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 1200px;
  }
}

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

  @media (max-width: 576px) {
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

.vs-table.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 1400px;
  }
}

.vs-card--content {
  padding: 10px;

  @media (max-width: 768px) {
    padding: 2px;
  }
}
</style>
