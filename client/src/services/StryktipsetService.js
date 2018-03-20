import Api from '@/services/Api'

export default {
  getTips () {
    return Api().post('getTips')
  },
  tippa (rows) {
    return Api().post('tippa', rows)
  },
  saveBong (obj) {
    return Api().post('saveBong', obj)
  },
  getResults () {
    return Api().post('getResults')
  },
  getBongFromDrawId (drawId) {
    return Api().post('getBongFromDrawId', drawId)
  }
}
