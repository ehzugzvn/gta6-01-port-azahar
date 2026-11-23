import {makeCar} from './vehicles3d.js';import {makeRng,pick} from './random.js';
export class Traffic{constructor(scene,n=10){this.cars=[];const rng=makeRng(99);const cols=[0xcc2222,0x22aa66,0xe8b10a,0xeeeeee,0x8844cc,0x2266cc];
 for(let i=0;i<n;i++){const c=makeCar(pick(rng,cols));const lane=[-40,0,40,80,120][i%5];c.position.set(lane,0,-180+i*36);c.userData.angle=i%2?0:Math.PI;c.userData.lane=lane;c.userData.cruise=8+(i%4)*2;scene.add(c);this.cars.push(c)}
 // parked stealable + forklift
 this.parked=[];for(let i=0;i<6;i++){const c=makeCar(cols[i%cols.length]);c.position.set(-60,0,-80+i*28);c.rotation.y=Math.PI/2;scene.add(c);this.parked.push(c)}
 const fk=makeCar(0xffcc00,{forklift:true});fk.position.set(30,0,55);fk.userData.maxSpeed=9;scene.add(fk);this.parked.push(fk);this.forklift=fk}
 update(dt){for(const c of this.cars){const dir=Math.cos(c.userData.angle)>=0?1:-1;c.position.z+=dir*c.userData.cruise*dt;if(c.position.z>210)c.position.z=-210;if(c.position.z<-210)c.position.z=210}}}
