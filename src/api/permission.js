import axios from '@/libs/api.request'


/*
  获取权限租列表
*/
/*
  no-data
*/
/*
  create_member - list
  edit_Member - list
  permission_list - list
*/
export const getEmployeeGroup = ( data ) => {
  return axios.request({
    url: '/api/EmployeeGroup/index',
    params: data,
    method: 'get'
  })
}

/*
  增加一个人员
*/
/*
  fullname: (...)
  gender: (...)
  group_id: (...)
  kitchen_id: (...)
  password: "123456"
  password1: (...)
  password2: (...)
  remark: (...)
  textarea: undefined
  username: (...)
*/
/*
  create_member - 增加一个人员
*/
export const addMember = (obj) => {
  const data = obj
  return axios.request({
    url: '/api/Employee/add',
    data,
    method: 'post'
  })
}

/*
  获取权限列表
*/
/*

*/
/*
  create_permisson - 获取权限列表
  edit_permisson - 获取权限列表
*/
export const getEmployeeModules = () => {
  return axios.request({
    url: '/api/EmployeeGroup/getModules',
    method: 'get'
  })
}

// 
/*
  增加权限组
*/
/*
  describe: (...)
  group_name: (...)
  rules: (5) ["800", "801", "802", "803", "804"]
*/
/*
  create_permisson - 增加权限组
*/
export const addEmployeeGroup = (data) => {
  return axios.request({
    url: '/api/EmployeeGroup/add',
    data,
    method: 'post'
  })
}

/*
  获取一条人员详情
*/
/*
  id
*/
/*
  create_permisson - 获取一条人员详情
*/
export const getMemberDetail = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/Employee/show',
    data,
    method: 'post'
  })
}

/*
  编辑一个人员
*/
/*
  ID
  fullname: (...)
  gender: (...)
  group_id: (...)
  kitchen_id: (...)
  password: "123456"
  password1: (...)
  password2: (...)
  remark: (...)
  textarea: undefined
  username: (...)
*/
/*
  edit_member - 编辑一个人员
*/
export const editMember = (data) => {
  return axios.request({
    url: '/api/Employee/edit',
    data,
    method: 'post'
  })
}

/*
  获取权限租详情
*/
/*
  ID
*/
/*
  edit_permisson - 获取权限租详情
*/
export const getEmployeeGroupDetail = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/EmployeeGroup/show',
    data,
    method: 'post'
  })
}

/*
  编辑权限租
*/
/*
  describe: (...)
  group_name: (...)
  id: 11
  rules: (45) ["800", "801", "
*/
/*
  edit_permisson - 编辑权限租详情
*/
export const editEmployeeGroup = (data) => {
  return axios.request({
    url: '/api/EmployeeGroup/edit',
    data,
    method: 'post'
  })
}

/*
  获取人员列表
*/
/*
  
*/
/*
  member_list - 获取人员列表
*/
export const getMemberList = (page) => {
  let obj = {}
  if(!!page){
    obj.page = page;
  }
  return axios.request({
    url: '/api/Employee/index',
    params: obj,
    method: 'get'
  })
}



/*
  删除人员
*/
/*
  id
*/
/*
  member_list - 删除人员
*/
export const deleMember = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/Employee/delete',
    data,
    method: 'post'
  })
}
/*
  删除权限
*/
/*
  id
*/
/*
  permission_list - 删除权限
*/
export const deleEmployeeGroup = (id) => {
  const data = { id: id }
  return axios.request({
    url: '/api/EmployeeGroup/delete',
    data,
    method: 'post'
  })
}

