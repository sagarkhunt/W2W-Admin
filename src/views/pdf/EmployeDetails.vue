<template>
	<vue-html2pdf :enable-download="true" filename="pdf Employee" ref="pdf" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4" @hasDownloaded="downloadComplete">
		<section slot="pdf-content">
			<div id="pdf-sale-invoice">
				<h2>User Information:{{ empinfo.first_name }} {{ empinfo.last_name }}</h2>
				<div class="row invoice-info">
					<b>Email Address:</b> {{ empinfo.email }}<br />
					<b>Contact Number :</b>
					<p>{{ empinfo.phone_number || '-' }}</p>
					<b>City:</b>
					<p>{{ (empinfo.city && empinfo.city.city_name) || '-' }}</p>
					<br />
					<b>Address:</b>
					<p>{{ empinfo.company.address || '-' }}</p>
					<br />
					<b>Zip Code:</b>
					<p>{{ empinfo.zip_code || '-' }}</p>
					<b>Mobile Nmber:</b>
					<p>{{ empinfo.phone_number || '-' }}</p>
					<b>Gender:</b>
					<p>{{ empinfo.gender || '-' }}</p>
					<b>Date of Birth:</b>
					<p>{{ empinfo.dob || '-' }}</p>
					<b>Home Phone:</b>
					<p>{{ empinfo.phone_number || '-' }}</p>
					<b>Registration Date:</b>
					<p>{{ formatDate(empinfo.created_at) || '-' }}</p>
					<b>Living Address:</b>
					<p>{{ empinfo.address || '-' }}</p>
					<b>Status:</b>
					<p>{{ empinfo.status || '-' }}</p>
					<b>Invoice Receiving Method:</b>
					<p>-</p>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12">
					<h2 class="page-header">Company Information</h2>
				</div>
				<!-- /.col -->
			</div>
			<div class="row invoice-info">
				<div class="col-sm-4 invoice-col">
					<b>Company Name:</b> {{ (empinfo.company && empinfo.company.company_name) || '-' }} <br />
					<b>Y-Tunnus:</b> - <br />
					<strong>E-invoice Address: </strong> N/A <br />
					<b>Opertor Number:</b> -<br />
					<b>Opertor Name:</b>-
				</div>
				<!-- /.col -->
				<div class="col-sm-4 invoice-col">
					<b>Company Email:</b> {{ (empinfo.company && empinfo.company.company_email) || '-' }} <br />
					<b>Company Ownership Type:</b> {{ (empinfo.company && empinfo.company.owner_ship_type) || '-' }} <br />
					<b>Company CEO:</b> -<br />
					<b>Company Established In :</b> -<br />
					<b>Company Office Address:</b> {{ (empinfo.company && empinfo.company.address) || '-' }}<br />
					<b>Company Number of Offices:</b> {{ (empinfo.company && empinfo.company.mobile) || '-' }}<br />
					<b>Company Website: </b>{{ (empinfo.company && empinfo.company.website) || '-' }}<br />
					<b>Company Number of Employees: </b>{{ (empinfo.company && empinfo.company.no_of_employees) || '-' }}<br />
					<b>Company Contact Number: </b>{{ (empinfo.company && empinfo.company.mobile) || '-' }}<br />
					<b>Company Industry Type: </b>{{ (empinfo.company && empinfo.company.industry && empinfo.company.industry.industry_name) || '-' }}<br />
					<b>Company Slugan: </b>{{ (empinfo.company && empinfo.company.slug) || '-' }}<br />
					<b>Company Description: </b>{{ (empinfo.company && empinfo.company.description) || '-' }}
				</div>
				<!-- /.col -->
				<div class="col-sm-4 invoice-col" style="text-align: center"><img src="http://192.168.0.189/way-2-work-backend/public/uploads/employer/no_logo.jpg" style="max-width: 150px" /></div>
				<!-- /.col -->
			</div>
		</section>
	</vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'
export default {
	name: 'EmpDetails',
	props: {
		empinfo: {}
	},
	components: {
		VueHtml2pdf
	},
	data() {
		return {}
	},
	mixins: [dateMixins],
	created() {
		this.$nextTick(async() => {
			window.scrollTo(0, 0)
			await this.$refs.pdf.downloadPdf()
		})
	},
	methods: {
		downloadComplete() {
			this.$emit('downloaded')
		}
	}
}
</script>

<style lang="scss" scoped></style>
