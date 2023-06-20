<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="vx-card p-6 pb-10 pt-10 pl-10">
      <vs-table class="vs-con-loading__container" stripe :sst="true" maxHeight="500px" :data="requestResumeData">
        <template slot="thead">
          <vs-th>{{ $t('employer_name') }}</vs-th>
          <vs-th>{{ $t('requested_on') }}</vs-th>
          <vs-th>{{ $t('action') }}</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>
              {{ (tr.company && tr.company.user && tr.company.user.full_name) || '-' }}
            </vs-td>
            <vs-td>
              {{ formatDate(tr.created_at) }}
            </vs-td>
            <vs-td>
              <vs-button @click="updateRequestStatus(tr.id, 'approved')" v-if="tr.status == 'pending'" size="small" style="background-color: red !important"> {{ $t('reject') }} </vs-button>
              <vs-button @click="updateRequestStatus(tr.id, 'approved')" v-else-if="tr.status == 'declined'" size="small" style="background-color: red !important"> {{ $t('reject') }} </vs-button>
              <vs-button @click="updateRequestStatus(tr.id, 'declined')" v-else size="small" color="success"> {{ $t('approve') }} </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'
import SendEmailModal from '@/views/job-seekers/components/SendEmailModal'

export default {
  name: 'ResumeRequest',
  components: {
    Select2,
    SendEmailModal
  },
  data() {
    return {
      invoiceUpdate: false,
      selectedJobseeker: null,
      order: [],
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
    ...mapState('jobseeker', ['loading', 'requestResumeList']),
    requestResumeData() {
      return this.requestResumeList.reduce((acc, item) => {
        item.requestResumeStatus = item.status === 'pending' ? 'Request Denied' : 'Request Approved'
        acc.push(item)
        return acc
      }, [])
    }
  },
  methods: {
    ...mapActions('jobseeker', { getRequestResumeList: 'getRequestResumeList', updateRequestResumeStatus: 'updateRequestResumeStatus' }),
    getData() {
      this.getRequestResumeList(this.$route.params.id)
    },
    async updateRequestStatus(id, status) {
      try {
        const { message } = await this.updateRequestResumeStatus({
          id,
          status: status
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
