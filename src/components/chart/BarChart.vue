<script>
import { Bar } from 'vue-chartjs'

export default {
	extends: Bar,

	props: {
		labels: {
			type: Array,
			default: () => []
		},
		dataSets: {
			type: Array,
			default: () => []
		}
	},

	data() {
		return {
			chartData: {
				labels: [],
				datasets: []
			}
		}
	},
	mounted() {
		this.chartData.labels = this.labels
		this.chartData.datasets = this.dataSets
		this.$nextTick(() => {
			this.renderChart(this.chartData, this.options)
		})
	}
}
</script>