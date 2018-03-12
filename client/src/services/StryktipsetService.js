import Api from '@/services/Api'

export default {
  getTips () {
    return Api().post('getTips')
  }
}
