import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",D=[[0,-1,"u"],[0,1,"d"],[-1,0,"l"],[1,0,"r"]];
function S(t){
const R=t.split("\n").filter(r=>r.length),w=R[0].length,h=R.length,N=w*h,W=new Uint8Array(N),G=new Uint8Array(N),g=[],B=[],F=new Uint8Array(N);
let p=0;
for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=R[y][x]??"#",i=y*w+x;if(c=="#")W[i]=1;if(".*+".includes(c)){G[i]=1;g.push(i)}if("$*".includes(c))B.push(i);if("@+".includes(c))p=i}
B.sort((a,b)=>a-b);
for(let i=0;i<N;i++)F[i]=W[i]?0:1;
const Y=i=>(i/w)|0,X=i=>i%w,nb=(i,d)=>{const z=D[d],x=X(i)+z[0],y=Y(i)+z[1];return x<0||x>=w||y<0||y>=h?-1:y*w+x};
const bf=(s,f,x)=>{const d=new Int32Array(N).fill(-1);d[s]=0;const q=[s];for(let k=0;k<q.length;k++){const c=q[k];for(let e=0;e<4;e++){const j=nb(c,e);if(j<0||!f[j]||x&&x.includes(j)||d[j]>=0)continue;d[j]=d[c]+1;q.push(j)}}return d};
const wk=(a,b,f,x)=>{const d=bf(a,f,x);if(d[b]<0)return null;let m="";for(let c=b;c!==a;){for(let e=0;e<4;e++){const j=nb(c,e);if(j>=0&&d[j]===d[c]-1){m=D[e^1][2]+m;c=j;break}}}return m};
const hy=Y(p),FR=new Uint8Array(N);
for(let i=0;i<N;i++)FR[i]=F[i]&&Y(i)!==hy?1:0;
const seen=new Uint8Array(N),RM=[];
for(let i=0;i<N;i++){
if(!FR[i]||seen[i])continue;
const d=bf(i,FR),cs=[];for(let j=0;j<N;j++)if(d[j]>=0){cs.push(j);seen[j]=1}
let dr=-1;
for(const c of cs)for(let e=0;e<4;e++){const j=nb(c,e);if(j>=0&&Y(j)===hy&&F[j]){dr=c;break}}
if(dr<0)return"";
const f=new Uint8Array(N);for(const c of cs)f[c]=1;const en=hy*w+X(dr);f[en]=1;
RM.push({f,b:B.filter(x=>f[x]),g:g.filter(x=>f[x]),e:en});
}
RM.sort((a,b)=>a.e-b.e);
const SR=R=>{
const fl=R.f,gl=R.g,b0=R.b.slice().sort((a,b)=>a-b),n=b0.length;
if(!n)return{ps:[]};
if(n!==gl.length)return null;
const ds=gl.map(x=>bf(x,fl)),dd=new Uint8Array(N);
for(let i=0;i<N;i++)if(fl[i]&&!G[i])dd[i]=ds.every(d=>d[i]<0)?1:0;
const H=bs=>{let b=1/0;const u=new Uint8Array(n);const r=(k,a)=>{if(a>=b)return;if(k===n){b=a;return}for(let j=0;j<n;j++){if(u[j])continue;const d=ds[j][bs[k]];if(d<0)continue;u[j]=1;r(k+1,a+d);u[j]=0}};r(0,0);return b};
const hp=[],ls=(a,b)=>a[0]<b[0]||a[0]===b[0]&&(a[1]<b[1]||a[1]===b[1]&&a[2]<b[2]);
const pu=e=>{let i=hp.length;hp.push(e);while(i>0){const q=(i-1)>>1;if(!ls(hp[i],hp[q]))break;[hp[i],hp[q]]=[hp[q],hp[i]];i=q}};
const po=()=>{const t=hp[0],l=hp.pop();if(hp.length){hp[0]=l;for(let i=0;;){let c=2*i+1;if(c>=hp.length)break;if(c+1<hp.length&&ls(hp[c+1],hp[c]))c++;if(!ls(hp[c],hp[i]))break;[hp[i],hp[c]]=[hp[c],hp[i]];i=c}}return t};
const P=[R.e],Bs=[b0],Gg=[0],Pa=[-1],Ps=[0],K=[],M=new Map();
const Kf=(b,c)=>b.join()+ "|"+c;
const h0=H(b0);if(h0===1/0)return null;
const k0=Kf(b0,bf(R.e,fl,b0).findIndex(e=>e>=0));K.push(k0);M.set(k0,0);let cn=0;pu([h0,h0,cn++,0]);
let ex=0;
while(hp.length&&ex<3e5){
const ix=po()[3];
if(M.get(K[ix])!==ix)continue;
const bs=Bs[ix],pp=P[ix],gg=Gg[ix];
if(bs.every(b=>G[b])){if(bf(pp,fl,bs)[R.e]>=0){const ps=[];for(let t=ix;t>0;t=Pa[t])ps.unshift(Ps[t]);return{ps}}}
ex++;
const rg=bf(pp,fl,bs);
for(let bi=0;bi<bs.length;bi++){const b=bs[bi];
for(let d=0;d<4;d++){const bh=nb(b,d^1),tg=nb(b,d);
if(bh<0||tg<0||!fl[bh]||!fl[tg]||bs.includes(tg)||rg[bh]<0||dd[tg]&&!G[tg])continue;
const nb2=bs.slice();nb2[bi]=tg;nb2.sort((a,b2)=>a-b2);
const k=Kf(nb2,bf(b,fl,nb2).findIndex(e=>e>=0)),g2=gg+1,pv=M.get(k);
if(pv!==undefined&&Gg[pv]<=g2)continue;
const h2=H(nb2);if(h2===1/0)continue;
const ni=P.length;P.push(b);Bs.push(nb2);Gg.push(g2);Pa.push(ix);Ps.push(b*4+d);K.push(k);M.set(k,ni);pu([g2+h2,h2,cn++,ni]);
}}
}
return null;
};
let m="",cur=p;
for(const r of RM){
const w1=wk(cur,r.e,F,B);if(w1===null)return"";m+=w1;cur=r.e;
const s=SR(r);if(!s)return"";
let rb=r.b.slice().sort((a,b)=>a-b);
for(const q of s.ps){const b=(q/4)|0,d=q%4,bh=nb(b,d^1);const w2=wk(cur,bh,r.f,rb);if(w2===null)return"";m+=w2;m+=D[d][2];const tg=nb(b,d);rb[rb.indexOf(b)]=tg;rb.sort((a,b)=>a-b);const gi=B.indexOf(b);B[gi]=tg;B.sort((a,b)=>a-b);cur=b}
}
return m;
}
for(const id of readdirSync(I).sort()){
const v=S(readFileSync(I+"/"+id+"/level.txt","utf8"));
mkdirSync(O+"/"+id,{recursive:true});
writeFileSync(O+"/"+id+"/solution.txt",v+"\n");
}
