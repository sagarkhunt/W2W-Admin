<template>
    <div id="page-add-emaployer">
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
          :total="FilteredCountView"
          pagination
          :max-items="this.length"
          search
          :data="allLEDocumentsSeekerView"
        >
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('status') }} </vs-th>
            <vs-th sort-key="full_name">{{ $t('full_name') }} </vs-th>
            <vs-th sort-key="email">{{ $t('email') }} </vs-th>
            <!-- <vs-th>{{ $t('phone_number') }} </vs-th> -->
            <vs-th>{{ $t('gender') }} </vs-th>
          </template>
  
          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div class="sm:mr-4 ag-grid-table-actions-left sm:w-auto w-full">
                <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                  <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ page * length - (length - (FilteredCountView && 1)) }}
                      -
                      {{ FilteredCountView - page * length > 0 ? page * length : FilteredCountView }}
                      {{ $t('of') }} {{ FilteredCountView }} {{ $t('filtered_from') }} {{ totalView }}
                      {{ $t('total_entries') }}
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
              <!-- <div class="mb-4 md:mb-0 sm:mr-4 ag-grid-table-actions-left ml-auto">
                <vs-row vs-justify="flex-end">
                  <vx-tooltip text="Download PDF">
                    <vs-button class="mr-1" type="filled" color="primary" icon-pack="feather" icon="icon-download" @click="downloadDocPdf(allLEDocumentsSeekerView)">PDF</vs-button>
                  </vx-tooltip>
                </vs-row>
              </div> -->
            </div>
          </template>
  
          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td> {{ tr.is_seen }} </vs-td>
              <vs-td> {{ tr.seeker.user.full_name || '-' }} </vs-td>
              <vs-td> {{ tr.seeker.user.email || '-' }} </vs-td>
              <!-- <vs-td> {{ tr.seeker.user.phone_number || '-' }} </vs-td> -->
              <vs-td> {{ tr.seeker.user.gender || '-' }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- </vs-card> -->
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
        length: 10,
        page: 1,
        order: [],
        viewDocumentPopup: false,
        document_form: {
          title: '',
          description: '',
          sent_on: ''
        }
      }
    },
    mixins: [dateMixins],
    async mounted() {
      this.getData()
    },
    computed: {
      ...mapState('employer', ['loadingView', 'totalView', 'FilteredCountView', 'allLEDocumentsSeekerView']),
      validateForm() {
        return !this.errors.any()
      }
    },
    methods: {
      ...mapActions('employer', { getLEDocumentsView: 'getLEDocumentsView' }),
  
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
  
        const pdfEmp = Vue.extend(SendLelDocument)
        new pdfEmp({
          propsData: {
            sendLeDocData: docData
          }
        })
          .$on('downloaded', () => {
            this.generating = false
          })
          .$mount('#mount-node')
      },
      getData() {
        const payload = {
          limit: this.length,
          page: this.page,
          search: this.search,
          order: this.order
        }
        this.getLEDocumentsView({ id: this.$route.params.id, payload })
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
  </style>
  <style lang="scss">
  .vs-table--tbody-table {
    @media (max-width: 768px) {
      min-width: 1200px;
    }
  }
  
  .vs-table--header,
  .vs-table--search {
    flex-wrap: wrap;
  
    @media (max-width: 576px) {
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
  
    @media (max-width: 576px) {
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