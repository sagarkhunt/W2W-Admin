<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card p-6 pb-10 pt-10 pl-10">
      <vs-table class="vs-con-loading__container" stripe :sst="true" maxHeight="500px" @change-page="handleChangePage" :max-items="length" :data="proposalData">
        <template slot="header">
          <div class="mb-3">
            <h2>{{ $t('gig_applications') }}</h2>
          </div>
        </template>
        <template slot="thead">
          <vs-th>{{ $t('applied_on') }}</vs-th>
          <vs-th> {{ $t('gig_title') }} </vs-th>
          <vs-th>{{ $t('company_name_1') }}</vs-th>
          <vs-th>{{ $t('city') }}</vs-th>
          <vs-th>{{ $t('featured') }}</vs-th>
          <vs-th>{{ $t('status') }}</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td>
              {{ (tr.job && tr.job.job_title) || '-' }}
            </vs-td>
            <vs-td>
              {{ tr.job && tr.job.company && tr.job.company.company_name }}
            </vs-td>
            <vs-td>
              {{ (tr.job && tr.job.company && tr.job.company.companyCity && tr.job.company.companyCity.city_name) || '-' }}
            </vs-td>

            <vs-td>
              <vs-button @click="updateFeaturedStatus(tr.job.id, false)" v-if="tr.job.is_featured == 'Yes'" size="small" color="success"> {{ $t('yes') }} </vs-button>
              <vs-button @click="updateFeaturedStatus(tr.job.id, true)" v-else size="small" style="background-color: red !important"> {{ $t('no') }} </vs-button>
            </vs-td>

            <vs-td>
              <vs-button @click="updateJobRequestStatus(tr.job.id, 'blocked')" v-if="tr.job.job_status == 'Active'" size="small" color="success"> {{ $t('active') }} </vs-button>
              <vs-button @click="updateJobRequestStatus(tr.job.id, 'active')" v-else size="small" style="background-color: red !important"> {{ $t('blocked') }} </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'ViewProposal',
  data() {
    return {
      invoiceUpdate: false,
      selectedJobseeker: null,

      length: 10,
      page: 1,
      search: '',
      val: '',
      data: [{}],
      seekerId: '',
      // send email modal
      isSendEmailModalMounted: false,
      isSendEmailModalShow: false
    }
  },
  mixins: [dateMixins],
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('jobseeker', ['loading', 'proposalList']),
    proposalData() {
      const tempProposalList = JSON.parse(JSON.stringify(this.proposalList))
      return tempProposalList.reduce((acc, item) => {
        item.job.is_featured = item.job.is_featured === true ? 'Yes' : 'No'
        item.job.job_status = item.job.job_status === 'active' ? 'Active' : 'Blocked'
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('jobseeker', {
      getProposalList: 'getProposalList',
      updateRequestResumeFeaturedStatus: 'updateRequestResumeFeaturedStatus',
      updateRequestResumeJobStatus: 'updateRequestResumeJobStatus'
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
    getData() {
      this.getProposalList(this.$route.params.id)
    },
    //update request featured status
    async updateFeaturedStatus(id, status) {
      try {
        const { message } = await this.updateRequestResumeFeaturedStatus({
          id,
          status
        })
        this.getData(this.$route.params.id)
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

    //update job request status
    async updateJobRequestStatus(id, status) {
      try {
        const { message } = await this.updateRequestResumeJobStatus({
          id,
          status
        })
        this.getData(this.$route.params.id)
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

    // Send Mail
    toggleSendEmailPopup(tr) {
      this.selectedJobseeker = tr
      this.isSendEmailModalMounted = true
      this.isSendEmailModalShow = true
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
    // handle callback for send email
    isSendEmailModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isSendEmailModalMounted = false
          }, 0)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.vs-button-warning.vs-button-filled {
  background: #000 !important;
}
</style>
