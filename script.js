const screens = [...document.querySelectorAll(".screen")];
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const hearts = document.getElementById("hearts");
const particles = document.getElementById("particles");

let current = 0;
let started = false;

function show(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  current = screens.findIndex(s => s.id === id);
  if(id === "s3") celebration();
}

document.querySelectorAll(".next").forEach(btn => {
  btn.addEventListener("click", e => {
    const r = document.createElement("span");
    r.className = "ripple";
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = size + "px";
    r.style.left = (e.clientX - rect.left - size/2) + "px";
    r.style.top = (e.clientY - rect.top - size/2) + "px";
    btn.appendChild(r);
    setTimeout(()=>r.remove(),650);

    const next = btn.dataset.next;
    if(next) show(next);
  });
});

document.getElementById("replay").addEventListener("click",()=>{
  show("s1");
  window.scrollTo(0,0);
});

function startMusic(){
  if(started) return;
  started = true;
  music.volume = 0.65;
  music.play().then(()=>{
    musicBtn.classList.add("playing");
  }).catch(()=>{});
}

musicBtn.addEventListener("click",()=>{
  if(music.paused){
    music.play();
    musicBtn.classList.add("playing");
  }else{
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

document.querySelector("#s1 .magic-btn").addEventListener("click", startMusic, {once:true});

// Countdown before birthday reveal.
let n = 3;
const count = document.getElementById("count");
const countdown = setInterval(()=>{
  if(!document.getElementById("s2").classList.contains("active")) return;
  n--;
  if(n > 0) count.textContent = n;
  else {
    count.textContent = "❤️";
    clearInterval(countdown);
    setTimeout(()=>show("s3"),850);
  }
},900);

function celebration(){
  for(let i=0;i<80;i++){
    const h = document.createElement("div");
    h.textContent = ["❤️","✨","💖","🎉"][Math.floor(Math.random()*4)];
    h.style.position="fixed";
    h.style.left=(Math.random()*100)+"vw";
    h.style.top=(-10-Math.random()*30)+"vh";
    h.style.fontSize=(14+Math.random()*22)+"px";
    h.style.transition="transform 3s cubic-bezier(.2,.8,.2,1),opacity 3s";
    h.style.zIndex=30;
    document.body.appendChild(h);
    requestAnimationFrame(()=>{h.style.transform=`translateY(${120+Math.random()*80}vh) rotate(${Math.random()*500-250}deg)`;h.style.opacity="0"});
    setTimeout(()=>h.remove(),3200);
  }
}

function ambientParticles(){
  for(let i=0;i<55;i++){
    const s=document.createElement("div");
    s.className="spark";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.animationDelay=Math.random()*3+"s";
    s.style.animationDuration=(1.8+Math.random()*3)+"s";
    particles.appendChild(s);
  }
}
ambientParticles();

setInterval(()=>{
  if(document.hidden) return;
  const h=document.createElement("div");
  h.className="float-heart";
  h.textContent=["♡","♥","✦"][Math.floor(Math.random()*3)];
  h.style.left=Math.random()*100+"vw";
  h.style.color=Math.random()>.5?"#ff9bc9":"#c7b6ff";
  h.style.fontSize=(12+Math.random()*18)+"px";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),5200);
},650);

// Keyboard navigation for desktop.
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight" && current < screens.length-1) show(screens[current+1].id);
  if(e.key==="ArrowLeft" && current > 0) show(screens[current-1].id);
});
