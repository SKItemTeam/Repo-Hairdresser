function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function formatduration(duration) {
    duration = new Date(duration);
    let mint = duration.getMinutes();
    let sec = duration.getSeconds();
    return formatNumber(mint) + ":" + formatNumber(sec);
}

function queryToObject(str) {
    var s = str.split("&");
    var param2 = {};
    for (var i = 0; i < s.length; i++) {
        var d = s[i].split("=");
        param2[d[0]] = d[1]
    }
    return param2;
}
function objectToString(param2) {
    var arr = [];
    for (var i in param2) {
        arr.unshift(i + "=" + param2[i]);
    }
    return arr.join("&");
}

function ksort(src) {
    var keys = Object.keys(src),
        target = {};
    keys.sort();
    keys.forEach(function (key) {
        target[key] = src[key];
    });
    return target;
}
function parseQueryString(url) {
    var str = url.split("?")[1];
    var result = {};
    if (str) {
        var items = str.split("&");
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            arr = items[i].split('=');
            result[arr[0]] = arr[1];
        }
    }
    return result;
}

function strToJson(str) {
    return JSON.parse(str)
}

module.exports = {
    ksort: ksort,
    parseQueryString: parseQueryString,
    formatTime: formatTime,
    queryToObject: queryToObject,
    objectToString: objectToString,
    formatduration: formatduration,
    strToJson: strToJson
}
