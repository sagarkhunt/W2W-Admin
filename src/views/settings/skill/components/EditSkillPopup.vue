<template>
  <div class="add__countrie">
    <vs-popup button-accept="false" button-cancel="false" :active.sync="isActive" :title="$t('model.UpdateSkill')">
      <div class="con-exemple-prompt p-5">
        <div class="vx-row mb-2">
          <label for="skill">{{ $t('skill') }}</label>
          <vs-input id="skill" class="w-full" name="skill" v-model="skill_form.skill" v-validate="'required|min:3|max:60'" />
          <span class="text-primary text-sm" v-show="errors.has('skill')">{{ errors.first('skill') }}</span>
        </div>
        <div class="footer text-right">
          <vs-button class="mt-2 text-sm p-3" color="danger" type="filled" @click="updateSkillPopup = false"> {{ $t('close') }} </vs-button>
          <button class="mt-2 ml-2 text-sm vs-component vs-button vs-button-primary vs-button-filled p-3" @click="updateSkillRecord" :disabled="!validateForm" type="submit">{{ $t('update') }}</button>
        </div>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { backgrondScrollHandler } from '@/utils/functions'

export default {
  name: 'EditSkillPopup',
  props: {
    isModalShow: Boolean,
    skillId: Number
  },
  components: {
    Select2
  },
  data() {
    return {
      skill_form: {
        skill: ''
      }
    }
  },
  mounted() {
    // handle background scroll
    backgrondScrollHandler(true)
    this.$store.dispatch('setting/getSkillById', this.skillId).then((res) => {
      const data = res.data.data
      this.skill_form.skill = data.skill
    })
  },
  computed: {
    // modal stat
    isActive: {
      get() {
        return this.isModalShow
      },

      set(val) {
        // handle background scroll
        backgrondScrollHandler(false)
        this.$emit('update:isModalShow', val)
      }
    },

    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      updateSkill: 'updateSkill'
    }),
    viewIndustry() {
      this.isActive = false
    },
    async updateSkillRecord() {
      if (!(await this.$validator.validate())) {
        return false
      }
      this.$store
        .dispatch('setting/updateSkill', {
          id: this.skillId,
          data: {
            ...this.skill_form
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
