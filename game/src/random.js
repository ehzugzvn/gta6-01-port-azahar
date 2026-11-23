export function makeRng(seed){let s=seed>>>0||7;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
export function pick(rng,arr){return arr[Math.floor(rng()*arr.length)]}
export function rand(rng,a,b){return a+rng()*(b-a)}
