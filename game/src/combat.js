import {shotSound} from './audio.js';
export class Combat{constructor(scene){this.scene=scene;this.bullets=[];this.ammo=60}
 shoot(from,dir){if(this.ammo<=0)return;this.ammo--;shotSound();const m=new THREE.Mesh(new THREE.SphereGeometry(0.18,6,6),new THREE.MeshBasicMaterial({color:0xffe27a}));m.position.copy(from);m.userData.dir=dir.clone();this.scene.add(m);this.bullets.push(m)}
 update(dt){for(let i=this.bullets.length-1;i>=0;i--){const b=this.bullets[i];b.position.addScaledVector(b.userData.dir,dt*40);if(b.position.length()>400){this.scene.remove(b);this.bullets.splice(i,1)}}}}
