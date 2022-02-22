import request from '@/utils/request'

export const typhoonPathData = () => {
  return request({
    url: '/typhoonData.json'
  })
}
