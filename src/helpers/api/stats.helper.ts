import moment from 'moment'

export const getTime = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss')
}
