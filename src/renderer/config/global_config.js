var url = window.location.href;
console.log("URL : " + url)
var _url = "";
var _webUrl = "";
if(url.indexOf("got-et.com") >= 0) {
  _url = "http://tmspcadmin.got-et.com/";
  _webUrl = "http://tmspc.got-et.com/tms-web";
} else if(url.indexOf("ulmsale.cn") >= 0) {
  _url = "http://qbfadmin.ulmsale.cn/";
  _webUrl = "http://qbfadmin.ulmsale.cn/tms-web";
} else if(url.indexOf("oschina.io") >= 0) {
  // _url = "http://qbfadmin.ulmsale.cn/";
  _url = "http://tmspcadmin.zoumang.com/";
  _webUrl = "http://lmmax.oschina.io/tms-web";
} else if(url.indexOf("et-sh") >= 0) {
  _url = "http://www.et-sh.net/";
  _webUrl = "http://tmspc.et-sh.net/tms-web";
} else if(url.indexOf("yj-sh") >= 0) {
  _url = "http://tmspcadmin.yj-sh.com/";
  let i = url.indexOf("yj-sh.com")+9;
  _webUrl = url.slice(0,i)
  // _webUrl = "http://tmspc.yj-sh.com/tms-web";
} else if(url.indexOf("yanayun.com") >= 0) {
  _url = "http://tmspcadmin.yanayun.com/";
  let i = url.indexOf("yanayun.com")+11;
  _webUrl = url.slice(0,i)
  // _webUrl = url.subString(0,url.indexOf("yanayun.com")) +"tms-web"
  // _webUrl = "http://tmspc.yanayun.com/tms-web";
}else {
// _url = "http://192.168.2.110:9111/";
_url = "http://localhost:9080/";
// url = 'http://fxqeys.yanayun.com/#/login';
// // console.log(111,url);
// let i = url.indexOf("yanayun.com")+11;
// _webUrl = url.slice(0,i) +"/tms-web"
  // _url = "http://tmspcadmin.zoumang.com/";
// _url = "http://qbfadmin.ulmsale.cn/";
}
console.log("_webUrl111 : " + _webUrl)
const base_url = _url;//正式环境
const base_web_url = _webUrl;


export default {base_url,base_web_url}
