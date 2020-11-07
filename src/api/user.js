import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'get',
    params: { ...data }
  })
}

export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'get'
  })
}
