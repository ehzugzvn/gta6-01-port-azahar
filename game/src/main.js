import {CONFIG} from './config.js';import {keys,consumeMouse} from './input.js';import {buildCity,collide} from './city3d.js';import {makeCar,makePerson,driveCar} from './vehicles3d.js';import {Traffic} from './traffic.js';import {Pedestrians} from './pedestrians.js';import {Police} from './police.js';import {Combat} from './combat.js';import {MissionSystem} from './missions.js';import * as HUD from './hud.js';import {initMenus} from './menus.js';import {saveGame,loadGame} from './save.js';import {getShot,applyShot} from './shots.js';import {cashSound} from './audio.js';

const shot=getShot();
const canvas=document.getElementById('gl');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(62,innerWidth/innerHeight,0.1,800);
buildCity(scene);
const state={cash:1250,respect:20,health:100,wanted:0,mode:'drive',missionIndex:0,shotMode:!!shot,mission:null,missionTarget:null};
const saved=loadGame();if(saved&&!shot){state.cash=saved.cash??state.cash;state.respect=saved.respect??state.respect}
const missions=new MissionSystem(state);missions.startMarker(scene);state.mission=missions.current();state.missionTarget=state.mission.target;
const playerCar=makeCar(0xff6a1a);playerCar.position.set(-62,0,0);scene.add(playerCar);
const player=makePerson(0xe84a7a,0x1a2a4a);player.position.set(40,0,40);player.visible=false;scene.add(player);
const traffic=new Traffic(scene,10);const peds=new Pedestrians(scene,14);const police=new Police(scene);const combat=new Combat(scene);
const rivals=[makeCar(0x22ccff),makeCar(0xeecc22),makeCar(0xcc33cc)];rivals.forEach(r=>{r.visible=false;scene.add(r)});
if(shot==='race')rivals.forEach(r=>r.visible=true);
let yaw=0,last=performance.now(),elapsed=0,shotApplied=false;
initMenus(state,{onNew:()=>{state.cash=1250;state.respect=20},onContinue:()=>{},onGarage:()=>HUD.toast('GARAGE — Taller Azahar: turbo, armour, respray available')});
if(shot==='menu'){/* menu stays visible */}
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});

function step(now){requestAnimationFrame(step);const dt=Math.min(0.05,(now-last)/1000);last=now;elapsed+=dt;const t=elapsed;
 if(shot&&!shotApplied){applyShot(shot,{playerCar,player,police,camera,state,missions,rivals,peds});shotApplied=true;state.mission=missions.current();state.missionTarget=state.mission.target}
 // input driving / walking
 let speedKmh=0;
 if(!shot){
  if(state.mode==='drive'){
   const inp={up:keys.KeyW||keys.ArrowUp,down:keys.KeyS||keys.ArrowDown,left:keys.KeyA||keys.ArrowLeft,right:keys.KeyD||keys.ArrowRight};
   const before=playerCar.position.clone();const sp=driveCar(playerCar,dt,inp,playerCar.userData.maxSpeed||30);speedKmh=sp*3.6;
   if(collide(playerCar.position,2)){playerCar.position.copy(before);playerCar.userData.speed*=-0.3}
   player.visible=false;playerCar.visible=true;
   if(keys.KeyE){state.mode='foot';player.position.copy(playerCar.position).add(new THREE.Vector3(3,0,0));player.visible=true}
   const back=new THREE.Vector3(Math.sin(playerCar.userData.angle)*-11,5.5,Math.cos(playerCar.userData.angle)*-11);
   camera.position.lerp(playerCar.position.clone().add(back),0.12);camera.lookAt(playerCar.position.x,2,playerCar.position.z+Math.cos(playerCar.userData.angle)*6);
  } else {
   player.visible=true;const sp=keys.ShiftLeft?7:3.5;let mx=0,mz=0;if(keys.KeyW)mz+=1;if(keys.KeyS)mz-=1;if(keys.KeyA)mx-=1;if(keys.KeyD)mx+=1;yaw+=consumeMouse()*0.003;
   player.position.x+=mx*sp*dt;player.position.z+=mz*sp*dt;player.rotation.y=yaw+Math.atan2(mx,mz||0.001);
   if(keys.KeyF)combat.shoot(player.position.clone().add(new THREE.Vector3(0,1.5,0)),new THREE.Vector3(Math.sin(player.rotation.y),0,Math.cos(player.rotation.y)));
   if(keys.KeyE){state.mode='drive'}
   camera.position.lerp(player.position.clone().add(new THREE.Vector3(-Math.sin(yaw)*8,4,-Math.cos(yaw)*8)),0.15);camera.lookAt(player.position.x,1.6,player.position.z);
  }
  traffic.update(dt);peds.update(dt,t);police.setWanted(state.wanted,state.mode==='drive'?playerCar.position:player.position);police.update(dt,t,state.mode==='drive'?playerCar.position:player.position);combat.update(dt);
  const activePos=state.mode==='drive'?playerCar.position:player.position;const reward=missions.check(activePos);if(reward){HUD.toast('JOB COMPLETE +$'+reward);cashSound();state.mission=missions.current();state.missionTarget=state.mission.target;saveGame({...state,missionIndex:missions.index})}
  HUD.showDistrict(HUD.nearestDistrict(activePos));
 } else {
  // shot mode: gentle animation, flashing lights, heli rotor
  traffic.update(dt*0.3);peds.update(dt,t);police.update(0,t,playerCar.position);
  if(shot==='cover'){playerCar.position.z+=dt*6;if(playerCar.position.z>34)playerCar.position.z=20;const pz=playerCar.position.z;
   if(police.cars[0])police.cars[0].position.set(-67,0,pz-7);if(police.cars[1])police.cars[1].position.set(-56,0,pz-10);if(police.cars[2])police.cars[2].position.set(-63,0,pz-17);
   police.heli.position.set(-50,15,pz+24);
   camera.position.set(playerCar.position.x-1,6,playerCar.position.z-15);camera.lookAt(playerCar.position.x+2,2,playerCar.position.z+24)}
  const bar=police.cars[0]?.getObjectByName('lightbar'); // flashing handled in police update for cover via heli? ensure visible
 }
 const activePos=state.mode==='drive'?playerCar.position:player.position;
 HUD.updateHUD(state,shot==='cover'?86:speedKmh);HUD.drawMinimap(state,state.mode==='drive'?playerCar:player,police.cars,traffic.cars);
 renderer.render(scene,camera);
}
requestAnimationFrame(step);
