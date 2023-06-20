<template>
  <!-- ${Date.now()} -->
  <vue-html2pdf :enable-download="true" :filename="`${teamInvoiceInfo.invoice_number}`" ref="pdf" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4" class="spacing">
    <section slot="pdf-content">
      <div class="document__list md:mb-4">
        <div>
          <div class="mb-3" style="display: flex; display: -webkit-box">
            <div class="xl:mb-0 mb-3" style="width: 48%">
              <div class="pph-wrapper">
                <div class="logo-fi pb-3">
                  <img src="/img/way2work-logo.b6073a49.png" alt="img" class="h-full w-full object-contain" />
                </div>
                <div class="pph-left-box">
                  <h3 class="font-semibold pb-3">Recipient Details</h3>
                  <div class="pph-left-content">
                    <div class="company-content">
                      <!-- company name -->
                      <div class="company-text">
                        <p class="company-titel">Name :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.company_name) || '-' }}</p>
                      </div>

                      <!-- contact name -->
                      <div class="company-text">
                        <p class="company-titel">Contact Name :</p>
                        <p class="company-value">
                          {{ (teamInvoiceInfo.invoice_company && teamInvoiceInfo.invoice_company.user && teamInvoiceInfo.invoice_company.user.full_name) || '-' }}
                        </p>
                      </div>

                      <!-- company email -->
                      <div class="company-text">
                        <p class="company-titel">Email :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.user && teamInvoiceInfo.company.user.email) || '-' }}</p>
                      </div>

                      <!-- company phone -->
                      <div class="company-text">
                        <p class="company-titel">Phone :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.mobile) || '-' }}</p>
                      </div>

                      <div class="company-text">
                        <p class="company-titel">Country :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.countryReference && teamInvoiceInfo.company.countryReference.country_name) || '-' }}</p>
                      </div>

                      <div class="company-text">
                        <p class="company-titel">City :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.cityReference && teamInvoiceInfo.company.cityReference.city_name) || '-' }}</p>
                      </div>

                      <!-- company address -->
                      <div class="company-text">
                        <p class="company-titel">Address :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.address) || '-' }}</p>
                      </div>

                      <!-- employer ssn -->
                      <div class="company-text">
                        <p class="company-titel">Zip Code :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.zip_code) || '-' }}</p>
                      </div>

                      <!-- employer y tunnus -->
                      <div class="company-text">
                        <p class="company-titel">Employer Y Tunnus :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.reg_number) || '-' }}</p>
                      </div>

                      <div class="company-text">
                        <p class="company-titel">Operator code :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.operator_code) || '-' }}</p>
                      </div>
                      <div class="company-text">
                        <p class="company-titel">Vat number :</p>
                        <p class="company-value">{{ (teamInvoiceInfo.company && teamInvoiceInfo.company.tax_number) || '-' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="xl:mb-0 mb-3 ml-4" style="width: 48%">
              <div class="red-wrapper">
                <div class="pb-8">
                  <h3 class="font-semibold">
                    {{ teamInvoiceInfo.created_by && teamInvoiceInfo.created_by.seeker && teamInvoiceInfo.created_by.seeker.user && teamInvoiceInfo.created_by.seeker.user.full_name }} Invoice
                  </h3>
                </div>
                <div class="red-box">
                  <div class="relative z-3">
                    <div class="mb-3 flex justify-between">
                      <div>
                        <h5 class="title-lg text-white mb-1">Invoiced date</h5>
                        <p class="text-light text-md-fw">{{ formatDate(teamInvoiceInfo.created_at) }}</p>
                      </div>
                      <div v-if="teamInvoiceInfo.mark_as_wrong">
                        <div class="tbl-status">
                          <span class="sts-wait flex items-center justify-center">
                            <p class="">Credited</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Invoiced number</h5>
                      <p class="text-light text-md-fw">{{ teamInvoiceInfo.invoice_number || '-' }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Reference number</h5>
                      <p class="text-light text-md-fw">{{ teamInvoiceInfo.ref_number || '-' }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Due date</h5>
                      <p class="text-light text-md-fw">{{ teamInvoiceInfo.due_date || '-' }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Late paymentinterest</h5>
                      <p class="text-light text-md-fw">{{ teamInvoiceInfo.panelty_interest || '-' }}</p>
                    </div>
                    <div class="mb-3" v-if="teamInvoiceInfo.company && teamInvoiceInfo.company.reg_number">
                      <h5 class="title-lg text-white mb-1">Company Id</h5>
                      <p class="text-light text-md-fw">{{ teamInvoiceInfo.company && teamInvoiceInfo.company.reg_number }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white pb-3">
            <div class="employer-details flex justify-between items-center">
              <h3 class="font-semibold">Seeker Work Hour List</h3>
            </div>
            <div class="daily-Work-Details bg-white">
              <div class="daily-work-row pt-5">
                <div class="daily-work-col">
                  <!-- payment sharing head -->
                  <div class="details-head text-center flex items-center text-white">
                    <div class="member-name px-2">
                      <p class="details-head-text text-start font-bold">Seeker name</p>
                    </div>

                    <div class="role-member px-2">
                      <p class="details-head-text font-bold">Role</p>
                    </div>

                    <div class="email-address px-2">
                      <p class="details-head-text font-bold">Email address</p>
                    </div>

                    <div class="share-value px-2">
                      <p class="details-head-text font-bold">Share</p>
                    </div>

                    <div class="Tax-value px-2">
                      <p class="details-head-text font-bold">Tax Percentage</p>
                    </div>

                    <div class="allowances px-2">
                      <p class="details-head-text font-bold">Allowances</p>
                    </div>
                    <div class="payment px-2">
                      <p class="details-head-text font-bold">Will be paid</p>
                    </div>
                  </div>

                  <!-- payment sharing list - row -->
                  <div v-for="(item, index) in teamInvoiceInfo.invoice_seekers || []" :key="index">
                    <div class="details-content">
                      <div class="member-name text-start">
                        <div class="flex items-center">
                          <p class="font-bold">{{ item.seeker.user.full_name }}</p>
                        </div>
                      </div>

                      <div class="role-member flex items-center justify-center">
                        <div class="w-30 h-30">
                          <img :src="require(`@/assets/images/${teamInvoiceInfo.created_by.seeker.id === item.seeker.id ? 'leader-icon.svg' : 'member-icon.svg'}`)" class="w-full h-full" alt="err" />
                        </div>
                      </div>

                      <div class="email-address text-center">
                        <div>
                          <p class="font-bold">{{ item.seeker.user.email }}</p>
                        </div>
                      </div>

                      <div class="share-value ml-xl-0 ml-3 text-center">
                        <p class="font-bold">
                          € {{ teamInvoiceInfo.mark_as_wrong ? -(item.shared_amount && Number(item.shared_amount).toFixed(2)) : item.shared_amount && Number(item.shared_amount).toFixed(2) }}
                        </p>
                      </div>

                      <div class="Tax-value text-center">
                        <p class="font-bold">{{ teamInvoiceInfo.mark_as_wrong ? -item.tax : item.tax }}%</p>
                      </div>

                      <div class="allowances text-center">
                        <p class="font-bold">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.compensation_amount.toFixed(2) : item.compensation_amount.toFixed(2) }}</p>
                      </div>

                      <div class="payment text-center">
                        <div>
                          <p class="font-bold">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.seeker_company_pay.toFixed(2) : item.seeker_company_pay.toFixed(2) }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- payment sharing row expand -->
                    <div class="opne-toggle p-3 table-color" v-if="(item.workHours || []).length">
                      <!-- daily work hour list - column name -->
                      <div class="details-head text-center text-white">
                        <div class="product-no">
                          <p class="details-head-text font-bold">Invoice details</p>
                        </div>
                        <div class="team-member">
                          <p class="details-head-text font-bold">Date</p>
                        </div>
                        <div class="discription">
                          <p class="details-head-text font-bold">Value</p>
                        </div>
                        <div class="contract-type">
                          <p class="details-head-text font-bold">Quantity</p>
                        </div>
                        <div class="quantity">
                          <p class="details-head-text font-bold">Total</p>
                        </div>
                      </div>
                      <div class="text-black text-sm overflow-hidden">
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
                                <p class="text-total">Total excl. VAT</p>
                                <p class="text-prize text-black font-semibold">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.tax : item.tax || 0 }}</p>
                              </div>
                              <div class="total-excl flex justify-between w-full pb-3">
                                <p class="text-total">Total Compensation</p>
                                <p class="text-prize text-black font-semibold">
                                  € {{ teamInvoiceInfo.mark_as_wrong ? -item.compensation_amount.toFixed(2) : item.compensation_amount.toFixed(2) || 0 }}
                                </p>
                              </div>
                              <div class="total-excl border-top-bottom flex justify-between font-semibold text-right text-lg py-2">
                                <p class="text-black text-sm">Total</p>
                                <p class="total-prize text-sm">€ {{ teamInvoiceInfo.mark_as_wrong ? -item.sub_total.toFixed(2) : item.sub_total.toFixed(2) || '0' }}</p>
                              </div>
                            </div>
                          </div>
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
                <h5 class="text-white">Summary</h5>
              </div>
              <div class="flex items-center md:ml-auto">
                <div class="mr-5 text-white">
                  <p class="text-sm-fw">Gross amount</p>
                  <p class="text-sm-fw">
                    €
                    {{
                      teamInvoiceInfo.mark_as_wrong ? -(finalTotal.grossSalary ? Number(finalTotal.grossSalary).toFixed(2) : 0) : finalTotal.grossSalary ? Number(finalTotal.grossSalary).toFixed(2) : 0
                    }}
                  </p>
                </div>
                <div class="mr-5 text-white">
                  <p class="text-sm-fw">Withholding tax</p>
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
                  <p class="text-sm-fw">Compensations</p>
                  <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -Number(finalTotal.compensationAmount).toFixed(2) : Number(finalTotal.compensationAmount).toFixed(2) || 0 }}</p>
                </div>
                <div class="text-white">
                  <p class="text-sm-fw">You will be paid</p>
                  <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -Number(finalTotal.youWillBePaid).toFixed(2) : Number(finalTotal.youWillBePaid).toFixed(2) || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-auto">
            <div class="bottom-header flex items-center justify-between rounded-lg mb-5">
              <div class="pph-left">
                <h5 class="text-white">Recipient</h5>
              </div>
              <div class="flex items-center ml-auto">
                <div class="mr-5 text-white lg:text-md text-sm">
                  <p class="text-sm-fw">Invoice Total</p>
                  <p class="text-sm-fw">€ {{ teamInvoiceInfo.mark_as_wrong ? -Number(finalTotal.invoiceTotal).toFixed(2) : Number(finalTotal.invoiceTotal).toFixed(2) || 0.0 }}</p>
                </div>
                <div class="text-white lg:text-md text-sm">
                  <p class="text-sm-fw">VAT Amount</p>
                  <p class="text-sm-fw">$ {{ teamInvoiceInfo.mark_as_wrong ? -finalTotal.vatTotal : finalTotal.vatTotal || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="page-break"></div>
          <div>
            <h3 class="font-bold mt-5 Title">Attachment List</h3>
          </div>
          <div id="table-loading" class="overflow-auto">
            <table class="w-full table-auto mt-5 table-height" style="height: fit-content">
              <thead class="w-full">
                <tr class="bg-black text-white text-md w-full">
                  <th class="w-30">Place of Purchase</th>
                  <th>Date of Purchase</th>
                  <th>Attachments</th>
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
                    <p class="font-bold py-3 Title text-center">No data found.</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="relative mt-12">
            <div class="viewinvoicetable">
              <div class="flex">
                <div style="border-right: 2px solid #000; border-bottom: 2px solid #000" class="p-2 text-start width-13">
                  <p>Saajan tilinumero</p>
                  <p>Recipient bank number</p>
                </div>
                <div style="width: 33%; border-right: 2px solid #000; border-bottom: 2px solid #000" class="p-2">
                  <p>IBAN</p>
                  <p class="ml-2">{{ teamInvoiceInfo.iban }}</p>
                </div>
                <div style="width: 55%; border-bottom: 2px solid #000" class="p-2">
                  <p>BIC</p>
                  <p class="ml-2">
                    Bank BIC :
                    {{ teamInvoiceInfo.bic }}
                  </p>
                </div>
              </div>

              <div class="flex">
                <div style="height: 223px; border-right: 2px solid #000" class="p-2 width-13">
                  <div class="ml-auto text-start">Maksajan nimi</div>
                  <div class="text-start">Payer name</div>
                </div>

                <div class="flex flex-col justify-between p-2" style="width: 33%; border-right: 2px solid #000">
                  <div class="p-2">
                    <p>{{ teamInvoiceInfo.created_by && teamInvoiceInfo.created_by.seeker && teamInvoiceInfo.created_by.seeker.user && teamInvoiceInfo.created_by.seeker.user.full_name }}</p>
                  </div>
                </div>

                <div style="width: 55%" class="flex items-end">
                  <div style="width: 100%; border-top: 2px solid #000" class="flex">
                    <div class="p-2 width_ref">Vitenumero Reference number</div>
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
                      <div class="width_due_date">Erapaiva Due date</div>
                      <div class="flex items-center ml-3">
                        {{ formatDate(teamInvoiceInfo.due_date) }}
                      </div>
                    </div>
                    <div class="p-2 flex" style="width: 50%">
                      <div style="width: 13%; margin-right: 15px">Euro</div>
                      <div class="flex items-center">
                        € {{ teamInvoiceInfo.mark_as_wrong ? -(teamInvoiceInfo.sub_total && teamInvoiceInfo.sub_total.toFixed(2)) : teamInvoiceInfo.sub_total && teamInvoiceInfo.sub_total.toFixed(2) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex items-center my-3 ml-2" style="height: 72px; justify-content: center">
                <div class="barcode-text">
                  <p class="flex items-center justify-items-center">Barcode here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'
import moment from 'moment'

export default {
  name: 'TeamInvoiceViewPdf',
  props: {
    teamInvoiceInfo: {}
  },
  components: {
    VueHtml2pdf
  },
  data() {
    return {
      showWorkDetail: null
    }
  },
  mixins: [dateMixins],
  computed: {
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
  created() {
    this.$nextTick(() => {
      window.scrollTo(0, 0)
      this.$refs.pdf.downloadPdf()
      this.$emit('downloaded')
    })
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

  .logo-fi {
    width: 200px;
    height: 55px;
    margin: 0;
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
    color: #000;
    font-weight: 500;
    font-size: 11px;
    border: 2px solid #000;
    width: 100%;

    .width-13 {
      width: 24%;
    }
    .width-44 {
      width: 44%;
    }
    .width_ref {
      width: 36%;
    }
    .width_due_date {
      width: 40%;
    }
  }

  .red-box {
    background-color: rgb(255, 75, 87);
    color: #fff;
    border-radius: 25px;
    box-shadow: 1px 1px 10px 2px rgba(204, 204, 204, 0.55);
    padding: 22px;
    position: relative;
    height: calc(100% - 60px);

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

.daily-work-col {
  border: 1px solid #dde0e2;
  border-radius: 10px;
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
  padding: 10px 7px;
  font-size: 10px;

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
  padding: 10px 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 10px;

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
  width: 13%;
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
  width: 12%;
}

.email-address {
  width: 17%;
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
  font-size: 12px;
  font-weight: 600;
}

.verticle-text {
  transform: rotate(-90deg);
  position: absolute;
  top: 0;
  left: -8px;
  width: 126px;
  height: 100%;
  font-size: 10px;
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
}

.fw-500 {
  font-weight: 500;
  font-size: 16px;
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
  max-height: 100%;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  overflow: hidden !important;
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
        flex-basis: 160px;
        font-size: 12px;
        color: #858a90;
      }
    }
    .company-value {
      font-size: 12px;
      margin-bottom: 5px;
      font-weight: 500;
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
  min-width: 110px;
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
  font-size: 12px;
  font-weight: 500;
}
.text-sm-fw {
  font-size: 12px;
  font-weight: 500;
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
    font-size: 12px;
  }
}
.table-color {
  .details-head {
    background-color: #3b464c;
  }
}
.page-break {
  page-break-after: always;
}

@page:left {
  margin-top: 5rem !important;
  margin-bottom: 5rem !important;
  margin-left: 5rem !important;
  margin-right: 5rem !important;
}

@page:right {
  margin-top: 5rem !important;
  margin-bottom: 5rem !important;
  margin-left: 5rem !important;
  margin-right: 5rem !important;
}
@media print {
  body {
    padding: 50px 0;
  }
}
</style>
