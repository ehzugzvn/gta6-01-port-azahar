import {makePerson} from './vehicles3d.js';import {makeRng} from './random.js';
export class Pedestrians{constructor(scene,n=14){this.peds=[];const rng=makeRng(5);const cols=[0xe84a7a,0x22aaff,0xffcc33,0x66dd88,0xffffff];
 for(let i=0;i<n;i++){const p=makePerson(cols[i%cols.length]);p.position.set(-68+rng()*10,0,-160+i*22);p.userData={t:rng()*10,dir:i%2?1:-1};scene.add(p);this.peds.push(p)}}
 update(dt,t){for(const p of this.peds){p.position.z+=p.userData.dir*dt*1.4;p.position.y=Math.abs(Math.sin(t*6+p.userData.t))*0.06;if(p.position.z>180)p.userData.dir=-1;if(p.position.z<-180)p.userData.dir=1;p.rotation.y=p.userData.dir>0?0:Math.PI}}}
