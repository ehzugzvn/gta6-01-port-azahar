import {COLORS} from './config.js';import {makeRng,pick,rand} from './random.js';
export const colliders=[];
function box(scene,mat,x,y,z,sx,sy,sz,ry=0){const m=new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat);m.position.set(x,y,z);m.rotation.y=ry;m.castShadow=true;m.receiveShadow=true;scene.add(m);return m}
function mat(c){return new THREE.MeshLambertMaterial({color:c})}
export function buildCity(scene){
 scene.fog=new THREE.Fog(0xe8734a,90,340);
 // sky: big gradient via large sphere shader-less: use scene background + sun sprite
 scene.background=new THREE.Color(0xf07a35);
 const sun=new THREE.Mesh(new THREE.SphereGeometry(14,16,16),new THREE.MeshBasicMaterial({color:0xffd27a}));sun.position.set(-160,38,-220);scene.add(sun);
 const hemi=new THREE.HemisphereLight(0xffd9a0,0x1a3a4a,0.9);scene.add(hemi);
 const dir=new THREE.DirectionalLight(0xffb060,1.4);dir.position.set(-80,90,-60);dir.castShadow=true;dir.shadow.mapSize.set(1024,1024);dir.shadow.camera.left=-120;dir.shadow.camera.right=120;dir.shadow.camera.top=120;dir.shadow.camera.bottom=-120;scene.add(dir);scene.add(dir.target);
 const amb=new THREE.AmbientLight(0x604a7a,0.5);scene.add(amb);
 // water
 const water=new THREE.Mesh(new THREE.PlaneGeometry(500,500),mat(0x0e5a6b));water.rotation.x=-Math.PI/2;water.position.set(-318,0,0);scene.add(water);
 // ground / quay / roads
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(360,500),mat(0x5a7a52));ground.rotation.x=-Math.PI/2;ground.position.set(112,0.02,0);ground.receiveShadow=true;scene.add(ground);
 const quay=new THREE.Mesh(new THREE.PlaneGeometry(36,440),mat(0x8a7f6d));quay.rotation.x=-Math.PI/2;quay.position.set(-72,0.06,0);quay.receiveShadow=true;scene.add(quay);
 for(let z=-200;z<=200;z+=40){const road=new THREE.Mesh(new THREE.PlaneGeometry(220,10),mat(0x2b2b30));road.rotation.x=-Math.PI/2;road.position.set(60,0.05,z);scene.add(road);
  for(let x=-40;x<160;x+=20){const stripe=new THREE.Mesh(new THREE.PlaneGeometry(8,0.6),mat(0xffffff));stripe.rotation.x=-Math.PI/2;stripe.position.set(x,0.09,z);scene.add(stripe)}}
 for(let x=0;x<=160;x+=40){const road=new THREE.Mesh(new THREE.PlaneGeometry(10,400),mat(0x2b2b30));road.rotation.x=-Math.PI/2;road.position.set(x,0.05,0);scene.add(road)}
 const rng=makeRng(42);
 // buildings old town
 for(let i=0;i<70;i++){const x=rand(rng,10,170),z=rand(rng,-190,190);if(Math.abs(z%40)<9)continue;const h=rand(rng,10,38);const b=box(scene,mat(pick(rng,COLORS.building)),x,h/2,z,rand(rng,14,22),h,rand(rng,14,22));colliders.push({x,z,hx:11,hz:11});
  const roof=box(scene,mat(0x7a3b2a),x,h+1,z,16,2,16)}
 // containers stacked
 const contGroup=new THREE.Group();scene.add(contGroup);
 for(let i=0;i<90;i++){const x=rand(rng,15,95),z=rand(rng,10,110);const lvl=Math.floor(rand(rng,0,3));const c=box(scene,mat(pick(rng,COLORS.container)),x,2+lvl*4.4,z,12,4,5, (i%2?Math.PI/2:0));if(lvl===0)colliders.push({x,z,hx:6,hz:5})}
 // cranes
 for(const cz of [-20,40,100]){const g=new THREE.Group();g.position.set(-45,0,cz);scene.add(g);
  const legMat=mat(0xff8c1a);for(const dx of[-8,8])for(const dz of[-6,6]){const leg=new THREE.Mesh(new THREE.CylinderGeometry(1,1,34,8),legMat);leg.position.set(dx,17,dz);leg.castShadow=true;g.add(leg)}
  const beam=new THREE.Mesh(new THREE.BoxGeometry(52,3,4),legMat);beam.position.set(-8,34,0);g.add(beam);
  const cab=new THREE.Mesh(new THREE.BoxGeometry(6,5,6),mat(0x223344));cab.position.set(-20,30,0);g.add(cab)}
 // lighthouse
 const lh=new THREE.Group();lh.position.set(-70,0,165);scene.add(lh);
 const tower=new THREE.Mesh(new THREE.CylinderGeometry(4,6,34,12),mat(0xffffff));tower.position.y=17;tower.castShadow=true;lh.add(tower);
 const band=new THREE.Mesh(new THREE.CylinderGeometry(4.6,5,6,12),mat(0xd92b2b));band.position.y=22;lh.add(band);
 const lamp=new THREE.Mesh(new THREE.SphereGeometry(3,12,12),new THREE.MeshBasicMaterial({color:0xffe98a}));lamp.position.y=36;lh.add(lamp);
 // marina yachts
 for(let i=0;i<8;i++){const y=new THREE.Group();y.position.set(-115,0,-150+i*22);scene.add(y);const hull=new THREE.Mesh(new THREE.BoxGeometry(6,2,14),mat(0xf2f2f2));hull.position.y=1;y.add(hull);const mast=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,12,6),mat(0x888888));mast.position.y=7;y.add(mast)}
 // streetlights
 for(let z=-180;z<=180;z+=30){for(const x of[-52,20,60,100]){const p=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,7,6),mat(0x333333));p.position.set(x,3.5,z);scene.add(p);const bulb=new THREE.Mesh(new THREE.SphereGeometry(0.7,8,8),new THREE.MeshBasicMaterial({color:0xffc46b}));bulb.position.set(x,7.2,z);scene.add(bulb);const pt=new THREE.PointLight(0xffa040,0.6,22);pt.position.set(x,7,z);scene.add(pt)}}
 // customs vault building
 const vault=box(scene,mat(0x334155),20,8,135,30,16,20);const sign=box(scene,mat(0xffd23f),20,17,135,18,2,2);
 return {sun,dir};
}
export function collide(pos,r=2){for(const c of colliders){if(Math.abs(pos.x-c.x)<c.hx+r&&Math.abs(pos.z-c.z)<c.hz+r)return true}if(pos.x<-88||pos.x>190||pos.z<-205||pos.z>205)return true;return false}
