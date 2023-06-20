import router from './../router'
// handle api error
export const getMessageFromError = err => {
  const status = err.response.data.status
  if(status == 404){
    router.push('/error-404')
  }
  const message = err.response && err.response.data && err.response.data.errors ? err.response.data.errors[0].msg : err.response && err.response.data.message ? err.response.data.message : err.message
  return { message }
}

export const handleFormError = (err) => {
  if (err.response.data && err.response.data.errors) {
    const messages = err.response.data.errors.reduce((acc, item) => {
      acc[item.param] = item.msg

      return acc
    }, {})

    return messages
  }
}

export const backgrondScrollHandler = (stat) => {
  if (stat) {
    document.querySelector('body').classList.add('bg_scroll')
  } else {
    document.querySelector('body').classList.remove('bg_scroll')
  }
}
