import {DISTRICTS} from './config.js';
const $=id=>document.getElementById(id);
export function showBanner(text){const b=$('banner');b.textContent=text;b.style.display=text?'block':'none'}
export function showDistrict(name){$('district').textContent=name}
export function nearestDistrict(pos){let best=DISTRICTS[0],bd=1e9;for(const d of DISTRICTS){const dd=(d.x-pos.x)**2+(d.z-pos.z)**2;if(dd<bd){bd=dd;best=d}}return best.name}
export function updateHUD(state,speedKmh){$('cash').textContent='$'+state.cash;$('respect').textContent='RESPECT '+state.respect;$('wanted').textContent='★'.repeat(state.wanted)+'☆'.repeat(5-state.wanted);$('speed').textContent=Math.abs(Math.round(speedKmh))+' km/h';$('healthfill').style.width=Math.max(0,state.health)+'%';
 const m=state.mission;$('objective').innerHTML=m?`<b>JOB ${m.id} · ${m.title}</b><br>${m.desc}<br><span style="color:#ffd23f">Reward $${m.reward} · Wanted ${'★'.repeat(m.wanted)}</span>`:'Free roam — Port Azahar is yours.'}
export function drawMinimap(state,player,police,traffic){const c=$('minimap'),ctx=c.getContext('2d');ctx.fillStyle='#07303e';ctx.fillRect(0,0,180,180);ctx.fillStyle='#123f2a';ctx.fillRect(78,0,102,180);ctx.fillStyle='#8a7f6d';ctx.fillRect(62,0,16,180);ctx.strokeStyle='#444';for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(78,i*36);ctx.lineTo(180,i*36);ctx.stroke()}
 const toXY=p=>[90+(p.x)*0.42,90+(p.z)*0.42];
 ctx.fillStyle='#ffd23f';const [mx,my]=toXY(state.missionTarget||{x:0,z:0});ctx.beginPath();ctx.arc(mx,my,6,0,7);ctx.fill();
 ctx.fillStyle='#4da6ff';for(const car of (traffic||[])){const [x,y]=toXY(car.position);ctx.fillRect(x-2,y-2,4,4)}
 ctx.fillStyle='#ff3333';for(const car of (police||[])){const [x,y]=toXY(car.position);ctx.beginPath();ctx.arc(x,y,4,0,7);ctx.fill()}
 ctx.fillStyle='#fff';const [px,py]=toXY(player.position);ctx.beginPath();ctx.arc(px,py,5,0,7);ctx.fill();ctx.strokeStyle='#ff7a1a';ctx.stroke()}
export function toast(text){$('toast').textContent=text;setTimeout(()=>$('toast').textContent='',2600)}
export function setCountdown(v){const e=$('countdown');e.textContent=v||'';e.style.display=v?'block':'none'}
export function setRace(text){$('racehud').innerHTML=text||''}
export function setPrompt(text){const e=$('prompt');e.textContent=text||'';e.style.display=text?'block':'none'}
