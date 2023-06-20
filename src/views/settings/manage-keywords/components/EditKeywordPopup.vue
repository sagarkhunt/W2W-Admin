<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateKeyword')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="keyword"> {{ $t('keyword') }}</label>
          <vs-input id="keyword" class="w-full" name="Heading" v-model="keyword_form.keyword" v-validate="'required'" />
          <span class="text-primary text-sm" v-show="errors.has('Heading')">{{ errors.first('Heading') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateKeywordPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateKeywordRecord" :disabled="!validateForm" type="submit">
            {{ $t('update') }}
          </button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
export default {
  name: 'EditKeywordPopup',
  props: {
    isModalShow: Boolean,
    keywordId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      keyword_form: {
        keyword: ''
      }
    }
  },
  mounted() {
    this.$store.dispatch('setting/getkeywordById', this.keywordId).then((res) => {
      const data = res.data.data
      this.keyword_form.keyword = data.keyword
    })
  },
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      udatekeyword: 'udatekeyword'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateKeywordRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/udatekeyword', {
          id: this.keywordId,
          data: {
            ...this.keyword_form
          }
        })
        .then(({ message }) => {
          this.$emit('indList')
          this.isActive = false
          this.$vs.notify({
            title: 'Success',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        })
        .catch(({ message }) => {
          this.$vs.notify({
            title: 'Error',
            text: message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'primary'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
