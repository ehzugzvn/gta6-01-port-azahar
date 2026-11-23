import {showBanner,showDistrict,setCountdown,setRace} from './hud.js';
export function getShot(){const q=new URLSearchParams(location.search);return q.get('shot')}
export function applyShot(name,S){
 // S: {playerCar,player,police,camera,state,missions,rivals}
 if(name==='cover'){
  S.state.wanted=4;S.state.mode='drive';S.missions.index=4;
  S.playerCar.position.set(-62,0,20);S.playerCar.rotation.y=0;S.playerCar.userData.angle=0;
  S.police.setWanted(4,S.playerCar.position);
  S.police.cars[0].position.set(-67,0,13);S.police.cars[0].rotation.y=0;
  if(S.police.cars[1]){S.police.cars[1].position.set(-56,0,10);S.police.cars[1].rotation.y=0}
  if(S.police.cars[2]){S.police.cars[2].position.set(-62,0,2);S.police.cars[2].rotation.y=0}
  S.police.heli.position.set(-50,15,44);S.police.heli.visible=true;
  if(S.peds)S.peds.peds.forEach(p=>p.visible=false);
  showBanner('JOB 5 · QUIET MANIFEST — Shake the PPA, reach the marina');
  showDistrict('MUELLE — THE QUAY');
  S.camera.position.set(-62,5.5,-2);S.camera.lookAt(-60,2,40);
 } else if(name==='onfoot'){
  S.state.mode='foot';S.state.wanted=1;
  S.player.position.set(10,0,66);S.player.rotation.y=0.8;S.player.visible=true;
  if(S.missions.marker)S.missions.marker.position.set(24,11,76);
  S.police.setWanted(1,S.player.position);if(S.police.cars[0]){S.police.cars[0].position.set(0,0,88);S.police.cars[0].rotation.y=Math.PI}
  showBanner('JOB 1 · PAPER TRAIL — Pickup in the container yard');
  showDistrict('MUELLE DE CONTENEDORES');
  S.camera.position.set(1,2.8,57);S.camera.lookAt(16,1.3,70);
 } else if(name==='race'){
  S.state.mode='drive';S.state.wanted=0;
  S.playerCar.position.set(-62,0,-60);S.playerCar.rotation.y=0;
  S.rivals.forEach((r,i)=>{r.position.set(-68+i*7,0,-60);r.rotation.y=0});
  setCountdown('3');setRace('QUAY RACE<br>Position 4/4<br>Lap 1/1 · Checkpoint 0/6');
  showBanner('STREET RACE — Along the quay to Faro Point');
  showDistrict('MUELLE — RACE START');
  S.camera.position.set(-62,6,-78);S.camera.lookAt(-62,1,-40);
 } else if(name==='menu'){
  document.getElementById('menu').classList.remove('hidden');
  S.playerCar.position.set(-62,0,10);S.playerCar.rotation.y=0.4;
  S.camera.position.set(-78,7,-18);S.camera.lookAt(-30,4,30);
 }
}
