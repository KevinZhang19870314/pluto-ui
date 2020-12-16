// REDIRECT_URL: 退出平台到登录页面；
// SERVPLAT_URL: 跳转到服务平台
// SKIPTONEUSTAR_URL: 跳转到智能推荐管理平台
// VOUCHER_URL: 跳转到卡券管理平台

const url = window.location.href;
let SKIPTONEUSTAR_URL = '';
let VOUCHER_URL = '';
let TASTY_URL = '';
let AUTH_URL = '';
let WXAUTH_URL = '';
let ALP_AUTH_QRCODE = '';
let MEMTESTURL = '';
let MARKETING_URL = '';

if (url.indexOf('localhost') > -1) {
  SKIPTONEUSTAR_URL = 'https://localhost:6800/index.html?prevStatus=lingxi';
  VOUCHER_URL = 'https://localhost:6900/index.html?prevStatus=lingxi';
  TASTY_URL = 'https://localhost:7000/index.html?prevStatus=lingxi';
  AUTH_URL = 'https://localhost:9900/index.html?prevStatus=lingxi';
} else if (url.indexOf('xunliandata') > -1) {
  SKIPTONEUSTAR_URL = 'https://recommend.xunliandata.com/neustar/pc/index.html?prevStatus=lingxi';
  VOUCHER_URL = 'https://lingxi.xunliandata.com/neustar/voucher/index.html?prevStatus=lingxi';
  TASTY_URL = 'https://tasty.xunliandata.com/orderPlat/index.html?prevStatus=lingxi';
  AUTH_URL = 'https://auth.xunliandata.com/static/index.html?prevStatus=lingxi';
} else {
  SKIPTONEUSTAR_URL = 'https://recommend.ipay.so/neustar/pc/index.html?prevStatus=lingxi';
  VOUCHER_URL = 'https://neu-marketing.ipay.so/neustar/voucher/index.html?prevStatus=lingxi';
  TASTY_URL = 'https://tasty.ipay.so/orderPlat/index.html?prevStatus=lingxi';
  AUTH_URL = 'https://sso.ipay.so/static/index.html?prevStatus=lingxi';
}
// 这些地址用来区别生产和（测试/本地）
if (url.indexOf('xunliandata') > -1) {
  MARKETING_URL = 'https://lingxi.xunliandata.com';
  MEMTESTURL = 'https://member.xunliandata.com';
  WXAUTH_URL = 'https://lingxi.xunliandata.com';
  ALP_AUTH_QRCODE = 'https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906824519&redirect_uri=https://card.ipay.so/alipay/auth?req_from=bindSuccess';
} else {
  MARKETING_URL = 'https://neu-marketing.ipay.so';
  MEMTESTURL = 'https://memtest.ipay.so';
  WXAUTH_URL = 'https://neu-marketing.ipay.so';
  ALP_AUTH_QRCODE = 'https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2017041906825051&redirect_uri=https://cardtest.ipay.so/alipay/auth?req_from=bindSuccess';
}

let _isNotMobile = (function () {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || (<any>window).opera);
  return !check;
})();

export const PLATFORMURLLIST = {
  SKIPTONEUSTAR_URL: SKIPTONEUSTAR_URL,
  VOUCHER_URL: VOUCHER_URL,
  TASTY_URL: TASTY_URL,
  ALP_AUTH_QRCODE: ALP_AUTH_QRCODE,
  AUTH_URL: AUTH_URL,
  WXAUTH_URL: WXAUTH_URL,
  MEMTESTURL: MEMTESTURL,
  MARKETING_URL: MARKETING_URL
};
