"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6628],{9228:function(e,n,t){var o=t(1055),c=t(5117),i=t(2893),s=t(824);const a=document.getElementById("map");function r(){const e=a.clientWidth;return Math.ceil(Math.LOG2E*Math.log(e/256))}const u=r(),m=new s.ZP({center:[0,0],minZoom:u,zoom:u});new o.Z({layers:[new i.Z({source:new c.Z})],target:"map",view:m});window.addEventListener("resize",(function(){const e=r();e!==m.getMinZoom()&&m.setMinZoom(e)}))}},function(e){var n;n=9228,e(e.s=n)}]);
//# sourceMappingURL=min-zoom.js.map