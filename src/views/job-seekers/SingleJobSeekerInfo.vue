<template>
  <div id="table-loading" class="vs-con-loading__container">
    <!-- profile info -->
    <div class="vx-card md:p-8 p-6">
      <!-- <start> -->
      <div class="flex items-center justify-between mb-5">
        <div class="md:flex items-center">
          <h2 class="mb-1">{{ seekerProfileinfo.full_name }}</h2>
          <h3 class="text-grey mx-3">{{ $t('id') }}:{{ seekerProfileinfo.id || '-' }}</h3>
          <div class="flex items-center">
            <div class="flex items-center">
              <div class="rating-icon flex items-center justify-center">
                <span v-for="(item, index) in 5" :key="index">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" :fill="seekerProfileinfo.rating_avg > index ? '#E4AA18' : '#9E9E9E'" class="start-width review-star">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <div class="w-8"></div>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div>
            <vx-tooltip :text="$t('tooltip.DownloadPdf')">
              <feather-icon icon="DownloadIcon" svgClasses="h-5 w-5" class="cursor-pointer p-2 vs-con-loading__container" id="seekerDetail_pdf" @click="seekerDetailPdf(seekerProfileinfo)" />
            </vx-tooltip>
          </div>

          <div>
            <vx-tooltip :text="$t('tooltip.TaxInformation')">
              <feather-icon icon="DollarSignIcon" svgClasses="h-5 w-5" class="cursor-pointer p-2" @click="showMyTaxInfo()" />
            </vx-tooltip>
          </div>

          <div>
            <vx-tooltip :text="$t('update_password')">
              <feather-icon icon="LockIcon" svgClasses="h-5 w-5" class="cursor-pointer p-2" @click="updatePasswordPopup()" />
            </vx-tooltip>
          </div>

          <div>
            <vx-tooltip :text="$t('EditEntrepreneur')">
              <feather-icon icon="EditIcon" svgClasses="h-5 w-5" class="cursor-pointer p-2" @click="editJobseekerRecord(seekerProfileinfo && seekerProfileinfo.id)" />
            </vx-tooltip>
          </div>
        </div>
      </div>

      <div class="grid xl:grid-cols-3 gap-8">
        <div class="col-span-2">
          <div class="lg:flex block vx-card md:p-8 p-6 gap-5 h-full">
            <div class="flex justify-center enterpreneur-list-col-1">
              <div class="dash-user-profile-img rounded-full relative w-24 h-24">
                <!-- seekerProfileinfo.file_path -->
                <img :src="seekerProfileinfo.file_path" alt="puzzle" class="w-full h-full rounded-full object-cover" />

                <div class="absolute top-0 left-0">
                  <img src="@/assets/images/round-arrow-icon.svg" alt="err" />
                </div>
              </div>
            </div>

            <div class="enterpreneur-list-col-2">
              <div class="user-text">
                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('ssn') }}</h5>
                  <p class="font-medium">{{ seekerProfileinfo.ssn || '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('dob') }}</h5>
                  <p class="font-medium">{{ formatDate(seekerProfileinfo.dob) || '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('country') }}</h5>
                  <p class="font-medium">{{ seekerProfileinfo.country && seekerProfileinfo.country.country_name }}</p>
                </div>

                <div class="flex user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('address') }}</h5>

                  <div>
                    <p class="font-medium">{{ seekerProfileinfo.jobSeeker && seekerProfileinfo.jobSeeker.address }}</p>
                  </div>
                </div>

                <div class="flex user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-1">{{ $t('email') }}</h5>
                  <div class="flex flex-wrap w-full">
                    <p class="font-medium">{{ seekerProfileinfo.email || '-' }}</p>
                  </div>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('phone') }}</h5>
                  <div class="flex items-center">
                    <p class="font-medium">{{ seekerProfileinfo.phone_number || '-' }}</p>
                    <div class="w-5 h-5 ml-3">
                      <img src="@/assets/images/whats-up-icon.svg" alt="puzzle" class="w-full h-full" />
                    </div>
                  </div>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-1">{{ $t('reviews') }}</h5>
                  <div class="flex items-center">
                    <p class="font-medium">{{ Number(seekerProfileinfo.recommend).toFixed(2) || '-' }}% {{ $t('recommend') }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="enterpreneur-list-col-3">
              <div class="user-text">
                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-2">{{ $t('invoices_created') }}</h5>
                  <p class="font-medium">{{ seekerProfileinfo.invoices_created || '-' }}</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('invoices_sum') }}</h5>
                  <p class="font-medium">€ {{ Number(seekerProfileinfo.invoices_sum).toFixed(2) }}</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('personal_tax_label') }}</h5>
                  <p class="font-medium">{{ seekerProfileinfo.max_personal_tax || 60 }}%</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('max_tax_1') }}</h5>
                  <p class="font-medium">{{ seekerProfileinfo.min_personal_tax || 60 }}%</p>
                </div>

                <div class="flex items-center user-width py-3 break-all">
                  <h5 class="font-semibold user-width-col-2">{{ $t('personal_commission') }}</h5>

                  <p class="font-medium">{{ seekerProfileinfo.jobSeeker && seekerProfileinfo.jobSeeker.personal_commission }} %</p>
                </div>

                <div class="flex items-center user-width py-3">
                  <h5 class="font-semibold user-width-col-2">{{ $t('yearly_income') }}</h5>
                  <div class="flex flex-wrap items-center">
                    <p class="font-medium">€ {{ Number(seekerProfileinfo.yearly_income).toFixed(2) || '-' }}</p>
                    <span class="text-grey font-semibold ml-3">{{ $t('gross') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="xl:col-span-1 lg:col-span-2 col-span-2 vx-card md:p-8 p-6 gap-5 xl:mb-0 mb-3">
          <div class="user-text">
            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('finished_gigs') }}</h5>
              <p class="font-medium">{{ seekerProfileinfo.finished_gigs }}</p>
            </div>
            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('activity_points') }}</h5>
              <div class="flex items-center">
                <p class="font-medium">{{ seekerProfileinfo.activity_points }}</p>
                <div>
                  <vx-tooltip :text="$t('tooltip.Editpoints')">
                    <feather-icon icon="EditIcon" svgClasses="ml-2 h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="toggleEditPoints" />
                  </vx-tooltip>
                </div>
              </div>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('registered') }}</h5>
              <p class="font-medium">{{ formatDate(seekerProfileInfo.created_at) || '-' }}</p>
            </div>
            <div class="flex user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('last_login') }}</h5>
              <span v-if="this.lastLoginDate == null">
                <span class="text-grey font-semibold text-sm ml-2">{{ $t('notLoginYet') }}</span>
              </span>
              <span v-else>
                <p class="text-lg font-medium flex flex-wrap items-center">
                  {{ formatDate(seekerProfileInfo.first_login) || '-' }}

                  <span class="text-grey font-semibold text-sm ml-2">({{ daysCounted }} {{ $t('days_ago') }})</span>
                </p>
              </span>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('account_status') }}</h5>
              <p class="font-medium">{{ seekerProfileinfo.status }}</p>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('email_verified') }}</h5>
              <p class="font-medium">{{ seekerProfileinfo.verified == true ? 'Verified' : 'Unverified' }}</p>
            </div>

            <div class="flex items-center user-width py-3">
              <h5 class="font-semibold user-width-col-2">{{ $t('account_enabled') }}</h5>

              <vs-switch color="primary" v-model="seekerProfileinfo.blockStatus" @input="updateAccountStatus(seekerProfileinfo.id, seekerProfileinfo.blockStatus)" vs-value="active">
                <span slot="on">{{ $t('active') }}</span>
                <span slot="off">{{ $t('blocked') }}</span>
              </vs-switch>
            </div>
          </div>
        </div>
      </div>
      <!-- End -->

      <!-- Le Recipient-->
      <div class="odd-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          @search="updateSearchQueryLeRecipient"
          @change-page="handleChangePageLeRecipient"
          @sort="handleSortLeRecipient"
          :total="FilteredCountLeRecipient"
          pagination
          :max-items="lengthLeRecipient"
          search
          :data="leRecipientData"
          class="tbl-minwidth"
          id="table-loading"
        >
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th sort-key="total_parts">{{ $t('type') }}</vs-th>
            <vs-th sort-key="created_at">{{ $t('name') }}</vs-th>
            <vs-th sort-key="deduction_amount"> {{ $t('email') }} </vs-th>
            <vs-th sort-key="vat">{{ $t('phone') }} </vs-th>
            <vs-th sort-key="status">{{ $t('country') }} </vs-th>
            <vs-th sort-key="deduction_notes">{{ $t('address') }}</vs-th>
            <vs-th sort-key="payment_term">{{ $t('zip_code') }}</vs-th>
            <vs-th sort-key="total_parts">{{ $t('employer_y_tunnus') }}</vs-th>
            <vs-th sort-key="total_parts">{{ $t('tax_number') }}</vs-th>
          </template>
          <template slot="header">
            <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
              <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('recipient_list') }}</p>
            </div>
            <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
              <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                  <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ pageLeRecipient * lengthLeRecipient - (lengthLeRecipient - (FilteredCountLeRecipient && 1)) }}
                      -
                      {{ FilteredCountLeRecipient - pageLeRecipient * lengthLeRecipient > 0 ? pageDeducationPending * lengthLeRecipient : FilteredCountLeRecipient }}
                      {{ $t('of') }} {{ FilteredCountLeRecipient }}
                    </span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="handleChangePageLeRecipient(10)">
                      <span>10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangePageLeRecipient(20)">
                      <span>20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangePageLeRecipient(50)">
                      <span>50</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangePageLeRecipient(100)">
                      <span>100</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ pageLeRecipient * lengthLeRecipient - (lengthLeRecipient - i - 1) }}</vs-td>
              <vs-td> {{ titleCase(tr.owner_ship_type) || '-' }} </vs-td>
              <vs-td>{{ tr.company_name || '-' }}</vs-td>
              <vs-td> {{ tr.company_email || '-' }} </vs-td>
              <vs-td> {{ tr.mobile || '-' }} </vs-td>
              <vs-td>{{ (tr.user && tr.user.countryReference && tr.user.countryReference.country_name) || '-' }}</vs-td>
              <vs-td> {{ tr.address || '-' }} </vs-td>
              <vs-td> {{ tr.zip_code || '-' }} </vs-td>
              <vs-td> {{ tr.reg_number || '-' }} </vs-td>
              <vs-td> {{ tr.vat_number || '-' }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- End Le Recipient -->

      <!-- Payslip Upload -->
      <div class="even-table">
        <vs-table :data="jobseekers" class="tbl-minwidth">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('payment_type') }} </vs-th>
            <vs-th>{{ $t('invoice_Number') }} </vs-th>
            <vs-th>{{ $t('payment_date') }} </vs-th>
            <vs-th>{{ $t('payment_amount') }} </vs-th>
            <vs-th>{{ $t('deduction_amount') }} </vs-th>
            <vs-th>{{ $t('payslip_file') }} </vs-th>
            <vs-th>{{ $t('deduction_file') }} </vs-th>
            <vs-th>{{ $t('uploaded_on') }} </vs-th>
            <vs-th>{{ $t('action') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center sm:w-auto w-full">
              <div>
                <p class="mr-4 mt-5 md:mb-5 font-bold">{{ $t('payslip_uploads') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
            <div @click="addPayslipRecord" class="btn-add-new p-2 md:mr-4 mt-3 mb-3 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
              <span class="ml-2 text-base text-primary">{{ $t('add_payslips') }}</span>
            </div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td> {{ tr.id }}</vs-td>
              <vs-td> {{ tr.payment_type }} </vs-td>
              <vs-td> {{ tr.invoice_number }} </vs-td>
              <vs-td> {{ formatDate(tr.payment_date) }} </vs-td>
              <vs-td>€ {{ tr.amount_paid }} </vs-td>
              <vs-td>€ {{ tr.deduction_amount }} </vs-td>
              <vs-td> <img :src="tr.payslip_file_path" :alt="tr.payment_type" height="80" width="80" /> </vs-td>
              <vs-td> <img :src="tr.deudction_file_path" :alt="tr.payment_type" height="80" width="80" /> </vs-td>
              <vs-td> {{ formatDate(tr.created_at) }} </vs-td>
              <vs-td>
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.EditPayslip')">
                    <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="sendToEditPayslip(tr.id, tr.seekerId)" />
                  </vx-tooltip>
                  <vx-tooltip :text="$t('tooltip.DeletePayslip')">
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecordPayslip(tr.id)" />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- Payslip Uploads -->

      <!-- Review list start -->
      <ReviewList />
      <!-- Review list end -->

      <!-- Review list start -->
      <UserActivityLogs />
      <!-- Review list end -->

      <!-- Insurance Request -->
      <div class="odd-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          @search="updateSearchQueryInsuranceRequest"
          @change-page="handleChangePageInsuranceRequest"
          @sort="handleSortInsuranceRequest"
          :total="FilteredCountInsuranceRequest"
          pagination
          :max-items="lengthInsuranceRequest"
          search
          :data="insuranceRequest"
          class="tbl-minwidth"
        >
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th sort-key="insurance_name">{{ $t('insurance_name') }} </vs-th>
            <vs-th sort-key="insurance_number">{{ $t('insurance') }} </vs-th>
            <vs-th sort-key="insurance_email">{{ $t('email') }} </vs-th>
            <vs-th sort-key="insurance_website">{{ $t('website') }} </vs-th>
            <vs-th sort-key="insurance_packages">{{ $t('package') }} </vs-th>
          </template>
          <template slot="header">
            <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
              <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('insurance_request_1') }}</p>
            </div>
            <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
              <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                  <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ pageInsuranceRequest * lengthInsuranceRequest - (lengthInsuranceRequest - (FilteredCountInsuranceRequest && 1)) }}
                      -
                      {{ FilteredCountInsuranceRequest - pageInsuranceRequest * lengthInsuranceRequest > 0 ? pageInsuranceRequest * lengthInsuranceRequest : FilteredCountInsuranceRequest }}
                      {{ $t('of') }}
                      {{ FilteredCountInsuranceRequest }}
                    </span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="handleChangeLengthInsuranceRequest(10)">
                      <span>10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthInsuranceRequest(20)">
                      <span>20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthInsuranceRequest(50)">
                      <span>50</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthInsuranceRequest(100)">
                      <span>100</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
          </template>
          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td> {{ tr.insurance.insurance_name }} </vs-td>
              <vs-td> {{ tr.insurance.insurance_number }} </vs-td>
              <vs-td>
                <a class="text-dark text-decoration-underline fw-bold">{{ tr.insurance.insurance_email || '-' }}</a>
              </vs-td>
              <vs-td>
                <a class="text-decoration-underline fw-bold text-blue">{{ tr.insurance.insurance_website || '-' }}</a>
              </vs-td>
              <vs-td> {{ tr.insurance.insurance_packages || '-' }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
      <!-- Payslip Uploads -->

      <!-- Invoice Deductions Pending-->
      <div class="even-table">
        <div id="targetElement">
          <vs-table
            stripe
            :sst="true"
            maxHeight="500px"
            @search="updateSearchQueryDeducationPending"
            @change-page="handleChangePageDeducationPending"
            @sort="handleSortDeducationPending"
            :total="FilteredCountDeducationPending"
            pagination
            :max-items="lengthDeducationPending"
            search
            :data="seekerInvoiceDeductionPending"
          >
            <template slot="thead">
              <vs-th>{{ $t('sr') }}</vs-th>
              <vs-th sort-key="created_at">{{ $t('deduction_date') }}</vs-th>
              <vs-th sort-key="deduction_amount"> {{ $t('deduction_amount') }} </vs-th>
              <vs-th sort-key="vat">{{ $t('vat') }} (%) </vs-th>
              <vs-th sort-key="status">{{ $t('paid_status') }} </vs-th>
              <vs-th sort-key="deduction_notes">{{ $t('deduction_notes') }}</vs-th>
              <vs-th sort-key="payment_term">{{ $t('payment_term') }}</vs-th>
              <vs-th sort-key="total_parts">{{ $t('total_parts') }}</vs-th>
              <vs-th v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT]) || checkPermissionByIds([permissions.JOBSEEKER_LOGIN_AS]) || checkPermissionByIds([permissions.JOBSEEKER_DELETE])"
                >{{ $t('action') }}
              </vs-th>
            </template>
            <template slot="header">
              <div class="flex fl.seeker-text-elipsis { max-width: 540px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }ex-wrap justify-between items-center sm:w-auto xl:w-full">
                <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('invoice_deductions_pending') }}</p>
              </div>
              <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
                <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                  <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                    <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                      <span class="mr-2">
                        {{ pageDeducationPending * lengthDeducationPending - (lengthDeducationPending - (FilteredCountDeducationPending && 1)) }}
                        -
                        {{ FilteredCountDeducationPending - pageDeducationPending * lengthDeducationPending > 0 ? pageDeducationPending * lengthDeducationPending : FilteredCountDeducationPending }}
                        {{ $t('of') }} {{ FilteredCountDeducationPending }}
                      </span>
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>
                      <vs-dropdown-item @click="handleChangeLengthDeducationPending(10)">
                        <span>10</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLengthDeducationPending(20)">
                        <span>20</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLengthDeducationPending(50)">
                        <span>50</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangeLengthDeducationPending(100)">
                        <span>100</span>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </div>
            </template>

            <template slot="header">
              <div class="flex flex-wrap justify-between items-center">
                <div @click="addDeductionsRecord" class="btn-add-new p-2 md:mr-4 mb-3 ml-auto rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary">
                  <span class="ml-2 text-base text-primary">{{ $t('add_deductions') }}</span>
                </div>
              </div>
            </template>

            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td>{{ pageDeducationPending * lengthDeducationPending - (lengthDeducationPending - i - 1) }}</vs-td>
                <vs-td>
                  {{ formatDate(tr.created_at) }}
                </vs-td>
                <vs-td> {{ tr.deduction_amount.toFixed(2) }} </vs-td>
                <vs-td> {{ tr.vat }} </vs-td>
                <vs-td>
                  {{ tr.status }}
                </vs-td>
                <vs-td> {{ tr.deduction_notes ? tr.deduction_notes : '-' }} </vs-td>
                <vs-td> {{ tr.payment_term }} </vs-td>
                <vs-td> {{ tr.total_parts }} </vs-td>
                <vs-td>
                  <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                    <vx-tooltip :text="$t('tooltip.Editinvoice')" v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])">
                      <feather-icon
                        icon="EditIcon"
                        svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                        v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])"
                        @click="toggleEditDeductionModal(tr)"
                      />
                    </vx-tooltip>
                    <vx-tooltip :text="$t('tooltip.Remove')" v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])">
                      <feather-icon
                        icon="Trash2Icon"
                        svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                        v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])"
                        @click="deleteInvoiceRecord(tr.id)"
                      />
                    </vx-tooltip>
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <!-- End Invoice Deductions -->

      <!-- Invoice Deductions Paid-->
      <div class="odd-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          class="tbl-minwidth"
          @search="updateSearchQueryDeducationPaid"
          @change-page="handleChangePageDeducationPaid"
          @sort="handleSortDeducationPaid"
          :total="FilteredCountDeducationPaid"
          pagination
          :max-items="lengthDeducationPaid"
          search
          :data="seekerInvoiceDeductionFullyPaid"
        >
          <template slot="header">
            <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
              <div>
                <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('invoice_deductions_fully_paid') }}</p>
              </div>
            </div>
            <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
              <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                  <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                    <span class="mr-2">
                      {{ pageDeducationPaid * lengthDeducationPaid - (lengthDeducationPaid - (FilteredCountDeducationPaid && 1)) }}
                      -
                      {{ FilteredCountDeducationPaid - pageDeducationPaid * lengthDeducationPaid > 0 ? pageDeducationPaid * lengthDeducationPaid : FilteredCountDeducationPaid }}
                      {{ $t('of') }} {{ FilteredCountDeducationPaid }}
                    </span>
                    <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                  </div>
                  <vs-dropdown-menu>
                    <vs-dropdown-item @click="handleChangeLengthDeducationPaid(10)">
                      <span>10</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthDeducationPaid(20)">
                      <span>20</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthDeducationPaid(50)">
                      <span>50</span>
                    </vs-dropdown-item>
                    <vs-dropdown-item @click="handleChangeLengthDeducationPaid(100)">
                      <span>100</span>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
          </template>

          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th sort-key="created_at">{{ $t('deduction_date') }}</vs-th>
            <vs-th sort-key="deduction_amount"> {{ $t('deduction_amount') }} </vs-th>
            <vs-th sort-key="vat">{{ $t('vat') }} (%) </vs-th>
            <vs-th sort-key="status">{{ $t('paid_status') }} </vs-th>
            <vs-th sort-key="deduction_notes">{{ $t('deduction_notes') }}</vs-th>
            <vs-th sort-key="payment_term">{{ $t('payment_term') }}</vs-th>
            <vs-th sort-key="total_parts">{{ $t('total_parts') }}</vs-th>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ pageDeducationPaid * lengthDeducationPaid - (lengthDeducationPaid - i - 1) }}</vs-td>
              <vs-td>
                {{ formatDate(tr.created_at) }}
              </vs-td>
              <vs-td> {{ tr.deduction_amount.toFixed(2) }} </vs-td>
              <vs-td> {{ tr.vat }} </vs-td>
              <vs-td>
                {{ tr.status }}
              </vs-td>
              <vs-td> {{ tr.deduction_notes ? tr.deduction_notes : '-' }} </vs-td>
              <vs-td> {{ tr.payment_term }} </vs-td>
              <vs-td> {{ tr.total_parts }} </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- End Invoice Deductions -->

      <!-- user Fee statistics Paid-->
      <!-- user Fee statistics-->
      <div class="even-table fee-statistics-table">
        <div id="targetElementFeeStastics">
          <vs-table
            stripe
            :sst="true"
            maxHeight="500px"
            class="tbl-minwidth"
            @search="updateSearchQueryFeeStatistics"
            @change-page="handleChangePageFeeStatistics"
            @sort="handleSortFeeStatistics"
            :total="FilteredCountFeeStatistics"
            pagination
            :max-items="lengthFeeStatistics"
            search
            :data="seekerFeeStatistics"
          >
            <template slot="header">
              <div class="flex flex-wrap justify-between items-center sm:w-auto xl:w-full">
                <div>
                  <p class="mr-4 mt-5 md:mb-2 font-bold">{{ $t('fee_statistics') }}</p>
                </div>
              </div>
              <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
                <div class="md:mb-0 md:mr-4 md:w-auto w-full ag-grid-table-actions-left">
                  <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                    <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                      <span class="mr-2">
                        {{ pageFeeStatistics * lengthFeeStatistics - (lengthFeeStatistics - (FilteredCountDeducationPaid && 1)) }}
                        -
                        {{ FilteredCountFeeStatistics - pageFeeStatistics * lengthDeducationPaid > 0 ? pageFeeStatistics * lengthDeducationPaid : FilteredCountFeeStatistics }}
                        {{ $t('of') }} {{ FilteredCountFeeStatistics }}
                      </span>
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu>
                      <vs-dropdown-item @click="handleChangePageFeeStatistics(10)">
                        <span>10</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangePageFeeStatistics(20)">
                        <span>20</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangePageFeeStatistics(50)">
                        <span>50</span>
                      </vs-dropdown-item>
                      <vs-dropdown-item @click="handleChangePageFeeStatistics(100)">
                        <span>100</span>
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </div>
              </div>
            </template>

            <template slot="thead">
              <vs-th>{{ $t('sr') }}</vs-th>
              <vs-th sort-key="invoice_number">{{ $t('invoiceNumber') }}</vs-th>
              <vs-th sort-key="accident_insurance_amount"> {{ $t('accident_insurances') }} </vs-th>
              <vs-th sort-key="health_insurance_amount">{{ $t('health_insurances') }}</vs-th>
              <vs-th sort-key="w2w_commission_amount">{{ $t('platform_fees') }} </vs-th>
              <vs-th sort-key="commission_amount">{{ $t('all_fees_combined') }}</vs-th>
              <vs-th>{{ $t('action') }} </vs-th>
            </template>

            <template slot-scope="{ data }" ref="tableBody">
              <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                <vs-td>{{ pageFeeStatistics * lengthFeeStatistics - (lengthFeeStatistics - i - 1) }}</vs-td>
                <vs-td>
                  {{ tr.invoice_number }}
                </vs-td>
                <vs-td>€ {{ tr.accident_insurance_amount }} </vs-td>
                <vs-td>€ {{ tr.health_insurance_amount }} </vs-td>
                <vs-td>€ {{ tr.w2w_commission_amount }} </vs-td>
                <vs-td>€ {{ tr.commission_amount }} </vs-td>
                <vs-td>
                  <vs-dropdown vs-trigger-click class="cursor-pointer">
                    <div class="p-4 border border-solid d-theme-border-grey-light cursor-pointer flex items-center justify-between font-medium">
                      {{ $t('action') }}
                      <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                    </div>
                    <vs-dropdown-menu class="employer_action">
                      <vs-dropdown-item @click="viewSingleJobseekerProfile(tr.seeker && tr.seeker.user && tr.seeker.user.id)" v-validate="'required'">
                        {{ $t('adjust_service_fees') }}
                      </vs-dropdown-item>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
      <!-- End user Fee statistics -->

      <!-- Bank Details -->
      <div class="odd-table">
        <vs-table stripe :sst="true" maxHeight="500px" :data="[{}]" class="tbl-minwidth">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('user_name') }} </vs-th>
            <vs-th>{{ $t('bank_name') }} </vs-th>
            <vs-th>{{ $t('account_number') }} </vs-th>
            <vs-th>{{ $t('bic') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('bank_details') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template ref="tableBody">
            <vs-tr>
              <vs-td>
                {{ jobSeekerBankInfo.first_name || '-' }}
              </vs-td>
              <vs-td>
                {{ jobSeekerBankInfo.full_name }}
              </vs-td>
              <vs-td>
                {{ jobSeekerBankInfo && jobSeekerBankInfo.jobSeeker && jobSeekerBankInfo.jobSeeker.bank_name }}
              </vs-td>
              <vs-td> {{ jobSeekerBankInfo && jobSeekerBankInfo.jobSeeker && jobSeekerBankInfo.jobSeeker.account_number }} </vs-td>
              <vs-td>{{ jobSeekerBankInfo && jobSeekerBankInfo.jobSeeker && jobSeekerBankInfo.jobSeeker.bic_number }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- End Bank Details -->

      <!-- Light Entrepreneur Documents -->
      <div class="even-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          @search="updateSearchQuery"
          @change-page="handleChangePage"
          @sort="handleSort"
          :total="FilteredCount"
          :data="seekerDocumentInfo"
          class="tbl-minwidth"
        >
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('user_name') }} </vs-th>
            <vs-th>{{ $t('document') }} </vs-th>
            <vs-th>{{ $t('document_name_1') }} </vs-th>
            <vs-th>{{ $t('expire_date') }} </vs-th>
            <vs-th>{{ $t('action') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('light_entrepreneur_documents') }}</p>
              </div>
              <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left"></div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
              <vs-td> {{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </vs-td>
              <vs-td> {{ (tr.documentType && tr.documentType.document_name) || '-' }} </vs-td>
              <vs-td> {{ (tr.document_name && tr.document_name) || '-' }} </vs-td>
              <vs-td> {{ formatDate(tr.end_date) }} </vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT]) || checkPermissionByIds([permissions.JOBSEEKER_LOGIN_AS]) || checkPermissionByIds([permissions.JOBSEEKER_DELETE])">
                <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                  <vx-tooltip :text="$t('tooltip.Remove')" v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])">
                    <feather-icon
                      icon="Trash2Icon"
                      svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      v-if="checkPermissionByIds([permissions.JOBSEEKER_DELETE])"
                      @click="deleteLightEntrepreneur(tr.id)"
                    />
                  </vx-tooltip>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- End Light Entrepreneur Documents -->

      <!-- Gigs Applied For-->
      <div class="odd-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          @search="updateSearchQuery"
          @change-page="handleChangePage"
          @sort="handleSort"
          :total="FilteredCount"
          :data="seekerJobProposalsInfo"
          class="tbl-minwidth"
        >
          <template slot="thead">
            <vs-th>{{ $t('applied_date') }} </vs-th>
            <vs-th>{{ $t('gig_title') }} </vs-th>
            <vs-th>{{ $t('company_name_1') }} </vs-th>
            <vs-th>{{ $t('city') }} </vs-th>
            <vs-th>{{ $t('featured') }} </vs-th>
            <vs-th>{{ $t('status') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('gigs_applied_for') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>
                {{ formatDate(tr.created_at) }}
              </vs-td>
              <vs-td>{{ (tr.job && tr.job.job_title) || '-' }}</vs-td>
              <vs-td>{{ (tr.job && tr.job.company && tr.job.company.company_name) || '-' }}</vs-td>
              <vs-td>{{ (tr.job && tr.job.cityReference && tr.job.cityReference.city_name) || '-' }}</vs-td>
              <vs-td v-if="checkPermissionByIds([permissions.JOBSEEKER_EDIT])">
                <vs-td>
                  <div v-if="tr.job">
                    <vs-td>
                      <vs-button @click="seekerJobProposalFeatured(tr.job.id, false)" v-if="tr.job.is_featured == true" size="small" color="success"> {{ $t('yes') }} </vs-button>
                      <vs-button @click="seekerJobProposalFeatured(tr.job.id, true)" v-else size="small" style="background-color: red !important"> {{ $t('no') }} </vs-button>
                    </vs-td>
                  </div>
                  <div v-else>-</div>
                </vs-td>
              </vs-td>
              <vs-td>{{ (tr.job && tr.job.job_status) || '-' }}</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>

      <!-- End Gigs Applied For -->

      <!-- Register Light Entrepreneur Via Share Link List -->
      <div class="even-table">
        <vs-table
          stripe
          :sst="true"
          maxHeight="500px"
          @search="updateSearchQuery"
          @change-page="handleChangePage"
          @sort="handleSort"
          :total="FilteredCount"
          search
          :data="seekerRegisterShareLink"
          class="tbl-minwidth"
        >
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('candidate_name') }} </vs-th>
            <vs-th>{{ $t('register_date') }} </vs-th>
            <vs-th>{{ $t('commission') }} </vs-th>
            <vs-th>{{ $t('earn_amount_from') }} </vs-th>
            <vs-th>{{ $t('commission_total') }} </vs-th>
          </template>

          <template slot="header">
            <div class="flex flex-wrap justify-between items-center mb-3">
              <div>
                <p class="mr-4 mt-5 mb-5 font-bold">{{ $t('register_light_entrepreneur_via_share_link_list') }}</p>
              </div>
            </div>
            <div class="mb-3"></div>
          </template>

          <template slot-scope="{ data }" ref="tableBody">
            <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
              <vs-td>{{ tr.id }}</vs-td>
              <vs-td> {{ tr.full_name }} </vs-td>
              <vs-td> {{ formatDate(tr.created_at) }}</vs-td>
              <vs-td>-</vs-td>
              <vs-td>-</vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </div>
    <!-- End  profile info -->

    <!-- Password change -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="updatePassword" :title="$t('model.UpdatePassword')">
      <div class="con-exemple-prompt">
        <vs-input id="company_email" class="w-full" name="Password" type="password" v-validate="'required'" v-model="passwordForm.password" />
        <span class="text-primary text-sm" v-show="errors.has('Password')">{{ errors.first('Password') }}</span>
      </div>
      <div class="footer text-right">
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="updatePassword = false"> {{ $t('close') }} </vs-button>
        <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-success vs-button-filled p-3" @click="passwordUpdate" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
      </div>
    </vs-popup>
    <!-- End Update password -->

    <!-- Tax Info -->
    <vs-popup button-accept="false" button-cancel="false" :active.sync="taxInfoPopup" :title="$t('model.MyTaxInformation')">
      <div class="footer text-right">
        <vs-table :data="[{}]">
          <template slot="thead">
            <vs-th>{{ $t('sr') }}</vs-th>
            <vs-th>{{ $t('created_on') }} </vs-th>
            <vs-th>{{ $t('yearly_income') }} </vs-th>
            <vs-th>{{ $t('personal_tax') }} </vs-th>
            <vs-th>{{ $t('max_tax') }} </vs-th>
          </template>

          <template ref="tableBody">
            <vs-tr>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
              <vs-td> - </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="flex flex-wrap justify-between items-center mb-3">
          <div>
            <p class="mr-4 mt-5 font-bold">{{ $t('fake_total_yearly_income') }} : 532,000.00€</p>
          </div>
        </div>
        <vs-button class="mt-2 text-sm p-3" color="primary" type="filled" @click="taxInfoPopup = false"> {{ $t('close') }} </vs-button>
      </div>
    </vs-popup>
    <!-- End Tax Info -->

    <!-- End payslipPopup -->
    <DeducationPopUpModal v-if="isDeducationModalMounted" :isModalShow.sync="isDeducationModalShow" :deductionId="selectedDeduction.id" @done="getData" />
    <!--  -->
    <AddPaySlipPopUpModal v-if="isPaySlipModalMounted" :isModalShow.sync="isPaySlipModalShow" @done="getAllPayslipData" />

    <div id="pdf-container"></div>
    <ActivityPointModal v-if="isActivityPointModalMounted" :activityPoint="Number(seekerProfileinfo.activity_points)" :isModalShow.sync="isActivityPointModalShow" @done="seekerProfileInfo" />
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import EmployeDetails from '../pdf/EmployeDetails.vue'
import DeducationPopUpModal from './components/DeducationPopUpModal.vue'
import AddPaySlipPopUpModal from './components/AddPaySlipPopUpModal.vue'
import ActivityPointModal from './components/ActivityPointModal.vue'
import ReviewList from './ReviewList.vue'
import UserActivityLogs from './UserActivityLogs.vue'
import moment from 'moment'
import Vue from 'vue'
export default {
  name: 'JobEntrepreneurList',
  components: {
    Select2,
    DatePicker,
    DeducationPopUpModal,
    ActivityPointModal,
    AddPaySlipPopUpModal,
    ReviewList,
    UserActivityLogs
  },
  data() {
    return {
      lastLoginDate: null,
      accountLock: false,
      statusVerify: false,
      quickPaySwitch: false,
      taxInfoPopup: false,
      updatePassword: false,
      payslipPopup: false,
      deductionsPopup: false,
      seekerProfileinfo: {},
      order: [],
      length: 10,
      page: 1,
      search: '',
      data: [{}],
      val: '',
      extra_info: '',
      // Password Update Form
      passwordForm: {
        password: ''
      },
      // Payslip Form
      payslip_form: {
        payment_type: null,
        invoice_number: '',
        amount_paid: '',
        deduction_amount: '',
        payment_date: '',
        seekerId: this.$route.params.id,
        payslip_receipt: '',
        deduction_receipt: ''
      },

      //deduction variables
      isDeducationModalMounted: false,
      isDeducationModalShow: false,
      selectedDeduction: {},

      //ActivityPoint variable
      isActivityPointModalMounted: false,
      isActivityPointModalShow: false,

      //pending deducation
      orderDeducationPending: [],
      lengthDeducationPending: 10,
      pageDeducationPending: 1,
      searchDeducationPending: '',

      orderLeRecipient: [],
      lengthLeRecipient: 10,
      pageLeRecipient: 1,
      searchLeRecipient: '',

      //Insurance Request
      orderInsuranceRequest: [],
      lengthInsuranceRequest: 10,
      pageInsuranceRequest: 1,
      searchInsuranceRequest: '',

      //paid deduction
      orderDeducationPaid: [],
      lengthDeducationPaid: 10,
      pageDeducationPaid: 1,
      searchDeducationPaid: '',

      //fee statistics
      pageFeeStatistics: 1,
      lengthFeeStatistics: 10,
      orderFeeStatistics: [],
      searchFeeStatistics: '',

      //invoice number
      invoiceNumber: [],

      // pay slip modal
      //deduction variables
      isPaySlipModalMounted: false,
      isPaySlipModalShow: false,
      seekerId: null,

      generating: false
    }
  },
  mixins: [dateMixins],
  async mounted() {
    await this.getData()
    await this.seekerProfileInfo()

    if (this.$route.params.scrollTag) {
      await this.scrollToTargetAdjusted()
    }
    if (this.$route.params.scrollTagFee) {
      await this.scrollToTargetAdjustedFee()
    }
  },
  computed: {
    ...mapState('employer', ['loading', 'total', 'FilteredCount', 'employers', 'employerInfo']),
    ...mapState('jobseeker', [
      'loading',
      'total',
      'FilteredCount',
      'jobseekers',
      'insuranceRequest',
      'getPayslipRecords',
      'jobSeekerBankInfo',
      'seekerInvoiceDeductionPending',
      'seekerInvoiceDeductionFullyPaid',
      'seekerProfileId',
      'seekerDocumentInfo',
      'seekerJobProposalsInfo',
      'totalseekerJob',
      'FilteredCountseekerJob',
      'seekerRegisterShareLink',
      'VatTypes',
      'seekerProfile',
      'seekerProfileInfoId',
      'FilteredCountDeducationPending',
      'FilteredCountDeducationPaid',
      'TotalDeducationPending',
      'TotalDeducationPaid',
      'FilteredCountInsuranceRequest',
      'TotalInsuranceRequest',
      'leRecipientData',
      'FilteredCountLeRecipient',
      'TotalLeRecipient',
      'seekerFeeStatistics',
      'FilteredCountFeeStatistics',
      'TotalFeeStatistics'
    ]),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),

    console: () => console,

    // For Validation
    validateForm() {
      return !this.errors.any()
    },

    employerData() {
      return this.employers.reduce((acc, item) => {
        item.employerStatus = item.status === 'blocked' ? false : true
        acc.push(item)
        return acc
      }, [])
    },
    jobseekerData() {
      return this.jobseekers.reduce((acc, item) => {
        item.jobseekerStatus = item.status === 'blocked' ? false : true
        acc.push(item)
        return acc
      }, [])
    },

    daysCounted() {
      const currentDate = new Date()
      var dateOne = moment(currentDate)
      var dateTwo = moment(this.lastLoginDate)
      var result = dateOne.diff(dateTwo, 'days')
      return !result ? 0 : result
    }
  },
  methods: {
    ...mapMutations('employer', { setState: 'SET_STATE' }),
    ...mapActions('employer', { getAllEmployer: 'getAllEmployers', updateCompanyStatus: 'updateCompanyStatus', deleteEmployer: 'deleteEmployer', getEmployerById: 'getEmployerById' }),
    ...mapActions('jobseeker', {
      addRecordPayslip: 'addRecordPayslip',
      getSeekerInvoiceDeductionsPending: 'getSeekerInvoiceDeductionsPending',
      getSeekerInvoiceDeductionsFullyPaid: 'getSeekerInvoiceDeductionsFullyPaid',
      deleteSeekerInvoiceDeductions: 'deleteSeekerInvoiceDeductions',
      getJobSeekerBankInfo: 'getJobSeekerBankInfo',
      getAllPayslip: 'getAllPayslip',
      deletePayslipRecord: 'deletePayslipRecord',
      getAllJobSeekers: 'getAllJobSeekers',
      getAllInsuranceRequest: 'getAllInsuranceRequest',
      getSeekersDocument: 'getSeekersDocument',
      getSeekerProposalsById: 'getSeekerProposalsById',
      getRegisteredShareLink: 'getRegisteredShareLink',
      udatePasswordJobseeker: 'udatePasswordJobseeker',
      getSeekerProposalsFeatured: 'getSeekerProposalsFeatured',
      deleteLightEntrepreneurRecord: 'deleteLightEntrepreneurRecord',
      updateUserAccountStatus: 'updateUserAccountStatus',
      getAllLeRecipientList: 'getAllLeRecipientList',
      getSeekerFeeStatistics: 'getSeekerFeeStatistics',
      downloadSingleSeekerProfilePdf: 'downloadSingleSeekerProfilePdf'
    }),

    ...mapMutations('jobseeker', { setState: 'SET_STATE' }),

    // Employer Profile Get
    async viewProfile(id) {
      this.userProfile = true
      const getEmployerInfo = await this.getEmployerById(id)
      return getEmployerInfo
    },
    sendToEditPayslip(id, seekerId) {
      this.$router.push(`/payslip/${id}/${seekerId}/edit`)
    },
    updatePasswordPopup() {
      this.updatePassword = true
    },
    showMyTaxInfo() {
      this.taxInfoPopup = true
    },
    addPayslipRecord() {
      this.isPaySlipModalMounted = true
      this.isPaySlipModalShow = true
    },
    payslipReceiptFile(e) {
      this.payslip_form.payslip_receipt = e.target.files[0]
    },
    deductionReceiptFile(e) {
      this.payslip_form.deduction_receipt = e.target.files[0]
    },

    async createRecordPayslip() {
      // Formatted Date
      this.payslip_form.payment_date = dateMixins.methods.formatOldDate(this.payslip_form.payment_date)

      // append payslip_form data

      const data = new FormData()
      data.append('payment_type', this.payslip_form.payment_type)
      data.append('invoice_number', this.payslip_form.invoice_number)
      data.append('amount_paid', this.payslip_form.amount_paid)
      data.append('deduction_amount', this.payslip_form.deduction_amount)
      data.append('payment_date', this.payslip_form.payment_date)
      data.append('seekerId', this.payslip_form.seekerId)
      data.append('payslip_receipt', this.payslip_form.payslip_receipt)
      data.append('deduction_receipt', this.payslip_form.deduction_receipt)

      if (!(await this.$validator.validate())) {
        return false
      }

      try {
        const { message } = await this.addRecordPayslip(data)
        this.getData()
        this.payslipPopup = false
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
    addDeductionsRecord() {
      this.isDeducationModalMounted = true
      this.isDeducationModalShow = true
    },

    // scroll to target record.
    scrollToTargetAdjusted() {
      var element = document.getElementById('targetElement')
      var headerOffset = 45
      var elementPosition = element.getBoundingClientRect().top
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },

    // scroll to fee statistics section
    scrollToTargetAdjustedFee() {
      var element = document.getElementById('targetElementFeeStastics')
      var headerOffset = 45
      var elementPosition = element.getBoundingClientRect().top
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },

    // Employer Pending To Active
    async pendingToActive(id, status) {
      try {
        const { message } = await this.updateCompanyStatus({
          id,
          status: 'active'
        })

        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    // Send Mail
    sendMail() {},
    // first later capital
    titleCase(text) {
      var splitStr = text.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },

    //update job status
    async seekerJobProposalFeatured(id, is_status) {
      try {
        const { message } = await this.getSeekerProposalsFeatured({
          id,
          is_status
        })
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    //download PDF
    async empDetailPdf(empInfo) {
      this.generating = true
      const ap = document.querySelector('#mount-node')
      if (ap) {
        ap.remove()
      }
      const elem = document.querySelector('#pdf-container')
      const mounteNode = document.createElement('div')
      mounteNode.id = 'mount-node'
      elem.append(mounteNode)

      const pdfEmp = Vue.extend(EmployeDetails)
      new pdfEmp({
        propsData: {
          empinfo: empInfo
        }
      })
        .$on('downloaded', () => {
          this.generating = false
        })
        .$mount('#mount-node')
    },
    // Quick Pay Inactive
    quickPay() {
      this.quickPayInactive = true
    },
    //download seeker details PDF
    async seekerDetailPdf(seekerProfileData) {
      this.generating = true
      await this.downloadSingleSeekerProfilePdf({
        seekerId: this.$route.params.id
      }).then((res) => {
        this.downLoadFile(res.data)
        this.generating = false
      })
    },
    async downLoadFile(data) {
      try {
        const url = await URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = `${this.seekerProfileinfo.full_name} profileinfo.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (err) {
        console.log({ err })
      }
    },

    async deleteEmployerRecord(id) {
      try {
        const { message } = await this.deleteEmployer(id)
        this.$vs.notify({
          title: 'Success',
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
    deleteRecordPayslip(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete this record?',
        accept: () => this.deletePayslipRecordById(id),
        acceptText: 'Delete'
      })
    },
    async deletePayslipRecordById(id) {
      try {
        const { message } = await this.deletePayslipRecord(id)
        this.$vs.notify({
          title: 'Success',
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
    //delete Light Entrepreneur Documents
    deleteLightEntrepreneur(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete this record?',
        accept: () => this.deleteLightEntrepreneurById(id),
        acceptText: 'Delete'
      })
    },
    async deleteLightEntrepreneurById(id) {
      try {
        const { message } = await this.deleteLightEntrepreneurRecord(id)
        this.$vs.notify({
          title: 'Success',
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

    handleChangePage(page) {
      this.page = page
      this.getData()
    },
    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },
    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    //pending deduction
    handleChangeLengthDeducationPending(length) {
      this.pageDeducationPending = 1
      this.lengthDeducationPending = length
      this.getDeduction()
    },
    handleChangePageDeducationPending(page) {
      this.pageDeducationPending = page
      this.getDeduction()
    },
    handleSortDeducationPending(key, active) {
      this.pageDeducationPending = 1
      this.orderDeducationPending = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getDeduction()
    },
    updateSearchQueryDeducationPending(val) {
      this.pageDeducationPending = 1
      this.searchDeducationPending = val
      this.getDeduction()
    },

    //fully deduction
    handleChangeLengthDeducationPaid(length) {
      this.pageDeducationPaid = 1
      this.lengthDeducationPaid = length
      this.getData()
    },
    handleChangePageDeducationPaid(page) {
      this.pageDeducationPaid = page
      this.getDeductionFullPaid()
    },
    handleSortDeducationPaid(key, active) {
      this.pageDeducationPaid = 1
      this.orderDeducationPaid = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getDeductionFullPaid()
    },
    updateSearchQueryDeducationPaid(val) {
      this.pageDeducationPaid = 1
      this.searchDeducationPaid = val
      this.getDeductionFullPaid()
    },

    //fee statistics
    handleChangeLengthFeeStatistics(length) {
      this.pageFeeStatistics = 1
      this.lengthFeeStatistics = length
      this.getData()
    },
    handleChangePageFeeStatistics(page) {
      this.pageFeeStatistics = page
      this.getFeeStatistics()
    },
    handleSortFeeStatistics(key, active) {
      this.pageFeeStatistics = 1
      this.orderFeeStatistics = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getFeeStatistics()
    },
    updateSearchQueryFeeStatistics(val) {
      this.pageFeeStatistics = 1
      this.searchFeeStatistics = val
      this.getFeeStatistics()
    },

    //pending deduction
    handleChangeLengthInsuranceRequest(length) {
      this.pageInsuranceRequest = 1
      this.lengthInsuranceRequest = length
      this.getSeekerInsuranceRequest()
    },
    handleChangePageInsuranceRequest(page) {
      this.pageInsuranceRequest = page
      this.getSeekerInsuranceRequest()
    },
    handleSortInsuranceRequest(key, active) {
      this.pageInsuranceRequest = 1
      this.orderInsuranceRequest = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getSeekerInsuranceRequest()
    },
    updateSearchQueryInsuranceRequest(val) {
      this.pageInsuranceRequest = 1
      this.searchInsuranceRequest = val
      this.getSeekerInsuranceRequest()
    },
    // le recipient
    handleChangeLengthLeRecipient(length) {
      this.pageLeRecipient = 1
      this.lengthLeRecipient = length
      this.getLeRecipient()
    },
    handleChangePageLeRecipient(page) {
      this.pageLeRecipient = page
      this.getLeRecipient()
    },
    handleSortLeRecipient(key, active) {
      this.pageLeRecipient = 1
      this.orderLeRecipient = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getLeRecipient()
    },
    updateSearchQueryLeRecipient(val) {
      this.pageLeRecipient = 1
      this.searchLeRecipient = val
      this.getLeRecipient()
    },

    async getData() {
      await this.getAllEmployer({
        limit: this.length,
        page: this.page,
        search: this.search
      })
      await this.getDeduction()
      await this.getDeductionFullPaid()
      // payslip get data api function call
      await this.getAllPayslipData()
      await this.getBankinfo()
      await this.getJobProposalDetail()
      await this.getSeekerDocumentsDetail()
      await this.getSeekerRegisteredShareLink()
      await this.getSeekerInsuranceRequest()
      await this.getLeRecipient()
      await this.getFeeStatistics()
    },
    async seekerProfileInfo() {
      let seekerId = localStorage.getItem('seekerProfileInfoId')
      await this.$store
        .dispatch('jobseeker/getJobseekerById', seekerId)
        .then((res) => {
          this.lastLoginDate = res.data.data.first_login
          this.seekerProfileinfo = { blockStatus: res.data.data.status == 'active' ? true : false, ...res.data.data }
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
    async editJobseekerRecord(id) {
      this.$router.push(`/jobseeker/${id}/edit`)
    },
    getAllPayslipData() {
      this.$store.dispatch('jobseeker/getAllPayslip', this.$route.params.id)
    },
    getDeduction() {
      const payload = {
        page: this.pageDeducationPending,
        limit: this.lengthDeducationPending,
        order: this.orderDeducationPending,
        search: this.searchDeducationPending,
        deducation_status: 'pending'
      }
      this.$store.dispatch('jobseeker/getSeekerInvoiceDeductionsPending', { id: this.$route.params.id, payload })
    },
    getLeRecipient() {
      const payload = {
        page: this.pageLeRecipient,
        limit: this.lengthLeRecipient,
        order: this.orderLeRecipient,
        search: this.searchLeRecipient
      }
      this.$store.dispatch('jobseeker/getAllLeRecipientList', { id: this.$route.params.id, payload })
    },
    //get full paid deduction
    getDeductionFullPaid() {
      const payload = {
        page: this.pageDeducationPaid,
        limit: this.lengthDeducationPaid,
        order: this.orderDeducationPaid,
        search: this.searchDeducationPaid,
        deducation_status: 'paid'
      }
      this.$store.dispatch('jobseeker/getSeekerInvoiceDeductionsFullyPaid', { id: this.$route.params.id, payload })
    },

    //get full paid deduction
    getFeeStatistics() {
      const payload = {
        page: this.pageFeeStatistics,
        limit: this.lengthFeeStatistics,
        order: this.orderFeeStatistics,
        search: this.searchFeeStatistics
      }
      this.$store.dispatch('jobseeker/getSeekerFeeStatistics', { id: this.$route.params.id, payload })
    },

    getBankinfo() {
      this.$store.dispatch('jobseeker/getJobSeekerBankInfo', localStorage.getItem('seekerProfileInfoId'))
    },
    getSeekerDocumentsDetail() {
      this.$store.dispatch('jobseeker/getSeekersDocument', localStorage.getItem('seekerProfileInfoId'))
    },
    getJobProposalDetail() {
      this.$store.dispatch('jobseeker/getSeekerProposalsById', this.$route.params.id)
    },
    getSeekerRegisteredShareLink() {
      let seekerId = localStorage.getItem('seekerProfileInfoId')
      this.$store.dispatch('jobseeker/getRegisteredShareLink', this.$route.params.id)
    },
    viewSingleEmployer(id) {
      this.$router.push(`/employer/${id}/info`)
    },

    getSeekerInsuranceRequest() {
      const payload = {
        page: this.pageInsuranceRequest,
        limit: this.lengthInsuranceRequest,
        order: this.orderInsuranceRequest,
        search: this.searchInsuranceRequest
      }
      this.$store.dispatch('jobseeker/getAllInsuranceRequest', { id: this.$route.params.id, payload })
    },
    handleStatusChange(i) {
      this.setState({
        action: `employers[${i}].status`,
        data: 'active'
      })
    },
    async updateStatus(id, status) {
      try {
        if (status === 'active') {
          const { message } = await this.updateCompanyStatus({
            id,
            status: 'blocked'
          })
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.getData()
        } else {
          const { message } = await this.updateCompanyStatus({
            id,
            status: 'active'
          })
          this.getData()
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        }
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    //Payslip Module
    async add_payslip() {
      if (!(await this.$validator.validate())) {
        return false
      }
    },

    //seeker Invoice Deduction  delete
    deleteInvoiceRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirm Delete',
        text: 'Are you sure, you want to delete invoice deduction this record?',
        accept: () => this.deleteSeeketInvoiceRecord(id),
        acceptText: 'Delete'
      })
    },
    async deleteSeeketInvoiceRecord(id) {
      try {
        const { message } = await this.deleteSeekerInvoiceDeductions(id)
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getDeduction()
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

    // Update Password
    async passwordUpdate() {
      try {
        const { message } = await this.udatePasswordJobseeker({
          id: this.seekerProfile.id,
          data: {
            ...this.passwordForm
          }
        })
        this.updatePassword = false
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
    //edit deduction modal
    toggleEditDeductionModal(data) {
      this.selectedDeduction = data
      this.isDeducationModalMounted = true
      this.isDeducationModalShow = true
    },

    toggleEditPoints(data) {
      this.isActivityPointModalMounted = true
      this.isActivityPointModalShow = true
    },

    //update account status
    async updateAccountStatus(id, status) {
      try {
        const { message } = await this.updateUserAccountStatus({
          id,
          status: status == false ? 'blocked' : 'active'
        })
        await this.seekerProfileInfo()
        this.$vs.notify({
          title: 'Success',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } catch (err) {
        const { message } = err
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    },

    titleCase(text) {
      var splitStr = text.toLowerCase().split(' ')
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
      }
      return splitStr.join(' ')
    },
    viewSingleJobseekerProfile(seekerId) {
      this.$router.push(`/jobseeker/${seekerId}/edit`)
    }
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
    isDeducationModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.selectedDeduction = {}
            this.isDeducationModalMounted = false
          }, 0)
        }
      }
    },
    isPaySlipModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.selectedDeduction = {}
            this.isPaySlipModalMounted = false
          }, 0)
        }
      }
    },
    isActivityPointModalShow: {
      immediate: true,
      handler(newVal) {
        if (newVal === false) {
          setTimeout(() => {
            this.isActivityPointModalMounted = false
          }, 0)
        }
      }
    },
    generating() {
      if (this.generating) {
        this.$vs.loading({
          container: '#seekerDetail_pdf',
          scale: 0.45
        })
      } else {
        this.$vs.loading.close('#seekerDetail_pdf  > .con-vs-loading')
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isActivityPointModalShow = false
    this.payslipPopup = false
    this.isDeducationModalShow = false
    this.taxInfoPopup = false
    this.updatePassword = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>

<style lang="scss">
#employer-profile {
  .vs-popup {
    width: calc(100% - 50%) !important;
  }
}
.odd-table {
  .header-table {
    padding: 0px 8px;
  }
  background-color: #fff;
  tr {
    background-color: #fff !important;
  }
}
.even-table {
  .header-table {
    padding: 0px 8px;
  }
  background-color: #f8f8f8;
  tr {
    background-color: #f8f8f8;
  }
  &.fee-statistics-table {
    .vs-table--tbody {
      max-height: 700px !important;
    }
  }
}
</style>
<style>
.odd-table .vs-con-table.stripe .tr-values:nth-child(2n) {
  background-color: #fff !important;
}
</style>
<style lang="scss">
.tbl-minwidth {
  .vs-con-tbody.vs-table--tbody {
    @media (max-width: 576px) {
      min-width: 900px;
    }
  }
}
.vs-table--header {
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
}
.vs-table--search {
  max-width: 200px;

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
.user-text {
  h5,
  p {
    color: #636363;
    font-size: 14px;
  }
  .user-width-col-1 {
    min-width: 80px;
    @media (max-width: 1520px) {
      min-width: 100px;
    }
  }
  .user-width-col-2 {
    min-width: 190px;
  }
}

.enterpreneur-list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media (max-width: 1440px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .vx-card {
    box-shadow: 0px 1px 11px 0px rgba(114, 112, 112, 0.1);
    border-radius: 20px;
  }

  .start-width {
    width: 30px;
  }

  .review-star:hover {
    fill: #e4aa18;
    cursor: pointer;
  }
}
.enterpreneur-list-col-2 {
  max-width: 40%;
  flex-basis: 40%;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
  }
}

.enterpreneur-list-col-3 {
  max-width: 50%;
  flex-basis: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
  }
}
.header-table {
  flex-wrap: wrap;
}
</style>
