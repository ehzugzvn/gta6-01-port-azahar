function mat(c){return new THREE.MeshLambertMaterial({color:c})}
export function makeCar(color=0x2266cc,opts={}){const g=new THREE.Group();
 const body=new THREE.Mesh(new THREE.BoxGeometry(2.2,0.7,4.4),mat(color));body.position.y=0.65;body.castShadow=true;g.add(body);
 const cabin=new THREE.Mesh(new THREE.BoxGeometry(1.9,0.65,2.2),mat(opts.cabin||0x18222e));cabin.position.set(0,1.25,-0.2);cabin.castShadow=true;g.add(cabin);
 if(opts.police){const bar=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.3,0.5),new THREE.MeshBasicMaterial({color:0xff2222}));bar.position.set(0,1.75,-0.2);bar.name='lightbar';g.add(bar);
  const stripe=new THREE.Mesh(new THREE.BoxGeometry(2.3,0.35,4.5),mat(0xffffff));stripe.position.y=0.85;g.add(stripe)}
 if(opts.forklift){const mast=new THREE.Mesh(new THREE.BoxGeometry(1.8,3,0.3),mat(0x333333));mast.position.set(0,1.8,2.2);g.add(mast)}
 const wg=new THREE.CylinderGeometry(0.42,0.42,0.3,12);const wm=mat(0x111111);
 for(const [x,z] of [[-1.1,1.5],[1.1,1.5],[-1.1,-1.5],[1.1,-1.5]]){const w=new THREE.Mesh(wg,wm);w.rotation.z=Math.PI/2;w.position.set(x,0.42,z);g.add(w)}
 g.userData={speed:0,angle:0,color};return g}
export function makeHelicopter(){const g=new THREE.Group();const body=new THREE.Mesh(new THREE.BoxGeometry(3,2.2,7),mat(0x1b2a3a));body.castShadow=true;g.add(body);
 const tail=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.8,6),mat(0x1b2a3a));tail.position.set(0,0.3,-6);g.add(tail);
 const rotor=new THREE.Mesh(new THREE.BoxGeometry(11,0.15,0.6),mat(0x222222));rotor.position.y=1.6;rotor.name='rotor';g.add(rotor);
 const coneGeo=new THREE.ConeGeometry(3.6,13,20,1,true);const coneMat=new THREE.MeshBasicMaterial({color:0xfff2a0,transparent:true,opacity:0.30,side:THREE.DoubleSide,depthWrite:false});
 const cone=new THREE.Mesh(coneGeo,coneMat);cone.position.set(0,-7.5,2);cone.name='spotcone';g.add(cone);
 const spot=new THREE.SpotLight(0xfff2a0,2,60,0.4);spot.position.set(0,0,2);g.add(spot);g.add(spot.target);spot.target.position.set(0,-12,2);
 const light=new THREE.Mesh(new THREE.SphereGeometry(0.5,8,8),new THREE.MeshBasicMaterial({color:0xffffff}));light.position.set(0,-1,3);g.add(light);
 g.userData={angle:0};return g}
export function makePerson(shirt=0xe84a7a,pants=0x223355){const g=new THREE.Group();
 const legs=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.8,0.4),new THREE.MeshLambertMaterial({color:pants}));legs.position.y=0.4;g.add(legs);
 const torso=new THREE.Mesh(new THREE.BoxGeometry(0.85,0.9,0.45),new THREE.MeshLambertMaterial({color:shirt}));torso.position.y=1.25;torso.castShadow=true;g.add(torso);
 const head=new THREE.Mesh(new THREE.SphereGeometry(0.32,10,10),new THREE.MeshLambertMaterial({color:0xe8b08a}));head.position.y=1.95;g.add(head);
 const arm=new THREE.Mesh(new THREE.BoxGeometry(0.25,0.8,0.25),new THREE.MeshLambertMaterial({color:shirt}));arm.position.set(0.6,1.25,0.3);arm.rotation.x=-1.2;arm.name='arm';g.add(arm);
 return g}
export function driveCar(car,dt,input,maxSpeed=28){const u=car.userData;if(input.up)u.speed=Math.min(maxSpeed,u.speed+dt*18);else if(input.down)u.speed=Math.max(-10,u.speed-dt*16);else u.speed*=Math.pow(0.4,dt);
 if(input.left)u.angle+=dt*1.6*Math.sign(u.speed||1);if(input.right)u.angle-=dt*1.6*Math.sign(u.speed||1);
 car.position.x+=Math.sin(u.angle)*u.speed*dt;car.position.z+=Math.cos(u.angle)*u.speed*dt;car.rotation.y=u.angle;return u.speed}
