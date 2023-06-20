<template>
  <div class="recently_added__items">
    <vs-card class="cardx bg-green-500">
      <vs-table stripe maxHeight="500px" :data="insuranceRequests" class="responsive-table">
        <template slot="header">
          <!-- TABLE ACTION ROW -->
          <p class="font-bold text-xl mb-2">{{ $t('insurance_request') }}</p>
        </template>

        <template slot="thead">
          <vs-th>{{ $t('name') }}</vs-th>
          <vs-th>{{ $t('email') }}</vs-th>
          <vs-th>{{ $t('telephone') }} </vs-th>
          <vs-th>{{ $t('insurance_name') }}</vs-th>
          <vs-th>{{ $t('request_on') }}</vs-th>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td> {{ tr.seeker && tr.seeker.user && tr.seeker.user.full_name }} </vs-td>
            <vs-td> {{ tr.seeker && tr.seeker.user && tr.seeker.user.email }} </vs-td>
            <vs-td> {{ tr.seeker && tr.seeker.user && tr.seeker.user.phone_number }} </vs-td>
            <vs-td> {{ tr.insurance && tr.insurance.insurance_name }} </vs-td>
            <vs-td>{{ formatDate(tr.created_at) }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
  name: 'InsuranceRequest',
  data() {
    return {}
  },
  mixins: [dateMixins],
  computed: {
    ...mapState('dashboard', ['loading', 'insuranceRequests'])
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
    }
  }
}
</script>
<style lang="scss" scoped>
.vs-table--tbody-table {
  @media (max-width: 768px) {
    min-width: 950px;
  }
}
</style>
<style lang="scss" scoped>
.responsive-table {
  .vs-con-tbody.vs-table--tbody {
    @media (max-width: 768px) {
      min-width: 900px;
    }
  }
}
</style>
