export const keys={};export let mouseDX=0,mouseDown=false;
addEventListener('keydown',e=>{keys[e.code]=true});addEventListener('keyup',e=>{keys[e.code]=false});
addEventListener('mousemove',e=>{mouseDX+=e.movementX||0});addEventListener('mousedown',()=>mouseDown=true);addEventListener('mouseup',()=>mouseDown=false);
export function consumeMouse(){const v=mouseDX;mouseDX=0;return v}
export function pressed(code){return !!keys[code]}
