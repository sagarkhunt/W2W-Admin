const actions = {
  updateVerticalNavMenuWidth({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val)
  },


  // get common countries
  async getCommonCountries() {
    const res = await this.$http.get(`${process.env.VUE_APP_API_BASE_END_POINT}country`)

    return {
      data: res.data.data.map((c) => ({
        ...c,
        value: c.referenceId,
        label: c.country_name
      })),
      message: res.data.message
    }
  },

  // get common cities
  async getCommonCities(_, countryId) {    
    const res = await this.$http.get(`${process.env.VUE_APP_API_BASE_END_POINT}city/${countryId}`)

    return {
      data: res.data.data.map((c) => ({
        ...c,
        value: c.referenceId,
        label: c.city_name
      })),
      message: res.data.message
    }
  },

  // Get Countries
  async getCountries() {
    const res = await this.$http.get('/country', {})
    return {
      data: res.data.data.map((c) => ({
        value: c.referenceId,
        label: c.country_name
      })),
      message: res.data.message
    }
  },

  // Get Cities
  async getCities() {
    const res = await this.$http.get('/city', {})
    return {
      data: res.data.data.map((c) => ({
        value: c.referenceId,
        label: c.city_name
      }))
    }
  },

  // Get Cities
  async getLanguage() {
    const res = await this.$http.get('/language', {})
    return {
      data: res.data.data.map((lang) => ({
        value: lang.id,
        label: lang.language_name,
        language_code: lang.language_code
      }))
    }
  },
  async getSkill() {
    const res = await this.$http.get('/skill', {})    
    return {
      data: res.data.data.map((c) => ({
        value: c.id,
        label: c.skill
      }))
    }
  },

  // Get Industry
  async getIndustry() {
    const res = await this.$http.get('/industry', {})
    return {
      data: res.data.data.map((i) => ({
        value: i.id,
        label: i.industry_name
      }))
    }
  },
  //get common industry
  async getCommanIndustry() {
    const res = await this.$http.get(`${process.env.VUE_APP_API_BASE_END_POINT}industry`, {})
    return {
      data: res.data.data.map((i) => ({
        value: i.referenceId,
        label: i.industry_name
      }))
    }
  },
  async getAllCompany() {
    const res = await this.$http.get('/company/companies/all', {})
    const data = res.data.data.map((i) => ({
      value: i.company && i.company.id,
      label: (i.company && i.company.company_name) || ''
    }))

    return {
      data
    }
  },

  // Get Employer == company
  async getEmployer({ commit }, payload) {
    const res = await this.$http.get('/company/companies/all', {params: payload})    
    const data = res.data.data.map((e) => {
      return {
        value: e.company && e.company.id,
        label: e.company && e.company.company_name
      }
    })

    return {
      data
    }
  },

  // Get Roles
  async getRoles() {
    const res = await this.$http.get('/role', {})
    return {
      data: res.data.data.map((r) => ({
        value: r.id,
        label: r.role_name
      }))
    }
  },

  // Get Permit
  async getAllPermit() {
    const res = await this.$http.get('/permit', {})   
    return {
      data: res.data.data.map((q) => ({
        value: q.referenceId,
        label: q.description,
      }))
    }
  },

  // Get Seeker
  async getSeeker() {
    const res = await this.$http.get('/seeker/job-seeker', {})
    const data = res.data.data.map((e) => {
      return {
        value: e.company && e.company.id,
        label: e.company && e.company.company_name
      }
    })

    return {
      data
    }
  }
}

export default actions
