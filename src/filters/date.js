import * as moment from 'moment'

export default (value) => {
  return moment(value).format('dddd, Do MMMM YYYY, HH:mm')
}
