<template>
  <div>
    <div class="document__list md:mb-4">
      <div class="ag-grid-table-actions-left btn-margin" id="pdf-loading">
        <vs-row vs-justify="flex-end">
          <vx-tooltip :text="$t('tooltip.DownloadPdf')">
            <vs-button class="mr-1 vs-con-loading__container" type="filled" id="pdf__button" color="primary" icon-pack="feather" icon="icon-download" @click="invoicePdf(singleInformationInvoice)">{{
              $t('pdf')
            }}</vs-button>
          </vx-tooltip>
        </vs-row>
      </div>
      <div class="grid xl:grid-cols-2 gap-10 mb-8">
        <div class="pph-wrapper">
          <div class="logo-fi pb-3">
            <img src="~@/assets/images/logo/way2work-logo.png" alt="img" class="h-full w-full object-contain" />
          </div>
          <div class="pph-left-box">
            <h1 class="font-semibold pb-3">{{ $t('recipient_details') }}</h1>
            <div class="pph-left-content">
              <div class="company-content">
                <!-- company name -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('name') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.company_name) || '-' }}</p>
                </div>

                <!-- contact name -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('contactName') }} :</p>
                  <p class="company-value">
                    {{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.user && singleInformationInvoice.invoice_company.user.full_name) || '-' }}
                  </p>
                </div>

                <!-- company email -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('email') }}:</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.company_email) || '-' }}</p>
                </div>

                <!--  phone -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('phone') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.mobile) || '-' }}</p>
                </div>

                <!-- Country -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('country') }} :</p>
                  <p class="company-value">
                    {{
                      (singleInformationInvoice.invoice_company &&
                        singleInformationInvoice.invoice_company.countryReference &&
                        singleInformationInvoice.invoice_company.countryReference.country_name) ||
                      '-'
                    }}
                  </p>
                </div>

                <!-- City -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('city') }} :</p>
                  <p class="company-value">
                    {{
                      (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.cityReference && singleInformationInvoice.invoice_company.cityReference.city_name) || '-'
                    }}
                  </p>
                </div>

                <!-- company address -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('address') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.address) || '-' }}</p>
                </div>

                <!-- Zip Code -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('zip_code') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.zip_code) || '-' }}</p>
                </div>

                <!-- employer y tunnus -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('employer_y_tunnus') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.reg_number) || '-' }}</p>
                </div>
                <!-- Operator code -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('operator_code') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.operator_code) || '-' }}</p>
                </div>

                <!-- Vat number -->
                <div class="company-text">
                  <p class="company-titel">{{ $t('tax_number') }} :</p>
                  <p class="company-value">{{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.tax_number) || '-' }}</p>
                </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="red-wrapper">
          <div class="pb-8 flex justify-between">
            <h1 class="font-semibold">{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }} {{ $t('invoice') }}</h1>
          </div>
          <div class="red-box">
            <div class="relative z-3">
              <div class="mb-3 flex justify-between">
                <div>
                  <h5 class="title-lg text-white mb-1">{{ $t('invoiced_date') }}</h5>
                  <p class="text-light text-md-fw">{{ formatDate(singleInformationInvoice.created_at) }}</p>
                </div>
                <div v-if="singleInformationInvoice.mark_as_wrong">
                  <div class="tbl-status">
                    <span class="sts-wait flex items-center justify-center">
                      <p class="">{{ $t('credited') }}</p>
                    </span>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('invoice_Number') }}</h5>
                <p class="text-light text-md-fw">{{ singleInformationInvoice.invoice_number }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('reference_number') }}</h5>
                <p class="text-light text-md-fw">{{ singleInformationInvoice.ref_number }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('due_date') }}</h5>
                <p class="text-light text-md-fw">{{ formatDate(singleInformationInvoice.due_date) }}</p>
              </div>
              <div class="mb-3">
                <h5 class="title-lg text-white mb-1">{{ $t('late_paymentinterest') }}</h5>
                <p class="text-light text-md-fw">{{ singleInformationInvoice.panelty_interest }}</p>
              </div>
              <div class="mb-3" v-if="singleInformationInvoice.company && singleInformationInvoice.company.reg_number">
                <h5 class="title-lg text-white mb-1">{{ $t('company_id') }}</h5>
                <p class="text-light text-md-fw">{{ singleInformationInvoice.company && singleInformationInvoice.company.reg_number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <h1 class="font-semibold mb-3">{{ $t('work_details') }}</h1>
        <div class="grid table-height overflow-auto">
          <table class="table-auto" style="height: fit-content">
            <thead>
              <tr class="bg-black text-white text-md">
                <th class="invoice-width">{{ $t('invoice_details') }}</th>
                <th>{{ $t('date') }}</th>
                <th class="contract-width text-center">{{ $t('value') }}</th>
                <th class="quantity-width">{{ $t('quantity') }}</th>
                <th class="vat-width">{{ $t('vat') }}%</th>
                <th class="total-width text-center">{{ $t('no_vat') }}</th>
                <th class="total-width text-center">{{ $t('vat') }}</th>
                <th class="total-width text-center">{{ $t('total') }}</th>
              </tr>
            </thead>
            <tbody class="text-black" :data="tr" :key="i" v-for="(tr, i) in singleInformationInvoice.worked_hours">
              <tr>
                <td>{{ tr.description || '-' }}</td>
                <td>{{ formatDate(tr.date) }}</td>
                <td class="text-center">€ {{ singleInformationInvoice.mark_as_wrong ? -tr.contract_value : tr.contract_value || '-' }}</td>
                <td class="text-center">{{ singleInformationInvoice.mark_as_wrong ? -tr.total_work : tr.total_work || '-' }}</td>
                <td class="text-center">{{ singleInformationInvoice.vat || '-' }}</td>
                <td>€ {{ singleInformationInvoice.mark_as_wrong ? -(tr.contract_value * tr.total_work) : tr.contract_value * tr.total_work }}</td>
                <td>
                  €
                  {{
                    singleInformationInvoice.mark_as_wrong
                      ? -((tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100)
                      : (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100
                  }}
                </td>
                <td>
                  €
                  {{
                    singleInformationInvoice.mark_as_wrong
                      ? -(tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100).toFixed(2)
                      : (tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100).toFixed(2)
                  }}
                </td>
              </tr>
            </tbody>
          </table>
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
                € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.gross_salary).toFixed(2) : Number(singleInformationInvoice.gross_salary).toFixed(2) || '-' }}
              </p>
            </div>
            <div class="mr-5 text-white">
              <p class="text-sm-fw">{{ $t('withholding_tax') }}</p>
              <p class="text-sm-fw">
                € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.tax_amount).toFixed(2) : Number(singleInformationInvoice.tax_amount).toFixed(2) || 0.0 }}
              </p>
            </div>
            <div class="mr-5 text-white">
              <p class="text-sm-fw">{{ $t('compensations') }}</p>
              <p class="text-sm-fw">
                €
                {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.compensation_amount).toFixed(2) : Number(singleInformationInvoice.compensation_amount).toFixed(2) || '-' }}
              </p>
            </div>
            <div class="text-white">
              <p class="text-sm-fw">{{ $t('you_will_be_paid') }}</p>
              <p class="text-sm-fw">
                € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.sub_total).toFixed(2) : Number(singleInformationInvoice.sub_total).toFixed(2) || '-' }}
              </p>
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
              <p class="text-sm-fw">
                € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.company_pay_amount).toFixed(2) : Number(singleInformationInvoice.company_pay_amount).toFixed(2) || '-' }}
              </p>
            </div>
            <div class="mr-5 text-white lg:text-md text-sm">
              <p class="text-sm-fw">{{ $t('vat_amount') }}</p>
              <p class="text-sm-fw">€ {{ singleInformationInvoice.mark_as_wrong ? -singleInformationInvoice.vat_amount : singleInformationInvoice.vat_amount || 0 }}</p>
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
              <th class="w-30">{{ $t('attachmentDescription') }}</th>
              <th>{{ $t('date') }}</th>
              <th>{{ $t('attachments') }}</th>
            </tr>
          </thead>
          <tbody class="text-black font-bold" v-if="(singleInformationInvoice.invoice_files || []).length">
            <tr :data="tr" :key="i" v-for="(tr, i) in singleInformationInvoice.invoice_files || []">
              <td>{{ tr.purchase_place || '-' }}</td>
              <td>{{ formatDate(tr.purchase_date) }}</td>
              <td>
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Viewattachment')">
                    <feather-icon icon="EyeIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="viewSeekerDocument(tr.file_path)" />
                  </vx-tooltip>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody class="text-center" v-else>
            <tr>
              <td colspan="3">
                <p class="font-bold py-3 Title text-center w-full">{{ $t('no_data_found') }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="relative mt-12">
        <div class="overflow-auto" :class="!singleInformationInvoice.approved ? 'blureffect' : ''">
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
                <p class="ml-2">{{ singleInformationInvoice.iban }}</p>
              </div>
              <div style="width: 55%; border-bottom: 2px solid #000" class="p-2">
                <p>{{ $t('bic') }}</p>
                <p class="ml-2">
                  {{ $t('bank_bic') }} :
                  {{ singleInformationInvoice.bic }}
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
                  <p>{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }}</p>
                </div>
              </div>
              <div style="width: 55%" class="flex items-end">
                <div style="width: 100%; border-top: 2px solid #000" class="flex">
                  <div class="p-2 width_ref">
                    {{ $t('vitenumero_reference_number') }}
                  </div>
                  <div class="flex items-center ml-3">{{ singleInformationInvoice.ref_number }}</div>
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
                      {{ formatDate(singleInformationInvoice.due_date) }}
                    </div>
                  </div>
                  <div class="p-2 flex" style="width: 50%">
                    <div style="width: 13%; margin-right: 10px" class="me-2">{{ $t('euro') }}</div>
                    <div class="flex items-center">
                      €
                      {{
                        singleInformationInvoice.mark_as_wrong
                          ? -(singleInformationInvoice.sub_total && singleInformationInvoice.sub_total.toFixed(2))
                          : singleInformationInvoice.sub_total && singleInformationInvoice.sub_total.toFixed(2)
                      }}
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
        <div class="go__back absolute shadow" v-if="!singleInformationInvoice.approved">
          <router-link to="/all-invoices/list">
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
    <div id="invoicePdf-container"></div>
    <ImageModale v-if="isAttachmentModalMounted" :isModalShow.sync="isAttachmentModalShow" :imageLink="imageLink" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import ImageModale from '@/views/invoices/components/ImageModale.vue'
import moment from 'moment'
import InvoiceViewPdf from '@/views/pdf/InvoiceViewPdf.vue'
import Vue from 'vue'
export default {
  name: 'InvoiceInfo',
  components: {
    ImageModale
  },
  data() {
    return {
      totalNoVatAmount: null,
      totalVatAmount: null,
      totalWorkAmount: null,
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
    ...mapState('invoice', ['singleInformationInvoice'])
  },
  methods: {
    ...mapActions('invoice', {
      singleInfoInvoice: 'singleInfoInvoice'
    }),

    async getData() {
      await this.singleInfoInvoice(this.$route.params.id)
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

    //download PDF

    async invoicePdf(singleInformationInvoiceData) {
      this.generating = true

      setTimeout(() => {
        const ap = document.querySelector('#mount-node')
        if (ap) {
          ap.remove()
        }
        const elem = document.querySelector('#invoicePdf-container')
        const mounteNode = document.createElement('div')
        mounteNode.id = 'mount-node'
        elem.append(mounteNode)
        const pdfEmp = Vue.extend(InvoiceViewPdf)
        new pdfEmp({
          propsData: {
            singleInformationInvoice: singleInformationInvoiceData,
            t: this.$t
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
    singleInformationInvoice: {
      handler(newVal) {
        const vatValue = newVal.vat
        newVal.worked_hours.forEach((element) => {
          this.totalNoVatAmount += element.contract_value - (element.contract_value * vatValue) / 100
          this.totalVatAmount += (element.contract_value * vatValue) / 100
          this.totalWorkAmount += element.contract_value
        })
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
          container: '#pdf__button',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#pdf__button  > .con-vs-loading')
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

    @media (max-width: 768px) {
      border-radius: 10px;
      padding: 20px;
    }

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
      right: 10px;
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

.title-lg {
  font-size: 16px;
  font-weight: 600;
}
.text-md-fw {
  font-size: 16px;
  font-weight: 400;
}
.text-sm-fw {
  font-size: 16px;
  font-weight: 500;
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
.table-border {
  border: 1px solid #dee2e6;
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.table-height {
  max-height: 100%;
  border: 1px solid #dee2e6;
  border-radius: 10px;

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
        border-top-left-radius: 10px;
      }
      &:last-child {
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
.invoice-width {
  width: 30%;
}

.quantity-width {
  width: 8%;
}

.contract-width {
  width: 8%;
}

.vat-width {
  width: 5%;
}

.total-width {
  width: 8%;
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
      background-color: #ff4b57;
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
.tbl-status {
  .sts-wait {
    background-color: #000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 10px 20px;
    border-radius: 50px;
  }
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
