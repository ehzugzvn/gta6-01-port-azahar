import {makeCar,makeHelicopter} from './vehicles3d.js';
export class Police{constructor(scene){this.scene=scene;this.cars=[];this.heli=makeHelicopter();this.heli.visible=false;scene.add(this.heli);this.wanted=0;this.roadblocks=[]}
 setWanted(n,playerPos){this.wanted=n;const need=n===0?0:n<3?n: n===3?3:4;
  while(this.cars.length<need){const c=makeCar(0xffffff,{police:true});c.position.set(playerPos.x+18-this.cars.length*10,0,playerPos.z-22-this.cars.length*8);this.scene.add(c);this.cars.push(c)}
  while(this.cars.length>need){const c=this.cars.pop();this.scene.remove(c)}
  this.heli.visible=n>=4;
  if(n>=3&&this.roadblocks.length===0){for(let i=0;i<3;i++){const b=makeCar(0xffffff,{police:true});b.position.set(-20+i*28,0,playerPos.z+55);b.rotation.y=Math.PI/2;this.scene.add(b);this.roadblocks.push(b)}}
  if(n<3){for(const b of this.roadblocks)this.scene.remove(b);this.roadblocks=[]}}
 update(dt,t,playerPos){let i=0;for(const c of this.cars){const dx=playerPos.x-c.position.x,dz=playerPos.z-c.position.z;const d=Math.hypot(dx,dz)||1;const sp=this.wanted>=2?24:19;c.position.x+=dx/d*sp*dt;c.position.z+=dz/d*sp*dt;c.rotation.y=Math.atan2(dx,dz);
   const bar=c.getObjectByName('lightbar');if(bar)bar.material.color.setHex(Math.floor(t*6+i)%2?0xff2222:0x2266ff);i++}
  if(this.heli.visible){const a=t*0.5;this.heli.position.set(playerPos.x+Math.cos(a)*16,20,playerPos.z+Math.sin(a)*16);this.heli.rotation.y=-a;const r=this.heli.getObjectByName('rotor');if(r)r.rotation.y=t*30}}}
