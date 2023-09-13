import testRequest from '@/service'

export function gethomeInitDataRequest() {
  return testRequest.get({
    url: '/home/initData'
  })
}

export function getPieChartDataRequest() {
  return testRequest.get({
    url: '/home/pieChartData'
  })
}

export function getTrendChartDataRequest() {
  return testRequest.get({
    url: '/home/trendChartData'
  })
}