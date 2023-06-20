export default {
  checkPermissionByIds: state => ids => {
    if (!ids) return false
    return !!state.permissionIds.find(id => ids.includes(id))
  },
  checkRolesByIds: state => ids => {  
    return !!ids.includes(state.user.admin.roleId)
  }
}
