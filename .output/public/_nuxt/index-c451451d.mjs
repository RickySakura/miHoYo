var I=Object.defineProperty,R=Object.defineProperties;var U=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var D=(r,a,n)=>a in r?I(r,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[a]=n,w=(r,a)=>{for(var n in a||(a={}))L.call(a,n)&&D(r,n,a[n]);if(O)for(var n of O(a))T.call(a,n)&&D(r,n,a[n]);return r},C=(r,a)=>R(r,U(a));import{i as z,r as f,u as H,o as q,a as j,w as E,g as J,c as K,_ as b,b as M,d as m,e as g,f as p,h as d,j as v,k as B,F as Y,l as G,p as Q,m as W,n as X,q as x,t as S,s as Z,v as N,x as ee,y as te,z as A,A as re,B as ne,C as ae}from"./entry-2368c00b.mjs";import{_ as se}from"./NavBar-6e3cdb77.mjs";const oe=r=>z(r)?r:f(r),ce=()=>null;function ie(r,a,n={}){var l,h,k,$,P;if(typeof r!="string")throw new TypeError("asyncData key must be a string");if(typeof a!="function")throw new TypeError("asyncData handler must be a function");n=w({server:!0,default:ce},n),n.defer&&console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC."),n.lazy=(h=(l=n.lazy)!=null?l:n.defer)!=null?h:!1,n.initialCache=(k=n.initialCache)!=null?k:!0;const t=H(),e=J();if(e&&!e._nuxtOnBeforeMountCbs){const y=e._nuxtOnBeforeMountCbs=[];e&&(q(()=>{y.forEach(_=>{_()}),y.splice(0,y.length)}),j(()=>y.splice(0,y.length)))}const c=()=>n.initialCache&&t.payload.data[r]!==void 0,o={data:oe(($=t.payload.data[r])!=null?$:n.default()),pending:f(!c()),error:f((P=t.payload._errors[r])!=null?P:null)};o.refresh=(y={})=>t._asyncDataPromises[r]?t._asyncDataPromises[r]:y._initial&&c()?t.payload.data[r]:(o.pending.value=!0,t._asyncDataPromises[r]=Promise.resolve(a(t)).then(_=>{n.transform&&(_=n.transform(_)),n.pick&&(_=ue(_,n.pick)),o.data.value=_,o.error.value=null}).catch(_=>{o.error.value=_,o.data.value=n.default()}).finally(()=>{o.pending.value=!1,t.payload.data[r]=o.data.value,o.error.value&&(t.payload._errors[r]=!0),delete t._asyncDataPromises[r]}),t._asyncDataPromises[r]);const i=()=>o.refresh({_initial:!0}),s=n.server!==!1&&t.payload.serverRendered;{s&&t.isHydrating?o.pending.value=!1:e&&(t.isHydrating||n.lazy)?e._nuxtOnBeforeMountCbs.push(i):i(),n.watch&&E(n.watch,()=>o.refresh());const y=t.hook("app:data:refresh",_=>{if(!_||_.includes(r))return o.refresh()});e&&j(y)}const u=Promise.resolve(t._asyncDataPromises[r]).then(()=>o);return Object.assign(u,o),u}function ue(r,a){const n={};for(const t of a)n[t]=r[t];return n}function le(r,a=0){typeof r=="string"&&(r=_e(r));let n=0,t=a,e,c;const o=r.length&3,i=r.length-o,s=3432918353,u=461845907;for(;n<i;)e=r[n]&255|(r[++n]&255)<<8|(r[++n]&255)<<16|(r[++n]&255)<<24,++n,e=(e&65535)*s+(((e>>>16)*s&65535)<<16)&4294967295,e=e<<15|e>>>17,e=(e&65535)*u+(((e>>>16)*u&65535)<<16)&4294967295,t^=e,t=t<<13|t>>>19,c=(t&65535)*5+(((t>>>16)*5&65535)<<16)&4294967295,t=(c&65535)+27492+(((c>>>16)+58964&65535)<<16);switch(e=0,o){case 3:e^=(r[n+2]&255)<<16;break;case 2:e^=(r[n+1]&255)<<8;break;case 1:e^=r[n]&255,e=(e&65535)*s+(((e>>>16)*s&65535)<<16)&4294967295,e=e<<15|e>>>17,e=(e&65535)*u+(((e>>>16)*u&65535)<<16)&4294967295,t^=e}return t^=r.length,t^=t>>>16,t=(t&65535)*2246822507+(((t>>>16)*2246822507&65535)<<16)&4294967295,t^=t>>>13,t=(t&65535)*3266489909+(((t>>>16)*3266489909&65535)<<16)&4294967295,t^=t>>>16,t>>>0}function _e(r){return new TextEncoder().encode(r)}const de={ignoreUnknown:!1,respectType:!1,respectFunctionNames:!1,respectFunctionProperties:!1,unorderedObjects:!0,unorderedArrays:!1,unorderedSets:!1};function pe(r,a={}){a=w(w({},de),a);const n=F(a);return n.dispatch(r),n.toString()}function F(r){const a=[];let n=[];const t=e=>{a.push(e)};return{toString(){return a.join("")},getContext(){return n},dispatch(e){return r.replacer&&(e=r.replacer(e)),this["_"+(e===null?"null":typeof e)](e)},_object(e){const c=/\[object (.*)\]/i,o=Object.prototype.toString.call(e),i=c.exec(o),s=i?i[1].toLowerCase():"unknown:["+o.toLowerCase()+"]";let u=null;if((u=n.indexOf(e))>=0)return this.dispatch("[CIRCULAR:"+u+"]");if(n.push(e),typeof Buffer!="undefined"&&Buffer.isBuffer&&Buffer.isBuffer(e))return t("buffer:"),t(e.toString("utf8"));if(s!=="object"&&s!=="function"&&s!=="asyncfunction")if(this["_"+s])this["_"+s](e);else{if(r.ignoreUnknown)return t("["+s+"]");throw new Error('Unknown object type "'+s+'"')}else{let l=Object.keys(e);return r.unorderedObjects&&(l=l.sort()),r.respectType!==!1&&!V(e)&&l.splice(0,0,"prototype","__proto__","letructor"),r.excludeKeys&&(l=l.filter(function(h){return!r.excludeKeys(h)})),t("object:"+l.length+":"),l.forEach(h=>{this.dispatch(h),t(":"),r.excludeValues||this.dispatch(e[h]),t(",")})}},_array(e,c){if(c=typeof c!="undefined"?c:r.unorderedArrays!==!1,t("array:"+e.length+":"),!c||e.length<=1)return e.forEach(s=>this.dispatch(s));const o=[],i=e.map(s=>{const u=F(r);return u.dispatch(s),o.push(u.getContext()),u.toString()});return n=n.concat(o),i.sort(),this._array(i,!1)},_date(e){return t("date:"+e.toJSON())},_symbol(e){return t("symbol:"+e.toString())},_error(e){return t("error:"+e.toString())},_boolean(e){return t("bool:"+e.toString())},_string(e){t("string:"+e.length+":"),t(e.toString())},_function(e){t("fn:"),V(e)?this.dispatch("[native]"):this.dispatch(e.toString()),r.respectFunctionNames!==!1&&this.dispatch("function-name:"+String(e.name)),r.respectFunctionProperties&&this._object(e)},_number(e){return t("number:"+e.toString())},_xml(e){return t("xml:"+e.toString())},_null(){return t("Null")},_undefined(){return t("Undefined")},_regexp(e){return t("regex:"+e.toString())},_uint8array(e){return t("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray(e){return t("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array(e){return t("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array(e){return t("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array(e){return t("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array(e){return t("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array(e){return t("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array(e){return t("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array(e){return t("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer(e){return t("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url(e){return t("url:"+e.toString())},_map(e){t("map:");const c=Array.from(e);return this._array(c,r.unorderedSets!==!1)},_set(e){t("set:");const c=Array.from(e);return this._array(c,r.unorderedSets!==!1)},_file(e){return t("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob(){if(r.ignoreUnknown)return t("[blob]");throw new Error(`Hashing Blob objects is currently not supported
Use "options.replacer" or "options.ignoreUnknown"
`)},_domwindow(){return t("domwindow")},_bigint(e){return t("bigint:"+e.toString())},_process(){return t("process")},_timer(){return t("timer")},_pipe(){return t("pipe")},_tcp(){return t("tcp")},_udp(){return t("udp")},_tty(){return t("tty")},_statwatcher(){return t("statwatcher")},_securecontext(){return t("securecontext")},_connection(){return t("connection")},_zlib(){return t("zlib")},_context(){return t("context")},_nodescript(){return t("nodescript")},_httpparser(){return t("httpparser")},_dataview(){return t("dataview")},_signal(){return t("signal")},_fsevent(){return t("fsevent")},_tlswrap(){return t("tlswrap")}}}function V(r){return typeof r!="function"?!1:/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(r))!=null}function fe(r,a={}){const n=typeof r=="string"?r:pe(r,a);return String(le(n))}function he(r,a={}){const n="$f_"+(a.key||fe([r,a])),t=K(()=>{let i=r;return typeof i=="function"&&(i=i()),z(i)?i.value:i}),e=C(w({},a),{cache:typeof a.cache=="boolean"?void 0:a.cache}),c=C(w({},a),{watch:[t,...a.watch||[]]});return ie(n,()=>$fetch(t.value,e),c)}const ye={props:{links:Array},emits:["click"],setup(r,{expose:a,emit:n}){const t=r;let e=f([]);function c(s){e.value=[];for(let u in t.links)e.value.push(!1);e.value[s]=!0}function o(s){n("click",s)}M(()=>{for(let s in t.links)e.value.push(!1)}),a({linkSelect:c});const i={props:t,emits:n,state:e,linkSelect:c,click:o};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},me=r=>(Q("data-v-443c34ba"),r=r(),W(),r),ge={class:"header"},ve={class:"header__navwrap"},be={class:"header__navbar"},we={class:"header__navbar-logo"},Se=me(()=>p("img",{src:"https://www.mihoyo.com/_nuxt/img/mihoyo-logo.754bbce.png",alt:"miHoYo_F"},null,-1)),xe={class:"header__navbar-links"},ke=["onClick"];function $e(r,a,n,t,e,c){const o=X;return m(),g("div",ge,[p("div",ve,[p("div",be,[p("div",we,[d(o,{to:"/"},{default:v(()=>[B(r.$slots,"logo",{},()=>[Se],!0)]),_:3})]),p("div",xe,[B(r.$slots,"links",{},()=>[(m(!0),g(Y,null,G(n.links,(i,s)=>(m(),g("div",{class:x(["header__navbar-link",t.state[s]==!0?"header__navbar-link--active":""]),onClick:u=>{t.linkSelect(s),t.click(s)}},[p("span",null,S(i),1),p("b",null,S(i),1)],10,ke))),256))],!0)])])])])}var Ce=b(ye,[["render",$e],["__scopeId","data-v-443c34ba"]]);const Ae={name:"index",data(){return{page:"index"}}};function Pe(r,a,n,t,e,c){const o=se;return m(),g("div",{class:x("home-"+e.page)},[d(o)],2)}var Oe=b(Ae,[["render",Pe]]);const De={data(){return{page:"about"}}};function je(r,a,n,t,e,c){return m(),g("div",{class:x("home-"+e.page)}," this is "+S(e.page),3)}var Be=b(De,[["render",je]]);const Ne={setup(r,{expose:a}){a();const t={page:"join"};return Object.defineProperty(t,"__isScriptSetup",{enumerable:!1,value:!0}),t}};function Ve(r,a,n,t,e,c){return m(),g("div",{class:x("home-"+t.page)}," this is "+S(t.page),2)}var ze=b(Ne,[["render",Ve]]);const Ee={data(){return{page:"news"}}};function Me(r,a,n,t,e,c){return m(),g("div",{class:x("home-"+e.page)}," this is "+S(e.page),3)}var Fe=b(Ee,[["render",Me]]);const Ie={setup(r,{expose:a}){a();let n=f(""),t=Z("isShowVideo"),e=f("background-color: rgba(0, 0, 0,0.9); "),c=f(" opacity: 1;");function o(){setTimeout(()=>{t.value=!1,e.value="background-color: rgba(0, 0, 0,0.9); ",c.value=" opacity: 1;"},180),e.value="background-color: rgba(0, 0, 0,0);",c.value=" opacity: 0;"}const i={videoSrc:n,isShowVideo:t,mask_style:e,video_style:c,closeVideo:o};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},Re={class:"custom-mihoyo-common-container",style:{"animation-duration":"250ms","transition-duration":"250ms"}},Ue=["src"];function Le(r,a,n,t,e,c){return t.isShowVideo?(m(),g("div",{key:0,class:"home-pv custom-mihoyo-common-mask pv",style:N(t.mask_style),onClick:t.closeVideo},[p("div",Re,[p("div",{class:"home-pv-close",onClick:t.closeVideo}),p("video",{src:t.isShowVideo,controls:"controls",autoplay:"autoplay",preload:"",class:"home-pv-video",style:N(t.video_style)},null,12,Ue)])],4)):ee("",!0)}var Te=b(Ie,[["render",Le],["__scopeId","data-v-56669a06"]]);const He=te(()=>re(()=>import("./Product-35917c7d.mjs"),["Product-35917c7d.mjs","Product.d2dc38fc.css","entry-2368c00b.mjs","entry.75bb641d.css","NavBar-6e3cdb77.mjs"])),qe={setup(r,{expose:a}){a();let n=f([]),t=f([]),e=f(null);M(async()=>{const{data:s}=await he("/assets/headerlinks.json");s.value.forEach(u=>{n.value.push(u.title),t.value.push(u.path)}),o()});function c(s){t.value[s].indexOf("http")!=-1?window.open(t.value[s],"_blank"):ae().push("/?page="+t.value[s])}function o(){if(A().query.page==null)e.value.linkSelect(0);else for(let s=0;s<t.value.length;s++)if(A().query.page==t.value[s]){e.value.linkSelect(s);break}}E(()=>A().query,()=>{o()});const i={links:n,paths:t,miheader:e,linkMatchRoute:c,routeMatchLink:o};return Object.defineProperty(i,"__isScriptSetup",{enumerable:!1,value:!0}),i}},Je={class:"view"};function Ke(r,a,n,t,e,c){const o=Ce,i=Oe,s=He,u=Be,l=ze,h=Fe,k=ne,$=Te;return m(),g("div",Je,[d(k,{name:"mi-layout"},{header:v(()=>[d(o,{links:t.links,onClick:t.linkMatchRoute,ref:"miheader"},null,8,["links"])]),default:v(()=>[d(i)]),product:v(()=>[d(s)]),about:v(()=>[d(u)]),join:v(()=>[d(l)]),news:v(()=>[d(h)]),_:1}),d($)])}var We=b(qe,[["render",Ke],["__scopeId","data-v-d1779c08"]]);export{We as default};
