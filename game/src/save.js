const KEY='port-azahar-save-v1';
export function saveGame(s){try{localStorage.setItem(KEY,JSON.stringify({cash:s.cash,respect:s.respect,mission:s.missionIndex,health:s.health}))}catch(e){}}
export function loadGame(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
export function clearSave(){try{localStorage.removeItem(KEY)}catch(e){}}
