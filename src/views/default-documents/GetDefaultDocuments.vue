<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_upload_files_that_will_be_visible_for_all_LEs.') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="750px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        :max-items="this.length"
        search
        :data="defaultDocuments"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="document.document_name">{{ $t('title') }}</vs-th>
          <vs-th sort-key="user.full_name">{{ $t('description') }}</vs-th>
          <vs-th sort-key="document.document_name" v-if="checkPermissionByIds([permissions.DEFAULT_DOCUMENT_DELETE])">{{ $t('document_view') }}</vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center lg:mb-0 md:mb-3 md:w-auto w-full">
            <div class="mb-3 lg:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
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
              @click="addDefaultDocumentRecord"
              v-if="checkPermissionByIds([permissions.DEFAULT_DOCUMENT_ADD])"
              class="btn-add-new p-2 md:mr-4 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary sm:ml-auto sm:w-auto w-full text-center"
            >
              <span class="text-base text-primary">{{ $t('add_document') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              <div class="flex">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <span @click="viewLEDocumentViewRecord(tr.id)">{{ tr.title }}</span>
                </div>
              </div>
            </vs-td>
            <vs-td>{{ tr.description }}</vs-td>
            <vs-td v-if="checkPermissionByIds([permissions.DEFAULT_DOCUMENT_DELETE])">
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.Viewdocument')">
                  <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewDocument(tr.file_path)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.Deletedocument')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.id)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="centerx">
        <vs-pagination :total="Math.ceil(FilteredCount / length)" v-model="page"></vs-pagination>
      </div>
    </div>
    <!-- pdf container -->
    <div id="pdf-container"></div>
    <AddDocumentModale v-if="isDefaultDocumemtModalMounted" :isModalShow.sync="isDefaultDocumemtModalShow" @done="getData" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import LelDocument from '../pdf/LelDocument.vue'
import Vue from 'vue'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import AddDocumentModale from './components/AddDocumentModale.vue'

export default {
  name: 'DefaultDocumentsList',
  components: {
    Select2,
    AddDocumentModale
  },
  data() {
    return {
      length: 10,
      page: 1,
      generating: false,
      documentType: null,
      documentTypeOptions: [],
      isDefaultDocumemtModalMounted: false,
      isDefaultDocumemtModalShow: false,
      imageLink: null
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('defaultDocument', ['loading', 'total', 'FilteredCount', 'defaultDocuments']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds'])
  },
  methods: {
    ...mapActions('defaultDocument', {
      getDefaultDocuments: 'getDefaultDocuments',
      deleteDocumentRecord: 'deleteDocumentRecord'
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
      const ap = document.querySelector('#mount-node')
      if (ap) {
        ap.remove()
      }
      const elem = document.querySelector('#pdf-container')
      const mounteNode = document.createElement('div')
      mounteNode.id = 'mount-node'
      elem.append(mounteNode)

      const pdfEmp = Vue.extend(LelDocument)
      new pdfEmp({
        propsData: {
          leDocData: docData
        }
      })
        .$on('downloaded', () => {
          this.generating = false
        })
        .$mount('#mount-node')
    },
    getData() {
      this.getDefaultDocuments({
        limit: this.length,
        page: this.page,
        search: this.search,
        order: this.order,
        default_document: true
      })
    },
    viewSingleEntrepreneur(id, tr) {
      this.$store.commit('jobseeker/SET_STATE', {
        action: 'seekerProfileId',
        data: tr.seeker.id
      })

      localStorage.setItem('seekerProfileInfoId', id)
      this.$router.push(`/jobseeker/${tr.seeker.id}/info`)
    },
    // add default document
    addDefaultDocumentRecord() {
      this.isDefaultDocumemtModalMounted = true
      this.isDefaultDocumemtModalShow = true
    },
    // view resume
    viewDocument(link) {
      window.open(link)
    },
    viewLEDocumentViewRecord(id) {
      this.$router.push(`/send/le-documents/view-seeker/${id}`)
    },
    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.documentDelete'),
        accept: () => this.deleteDocument(id),
        acceptText: 'Delete'
      })
    },
    async deleteDocument(id) {
      try {
        const { message } = await this.deleteDocumentRecord(id)
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
  beforeRouteLeave(to, from, next) {
    this.isDefaultDocumemtModalShow = false
    setTimeout(() => {
      next()
    }, 0)
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

    page() {
      this.handleChangePage(this.page)
    },

    documentType: {
      immediate: true,
      handler() {
        this.getData()
      }
    },
    isDefaultDocumemtModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isDefaultDocumemtModalMounted = false
          }, 0)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
.con-input-search.vs-table--search {
  @media (max-width: 768px) {
    margin-top: -15px;
  }
}
.vuesax-app-is-ltr .vs-table--search {
  max-width: 100%;

  @media (max-width: 768px) {
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
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
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
.vh-hight-table {
  .vs-con-tbody {
    max-height: calc(100vh - 110px) !important;
  }
}
</style>
