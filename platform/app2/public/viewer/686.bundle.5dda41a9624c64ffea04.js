"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[686],{39686:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});var o=r(43001),s=r(3827),l=r.n(s);function n(e){let{displaySets:t}=e;if(t&&t.length>1)throw new Error("OHIFCornerstoneVideoViewport: only one display set is supported for dicom video right now");const{videoUrl:r}=t[0],s="video/mp4",[l,n]=(0,o.useState)(null);return(0,o.useEffect)((()=>{(async()=>{n(await r)})()}),[r]),o.createElement("div",{className:"bg-primary-black w-full h-full"},o.createElement("video",{src:l,controls:!0,controlsList:"nodownload",preload:"auto",className:"w-full h-full",crossOrigin:"anonymous"},o.createElement("source",{src:l,type:s}),o.createElement("source",{src:l,type:s}),"Video src/type not supported:"," ",o.createElement("a",{href:l},l," of type ",s)))}n.propTypes={displaySets:l().arrayOf(l().object).isRequired};const a=n}}]);
//# sourceMappingURL=686.bundle.5dda41a9624c64ffea04.js.map