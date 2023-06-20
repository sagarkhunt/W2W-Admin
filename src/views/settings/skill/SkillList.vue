<template>
  <div id="table-loading" class="vs-con-loading__container">
    <div class="mb-6 desc">{{ $t('here_you_can_manage_skills_language_wise') }}</div>
    <div class="vx-card md:p-8 p-6 md:pb-1">
      <vs-table
        class="vs-con-loading__container vh-hight-table"
        stripe
        :sst="true"
        maxHeight="500px"
        @search="updateSearchQuery"
        @change-page="handleChangePage"
        @sort="handleSort"
        :total="FilteredCount"
        pagination
        :max-items="length"
        search
        :data="skillData"
      >
        <template slot="thead">
          <vs-th>{{ $t('sr') }}</vs-th>
          <vs-th sort-key="skill">{{ $t('skill') }} </vs-th>
          <vs-th>{{ $t('language') }} </vs-th>
          <vs-th>{{ $t('action') }} </vs-th>
        </template>

        <template slot="header">
          <div class="flex flex-wrap justify-between items-center mb-3 md:w-auto w-full">
            <div class="mb-3 md:mb-0 md:mr-4 ag-grid-table-actions-left md:w-auto w-full">
              <vs-dropdown vs-trigger-click class="cursor-pointer w-full">
                <div class="p-3 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                  <span class="mr-2">
                    {{ page * length - (length - (FilteredCount && 1)) }}
                    -
                    {{ FilteredCount - page * length > 0 ? page * length : FilteredCount }}
                    {{ $t('of') }} {{ FilteredCount }}
                  </span>
                  <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                </div>
                <vs-dropdown-menu class="remove-tip">
                  <vs-dropdown-item @click="handleChangeLength(10)">
                    <span>10</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(20)">
                    <span>20</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(50)">
                    <span>50</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item @click="handleChangeLength(100)">
                    <span>100</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>

            <div class="">
              <select-2 class="w-full" :value="languageId" @input="(item) => (languageId = item && item.value)" name="Language" placeholder="Select language" autocomplete action="getLanguage" />
            </div>
            <div
              v-if="languageId === 1 && checkPermissionByIds([permissions.SKILL_ADD])"
              @click="openskillPopup"
              class="btn-add-new p-2 md:ml-8 rounded-lg cursor-pointer text-lg font-medium text-primary border border-solid border-primary"
            >
              <span class="text-base text-primary">{{ $t('add_skill') }}</span>
            </div>
          </div>
        </template>

        <template slot-scope="{ data }" ref="tableBody">
          <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
            <vs-td>{{ page * length - (length - i - 1) }}</vs-td>
            <vs-td>
              {{ tr.skill }}
            </vs-td>
            <vs-td>
              {{ tr.language && tr.language.language_name }}
            </vs-td>
            <vs-td>
              <div class="inline-flex" :style="{ direction: $vs.rtl ? 'rtl' : 'ltr' }">
                <vx-tooltip :text="$t('tooltip.EditSkill')">
                  <feather-icon icon="EditIcon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="getQualificationRecord(tr.id)" />
                </vx-tooltip>
                <vx-tooltip :text="$t('tooltip.DeleteSkill')">
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="deleteRecord(tr.referenceId)" />
                </vx-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <!-- Add Skill -->
    <AddSkilldPopup v-if="isAddSkillModal" :isModalShow.sync="isAddSkillModalShow" @newInvList="getData()" />
    <!-- End Add Skill -->

    <!-- Edit Skill -->
    <EditSkillPopup v-if="isEditSkillModal" :isModalShow.sync="isEditSkillModalShow" @indList="getData()" :skillId="skillId" />
    <!-- End Edit Skill -->
  </div>
</template>

<script>
import Select2 from '@/components/custom/form-elements/Select2.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import AddSkilldPopup from '@/views/settings/skill/components/AddSkillPopup'
import EditSkillPopup from '@/views/settings/skill/components/EditSkillPopup'

export default {
  name: 'SkillLIst',
  components: {
    Select2,
    AddSkilldPopup,
    EditSkillPopup
  },
  data() {
    return {
      languageId: null,
      skillPopup: false,
      updateSkillPopup: false,
      page: 1,
      length: 10,
      search: '',
      skillId: '',
      //add skill modal
      isAddSkillModal: false,
      isAddSkillModalShow: false,
      //edit skill
      isEditSkillModal: false,
      isEditSkillModalShow: false
    }
  },
  mounted() {
    this.getData()
  },
  computed: {
    ...mapState('setting', ['loading', 'total', 'FilteredCount', 'skillData']),
    ...mapState('permission', ['permissions']),
    ...mapGetters('auth', ['checkPermissionByIds']),
    validateForm() {
      return !this.errors.any()
    }
  },
  methods: {
    ...mapActions('setting', {
      getAllSkill: 'getAllSkill',
      getskillById: 'getskillById',
      deleteSkillRecord: 'deleteSkillRecord'
    }),
    handleChangeLength(length) {
      this.page = 1
      this.length = length
      this.getData()
    },

    handleChangePage(page) {
      this.page = page
      this.getData()
    },

    handleSort(key, active) {
      this.page = 1
      this.order = [key, active === 'desc' ? 'DESC' : 'ASC']
      this.getData()
    },

    updateSearchQuery(val) {
      this.page = 1
      this.search = val
      this.getData()
    },
    getData() {
      this.getAllSkill({
        limit: this.length,
        page: this.page,
        search: this.search,
        languageId: this.languageId
      })
    },
    async openskillPopup() {
      this.isAddSkillModal = true
      this.isAddSkillModalShow = true
    },
    async getQualificationRecord(id) {
      this.skillId = id
      this.isEditSkillModal = true
      this.isEditSkillModalShow = true
    },

    deleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: this.$t('delete_conformation.ConfirmDelete'),
        text: this.$t('delete_conformation.deleteConform'),
        accept: () => this.deleteSkill(id),
        acceptText: 'Delete'
      })
    },
    async deleteSkill(id) {
      try {
        const { message } = await this.deleteSkillRecord(id)
        this.$vs.notify({
          title: this.$t('delete_conformation.Success'),
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
        this.getData()
      } catch ({ message }) {
        this.$vs.notify({
          title: 'Error',
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'primary'
        })
      }
    }
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
    },
    isAddSkillModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isAddSkillModal = false
          }, 0)
        }
      }
    },
    isEditSkillModalShow: {
      immediate: true,
      handler(newVal) {
        if (!newVal) {
          setTimeout(() => {
            this.isEditSkillModal = false
            this.skillId = null
          }, 0)
        }
      }
    },
    languageId: {
      handler(newval) {
        if (newval) {
          this.getData()
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isAddSkillModalShow = false
    this.isEditSkillModalShow = false
    setTimeout(() => {
      next()
    }, 0)
  }
}
</script>
<style lang="scss">
.vs-table--header,
.vs-table--search {
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
.vuesax-app-is-ltr .vs-table--search {
  max-width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
}

.vs-table--search-input {
  padding: 5px 10px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  font-size: 0.7rem;
  width: 200px;
  color: rgba(0, 0, 0, 0.7);
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
}
.remove-tip {
  .vs-dropdown--menu--after {
    display: none;
  }
}
.vh-hight-table {
  .vs-con-tbody {
    max-height: calc(100vh - 110px) !important;
  }
}
</style>
<style lang="scss" scoped>
.desc {
  margin-top: -1.25rem !important;
  @media (max-width: 425px) {
    margin-top: -0.25rem !important;
  }
}
</style>
