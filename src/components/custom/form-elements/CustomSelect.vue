<template lang="html">
  <div
    :class="{
      autocompletex: typeable,
      activeOptions: active,
      'input-select-validate-success': success,
      'input-select-validate-danger': danger,
      'input-select-validate-warning': warning
    }"
    :style="getWidth"
    class="con-select"
  >
    <label v-if="label" ref="inputSelectLabel" class="vs-select--label">{{ label }}</label>
    <div class="input-select-con relative">
      <!-- v-model="valueFilter" -->
      <input
        ref="inputselect"
        v-bind="$attrs"
        :readonly="!typeable"
        class="input-select vs-select--input"
        type="text"
        @keydown.esc.stop.prevent="closeOptions"
        autocomplete="Off"
        v-on="listeners"
        :disabled="loader || disabled"
      />
      <div v-if="loader" class="absolute rounded-full input-loader"></div>
      <vs-icon
        v-if="value && !disabled && clearable && !loader"
        :icon-pack="iconPack"
        :icon="iconClear"
        class="clear_icon vs-select--icon cursor-pointer pointer-events-auto"
        @click="clearValue"
      ></vs-icon>
      <vs-icon v-if="!activeBtnClear" :icon-pack="iconPack" :icon="icon" class="icon-select vs-select--icon"></vs-icon>
      <transition name="fadeselect">
        <div v-show="active" ref="vsSelectOptions" :style="cords" :class="[`vs-select-${color}`, { scrollx: scrollx }]" class="vs-select--options">
          <ul ref="ulx" id="optionContainer">
            <slot />
          </ul>

          <div class="flex justify-between items-center" v-if="multiple">
            <span>{{ value ? value.length : 0 }} selected</span>
            <vs-button color="dark" class="m-5 mt-0 mb-0 btn-span px-3 py-2" type="filled" @click="clickBlur">Apply</vs-button>
          </div>
          <ul v-show="clear">
            <li @click="filterItems(''), changeValue()">
              {{ noData }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <transition-group @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="success" key="success" class="con-text-validation">
        <span class="span-text-validation span-text-validation-success">
          {{ successText }}
        </span>
      </div>
      <div v-else-if="danger" key="danger" class="con-text-validation span-text-validation-danger">
        <span class="span-text-validation">
          {{ dangerText }}
        </span>
      </div>
      <div v-else-if="warning" key="warning" class="con-text-validation span-text-validation-warning">
        <span class="span-text-validation">
          {{ warningText }}
        </span>
      </div>
      <div v-if="descriptionText" key="description" class="con-text-validation span-text-validation">
        <span class="span-text-validation">
          {{ descriptionText }}
        </span>
      </div>
    </transition-group>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'VsSelect',
  props: {
    value: {},
    noData: {
      default: 'No data available',
      type: String
    },
    maxSelected: {
      default: null,
      type: [Number, String]
    },
    typeable: {
      default: false,
      type: Boolean
    },
    color: {
      default: 'primary',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    label: {
      default: null,
      type: [String]
    },
    success: {
      default: false,
      type: Boolean
    },
    danger: {
      default: false,
      type: Boolean
    },
    warning: {
      default: false,
      type: Boolean
    },
    successText: {
      default: null,
      type: String
    },
    dangerText: {
      default: null,
      type: String
    },
    warningText: {
      default: null,
      type: String
    },
    descriptionText: {
      default: null,
      type: String
    },
    iconPack: {
      default: 'material-icons',
      type: String
    },
    icon: {
      default: 'keyboard_arrow_down',
      type: String
    },
    iconClear: {
      default: 'close',
      type: String
    },
    width: {
      default: null,
      type: String
    },
    loader: {
      default: false,
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    ssr: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valueFilter: '',
    active: false,
    valuex: '',
    clear: false,
    scrollx: false,
    cords: {},
    filterx: false,
    timerState: null
  }),
  computed: {
    activeBtnClear() {
      return this.typeable && this.filterx
    },
    getWidth() {
      return this.width ? `width:${this.width};` : null
    },
    parent() {
      return this
    },
    listeners() {
      return {
        ...this.$listeners,
        blur: (event) => {
          if (this.typeable && event.relatedTarget ? !event.relatedTarget.closest('.vs-select--options') : false) {
            this.closeOptions()
          }
          this.$emit('blur', event)
        },
        focus: (event) => {
          this.$emit('focus', event)
          if (event.keyCode ? event.keyCode : event.which) {
            this.focus()
          }
        },
        mouseup: () => {
          this.focus()
        },
        input: _.debounce((event) => {
          if (this.typeable && this.ssr) {
            this.$emit('input-change', event)
          }
        }, 600),
        keyup: (event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            const childrens = this.$children.filter((item) => {
              return item.visible
            })
            childrens[0].$el.querySelector('.vs-select--item').focus()
          } else if (this.typeable) {
            this.filterItems(event.target.value)
          }
          this.$children.map((item) => {
            item.valueInputx = this.$refs.inputselect.value
          })
        }
      }
    }
  },
  watch: {
    value(event) {
      this.valuex = this.value
      this.$emit('change', event)
    },
    active() {
      this.$nextTick(() => {
        if (this.active) {
          this.insertBody(this.$refs.vsSelectOptions)
          setTimeout(() => {
            this.$children.forEach((item) => {
              if (item.focusValue) {
                item.focusValue()
              }
            })
            if (this.$refs.ulx.scrollHeight >= 260) this.scrollx = true
          }, 100)
        } else {
          const [parent] = document.getElementsByTagName('body')
          parent.removeChild(this.$refs.vsSelectOptions)
        }
      })
    }
  },
  mounted() {
    // this.$refs.inputselect.value = this.value
    this.changeValue()
    if (this.active) {
      this.insertBody(this.$refs.vsSelectOptions)
    }
    const optionElement = this.$refs.ulx
    optionElement.addEventListener(
      'scroll',
      _.debounce((e) => this.fireScrollEnd(e), 300)
    )
  },
  beforeDestroy() {
    const [parent] = document.getElementsByTagName('body')
    if (this.active) {
      this.closeOptions()
    }
    if (parent && this.$refs.vsSelectOptions && this.$refs.vsSelectOptions.parentNode === parent) {
      parent.removeChild(this.$refs.vsSelectOptions)
    }
  },
  updated() {
    if (!this.active) {
      this.changeValue()
    }
  },
  methods: {
    clearValue() {
      if (!this.multiple) {
        this.focus()
      }
      if (this.multiple && !this.value.length) {
        this.closeOptions()
      }
      this.filterItems('')
      this.$emit('clearValue', null)
      this.$nextTick(() => this.changeValue())
    },
    addMultiple(value) {
      const currentValues = this.value ? this.value : []
      if (currentValues.includes(value)) {
        currentValues.splice(currentValues.indexOf(value), 1)
        this.$emit('input', currentValues)
        this.changeValue()
        if (this.typeable) {
          this.$refs.inputselect.focus()
        }
      } else if (this.typeable) {
        currentValues.push(value)
        this.$emit('input', currentValues)
        this.filterItems('')
        this.changeValue()
        // this.$refs.inputselect.value += ','
        this.$refs.inputselect.focus()
      } else {
        currentValues.push(value)
        this.$emit('input', currentValues)
        this.changeValue()
      }
    },
    filterItems(value) {
      if (value) {
        this.filterx = true
      } else {
        this.filterx = false
      }
      let items = this.$children
      items.forEach((item) => {
        if (item.$children.length > 0) {
          items = [...items, ...item.$children]
        }
      })
      items.map((item) => {
        if (!('text' in item)) return
        const text = item.text
        if (this.multiple) {
          const valuesx = value.split(',')
          valuesx.forEach((value_multi) => {
            if (text.toUpperCase().indexOf(value_multi.toUpperCase()) === 0) {
              item.visible = true
            } else {
              item.visible = false
            }
          })
        } else if (text.toUpperCase().indexOf(value.toUpperCase()) === 0) {
          item.visible = true
        } else {
          item.visible = false
        }
      })
      const lengthx = items.filter((item) => {
        return item.visible
      })
      if (lengthx.length === 0) {
        this.clear = true
      } else {
        this.clear = false
      }
      this.$nextTick(() => {
        this.cords = this.changePosition()
      })
    },
    changeValue() {
      this.filterx = false
      if (this.multiple) {
        const values = this.value ? this.value : []
        let options = this.$children
        options.forEach((item) => {
          if (item.$children.length > 0) {
            options = [...options, ...item.$children]
          }
        })
        const optionsValues = []
        values.forEach((item) => {
          options.forEach((item_option) => {
            if (item_option.value === item) {
              let text = item_option.text
              text = text.replace('check_circle', '')
              optionsValues.push(text.trim())
            }
          })
        })
        this.$refs.inputselect.value = optionsValues.toString()
      } else if (this.$refs.inputselect) {
        this.$refs.inputselect.value = this.valuex
      }
    },
    focus() {
      this.active = true
      // on option select - hide options
      if (!this.multiple) {
        document.addEventListener('click', this.clickBlur)
      }
      this.setLabelClass(this.$refs.inputSelectLabel, true)
      const inputx = this.$refs.inputselect
      if (this.typeable && this.multiple) {
        setTimeout(() => {
          if (inputx.value) {
            this.$refs.inputselect.value = inputx.value += ','
          }
          inputx.selectionStart = inputx.selectionEnd = 10000
        }, 10)
      } else if (this.typeable && !this.multiple) {
        this.$refs.inputselect.select()
      }
      if (!this.typeable) {
        if (this.multiple ? this.value.length === 0 : !this.value || this.multiple) {
          setTimeout(() => {
            const el = this.$children[0].$el.querySelector('.vs-select--item')
            if (el) el.focus()
          }, 50)
        }
      }
      this.$nextTick(() => {
        this.cords = this.changePosition()
      })
    },
    clickBlur(event) {
      if (event.target === this.$refs.inputselect) {
        return
      }
      const closestx = event.target.closest('.vs-select--option')
      if (!closestx) {
        this.closeOptions()
        if (this.typeable) {
          this.filterItems('')
        }
        this.changeValue()
      }
    },
    closeOptions() {
      this.active = false
      this.setLabelClass(this.$refs.inputSelectLabel, false)
      document.removeEventListener('click', this.clickBlur)
    },
    changePosition() {
      const elx = this.$refs.inputselect
      const content = this.$refs.vsSelectOptions
      const conditional = this.typeable
      let topx = 0
      let leftx = 0
      let widthx = 0
      const scrollTopx = window.pageYOffset || document.documentElement.scrollTop
      if (elx.getBoundingClientRect().top + content.scrollHeight + 20 >= window.innerHeight) {
        topx = elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx - content.scrollHeight
        if (conditional) {
          topx = topx - elx.clientHeight - 5
        }
      } else {
        topx = conditional ? elx.getBoundingClientRect().top + elx.clientHeight + scrollTopx + 5 : elx.getBoundingClientRect().top + scrollTopx
      }
      leftx = elx.getBoundingClientRect().left
      widthx = elx.offsetWidth
      const cords = {
        left: `${leftx}px`,
        top: `${topx}px`,
        width: `${widthx}px`
      }
      return cords
    },
    beforeEnter(el) {
      el.style.height = 0
    },
    enter(el, done) {
      const h = el.scrollHeight
      el.style.height = `${h}px`
      done()
    },
    leave(el) {
      el.style.height = '0px'
    },
    setLabelClass(label, focusing) {
      if (!label) {
        return
      }
      if (focusing) {
        label.classList.add(`input-select-label-${this.color}--active`)
        return
      }
      label.classList.remove(`input-select-label-${this.color}--active`)
    },
    insertBody(elx, parent) {
      const bodyx = parent ? parent : document.body
      bodyx.insertBefore(elx, bodyx.firstChild)
    },
    fireScrollEnd(e) {
      if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        this.$emit('scrollEnd')
      }
    }
  }
}
</script>
<style lang="scss">
.clear_icon {
  right: 1.4rem;
  transition: 0.5s;
  z-index: 998;
}
.btn-span {
  .vs-button--text {
    color: #fff !important;
  }
}
.input-loader {
  top: 25%;
  right: 1.4rem;
  width: 20px;
  height: 20px;
  background-color: #006622;
  animation: animate 1s infinite;
  transition: 0.5s;
  @keyframes animate {
    0% {
      opacity: 0.1;
      transform: scale(0.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
