//tealium universal tag - utag.341 ut4.0.201607291504, Copyright 2016 Tealium.com Inc. All Rights Reserved.
window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);try{(function(id,loader,u){try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};u.ev={'view':1};u.qsp_delim="&";u.kvp_delim="=";u.oogpt="false";u.pubid="KBAJeJjE";u.map={"site_section1":"section","site_section2":"subSection"};u.extend=[function(a,b,c,d,e,f,g){d=b['channel'];if(typeof d=='undefined')return;c=[{'time':'Jx8cfW4K'},{'fortune':'KBAJeJjE'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['krux_id']=c[e][f];m=true};};if(m)break};if(!m)b['krux_id']='';},function(a,b){if(!b.krux_id){return false;}
u.pubid=b.krux_id}];u.send=function(a,b,c,d,e,f){if(u.ev[a]||typeof u.ev.all!="undefined"){for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};for(d in utag.loader.GV(u.map)){if(typeof b[d]!=="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){Krux('set',e[f],b[d]);}}}
if(u.oogpt==="true"){(function(){function retrieve(n){var m,k='kx'+n;if(window.localStorage){return window.localStorage[k]||"";}else if(navigator.cookieEnabled){m=document.cookie.match(k+'=([^;]*)');return(m&&unescape(m[1]))||"";}else{return'';}}
Krux.user=retrieve('user');Krux.segments=retrieve('segs')&&retrieve('segs').split(',')||[];})();}
(function(){var k=document.createElement('script');k.type='text/javascript';k.async=true;k.setAttribute("data-id",u.pubid);k.className="kxct";k.setAttribute("data-version","async:1.7");var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);k.src=/^https?:\/\/([^\/]+\.)?krxd\.net(:\d{1,5})?\//i.test(src)?src:src==="disable"?"":(location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid="+u.pubid;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);})();}}
try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}})('341','timeinc.fortune.com');}catch(e){}