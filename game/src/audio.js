let ctx=null;function ac(){if(!ctx){try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}return ctx}
export function beep(freq=440,dur=0.12,type='square',vol=0.05){const c=ac();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.value=vol;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur)}
export function siren(t){if(Math.floor(t*2)%2===0)beep(720,0.08,'square',0.015);else beep(520,0.08,'square',0.015)}
export function shotSound(){beep(180,0.08,'sawtooth',0.08)}export function cashSound(){beep(880,0.1);setTimeout(()=>beep(1320,0.12),90)}
