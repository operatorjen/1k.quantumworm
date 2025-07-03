let R=Math.random,
    c=a,C=c.getContext`2d`,
    o=c.cloneNode(),O=o.getContext`2d`,
    k=new Array(300),d=[],i
c.width=o.width=innerWidth
c.height=o.height=innerHeight
b.style = 'margin: 0'
c.style = 'filter:saturate(1.5)'

for(i=300;i--;){
  let x=R()*c.width,
      y=R()*c.height
  k[i]={
    i,x,y,vx:0,vy:0,
    a:R()*c.width*.03,
    r:c.height*.05+29*R(),
    h:140+50*R()
  }
}

onresize=()=>c.width=o.width=innerWidth,c.height=o.height=innerHeight;
onresize()

!function f(){
  O.fillStyle='rgba(43,99,54,.01)'
  O.fillRect(0,0,o.width,o.height)

  for(i=d.length;i--;){
    let q=d[i]
    q.vy+=.01; q.y+=q.vy; q.a-=.01
    if(q.a<=0||q.y>o.height) d.splice(i,1)
    else{
      O.fillStyle='hsla('+q.h+',60%,40%,'+q.a+')'
      O.beginPath(); O.arc(q.x,q.y,q.r,0,7); O.fill()
    }
  }

  for(let p of k){
    if(R()<.1) d.push({
      x:p.x,y:p.y+p.r,
      vy:1+2*R(), r:1+2*R(),
      a:1, h:340+30*R()
    })

    if(!p.i){
      p.a+=(R()-.5)*.6
      p.vx=Math.cos(p.a)*7.5
      p.vy=Math.sin(p.a)*7.5
    } else {
      let t=k[p.i-1],dx=t.x-p.x,dy=t.y-p.y
      p.vx=(p.vx+dx*.1)*.5
      p.vy=(p.vy+dy*.5)*.5
    }

    p.x+=p.vx*.3; p.y+=p.vy*.3
    p.x<0? p.x=c.width: p.x>c.width&&(p.x=0)
    p.y<0? p.y=c.height: p.y>c.height&&(p.y=0)

    let q2=.1+.4*(1-p.i/299),h1=p.h,
        g=O.createRadialGradient(p.x,p.y,p.r*.2,p.x,p.y,p.r)
    g.addColorStop(0,'hsla('+h1+',80%,70%,'+q2+')')
    g.addColorStop(1,'hsla('+((h1+170)%360)+',70%,50%,'+q2+')')
    O.fillStyle=g; O.beginPath(); O.arc(p.x,p.y,p.r,0,7); O.fill()
  }

  C.drawImage(o,0,0)
  requestAnimationFrame(f)
}()