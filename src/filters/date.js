import * as moment from 'moment'

export const date = (value) => {
  return moment(value).format('dddd, Do MMMM YYYY, HH:mm')
}

export const dateShort = (value) => {
  return moment(value).format('ddd DD-MMM., HH:mm')
}
