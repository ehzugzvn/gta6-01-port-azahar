export const MISSIONS=[
 {id:1,title:"PAPER TRAIL",desc:"Pick up the manifest in the container yard — under PPA watch.",target:{x:55,z:55},wanted:1,reward:800},
 {id:2,title:"QUIET MANIFEST",desc:"Shake the PPA, reach the marina.",target:{x:-55,z:-110},wanted:2,reward:1200},
 {id:3,title:"YACHT CLUB",desc:"Steal the yacht tender car at the marina and deliver it to the garage.",target:{x:40,z:-40},wanted:2,reward:1800},
 {id:4,title:"HIGH PERCH",desc:"Reach the crane top in the yard — cover your crew (aim mode).",target:{x:-38,z:40},wanted:3,reward:2200},
 {id:5,title:"QUIET MANIFEST — FINALE RUN",desc:"Shake the PPA, reach the marina. AZAHAR-1 is airborne.",target:{x:-55,z:-110},wanted:4,reward:3000},
 {id:6,title:"QUAY RACE",desc:"Win the street race along the quay.",target:{x:-62,z:170},wanted:1,reward:2500,race:true},
 {id:7,title:"CUSTOMS SHADOW",desc:"Tail the customs van through Old Town without being spotted close.",target:{x:90,z:-90},wanted:2,reward:2800},
 {id:8,title:"VAULT AT DUSK",desc:"Customs-vault finale: crack the Aduana vault and escape at ★★★★★.",target:{x:20,z:135},wanted:5,reward:6000},
];
export const GARAGE={name:"Taller Azahar — Garage",pos:{x:40,z:-40},upgrades:["Turbo + top speed","Armour plating","Dusk-orange respray","Run-flat tyres"]};
export const RACE={name:"Quay Race",checkpoints:[{x:-62,z:-40},{x:-62,z:20},{x:-62,z:80},{x:-40,z:130},{x:-62,z:165},{x:-62,z:170}],prize:2500};
export function missionBrief(m){return `JOB ${m.id} · ${m.title} — ${m.desc} Reward $${m.reward}.`}
export class MissionSystem{constructor(state){this.state=state;this.index=0;this.marker=null}
 current(){return MISSIONS[this.index%MISSIONS.length]}
 startMarker(scene){const geo=new THREE.CylinderGeometry(2,2,22,16,1,true);const m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xffd23f,transparent:true,opacity:0.45,side:THREE.DoubleSide,depthWrite:false}));const t=this.current().target;m.position.set(t.x,11,t.z);scene.add(m);this.marker=m;return m}
 check(pos){const t=this.current().target;const d=Math.hypot(pos.x-t.x,pos.z-t.z);if(d<7){const reward=this.current().reward;this.state.cash+=reward;this.state.respect+=10;this.state.wanted=Math.min(5,this.current().wanted);this.index++;if(this.marker)this.marker.position.set(this.current().target.x,11,this.current().target.z);return reward}return 0}
}
