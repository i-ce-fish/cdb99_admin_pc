/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
  let date
  if (typeof time === "object") {
    date = time
  } else {
    if ((typeof time === "string") && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === "number") && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value]
    }
    return value.toString().padStart(2, "0")
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return "刚刚"
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前"
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前"
  } else if (diff < 3600 * 24 * 2) {
    return "1天前"
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ") +
    '"}'
  )
}

/**
 * 01与男女的转换
 * 弃用
 * @param data
 */
export function changeGender(data) {
  if (data.data.list && data.data.list[0].gender) {
    data.data.list.map((x) => {
      if (x.gender === 1) {
        x.gender = "男"
      }
      if (x.gender === 0) {
        x.gender = "女"
      }
    })
    return
  }
  if (data.data.gender) {
    if (data.data.gender === 1) {
      data.data.gender = "男"
    }
    if (data.data.gender === 0) {
      data.data.gender = "女"
    }
  }
}

/**
 * 类型转换,将对象中属性值为数字类型转化为字符串
 * @param obj
 */
export function numberToString(obj) {
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "number") {
      obj[item] = obj[item].toString()
    }
    // typeof 判断null、数组、对象类型都是object
    if (obj[item] && typeof obj[item] === "object") {
      numberToString(obj[item])
    }
  })
}

/**
 * 下划线转驼峰
 *
 * 递归时候注意条件判断先后顺序，
 * 此处由于删除对象时候，无法确定子孙中是否含有下划线，
 * 所以必须从最深的一代开始删除属性
 * 所以先递归，后判断‘_’
 */
export function underlineToHump(obj) {
  Object.keys(obj).forEach((item) => {
    // typeof 判断null、数组、对象类型都是object
    if (obj[item] && typeof obj[item] === "object") {
      underlineToHump(obj[item])
    }

    // todo 此处判断覆盖范围可能不足
    if (item.match("_")) {
      obj[toHump(item)] = obj[item]
      delete obj[item]
    }
  })
}

/**
 * 驼峰转下划线递归方法
 */
export function humpToUnderline(obj) {
  Object.keys(obj).forEach((item) => {
    if (typeof obj[item] === "object") {
      humpToUnderline(obj[item])
    }

    if (item.match(/([A-Z])/g)) {
      obj[toUnderLine(item)] = obj[item]
      delete obj[item]
    }
  })
}

// 下划线转换驼峰实现方法
export function toHump(name) {
  return name.replace(/\_(\w)/g, function(all, letter) {
    return letter.toUpperCase()
  })
}

// 驼峰转换下划线实现方法
export function toUnderLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase()
}

/**
 * 返回汉字拼音大写首字母
 * @param str
 * @returns {string}
 */
export function chineseToTitleCase(str) {
  const pinyin = require("tiny-pinyin")
  let result = ""
  for (let i = 0; i < str.length; i++) {
    result = result + pinyin.convertToPinyin(str[i])[0]
  }
  return result
}

/**
 * remove list item
 * @param item
 * @returns {string}
 */
export function listRemoveItem(list, item) {
  const index = list.indexOf(item)
  if (index !== -1) {
    list.splice(index, 1)
  }
}

