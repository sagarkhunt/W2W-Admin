<template>
  <!-- ${Date.now()} -->
  <vue-html2pdf :enable-download="true" :filename="`${singleInformationInvoice.invoice_number}`" ref="pdf" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
    <section slot="pdf-content">
      <div class="document__list md:mb-4">
        <div>
          <div class="flex mb-3" style="display: -webkit-box">
            <div class="xl:mb-0 mb-3" style="width: 48%">
              <div class="pph-wrapper">
                <div class="logo-fi pb-3">
                  <img src="~@/assets/images/logo/way2work-logo.png" alt="img" class="h-full w-full object-contain" />
                </div>
                <div class="pph-left-box">
                  <h3 class="font-semibold pb-3">Recipient Details</h3>
                  <div class="pph-left-content">
                    <div class="company-content">
                      <!-- company name -->
                      <div class="company-text">
                        <h5 class="company-titel text-sm font-medium">Name :</h5>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.company_name) || '-' }}</p>
                      </div>

                      <!-- contact name -->
                      <div class="company-text">
                        <p class="company-titel">Contact Name :</p>
                        <p class="company-value">
                          {{ (singleInformationInvoice.invoice_company && singleInformationInvoice.invoice_company.user && singleInformationInvoice.invoice_company.user.full_name) || '-' }}
                        </p>
                      </div>

                      <!-- company email -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Email :</p>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.company_email) || '-' }}</p>
                      </div>

                      <!--  phone -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Phone :</p>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.mobile) || '-' }}</p>
                      </div>

                      <!-- Country -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Country :</p>
                        <p class="company-value">{{ '-' }}</p>
                      </div>

                      <!-- City -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">City :</p>
                        <p class="company-value">{{ '-' }}</p>
                      </div>

                      <!-- company address -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Address :</p>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.address) || '-' }}</p>
                      </div>

                      <!-- Zip Code -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Zip Code :</p>
                        <p class="company-value">{{ '-' }}</p>
                      </div>

                      <!-- employer y tunnus -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Employer Y Tunnus :</p>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.reg_number) || '-' }}</p>
                      </div>
                      <!-- Operator code -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Operator code :</p>
                        <p class="company-value">{{ '-' }}</p>
                      </div>

                      <!-- Vat number -->
                      <div class="company-text">
                        <p class="company-titel text-sm font-medium">Vat number :</p>
                        <p class="company-value">{{ (singleInformationInvoice.company && singleInformationInvoice.company.tax_number) || '-' }}</p>
                      </div>
                      <!-- </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="xl:mb-0 mb-3 ml-4" style="width: 48%">
              <div class="red-wrapper">
                <div class="pb-8 flex justify-between">
                  <h3 class="font-semibold">{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }} Invoice</h3>
                </div>
                <div class="red-box">
                  <div class="relative z-3">
                    <div class="mb-3 flex justify-between">
                      <div>
                        <h5 class="title-lg text-white mb-1">Invoiced date</h5>
                        <p class="text-light text-md-fw">{{ formatDate(singleInformationInvoice.created_at) }}</p>
                      </div>
                      <div v-if="singleInformationInvoice.mark_as_wrong">
                        <div class="tbl-status">
                          <span class="sts-wait flex items-center justify-center">
                            <p class="">Credited</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Invoiced number</h5>
                      <p class="text-light text-md-fw">{{ singleInformationInvoice.invoice_number }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Reference number</h5>
                      <p class="text-light text-md-fw">{{ singleInformationInvoice.ref_number }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Due Date</h5>
                      <p class="text-light text-md-fw">{{ formatDate(singleInformationInvoice.due_date) }}</p>
                    </div>
                    <div class="mb-3">
                      <h5 class="title-lg text-white mb-1">Late paymentinterest</h5>
                      <p class="text-light text-md-fw">{{ singleInformationInvoice.panelty_interest }}</p>
                    </div>
                    <div class="mb-3" v-if="singleInformationInvoice.company && singleInformationInvoice.company.reg_number">
                      <h5 class="title-lg text-white mb-1">Company Id</h5>
                      <p class="text-light text-md-fw">{{ singleInformationInvoice.company && singleInformationInvoice.company.reg_number }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-5">
            <h3 class="font-semibold mb-3">Work Details</h3>
            <div class="grid table-height overflow-auto">
              <table class="table-auto" style="height: fit-content">
                <thead>
                  <tr class="bg-black text-white text-md">
                    <th class="invoice-width">Invoice Detail</th>
                    <th class="total-width">Date</th>
                    <th class="contract-width">Value</th>
                    <th class="quantity-width text-center">Quantity</th>
                    <th class="vat-width text-center">VAT%</th>
                    <th class="total-width">No VAT</th>
                    <th class="total-width">VAT</th>
                    <th class="total-width">Total</th>
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
                          ? -(tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100)
                          : tr.contract_value * tr.total_work + (tr.contract_value * tr.total_work * singleInformationInvoice.vat) / 100
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
                <h5 class="text-white">Summary</h5>
              </div>
              <div class="flex items-center">
                <div class="mr-5 text-white">
                  <p class="text-sm-fw">Gross amount</p>
                  <p class="text-sm-fw">
                    € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.gross_salary).toFixed(2) : Number(singleInformationInvoice.gross_salary).toFixed(2) || '-' }}
                  </p>
                </div>
                <div class="mr-5 text-white">
                  <p class="text-sm-fw">Withholding tax</p>
                  <p class="text-sm-fw">
                    € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.tax_amount).toFixed(2) : Number(singleInformationInvoice.tax_amount).toFixed(2) || 0.0 }}
                  </p>
                </div>
                <div class="mr-5 text-white">
                  <p class="text-sm-fw">Compensations</p>
                  <p class="text-sm-fw">
                    €
                    {{
                      singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.compensation_amount).toFixed(2) : Number(singleInformationInvoice.compensation_amount).toFixed(2) || '-'
                    }}
                  </p>
                </div>
                <div class="text-white">
                  <p class="text-sm-fw">You will be paid</p>
                  <p class="text-sm-fw">
                    € {{ singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.sub_total).toFixed(2) : Number(singleInformationInvoice.sub_total).toFixed(2) || '-' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-auto">
            <div class="bottom-header flex items-center justify-between rounded-lg mb-4">
              <div class="pph-left">
                <h5 class="text-white">Recipient</h5>
              </div>
              <div class="flex items-center ml-auto">
                <div class="mr-5 text-white lg:text-md text-sm">
                  <p class="text-sm-fw">Invoice Total</p>
                  <p class="text-sm-fw">
                    €
                    {{
                      singleInformationInvoice.mark_as_wrong ? -Number(singleInformationInvoice.company_pay_amount).toFixed(2) : Number(singleInformationInvoice.company_pay_amount).toFixed(2) || '-'
                    }}
                  </p>
                </div>
                <div class="mr-5 text-white lg:text-md text-sm">
                  <p class="text-sm-fw">VAT Amount</p>
                  <p class="text-sm-fw">€ {{ singleInformationInvoice.mark_as_wrong ? -singleInformationInvoice.vat_amount : singleInformationInvoice.vat_amount || 0 }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="page-break"></div>
          <div>
            <h3 class="font-semibold Title mb-2">Attachment List</h3>
          </div>
          <div id="table-loading" class="overflow-auto">
            <table class="w-full table-auto table-height" style="height: fit-content">
              <thead class="w-full">
                <tr class="bg-black text-white text-md w-full">
                  <th class="w-30">Attachment Description</th>
                  <th>Date</th>
                  <th>Attachments</th>
                </tr>
              </thead>
              <tbody class="text-black font-bold" v-if="(singleInformationInvoice.invoice_files || []).length">
                <tr :data="tr" :key="i" v-for="(tr, i) in singleInformationInvoice.invoice_files || []">
                  <td>{{ tr.purchase_place || '-' }}</td>
                  <td>{{ formatDate(tr.purchase_date) }}</td>
                </tr>
              </tbody>
              <tbody class="text-center" v-else>
                <tr>
                  <td colspan="3">
                    <p class="font-bold py-3 Title text-center w-full">No data found</p>
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
                  <p class="ml-2">{{ singleInformationInvoice.iban }}</p>
                </div>
                <div style="width: 55%; border-bottom: 2px solid #000" class="p-2">
                  <p>BIC</p>
                  <p class="ml-2">
                    Bank BIC :
                    {{ singleInformationInvoice.bic }}
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
                    <p>{{ singleInformationInvoice.seeker && singleInformationInvoice.seeker.user && singleInformationInvoice.seeker.user.full_name }}</p>
                  </div>
                </div>

                <div style="width: 55%" class="flex items-end">
                  <div style="width: 100%; border-top: 2px solid #000" class="flex">
                    <div class="p-2 width_ref">Vitenumero Reference number</div>
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
                      <div class="width_due_date">Erapaiva Due date</div>
                      <div class="flex items-center ml-3">
                        {{ formatDate(singleInformationInvoice.due_date) }}
                      </div>
                    </div>
                    <div class="p-2 flex" style="width: 50%">
                      <div style="width: 13%; margin-right: 15px">Euro</div>
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
  name: 'InvoiceView',
  props: {
    singleInformationInvoice: {}
  },
  components: {
    VueHtml2pdf
  },
  data() {
    return {}
  },
  mixins: [dateMixins],
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

  .grey-box {
    background-color: #f6f6f6;
    box-shadow: 1px 1px 3px #ccc;
    border-radius: 20px;
    max-width: 800px;

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
      right: 10px;
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

.title-lg {
  font-size: 12px;
  font-weight: 600;
}
.text-md-fw {
  font-size: 12px;
  font-weight: 500;
}
.text-sm-fw {
  font-size: 12px;
  font-weight: 500;
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
  overflow: hidden !important;
}

table {
  border-spacing: 0;
  tr {
    padding: 20px 20px;
    border-bottom: 1px solid #dee2e6;
    &:last-child {
      border-bottom: 1px solid transparent;
    }
    th {
      padding: 14px 7px;
      font-size: 10px;
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
      padding: 14px 7px;
    }
  }

  tbody {
    font-size: 10px;
  }
}
.invoice-width {
  width: 20%;
}

.quantity-width {
  width: 10%;
}

.contract-width {
  width: 10%;
}

.vat-width {
  width: 10%;
}
.date-width {
  width: 3%;
}

.total-width {
  width: 13%;
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
}

.pph-left-box {
  padding: 19px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.55);
  height: calc(100% - 60px);

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
.tbl-status {
  .sts-wait {
    background-color: #000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 10px 20px;
    border-radius: 50px;
  }
}
.z-3 {
  z-index: 3;
}
.pph-left {
  h5 {
    font-size: 12px;
  }
}
#table-loading {
  padding-bottom: 250px;
}
.pl-7 {
  padding-left: 1.75rem;
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
.page-break {
  page-break-after: always;
}
</style>
