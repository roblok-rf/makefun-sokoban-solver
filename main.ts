import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output",A=[0,0,-1,1],C=[-1,1,0,0],D="udlr",U=Uint8Array,T=a=>a.sort((x,y)=>x-y);
function S(t){
const R=t.split("\n").filter(r=>r.length),w=R[0].length,h=R.length,N=w*h,W=new U(N),g=[],B=[];
let p=0;
for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=R[y][x]??"#",i=y*w+x;if(c=="#")W[i]=1;if(".*+".includes(c))g.push(i);if("$*".includes(c))B.push(i);if("@+".includes(c))p=i}
const Y=i=>(i/w)|0,X=i=>i%w,nb=(i,d)=>{const x=X(i)+A[d],y=Y(i)+C[d];return x<0|x>=w|y<0|y>=h?-1:y*w+x};
const bf=(s,f,x)=>{const d=new Int32Array(N).fill(-1);d[s]=0;const q=[s];for(const c of q)for(let e=0;e<4;e++){const j=nb(c,e);if(j<0||f[j]||x?.includes(j)||d[j]+1)continue;d[j]=d[c]+1;q.push(j)}return d};
const wk=(a,b,f,x)=>{const d=bf(a,f,x);if(d[b]<0)return null;let m="";for(let c=b;c!==a;){for(let e=0;e<4;e++){const j=nb(c,e);if(j>=0&&d[j]===d[c]-1){m=D[e^1]+m;c=j;break}}}return m};
const hy=Y(p),FR=new U(N);
for(let i=0;i<N;i++)FR[i]=W[i]|Y(i)===hy;
const RM=[];
for(let i=0;i<N;i++){
if(FR[i])continue;
const d=bf(i,FR),cs=[];for(let j=0;j<N;j++)if(d[j]+1){cs.push(j);FR[j]=1}
let dr=-1;
for(const c of cs)for(let e=0;e<4;e++){const j=nb(c,e);if(j>=0&&Y(j)===hy&&!W[j]){dr=c;break}}
if(dr<0)return"";
const f=new U(N).fill(1);cs.forEach(c=>f[c]=0);const en=hy*w+X(dr);f[en]=0;
RM.push({f,b:B.filter(x=>!f[x]),g:g.filter(x=>!f[x]),e:en});
}
const SR=R=>{
const fl=R.f,gl=R.g,b0=R.b.slice(),n=b0.length;
if(!n)return{ps:[]};
if(n!==gl.length)return null;
const ds=gl.map(x=>bf(x,fl));
const H=bs=>{let t=0;for(const b of bs){let m=1/0;for(const d of ds)if(d[b]>=0&&d[b]<m)m=d[b];if(m>99)return 1/0;t+=m}return t};
const BQ=[];let mn=1/0,hn=0;
const pu=e=>{(BQ[e[0]]??=[]).push(e);hn++;if(e[0]<mn)mn=e[0]};
const po=()=>{for(;;){const b=BQ[mn];if(b&&b.length){hn--;return b.pop()}mn++}};
const P=[R.e],Bs=[b0],Gg=[0],Pa=[-1],Ps=[0],M={};
const Kf=(b,c)=>b+"|"+c;
const h0=H(b0);if(h0===1/0)return null;
const k0=Kf(b0,R.e);M[k0]=0;pu([h0,h0,0]);
let ex=0;
while(hn&&ex<3e5){
const ix=po()[2];
if(M[Kf(Bs[ix],P[ix])]!==ix)continue;
const bs=Bs[ix],pp=P[ix],gg=Gg[ix];
if(bs.every(b=>gl.includes(b))&&bf(pp,fl,bs)[R.e]>=0){const ps=[];for(let t=ix;t>0;t=Pa[t])ps.unshift(Ps[t]);return{ps}}
ex++;
const rg=bf(pp,fl,bs);
for(const b of bs){
for(let d=0;d<4;d++){const bh=nb(b,d^1),tg=nb(b,d);
if(bh<0||tg<0||fl[bh]||fl[tg]||bs.includes(tg)||rg[bh]<0)continue;
const nb2=bs.slice();nb2[bs.indexOf(b)]=tg;T(nb2);
const k=Kf(nb2,b),g2=gg+1,pv=M[k];
if(pv!==undefined&&Gg[pv]<=g2)continue;
const h2=H(nb2);if(h2===1/0)continue;
const ni=P.push(b)-1;Bs.push(nb2);Gg.push(g2);Pa.push(ix);Ps.push(b*4+d);M[k]=ni;pu([g2+h2,h2,ni]);
}}
}
return null;
};
let m="",cur=p;
for(const r of RM){
const w1=wk(cur,r.e,W,B);if(w1===null)return"";m+=w1;cur=r.e;
const s=SR(r);if(!s)return"";
for(const q of s.ps){const b=(q/4)|0,d=q%4,w2=wk(cur,nb(b,d^1),r.f,B);if(w2===null)return"";m+=w2+D[d];const tg=nb(b,d);B[B.indexOf(b)]=tg;T(B);cur=b}
}
return m;
}
readdirSync(I).sort().forEach(id=>{
const v=S(readFileSync(I+"/"+id+"/level.txt","utf8"));
mkdirSync(O+"/"+id,{recursive:true});
writeFileSync(O+"/"+id+"/solution.txt",v);
});
