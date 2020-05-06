/**
 * // json to javascrip  单引号转双引号
 *  todo 未测试
 * @param obj
 * @param key
 * @returns {*}
 */
export function json2js(obj, key) {
  if (obj[key]) {
    obj[key] = JSON.parse(obj[key].replace(/'/g, '"'))
  }
  return obj
}
