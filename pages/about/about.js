/* SANA ABOUT — LIVE PARTICLES + INTERACTIONS */
"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 const back=document.getElementById("aboutBackButton");
 const fav=document.getElementById("aboutFavorite");
 const journey=document.getElementById("journeyButton");
 const shop=document.getElementById("shopButton");
 const makers=document.getElementById("makersButton");
 const play=document.getElementById("fabricPlay");

 back?.addEventListener("click",()=>window.history.length>1?history.back():location.href="../index.html");
 journey?.addEventListener("click",()=>document.getElementById("journey")?.scrollIntoView({behavior:"smooth"}));
 shop?.addEventListener("click",()=>location.href="shop.html");
 makers?.addEventListener("click",()=>document.querySelector(".maker-art")?.scrollIntoView({behavior:"smooth",block:"center"}));

 let liked=false;
 fav?.addEventListener("click",()=>{liked=!liked;fav.textContent=liked?"♥":"♡";});

 let fast=false;
 play?.addEventListener("click",()=>{fast=!fast;const c=document.querySelector(".cloth-card");if(c)c.style.animationDuration=fast?"2s":"9s";play.textContent=fast?"Ⅱ":"▶";});

 const reveal=document.querySelectorAll(".reveal,.reveal-section");
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
 reveal.forEach((el,i)=>{if(el.classList.contains("reveal"))el.style.transitionDelay=Math.min(i*70,450)+"ms";observer.observe(el)});

 const canvas=document.getElementById("particleCanvas"),hero=document.getElementById("aboutHero");
 if(!canvas||!hero)return;
 const ctx=canvas.getContext("2d");let w,h,ps=[];
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 function particle(initial=true){return{x:Math.random()*w,y:initial?Math.random()*h:h+20,size:.4+Math.random()*1.5,s:.1+Math.random()*.42,a:.2+Math.random()*.65,d:(Math.random()-.5)*.2,p:Math.random()*6.28,t:.01+Math.random()*.03}}
 function resize(){const d=Math.min(devicePixelRatio||1,2);w=hero.clientWidth;h=hero.clientHeight;canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);ps=Array.from({length:reduced?20:Math.min(120,Math.max(55,Math.floor(innerWidth/7)))},()=>particle())}
 function draw(time){ctx.clearRect(0,0,w,h);for(const p of ps){if(!reduced){p.y-=p.s;p.x+=p.d+Math.sin(p.y*.008+p.p)*.08;if(p.y<-20||p.x<-30||p.x>w+30)Object.assign(p,particle(false))}const pulse=Math.sin(time*p.t+p.p);ctx.beginPath();ctx.arc(p.x,p.y,p.size*(1+pulse*.18),0,Math.PI*2);ctx.fillStyle=`rgba(244,210,122,${Math.max(.04,p.a+pulse*.18)})`;ctx.shadowColor="#f4d27a";ctx.shadowBlur=p.size>1.2?8:3;ctx.fill();ctx.shadowBlur=0}requestAnimationFrame(draw)}
 resize();addEventListener("resize",resize,{passive:true});requestAnimationFrame(draw);
});