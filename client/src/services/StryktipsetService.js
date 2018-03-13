import Api from '@/services/Api'

export default {
  getTips () {
    return Api().post('getTips')
  },
  tippa (rows) {
    return Api().post('tippa', rows)
  }
}
