export class Common {

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
}