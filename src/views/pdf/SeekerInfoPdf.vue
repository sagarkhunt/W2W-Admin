<template>
  <vue-html2pdf :enable-download="true" filename="seeker_invofrmation" ref="pdf" :manual-pagination="true" :pdf-orientation="'portrait'" pdf-format="a4">
    <section slot="pdf-content">
      <div id="pdf-sale-invoice" class="p-5">
        <h2 class="pb-3">Seeker Information:{{ seekerProfileinfo.full_name }}</h2>
        <div class="row invoice-info">
          <div class="flex items-center">
            <b class="text-width">Email Address:</b>
            <p>{{ seekerProfileinfo.email }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Contact Number :</b>
            <p>{{ seekerProfileinfo.phone_number || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">City:</b>
            <p>{{ (seekerProfileinfo.city && seekerProfileinfo.city.city_name) || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Zip Code:</b>
            <p>{{ seekerProfileinfo.zip_code || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Mobile Nmber:</b>
            <p>{{ seekerProfileinfo.phone_number || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Gender:</b>
            <p>{{ seekerProfileinfo.gender || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Date of Birth:</b>
            <p>{{ seekerProfileinfo.dob || '-' }}</p>
          </div>
          <div class="flex items-center pt-2">
            <b class="text-width">Home Phone:</b>
            <p>{{ seekerProfileinfo.phone_number || '-' }}</p>
          </div>

          <div class="flex items-center pt-2">
            <b class="text-width">Registration Date:</b>
            <p>{{ formatDate(seekerProfileinfo.created_at) || '-' }}</p>
          </div>

          <div class="flex items-center pt-2">
            <b class="text-width">Living Address:</b>
            <p>{{ (seekerProfileinfo.jobSeeker && seekerProfileinfo.jobSeeker.address) || '-' }}</p>
          </div>

          <div class="flex items-center pt-2">
            <b class="text-width">Status:</b>
            <p>{{ seekerProfileinfo.status || '-' }}</p>
          </div>

          <div class="flex items-center pt-2">
            <b class="text-width">Invoice Receiving Method:</b>
            <p>-</p>
          </div>
        </div>
      </div>
    </section>
  </vue-html2pdf>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'
import { dateMixins } from '@/mixins/dateMixins.js'
export default {
  name: 'SeekerInfoPdf',
  props: {
    seekerProfileinfo: {}
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
      this.$refs.pdf.downloadPdf()
      this.$emit('downloaded')
    })
  }
}
</script>

<style lang="scss" scoped>
.text-width {
  max-width: 180px;
  width: 100%;
}
.img-wrap-pdf {
  width: 15px;
  height: 15px;
}
</style>
