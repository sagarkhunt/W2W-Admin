<template>
  <div>
    <div class="document__list md:mb-4">
      <div class="ag-grid-table-actions-left btn-margin" id="pdf-loading">
        <vs-row vs-justify="flex-end">
          <vx-tooltip :text="$t('tooltip.DownloadPdf')">
            <vs-button class="mr-1 vs-con-loading__container" type="filled" color="primary" icon-pack="feather" icon="icon-download" id="pdf_button" @click="teamInvoicePdf(teamInvoiceInfo)">{{
              $t('pdf_1')
            }}</vs-button>
          </vx-tooltip>
        </vs-row>
      </div>
      <div class="grid xl:grid-cols-2 gap-10">
        <div class="pph-wrapper">
          <div class="logo-fi pb-3">
            <img src="/img/way2work-logo.b6073a49.png" alt="img" class="h-full w-full object-contain" />
          </div>
          <div class="pph-left-box">
            <h1 class="font-semibold pb-3">{{ $t('company_details') }}</h1>
            <div class="pph-left-content">
              <div class="company-content">
                <!-- company name -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('name') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.company_name) || '-' }}</p>
                </div>

                <!-- contact name -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('contactName') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.user && teamInvoiceInfo.team_invoice_company.user.full_name) || '-' }}</p>
                </div>

                <!-- company email -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('email') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.user && teamInvoiceInfo.team_invoice_company.user.email) || '-' }}</p>
                </div>

                <!-- company phone -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('phone') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.mobile) || '-' }}</p>
                </div>

                <div class="company-text">
                  <p class="company-titel">{{ $t('country') }} :</p>
                  <p class="company-value">
                    {{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.countryReference && teamInvoiceInfo.team_invoice_company.countryReference.country_name) || '-' }}
                  </p>
                </div>

                <div class="company-text">
                  <p class="company-titel">{{ $t('city') }} :</p>
                  <p class="company-value">
                    {{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.cityReference && teamInvoiceInfo.team_invoice_company.cityReference.city_name) || '-' }}
                  </p>
                </div>

                <!-- company address -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('address') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.address) || '-' }}</p>
                </div>

                <!-- employer ssn -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('zip_code') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.zip_code) || '-' }}</p>
                </div>

                <!-- employer y tunnus -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('employer_y_tunnus') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.reg_number) || '-' }}</p>
                </div>

                <div class="company-text">
                  <p class="company-titel">{{ $t('operator_code') }}:</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.operator_code) || '-' }}</p>
                </div>
                <div class="company-text">
                  <p class="company-titel">{{ $t('tax_number') }} :</p>
                  <p class="company-value">{{ (teamInvoiceInfo.team_invoice_company && teamInvoiceInfo.team_invoice_company.tax_number) || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="red-wrapper">
          <div class="pb-8 flex justify-between">
            <h1 class="font-semibold">
              {{ teamInvoiceInfo.created_by && teamInvoiceInfo.created_by.seeker && teamInvoiceInfo.created_by.seeker.user && teamInvoiceInfo.created_by.seeker.user.full_name }} Invoice
            </h1>
          </div>
          <div class="red-box">
            <div class="relative z-3">
              <div class="mb-3 flex justify-between">
                <div>
                  <h5 class="title-lg text-white mb-1">{{ $t('invoiced_date') }}</h5>
                  <p class="text-light text-md-fw">{{ formatDate(teamInvoiceInfo.created_at) }}</p>
                </div>
                <div v-if="teamInvoiceInfo.mark_as_wrong">
                  <div class="tbl-status">
                    <span class="sts-wait flex items-center justify-center">
                      <p class="">{{ $t('credited') }}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('invoice_Number') }}</h5>
                <p class="text-light text-md-fw">{{ teamInvoiceInfo.invoice_number || '-' }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('reference_number') }}</h5>
                <p class="text-light text-md-fw">{{ teamInvoiceInfo.ref_number || '-' }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('due_date') }}</h5>
                <p class="text-light text-md-fw">{{ teamInvoiceInfo.due_date || '-' }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('late_paymentinterest') }}</h5>
                <p class="text-light text-md-fw">{{ teamInvoiceInfo.panelty_interest || '-' }}</p>
              </div>
              <div class="mb-3" v-if="teamInvoiceInfo.company && teamInvoiceInfo.company.reg_number">
                <h5 class="title-lg text-white mb-1">{{ $t('company_id') }}</h5>
                <p class="text-light text-md-fw">{{ teamInvoiceInfo.company && teamInvoiceInfo.company.reg_number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white pb-3 mt-10">
        <div class="employer-details flex justify-between items-center">
          <h1 class="font-semibold">{{ $t('seeker_work_hour_list') }}</h1>
        </div>
        <div class="daily-Work-Details bg-white">
          <div class="daily-work-row pt-5">
            <div class="daily-work-col">
              <!-- payment sharing head -->
              <div class="details-head text-center flex items-center text-white">
                <div class="member-name">
                  <p class="details-head-text text-start font-bold">{{ $t('seeker_name') }}</p>
                </div>

                <div class="role-member">
                  <p class="details-head-text font-bold">{{ $t('role') }}</p>
                </div>

                <div class="email-address">
                  <p class="details-head-text font-bold">{{ $t('email_address') }}</p>
                </div>

                <div class="share-value">
                  <p class="details-head-text font-bold">{{ $t('share') }}</p>
                </div>

                <div class="Tax-value">
                  <p class="details-head-text font-bold">{{ $t('tax_percentage') }}</p>
                </div>

                <div class="allowances">
                  <p class="details-head-text font-bold">{{ $t('allowances') }}</p>
                </div>
                <div class="payment">
                  <p class="details-head-text font-bold">{{ $t('will_be_paid') }}</p>
                </div>
                <div class="actions">
                  <p class="details-head-text font-bold">{{ $t('action') }}</p>
                </div>
              </div>

              <!-- payment sharing list - row -->
              <div v-for="(item, index) in teamInvoiceInfo.invoice_seekers || []" :key="index">
                <div class="details-content">
                  <div class="member-name text-start">
                    <div class="flex items-center">
                      <p class="">{{ item.seeker.user.full_name }}</p>
                    </div>
                  </div>

                  <div class="role-member flex items-center justify-center">
                    <div class="w-30 h-30">
                      <img :src="require(`@/assets/images/${teamInvoiceInfo.created_by.seeker.id === item.seeker.id ? 'leader-icon.svg' : 'member-icon.svg'}`)" class="w-full h-full" alt="err" />
                    </div>
                  </div>

                  <div class="email-address text-center">
                    <div>
                      <p>{{ item.seeker.user.email }}</p>
                    </div>
                  </div>

                  <div class="share-value ml-xl-0 ml-3 text-center">
                    € {{ teamInvoiceInfo.mark_as_wrong ? -(item.shared_amount && Number(item.shared_amount).toFixed(2)) : item.shared_amount && Number(item.shared_amount).toFixed(2) }}
                  </div>

                  <div class="Tax-value text-center">
                    <p>{{ teamInvoiceInfo.mark_as_wrong ? -item.tax : item.tax }}%</p>
                  </div>

                  <div class="allowances text-center">
                    <p>€ {{ teamInvoiceInfo.mark_as_wrong ? -item.compensation_amount.toFixed(2) : item.compensation_amount.toFixed(2) }}</p>
                  </div>

                  <div class="payment text-center">
                    <div>
                      <p class="text-red">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.seeker_company_pay.toFixed(2) : item.seeker_company_pay.toFixed(2) }}</p>
                    </div>
                  </div>
                  <div class="actions flex justify-center items-center text-center">
                    <!-- expand work detail -->
                    <div class="down-btn" v-if="index !== showWorkDetail" @click="expandWorkDetails(index)">
                      <feather-icon icon="ChevronDownIcon" svgClasses="w-6" />
                    </div>
                    <div class="down-btn" v-if="index === showWorkDetail" @click="expandWorkDetails(index)">
                      <feather-icon icon="ChevronUpIcon" svgClasses="w-6" />
                    </div>
                  </div>
                </div>

                <!-- payment sharing row expand -->
                <div class="opne-toggle p-3" v-if="index === showWorkDetail">
                  <!-- daily work hour list - column name -->
                  <div class="details-head text-center text-white">
                    <div class="product-no">
                      <p class="details-head-text font-bold">{{ $t('invoice_details') }}</p>
                    </div>
                    <div class="team-member">
                      <p class="details-head-text font-bold">{{ $t('date') }}</p>
                    </div>
                    <div class="discription">
                      <p class="details-head-text font-bold">{{ $t('value') }}</p>
                    </div>
                    <div class="contract-type">
                      <p class="details-head-text font-bold">{{ $t('quantity') }}</p>
                    </div>
                    <div class="quantity">
                      <p class="details-head-text font-bold">{{ $t('total') }}</p>
                    </div>
                  </div>
                  <div class="text-black font-bold" v-if="(item.workHours || []).length">
                    <div v-for="(itemRaw, index) in item.workHours || []" :key="index">
                      <div class="row no-gutters border-box">
                        <div class="details-content">
                          <!-- serial no. -->
                          <div class="product-width">
                            <div class="product-1 text-center">
                              <p class="inpult-area">{{ itemRaw.description }}</p>
                            </div>
                          </div>

                          <!-- description -->
                          <div class="work-width text-center">
                            <p>{{ formatDate(itemRaw.date) }}</p>
                          </div>

                          <!-- description -->
                          <div class="work-width text-center">
                            <p>{{ teamInvoiceInfo.mark_as_wrong ? -itemRaw.contract_value : itemRaw.contract_value || '-' }}</p>
                          </div>

                          <!-- contract type -->
                          <div class="hours-width me-2 text-center">
                            <p>{{ teamInvoiceInfo.mark_as_wrong ? -itemRaw.total_work : itemRaw.total_work || '-' }}</p>
                          </div>
                          <!-- contract value -->
                          <div class="contractvalue-width text-center">
                            <p>{{ teamInvoiceInfo.mark_as_wrong ? -(itemRaw.contract_value * itemRaw.total_work) : itemRaw.contract_value * itemRaw.total_work }}</p>
                          </div>
                        </div>
                      </div>

                      <div class="ml-auto total rounded-lg p-5 mt-3 mr-3">
                        <div class="total">
                          <div class="total-excl flex justify-between w-full pb-3">
                            <p class="text-total">{{ $t('total_excl._vat') }}</p>
                            <p class="text-prize text-black font-semibold">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.tax : item.tax || 0 }}</p>
                          </div>
                          <div class="total-excl flex justify-between w-full pb-3">
                            <p class="text-total">{{ $t('total_compensation') }}</p>
                            <p class="text-prize text-black font-semibold">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.compensation_amount.toFixed(2) : item.compensation_amount.toFixed(2) || 0 }}</p>
                          </div>
                          <div class="total-excl border-top-bottom flex justify-between font-semibold text-right text-lg py-2">
                            <p class="all-total text-black">{{ $t('total') }}</p>
                            <p class="total-prize">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.sub_total.toFixed(2) : item.sub_total.toFixed(2) || '0' }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="table-border overflow-hidden" v-else>
                    <div class="row no-gutters border-box flex justify-center">
                      <div class="details-content flex justify-center">{{ $t('no_data_found') }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-auto">
        <div class="bottom-header flex items-center justify-between rounded-lg mb-4">
          <div class="pph-left">
            <h5 class="text-white">{{ $t('summary') }}</h5>
          </div>
          <div class="flex items-center md:ml-auto">
            <div class="mr-5 text-white">
              <p class="text-sm-fw">{{ $t('gross_amount') }}</p>
              <p class="text-sm-fw">
                €
                {{ teamInvoiceInfo.mark_as_wrong ? -(finalTotal.grossSalary ? Number(finalTotal.grossSalary).toFixed(2) : 0) : finalTotal.grossSalary ? Number(finalTotal.grossSalary).toFixed(2) : 0 }}
              </p>
            </div>
            <div class="mr-5 text-white">
              <p class="text-sm-fw">{{ $t('withholding_tax') }}</p>
              <p class="text-sm-fw">
                €
                {{
                  teamInvoiceInfo.mark_as_wrong
                    ? -(finalTotal.taxbledAmount ? Number(finalTotal.taxbledAmount).toFixed(2) : 0)
                    : finalTotal.taxbledAmount
                    ? Number(finalTotal.taxbledAmount).toFixed(2)
                    : 0
                }}
              </p>
            </div>
            <div class="mr-5 text-white">
              <p class="text-sm-fw">{{ $t('compensations') }}</p>
              <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -(Number(finalTotal.compensationAmount).toFixed(2) || 0) : Number(finalTotal.compensationAmount).toFixed(2) || 0 }}</p>
            </div>
            <div class="text-white">
              <p class="text-sm-fw">{{ $t('you_will_be_paid') }}</p>
              <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -(Number(finalTotal.youWillBePaid).toFixed(2) || 0) : Number(finalTotal.youWillBePaid).toFixed(2) || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-auto">
        <div class="bottom-header flex items-center justify-between rounded-lg mb-5">
          <div class="pph-left">
            <h5 class="text-white">{{ $t('recipient') }}</h5>
          </div>
          <div class="flex items-center ml-auto">
            <div class="mr-5 text-white lg:text-md text-sm">
              <p class="text-sm-fw">{{ $t('invoice_total') }}</p>
              <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -(Number(finalTotal.invoiceTotal).toFixed(2) || 0.0) : Number(finalTotal.invoiceTotal).toFixed(2) || 0.0 }}</p>
            </div>
            <div class="text-white lg:text-md text-sm">
              <p class="text-sm-fw">{{ $t('vat_amount') }}</p>
              <p class="text-sm-fw">$ {{ teamInvoiceInfo.mark_as_wrong ? -(finalTotal.vatTotal || 0) : finalTotal.vatTotal || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 class="font-bold mt-5 Title">{{ $t('attachment_list') }}</h1>
      </div>
      <div id="table-loading" class="overflow-auto">
        <table class="w-full table-auto mt-5 table-height overflow-auto" style="height: fit-content">
          <thead class="w-full">
            <tr class="bg-black text-white text-md w-full">
              <th class="w-30">{{ $t('place_of_purchase') }}</th>
              <th>{{ $t('date_of_purchase') }}</th>
              <th>{{ $t('attachments') }}</th>
            </tr>
          </thead>
          <tbody class="text-black font-bold" v-if="(teamInvoiceInfo.invoice_files || []).length">
            <tr :data="tr" :key="i" v-for="(tr, i) in teamInvoiceInfo.invoice_files || []">
              <td>{{ tr.purchase_place || '-' }}</td>
              <td>{{ formatDate(tr.purchase_date) }}</td>
              <td>
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.ViewRecord')">
                    <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewSeekerDocument(tr.file_path)" />
                  </vx-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody class="table-border text-center" v-else>
            <tr>
              <td colspan="3">
                <p class="font-bold py-3 Title text-center">{{ $t('no_data_found') }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="relative mt-12">
        <div class="overflow-auto" :class="!teamInvoiceInfo.approved ? 'blur-overlay' : 'no-blur-overlay'">
          <div class="viewinvoicetable">
            <div class="flex">
              <div style="border-right: 2px solid #000; border-bottom: 2px solid #000" class="p-2 text-start width-13">
                <p>
                  {{ $t('saajan_tilinumero') }}
                </p>
                <p>{{ $t('recipient_bank_number') }}</p>
              </div>
              <div style="width: 33%; border-right: 2px solid #000; border-bottom: 2px solid #000" class="p-2">
                <p>{{ $t('iban') }}</p>
                <p class="ml-2">{{ teamInvoiceInfo.iban }}</p>
              </div>
              <div style="width: 55%; border-bottom: 2px solid #000" class="p-2">
                <p>{{ $t('bic') }}</p>
                <p class="ml-2">
                  {{ $t('bank_bic') }} :
                  {{ teamInvoiceInfo.bic }}
                </p>
              </div>
            </div>

            <div class="flex">
              <div style="height: 223px; border-right: 2px solid #000" class="p-2 width-13">
                <div class="ml-auto text-start">
                  {{ $t('maksajan_nimi') }}
                </div>
                <div class="text-start">
                  {{ $t('payer_name') }}
                </div>
              </div>

              <div class="flex flex-col justify-between p-2" style="width: 33%; border-right: 2px solid #000">
                <div class="p-2">
                  <p>
                    {{ teamInvoiceInfo.created_by && teamInvoiceInfo.created_by.seeker && teamInvoiceInfo.created_by.seeker.user && teamInvoiceInfo.created_by.seeker.user.full_name }}
                  </p>
                </div>
              </div>
              <div style="width: 55%" class="flex items-end">
                <div style="width: 100%; border-top: 2px solid #000" class="flex">
                  <div class="p-2 width_ref">
                    {{ $t('vitenumero_reference_number') }}
                  </div>
                  <div class="flex items-center ml-3">{{ teamInvoiceInfo.ref_number }}</div>
                </div>
              </div>
            </div>

            <div style="border-top: 2px solid #000">
              <div class="flex">
                <div class="p-2 text-end width-13" style="border-right: 2px solid #000; border-bottom: 2px solid #000"></div>
                <div class="p-2" style="width: 33%; border-right: 2px solid #000; border-bottom: 2px solid #000"></div>

                <div class="p-2 flex" style="width: 55%; border-bottom: 2px solid #000">
                  <div class="flex width-44">
                    <div class="width_due_date">
                      {{ $t('erapaiva_due_date') }}
                    </div>
                    <div class="flex items-center ml-3">
                      {{ formatDate(teamInvoiceInfo.due_date) }}
                    </div>
                  </div>
                  <div class="p-2 flex" style="width: 50%">
                    <div style="width: 13%; margin-right: 10px" class="me-2">{{ $t('euro') }}</div>
                    <div class="flex items-center">
                      € {{ teamInvoiceInfo.mark_as_wrong ? -(teamInvoiceInfo.sub_total && teamInvoiceInfo.sub_total.toFixed(2)) : teamInvoiceInfo.sub_total && teamInvoiceInfo.sub_total.toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center my-3" style="height: 72px; justify-content: center">
              <div class="barcode-text">
                <p class="flex items-center justify-content-center">{{ $t('barcode_here') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="go__back absolute shadow" v-if="!teamInvoiceInfo.approved">
          <router-link to="/team-invoices/list">
            <a class="banner-back inline-block">
              <div class="flex items-center">
                <div class="back-icon flex items-center justify-center text-light">
                  <feather-icon icon="ArrowLeftIcon" svgClasses="h-5 w-5 font-semibold cursor-pointer" />
                </div>
                <div class="back-text">
                  <span class="ml-2 mr-5"> {{ $t('back') }} </span>
                </div>
              </div>
            </a>
          </router-link>
        </div>
      </div>
    </div>
    <div id="teamInvoicePdf-container"></div>
    <ImageModale v-if="isAttachmentModalMounted" :isModalShow.sync="isAttachmentModalShow" :imageLink="imageLink" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import ImageModale from './components/ImageModale.vue'
import TeamInvoiceViewPdf from '@/views/pdf/TeamInvoiceViewPdf.vue'
import Vue from 'vue'
import { i18n } from '../../utils/i18n'
export default {
  name: 'TeamInvoiceInfo',
  components: {
    ImageModale
  },
  data() {
    return {
      // Work detail hide and show
      showWorkDetail: null,
      isAttachmentModalMounted: false,
      isAttachmentModalShow: false,
      imageLink: null,
      generating: false
    }
  },
  mounted() {
    this.getData()
  },
  mixins: [dateMixins],
  computed: {
    ...mapState('teaminvoice', ['loading', 'teamInvoiceInfo']),
    finalTotal() {
      const initObj = { grossSalary: 0, taxbledAmount: 0, compensationAmount: 0, youWillBePaid: 0, invoiceTotal: 0, vatTotal: 0 }
      return (
        (this.teamInvoiceInfo.invoice_seekers || []).reduce((acc, item) => {
          acc.grossSalary += Number(item.gross_salary)
          acc.taxbledAmount += Number(item.tax_amount)
          acc.compensationAmount += Number(item.compensation_amount)
          acc.youWillBePaid += Number(item.sub_total)
          acc.invoiceTotal += Number(item.seeker_company_pay)
          acc.vatTotal += Number(item.worked_value)
          return acc
        }, initObj) || initObj
      )
    }
  },
  methods: {
    ...mapActions('teaminvoice', {
      getSingleTeamInvoice: 'getSingleTeamInvoice'
    }),

    expandWorkDetails(index) {
      if (this.showWorkDetail === index) {
        this.showWorkDetail = null
        return false
      }

      this.showWorkDetail = index
    },

    shortenWorkDetails() {
      this.showWorkDetail = null
    },

    getData() {
      this.getSingleTeamInvoice({
        id: this.$route.params.id
      })
    },
    viewSeekerDocument(link) {
      const checkExtenation = link.split(/[#?]/)[0].split('.').pop().trim()
      if (checkExtenation == 'pdf' || checkExtenation == 'docx') {
        window.open(link)
      } else {
        this.imageLink = link
        this.isAttachmentModalMounted = true
        this.isAttachmentModalShow = true
      }
    },
    //downloads PDF
    async teamInvoicePdf(teamInvoiceInfoData) {
      this.generating = true
      setTimeout(() => {
        const ap = document.querySelector('#mount-node')
        if (ap) {
          ap.remove()
        }
        const elem = document.querySelector('#teamInvoicePdf-container')
        const mounteNode = document.createElement('div')
        mounteNode.id = 'mount-node'
        elem.append(mounteNode)
        const pdfEmp = Vue.extend(TeamInvoiceViewPdf, i18n)
        new pdfEmp({
          propsData: {
            teamInvoiceInfo: teamInvoiceInfoData,
            t: i18n
          }
        })
          .$on('downloaded', () => {
            setTimeout(() => {
              this.generating = false
            }, 2000)
          })
          .$mount('#mount-node')
      }, 100)
    }
  },
  watch: {
    loading() {
      if (this.loading) {
        this.$vs.loading({
          container: '#table-loading',
          generating: false,
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#table-loading > .con-vs-loading')
      }
    },

    documentType: {
      immediate: true,
      handler() {
        this.getData()
      }
    },
    isAttachmentModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.imageLink = null
            this.isAttachmentModalMounted = false
          }, 0)
        }
      }
    },
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#pdf_button',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#pdf_button  > .con-vs-loading')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.document__list {
  width: 100%;
  display: block;
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 45px;

  @media (max-width: 768px) {
    padding: 20px 30px;
  }

  @media (max-width: 576px) {
    padding: 15px;
  }

  .logo-fi {
    max-width: 200px;
    width: 100%;
    margin: 0;
    @media (max-width: 576px) {
      margin: 0 auto;
      height: 35px;
    }
  }

  .arrow-width {
    img {
      width: 50px;
    }
  }
  .blur-overlay {
    filter: blur(3px);
    cursor: not-allowed;
    user-select: none;
  }
  .no-blur-overlay {
    filter: blur(0px);
  }

  .grey-box {
    background-color: #f6f6f6;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 20px;

    .grey-col-p {
      padding: 20px;
    }

    &::after {
      content: '';
      background-image: url('~@/assets/images/invoice-address-3.svg');
      background-repeat: no-repeat;
      background-size: contain;
      width: 150px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }

    .bg-black {
      background-color: #000;
      border-radius: 50px;
      padding: 20px;

      .info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .piggi-wrap {
        width: 100px;
        height: 100px;
        position: absolute;
        right: -12px;
        bottom: 15px;
      }
    }
  }
  .viewinvoicetable {
    border: 2px solid #000;
    width: 100%;
    font-weight: bold;

    @media (max-width: 1024px) {
      min-width: 1254px;
    }
    .width-13 {
      width: 16%;
      @media (max-width: 1440px) {
        width: 24%;
      }
    }
    .width-44 {
      width: 36%;
      @media (max-width: 1440px) {
        width: 44%;
      }
    }
    .width_ref {
      width: 22%;
      @media (max-width: 1440px) {
        width: 36%;
      }
      @media (max-width: 1024px) {
        width: 29%;
      }
    }
    .width_due_date {
      width: 32%;
      @media (max-width: 1440px) {
        width: 35%;
      }
    }
  }

  .red-box {
    background-color: rgb(255, 75, 87);
    color: #fff;
    border-radius: 25px;
    box-shadow: 1px 1px 10px 2px rgba(204, 204, 204, 0.55);
    padding: 22px;
    position: relative;
    height: calc(100% - 62px);

    &::after {
      background-position: bottom right;
      content: '';
      background-image: url('~@/assets/images/invoice-red-box-puzzle.svg');
      background-size: contain;
      position: absolute;
      bottom: 0px;
      right: 0px;
      transform: translate(5px, 0px);
      width: 330px;
      height: 330px;
      background-repeat: no-repeat;

      @media (max-width: 1240px) {
        width: 230px;
        height: 230px;
      }

      @media (max-width: 480px) {
        width: 200px;
        height: 200px;
      }
    }

    &::before {
      background-position: bottom right;
      content: '';
      background-image: url('~@/assets/images/payment-img.png');
      background-size: contain;
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 170px;
      height: 170px;
      background-repeat: no-repeat;
      z-index: 1;

      @media (max-width: 1240px) {
        width: 120px;
        height: 120px;
        bottom: 12px;
        right: 4px;
      }
      @media (max-width: 480px) {
        width: 100px;
        height: 100px;
      }
    }
  }
  .red-puzzle {
    &::after {
      content: '';
      background-image: url('~@/assets/images/invoice-puzzle.png');
      background-size: contain;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 110px;
      height: 200px;
      background-repeat: no-repeat;
      z-index: 1;
    }
  }

  .address-text {
    max-width: 200px;
  }

  .info-icon {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #fff;
  }
}

.daily-work-row {
  @media (max-width: 1200px) {
    overflow: auto;
  }
}

.daily-work-col {
  border: 1px solid #dde0e2;
  border-radius: 10px;
  @media (max-width: 1200px) {
    min-width: 900px;
  }
}
.border-box {
  border: 1px solid #dde0e2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.border-b {
  border-bottom: 1px solid #dde0e2;
}
.employer-details {
  .pph-left {
    .title-lg {
      color: #a0a4a9;
      font-size: 26px;
    }
  }
}
.border-spacing-0 {
  border-spacing: 0;
}
.daily-Work-Details {
  .product {
    font-size: 14px;
    padding: 8px 25px;
    border-radius: 12px;
    border: 2px solid #e4e6e7;
  }
  .team-Member {
    width: 100%;
    padding: 8px 20px;
    border-radius: 12px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .multiselect-input {
    border: none !important;
    width: 100%;
    border-radius: 12px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    outline: none;
    padding: 8px 20px;
    background-color: #f6f6f6;
  }
  .contract-Value {
    padding: 8px 10px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    background-color: #f6f6f6;
  }
  .actions-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    color: rgb(255, 75, 87);
    background-color: #f8dddf;
  }
  .opne-toggle {
    border-top: 1px solid #ccc;
    .summary-box {
      background-color: rgb(255, 75, 87);
      height: 320px;
      .summary-text {
        font-size: 48px;
        letter-spacing: -3px;
        line-height: 41px;
        text-shadow: 1px 3px 3px #494848;
      }
    }
    .dark-box {
      height: 320px;
    }
  }
}

.details-content {
  display: flex;
  align-items: center;
  padding: 10px 10px;
  min-width: 900px;

  .product-width {
    width: 20%;

    .product-2 {
      background-color: #fff;
    }
  }
  .work-width {
    width: 23%;

    .work {
      width: 95%;
      padding: 10px;
      border-radius: 12px;
      border: 1px solid #ccc;
      font-size: 14px;
      height: calc(1.9em + 0.75rem + 2px);
      .form-control {
        border: none;
        padding: 0;
        background-color: transparent;
      }
    }
    .programme {
      background-color: #ffff;
    }
  }
  .work {
    border-radius: 50px;
    border: 1px solid #ccc;
  }

  .tax-input {
    width: 95%;
    border-radius: 50px;
    border: 1px solid #ccc;
    font-size: 14px;
    height: calc(1.9em + 0.75rem + 2px);

    .form-control {
      border: none;
      padding: 0;
      background-color: transparent;
    }
  }

  .allowances-input {
    width: 100%;
    padding: 8px 20px;
    border-radius: 50px;
    border: 1px solid #ccc;
    font-size: 14px;
    height: calc(1.9em + 0.75rem + 2px);

    .form-control {
      border: none;
      padding: 0;
      background-color: transparent;
    }
  }
  .hours-width,
  .contractvalue-width {
    width: 22%;
    .hours {
      width: 100%;
      padding: 0;
      border-radius: 12px;
    }
    .contractvalue {
      width: 90%;
      padding: 8px 25px;
      border-radius: 12px;
      background-color: #f6f6f6;
    }
    .contractvalue-1 {
      background-color: #ffff;
    }
    .pieces {
      background-color: #ffff;
    }

    .totalamount {
      width: 95%;
      padding: 8px 10px;
      border-radius: 12px;
      display: flex;
      background-color: #f6f6f6;

      input {
        border: none;
        background: transparent;
      }

      p {
        margin-right: 5px;
      }
    }
    .totalamount-1 {
      background-color: #ffff;
    }
  }
  .totalamount-width {
    width: 17%;
  }

  .share-value {
    width: 20%;

    .work {
      width: 95%;
      border-radius: 50px;
      font-size: 14px;
      height: calc(1.9em + 0.75rem + 2px);

      input {
        border: none;
      }
    }
    .programme {
      background-color: #ffff;
    }
  }
  .totalamount-width {
    width: 17%;
  }

  .down-btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    color: #ffff;
    background-color: #273238;
  }
}
.details-head {
  display: flex;
  align-items: center;
  background-color: #273238;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  .product-no {
    width: 20%;
  }
  .contract-type,
  .contract-value,
  .quantity {
    width: 22%;
  }
  .total-amount {
    width: 17%;
  }
  .actions {
    width: 10%;
  }
  .discription {
    width: 22%;
  }
  .team-member {
    width: 21%;
  }
}

.member-name {
  width: 10%;
}

.role-member {
  width: 10%;
}

.share-value {
  width: 20%;
}

.Tax-value {
  width: 15%;
}

.allowances {
  width: 10%;
}

.payment {
  width: 10%;
}

.email-address {
  width: 15%;
}
.actions {
  width: 10%;
}
.euro-position {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-10px, -50%);
}

.title-lg {
  width: 100%;
  display: block;
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  .arrow-width {
    img {
      width: 50px;
    }
  }

  .grey-box {
    background-color: #f6f6f6;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 20px;
    max-width: 800px;

    @media (max-width: 768px) {
      border-radius: 10px;
    }
    .grey-col-p {
      padding: 20px;
      @media (max-width: 768px) {
        padding: 15px;
      }
    }

    &::after {
      content: '';
      background-image: url('~@/assets/images/invoice-address-3.svg');
      background-repeat: no-repeat;
      background-size: contain;
      width: 150px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
    }

    .bg-black {
      background-color: #000;
      border-radius: 50px;
      padding: 20px;

      .info-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .piggi-wrap {
        width: 100px;
        height: 100px;
        position: absolute;
        right: -12px;
        bottom: 15px;
      }
    }
  }

  .red-puzzle {
    &::after {
      content: '';
      background-image: url('~@/assets/images/invoice-puzzle.png');
      background-size: contain;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 110px;
      height: 200px;
      background-repeat: no-repeat;
      z-index: 1;
    }
  }

  .address-text {
    max-width: 200px;
  }

  .info-icon {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #fff;
  }
}

.verticle-text {
  transform: rotate(-90deg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
}

.red-box-common {
  border-radius: 20px;
  height: 440px;
  padding: 80px;

  .prof-bg-puzzle {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    display: block;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p,
  span,
  div {
    z-index: 1;
    position: relative;
  }

  .invoice-content {
    max-width: 250px;
    width: 100%;
  }

  .invoice-value {
    max-width: 120px;
    width: 100%;
  }
}
.bottom-header {
  background-color: rgb(255, 75, 87);
  padding: 10px;
}
.save-icon {
  max-width: 50px;
  width: 100%;
  max-width: 50px;
  width: 100%;

  @media (max-width: 576px) {
    max-width: 28px;
  }
}

.fw-500 {
  font-weight: 500;
  font-size: 16px;
}

.viewinvoicetable {
  @media (max-width: 768px) {
    min-width: 1400px;
  }
}

.table-text {
  max-width: 67px;
}
.barcode-text {
  max-width: 800px;
  width: 100%;
}

.border-dash {
  border-bottom: 2px dashed rgb(26, 21, 21);
  line-height: 45px;
  position: relative;

  &:after {
    content: '';
    background-image: url('~@/assets/images/scissors.svg');
    background-size: contain;
    height: 30px;
    width: 30px;
    position: absolute;
    top: 30px;
    left: 0;
    background-repeat: no-repeat;
    transform: rotate(90deg);
  }
}

.expand-table {
  overflow: visible;
  border-radius: 30px;
  border-bottom: none;

  th {
    border: none;
    width: 29%;
  }

  td {
    width: 70%;
    border: none;
    background-color: #fff;
  }
}

.responsive-table {
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }

  .table-border {
    border: 1px solid #ccc;
    border-radius: 30px;
    overflow: hidden;
    max-width: 500px;
    margin: 15px auto;
  }

  .collapse-div {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 20px 20px 0 20px;
    background-color: #f5f5f5;
  }
}

.border-padding {
  border-bottom-left-radius: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom-right-radius: 10px;
}

.table-height {
  height: 400px;
  max-height: 100%;
  border: 1px solid #dee2e6;
  border-radius: 20px;
}
table {
  border-spacing: 0;

  tr {
    padding: 20px 20px;
    border-bottom: 1px solid #dee2e6;
    border-radius: 10px;
    overflow: hidden;
    &:last-child {
      border-bottom: 1px solid transparent;
    }
    th {
      padding: 15px;
      font-size: 14px;
      &:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
      border-right: transparent;
    }
    td {
      border-right: transparent;
      padding: 10px;
    }
  }
}
.img-fluid {
  max-width: 100%;
  height: auto;

  @media (max-width: 768px) {
    border-radius: 10px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
}

.Title {
  @media (max-width: 1240px) {
    font-size: 24px;
  }

  @media (max-width: 576px) {
    text-align: center;
    font-size: 20px;
  }
}
table {
  border-spacing: 0;

  @media (max-width: 768px) {
    min-width: 750px;
  }

  tr {
    padding: 20px 20px;
    border-bottom: 1px solid #dee2e6;
    border-radius: 10px;
    overflow: hidden;
    @media (max-width: 576px) {
      padding: 10px 10px;
    }
    &:last-child {
      border-bottom: 1px solid transparent;
    }
    th {
      padding: 15px;
      font-size: 14px;
      &:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
      border-right: transparent;
    }
    td {
      border-right: transparent;
      padding: 10px;
    }
  }
}
.total {
  max-width: 400px;
  background-color: #f9f9f9;
  .total-excl {
    .text-total {
      color: #858a90;
    }
  }
  .border-top-bottom {
    border-top: 1px solid #dde0e2;
    border-bottom: 4px solid #dde0e2;
    .total-prize {
      color: rgb(255, 75, 87);
    }
  }
}

.first-th {
  width: 40%;
}
.blureffect {
  filter: blur(5px);
  cursor: not-allowed;
  user-select: none;
}

.go__back {
  cursor: pointer;
  background-color: #fff;
  border-radius: 50px;
  width: 150px;
  margin-bottom: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .banner-back {
    display: flex;
    align-items: center;

    .back-icon {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: Red;
      border-radius: 100%;
      margin-right: 10px;
      color: #fff;
      font-size: 25px;
    }

    .back-text {
      span {
        font-weight: 600;
        color: #000;
      }
    }
  }
  @media (max-width: 992px) {
    .go__back {
      position: relative !important;
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      top: unset !important;
      left: unset !important;
    }
  }

  @media (max-width: 576px) {
    .go__back {
      .banner-back {
        .back-icon {
          width: 35px !important;
          height: 35px !important;
          line-height: 35px !important;

          span {
            font-size: 20px;
          }
        }
        .back-text {
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.pph-left-box {
  padding: 19px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
  height: calc(100% - 62px);

  .company-content {
    padding: 10px 0;
    .company-text {
      display: flex;
      margin-bottom: 5px;
      .company-titel {
        max-width: 160px;
        width: 100%;
        font-size: 14px;
        font-weight: 500;
        color: #858a90;
      }
      @media (max-width: 576px) {
        display: block;
      }
    }
    .company-value {
      font-size: 14px;
      margin-bottom: 5px;
      font-weight: 500;
      min-width: 320px;
    }
  }
  .company-sub-content {
    padding: 19px;
    border-radius: 20px;
    background-color: #f2f2f2;
  }
}
.w-30 {
  width: 30%;
  height: 30%;
}
.cutomer-width {
  min-width: 130px;
}

.tbl-status {
  .sts-wait {
    background-color: #000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 10px 20px;
    border-radius: 50px;
  }
}
.text-md-fw {
  font-size: 16px;
  font-weight: 400;
}
.text-sm-fw {
  font-size: 16px;
  font-weight: 500;
}
.bottom-header {
  @media (max-width: 768px) {
    min-width: 700px;
  }
}
.z-3 {
  z-index: 3;
}
.pph-wrapper,
.red-wrapper {
  height: 100%;
}
.pph-left {
  h5 {
    font-size: 16px;
  }
}
.btn-margin {
  margin-top: -1.1rem;
  margin-right: -2rem;
  .vs-button {
    &:not(.vs-radius):not(.includeIconOnly):not(.small):not(.large) {
      padding: 0.75rem 1.5rem;
    }
  }
}
</style>
