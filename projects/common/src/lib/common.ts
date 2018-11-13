export class CommonUtil {

  /**
   *
   *  If two array is equal
   */
  static arrayEqual(arr1, arr2) {
    if (arr1 === arr2) {
      return true;
    }

    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }


  /**
   *
   *  get browser type and version
   *  */
  static getExplore() {
    const sys: any = {};
    const ua = navigator.userAgent.toLowerCase();
    let s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
      (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
          (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
              (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
                (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) {
      return ('IE: ' + sys.ie);
    }

    if (sys.edge) {
      return ('EDGE: ' + sys.edge);
    }
    if (sys.firefox) {
      return ('Firefox: ' + sys.firefox);
    }
    if (sys.chrome) {
      return ('Chrome: ' + sys.chrome);
    }
    if (sys.opera) {
      return ('Opera: ' + sys.opera);
    }
    if (sys.safari) {
      return ('Safari: ' + sys.safari);
    }
    return 'Unkonwn';
  }

  /**
   * deep copy
   * */
  static deepClone(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || 'object' != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
      copy = new Date();
      copy.setTime(values.getTime());
      return copy;
    }

    // Handle Array
    if (values instanceof Array) {
      copy = [];
      for (var i = 0, len = values.length; i < len; i++) {
        copy[i] = CommonUtil.deepClone(values[i]);
      }
      return copy;
    }

    // Handle Object
    if (values instanceof Object) {
      copy = {};
      for (const attr in values) {
        if (values.hasOwnProperty(attr)) {
          copy[attr] = CommonUtil.deepClone(values[attr]);
        }
      }
      return copy;
    }

    throw new Error('Unable to copy values! Its type isn\'t supported.');
  }

  /**
   * if is a valid email
   */
  static isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  }

  static isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  }



  /* Convert the first character to upper case and the remaining to lower case.
 * |Name  |Type  |Desc                |
 * |------|------|--------------------|
 * |str   |string|String to capitalize|
 * |return|string|Capitalized string  |
 * capitalize('rED'); // -> Red
 */
  static capitalized(str) {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }


  static objToStr(val) {
    const ObjToStr = Object.prototype.toString;
    return ObjToStr.call(val);
  }

  static isDate(val) {
    return CommonUtil.objToStr(val) === '[object Date]';
  }

  static isNum(val) {
    return CommonUtil.objToStr(val) === '[object Number]';
  }

  // from http://www.jacklmoore.com/notes/rounding-in-javascript/
  // http://www.javascriptkit.com/javatutors/formatnumber.shtml
  static roundDecimal(value, decimals) {
    let number;
    // the value can not parse to number
    if (!value || isNaN(Number(value))) {
      return null;
    } else {
      number = Number(value);
      return parseFloat(parseFloat((Math.round(number * 10000) / 10000).toString()).toFixed(decimals));
    }

    // console.log((('+' + value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals));
    // console.log(parseFloat((value + 'e' + decimals) + 'e-' + decimals));
    // console.log(Math.round(parseFloat((value + 'e' + decimals) + 'e-' + decimals)));
    //
    // return Number(Math.round(parseFloat((value + 'e' + decimals) + 'e-' + decimals)));




    // // if value is number
    // if (CommonUtil.isNum(value)) {
    //   number = value;
    // } else {
    //
    // }

    // console.log((value + 'e' + decimals) + 'e-' + decimals);
    // return Number(Math.round( Number((value + 'e' + decimals) + 'e-' + decimals)));
  }

  // static toFixed(x) {
  //   if (Math.abs(x) < 1.0) {
  //     var e = parseInt(x.toString().split('e-')[1]);
  //     if (e) {
  //       x *= Math.pow(10,e-1);
  //       x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
  //     }
  //   } else {
  //     var e = parseInt(x.toString().split('+')[1]);
  //     if (e > 20) {
  //       e -= 20;
  //       x /= Math.pow(10,e);
  //       x += (new Array(e+1)).join('0');
  //     }
  //   }
  //   return x;
  // }
}
