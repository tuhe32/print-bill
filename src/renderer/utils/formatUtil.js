import sysEnums from "@/utils/enums";
/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
function fmDate(date, fmt) {
  if (date == undefined || date == '' || date == null) {
    return ''
  }
  if(typeof date=='string'){
    date = date.replace('.','-').replace('.','-').replace('.','-');
  }

  date = date == undefined ? new Date() : new Date(date);
  //date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  var obj =
    {
      'y': date.getFullYear(), // 年份，注意必须用getFullYear
      'M': date.getMonth() + 1, // 月份，注意是从0-11
      'd': date.getDate(), // 日期
      'q': Math.floor((date.getMonth() + 3) / 3), // 季度
      'w': date.getDay(), // 星期，注意是0-6
      'H': date.getHours(), // 24小时制
      'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
      'm': date.getMinutes(), // 分钟
      's': date.getSeconds(), // 秒
      'S': date.getMilliseconds() // 毫秒
    };
  var week = ['天', '一', '二', '三', '四', '五', '六'];
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      var val = obj[i] + '';
      if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}
//枚举对象转换
function enumsToList(sysenum) {
  var sysenumArray = [];
  var sysenum = sysEnums[sysenum];
  for (var v in sysenum) {
    sysenumArray.push({value: v, name: sysenum[v]});
  }
  return sysenumArray;
}

//枚举对象转换
function enumsToListWithNull(sysenum) {
  var sysenumArray = [];
  var sysenum = sysEnums[sysenum];
  sysenumArray.push({value: '', name: '----请选择----'});
  for (var v in sysenum) {
    sysenumArray.push({value: v, name: sysenum[v]});
  }
  return sysenumArray;
}

//枚举对象转换
function enumsToListWithBlank(sysenum) {
  var sysenumArray = [];
  var sysenum = sysEnums[sysenum];
  sysenumArray.push({value: '', name: ''});
  for (var v in sysenum) {
    sysenumArray.push({value: v, name: sysenum[v]});
  }
  return sysenumArray;
}

/**
 * 根据参数截取出指定level的id
 * @param path：树结构的id全路径,path demo:/1/2/3/5/7/ ;
 * @param level：节点级别,level demo : 4
 * @param splitChar 分隔符,默认'/'
 */
function cutNodeId(path, level ,splitChar) {
  if (path == null || level == null) return null;
  //先去除第一个/ 和最后一个/
  var cutp = path.substr(1);
  cutp = cutp.substr(0, cutp.length - 1);
  if (!cutp.length > 0) return null;
  splitChar = splitChar || '/';
  var cutA = cutp.split(splitChar);
  if (cutA.length < level) return null;
  for (var i = 0; i < cutA.length; i++) {
    if (level == i + 1) {
      return cutA[i];
    }
  }
  return null;
}
/**
 * 格式化手机号
 * @param phone -- 要格式化的手机号码，
 * @param space -- 要间隔的字符 如例子中的‘-’
 * @returns 123-4567-8900
 */
function fmPhone(phone,space) {
  if (phone == undefined || phone == null || phone.length != 11) return null;
  space = space || '-'
  var front = phone.substr(0, 3)
  var middle = phone.substr(3, 4)
  var end = phone.substr(-4)
  return front + space + middle + space + end;
}
/**
 * 价格显示格式化 1,231.00元
 * @param money 价格值
 * @param precision 精度
 * @param isUnit 是否需要单位(人民币：元、万元),默认不写
 * @param unit 单位, 不填则在前面加'￥'
 * @returns {string}
 */
function fmMoney(money, precision ,isUnit)
{
  precision = precision || 0;
  if(precision > 2) precision = 2;
  isUnit = isUnit==undefined?false :isUnit;
  var unit = ""
  if(isUnit) unit = "￥"
  money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
  if(money>0){
    money = money.toFixed(2) + "";
    //_integer -- 整数部分，_dec -- 小数部分, _comma--每三位数用逗号分隔
    var _integer = money.split(".")[0].split("").reverse(),
        _dec     = "",
        _comma   = "";
    if(precision>0){
      _dec = "." + money.split(".")[1];
    }
    // if(_integer.length>4) {
    //   //过万元
    //   if(isUnit) unit = "万元";
    //   else unit = "W";
    //   return fmMoney(money / 10000, 2, false) + unit;
    // }
    for(var i = 0; i < _integer.length; i ++ )
    {
      _comma += _integer[i] + ((i + 1) % 3 == 0 && (i + 1) != _integer.length ? "," : "");
    }
    return unit + _comma.split("").reverse().join("") + _dec;
  }
  return unit + money;
}

var getCurrectNumber = function(input_num){
  if(input_num == null || input_num == undefined) return '';
  input_num = input_num+"";
  input_num = input_num.replace(/[^0-9.]/g,'');
  var decimal = "";
  var integer;
  if (input_num.split(".").length >= 2) {
    decimal = "."+input_num.split(".")[1];
    integer = input_num.split(".")[0];
  }else {
    integer = input_num;
  }
  var num = Number(integer);
  input_num = num.toString() + decimal;
  num =  Number(input_num);
//                  num = Math.floor(num*100)/100;
  if(num>1000000000.00){
    input_num = "0";
    alert("数字过大，请重新输入!");
  }
  if (input_num.split(".").length == 2 && input_num.split(".")[1].length > 2){
    num = num.toFixed(2);
    input_num = num.toString();
  }
  return input_num;
}

/** 数字金额大写转换(可以处理整数,小数,负数) */
function smalltoBIG(n)
{
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
  var head = n < 0? '欠': '';
  n = Math.abs(n);

  var s = '';

  for (var i = 0; i < fraction.length; i++)
  {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);

  for (var i = 0; i < unit[0].length && n > 0; i++)
  {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++)
    {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
export  default {fmDate, enumsToList, enumsToListWithNull, enumsToListWithBlank,cutNodeId,fmPhone,fmMoney,getCurrectNumber,smalltoBIG}
