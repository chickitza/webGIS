"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8628],{2740:function(t,e,a){var n=a(1055),o=a(2893),r=a(824),s=a(4469),c=a(1625);const l=new o.Z({source:new s.Z({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",maxZoom:20,crossOrigin:""})}),i=new n.Z({layers:[l],target:"map",view:new r.ZP({center:(0,c.mi)([-120,50]),zoom:6})}),h={none:[0,0,0,0,1,0,0,0,0],sharpen:[0,-1,0,-1,5,-1,0,-1,0],sharpenless:[0,-1,0,-1,10,-1,0,-1,0],blur:[1,1,1,1,1,1,1,1,1],shadow:[1,2,1,0,1,0,-1,-2,-1],emboss:[-2,1,0,-1,1,1,0,1,2],edge:[0,1,0,1,-4,1,0,1,0]};function p(t){const e=t.length,a=new Array(e);let n,o=0;for(n=0;n<e;++n)o+=t[n];for(o<=0?(a.normalized=!1,o=1):a.normalized=!0,n=0;n<e;++n)a[n]=t[n]/o;return a}const m=document.getElementById("kernel");let u=p(h[m.value]);m.onchange=function(){u=p(h[m.value]),i.render()},l.on("postrender",(function(t){!function(t,e){const a=t.canvas,n=a.width,o=a.height,r=Math.sqrt(e.length),s=Math.floor(r/2),c=t.getImageData(0,0,n,o).data,l=t.createImageData(n,o),i=l.data;for(let t=0;t<o;++t){const a=t*n;for(let l=0;l<n;++l){let h=0,p=0,m=0,u=0;for(let a=0;a<r;++a)for(let i=0;i<r;++i){const g=e[a*r+i],f=4*(Math.min(o-1,Math.max(0,t+a-s))*n+Math.min(n-1,Math.max(0,l+i-s)));h+=c[f]*g,p+=c[f+1]*g,m+=c[f+2]*g,u+=c[f+3]*g}const g=4*(a+l);i[g]=h,i[g+1]=p,i[g+2]=m,i[g+3]=e.normalized?u:255}}t.putImageData(l,0,0)}(t.context,u)}))}},function(t){var e;e=2740,t(t.s=e)}]);
//# sourceMappingURL=image-filter.js.map