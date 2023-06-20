<template>
	<vue-html2pdf :enable-download="true" filename="employer-cash-paid-reports" ref="cashpaidreports" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
		<section slot="pdf-content">
			<div class="flex justify-center py-4 border">
				<h2>Way2Work oy : Employer Cash Paid In</h2>
			</div>
			<vs-table :data="empCashPaidData">
				<template slot="thead">
					<vs-th>Sr#</vs-th>
					<vs-th>Employer Name </vs-th>
					<vs-th>Cash Paid </vs-th>
					<vs-th>Paid On </vs-th>
					<vs-th>Created On </vs-th>
				</template>
				<template slot-scope="{ data }" ref="tableBody">
					<vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
						<vs-td>#</vs-td>
						<vs-td>{{ tr.invoice && tr.invoice.company && tr.invoice.company.user && tr.invoice.company.user.full_name }}</vs-td>
						<vs-td>{{ tr.amount }}</vs-td>
						<vs-td>{{ tr.payment_date }}</vs-td>
						<vs-td>{{ formatDate(tr.created_at) }}</vs-td>
					</vs-tr>
				</template>
			</vs-table>
		</section>
	</vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'

export default {
	name: 'EmployerCashPaidReportsPdf',
	props: {
		empCashPaidData: {}
	},
	components: { VueHtml2pdf },
	data() {
		return {}
	},
	mixins: [dateMixins],
	created() {
		this.$nextTick(() => {
			window.scrollTo(0, 0)
			this.$refs.cashpaidreports.downloadPdf()
			this.$emit('downloaded')
		})
	}
}
</script>

