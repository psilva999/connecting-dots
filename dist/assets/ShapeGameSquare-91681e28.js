import{B as S}from"./BackButton-81403216.js";import{_ as b,r as k,e as B,o as w,c as x,a as f,n as v,d as P,H as C,p as q,f as I,b as R}from"./index-dd012a06.js";const W="/connecting-dots/assets/shapeGameSquareBg-245aa0b1.png";const G=r=>(q("data-v-628f8ea5"),r=r(),I(),r),M=G(()=>R("canvas",{id:"dots"},null,-1)),T={__name:"ShapeGameSquare",setup(r){const m=k("/connecting-dots/shape");let l=[],a=[],d=0,c=!1,h={x:100,y:160},n={x:100,y:160},p=12;const g=[{x:21,y:25},{x:400,y:34},{x:400,y:390},{x:23,y:390}];class y{constructor(e,i,s){this.x=e,this.y=i,this.strokeColor=s}connect(e,i,s){s.strokeStyle=this.strokeColor,s.lineWidth=10,s.beginPath(),s.moveTo(this.x,this.y),s.lineTo(e,i),s.stroke()}plot(e){e.fillStyle="rgb(226, 126, 110)",e.strokeStyle=this.strokeColor,e.lineWidth=3,e.beginPath(),e.arc(this.x,this.y,p,0,Math.PI*2),e.fill(),e.stroke()}within(e,i){return Math.sqrt(Math.pow(e-this.x,2)+Math.pow(i-this.y,2))<p}}return B(()=>{const o=document.getElementById("dots"),e=o.getContext("2d");o.width=420,o.height=420;for(let t=0;t<g.length;t++)a.push(new y(g[t].x,g[t].y,"rgb(120, 120, 120)"));o.addEventListener("mousedown",t=>{n.x=t.clientX-o.getBoundingClientRect().left,n.y=t.clientY-o.getBoundingClientRect().top,_()}),o.addEventListener("mousemove",t=>{n.x=t.clientX-o.getBoundingClientRect().left,n.y=t.clientY-o.getBoundingClientRect().top});function i(){e.clearRect(0,0,o.width,o.height);for(let t=0;t<a.length;t++)a[t].plot(e);for(let t=0;t<l.length;t++)l[t].plot(e),t>0&&l[t].connect(l[t-1].x,l[t-1].y,e);d==0?(e.fillStyle="rgb(226, 126, 110)",e.strokeStyle="rgb(222, 222, 222)",e.lineWidth=2,e.font="24px Arial"):c?(s(e),e.fillStyle="rgb(226, 126, 110)",e.strokeStyle="rgb(222, 222, 222)",e.lineWidth=5):(e.strokeStyle="rgb(226, 126, 110)",e.lineWidth=2,e.beginPath(),e.moveTo(h.x,h.y),e.lineTo(n.x,n.y),e.stroke()),requestAnimationFrame(i)}function s(t){t.strokeStyle="rgb(90, 90, 90)",t.fillStyle="rgb(226, 126, 110)",t.lineWidth=2,t.beginPath();for(let u=0;u<l.length;u++)t.lineTo(l[u].x,l[u].y);t.closePath(),t.fill(),t.stroke()}function _(){!c&&a[d].within(n.x,n.y)&&(l.push(new y(n.x,n.y,"rgb(120, 120, 120)")),d++,h.x=n.x,h.y=n.y,d===a.length&&(c=!0))}i()}),(o,e)=>(w(),x("div",{class:"square",style:v({backgroundImage:`url(${P(W)})`})},[f(S,{name:m.value},null,8,["name"]),f(C),M],4))}},z=b(T,[["__scopeId","data-v-628f8ea5"]]);export{z as default};