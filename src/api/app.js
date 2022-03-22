import request from '@/utils/request.js'

const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export { login }
