<template>
	<vue-html2pdf :enable-download="true" filename="le-document" ref="ledoc" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
		<section slot="pdf-content">
			<div class="flex justify-center py-4 border">
				<h2>Way2Work oy: LE Documents</h2>
			</div>
			<vs-table :data="leDocData">
				<template slot="thead">
					<vs-th>Sr#</vs-th>
					<vs-th>Jobseeker Name</vs-th>
				</template>
				<template slot-scope="{ data }" ref="tableBody">
					<vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
						<vs-td>#</vs-td>
						<vs-td>{{ (tr.seeker && tr.seeker.user && tr.seeker.user.full_name) || '-' }}</vs-td>
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
	name: 'LeDocument',
	props: {
		leDocData: {}
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
			this.$refs.ledoc.downloadPdf()
			this.$emit('downloaded')
		})
	}
}
</script>

<style lang="scss" scoped>
</style>
