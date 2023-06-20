<template>
	<vue-html2pdf :enable-download="true" filename="le-document" ref="ledoc" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
		<section slot="pdf-content">
			<div class="flex justify-center py-4 border">
				<h2>Way2Work oy: Send LE Documents</h2>
			</div>
			<vs-table :data="sendLeDocData">
				<template slot="thead">
					<vs-th>Sr#</vs-th>
					<vs-th>Sent On</vs-th>
					<vs-th>Title</vs-th>
					<vs-th>Description</vs-th>
				</template>
				<template slot-scope="{ data }" ref="tableBody">
					<vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
						<vs-td>{{ page * length - (length - i - 1) }}</vs-td>
						<vs-td>{{ formatDate(tr.created_at) }}</vs-td>
						<vs-td>{{ tr.title }}</vs-td>
						<vs-td> {{ tr.description }} </vs-td>
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
		sendLeDocData: {}
	},
	components: {
		VueHtml2pdf
	},
	data() {
		return {
			length: 10,
			page: 1
		}
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
