export function initMenus(state,callbacks){const menu=document.getElementById('menu');
 document.getElementById('btn-new').onclick=()=>{menu.classList.add('hidden');callbacks.onNew()};
 document.getElementById('btn-continue').onclick=()=>{menu.classList.add('hidden');callbacks.onContinue()};
 document.getElementById('btn-garage').onclick=()=>{callbacks.onGarage()};
 if(state.shotMode)menu.classList.add('hidden')}
export function showMenu(){document.getElementById('menu').classList.remove('hidden')}
