<template>
	<div class="recently_added__items">
		<vs-card class="cardx bg-green-500">
			<vs-table stripe maxHeight="500px" :data="le60PerTaxInvoice">
				<template slot="header">
					<!-- TABLE ACTION ROW -->
					<p class="font-bold text-xl mb-2">{{$t('le_with_60_tax_open_invoices')}}</p>
				</template>

				<template slot="thead">
					<vs-th>{{$t('le')}}</vs-th>
					<vs-th>{{$t('email')}}</vs-th>
					<vs-th>{{$t('telephone')}}</vs-th>
				</template>

				<template slot-scope="{ data }" ref="tableBody">
					<vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
						<vs-td> {{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }} </vs-td>
						<vs-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.email) || '-' }}</vs-td>
						<vs-td> {{ (tr.seeker && tr.seeker.mobile) || '-' }}</vs-td>
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
	name: 'Le60TaxInvoice',
	data() {
		return {}
	},
	mixins: [dateMixins],
	computed: {
		...mapState('dashboard', ['loading', 'le60PerTaxInvoice'])
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
