class i1//初始形状1 点
{
  constructor(ix,iy,sw,c1)
  {
    this.ix=ix;
    this.iy=iy;
    this.sw=sw;
    this.c1=c1;
   }
   drawashape()
  { 
     strokeWeight(this.sw);
     stroke(this.c1);
     point(floor(width * 0.5) + this.ix, floor(height * 0.5)-this.iy);
   }
   rule1_copy()// 规则1 复制形状 
  {
    var b = new i1(this.ix, this.iy, this.sw, this.c1);
    return b;
   }
   rule2_scale(xd) // 规则2 缩放形状xd
   {  
    this.ix = this.ix + xd;
   }
   rule3_symmx() 
  {
    this.ix = this.ix * -1;
   }
}

class i2//初始形状2 线
{
  constructor(ix1,iy1,ix2,iy2,sw,c1)//构造函数
  {
    this.ix1=ix1;
    this.iy1=iy1;
    this.ix2=ix2;
    this.iy2=iy2;
    this.sw=sw;
    this.c1=c1;
  }
  drawashape()//绘制
  {
    strokeWeight(this.sw);
    stroke(this.c1);
    line(this.ix1,this.iy1,this.ix2,this.iy2);
  }
  rule1_copy()//规则1 复制形状
  {
    var z=new i2(this.ix1,this.iy1,this.ix2,this.iy2,this.sw,this.c1);
    return z;
  }
  rule3_symmx()//规则3 水平对称
  {
    this.ix1=this.ix1*-1;
    this.ix2=this.ix2*-1;
  }
  
}

class n1 //基于初始形状的派生形状
{
   constructor(nx,ny,sw,c1,c2,len,dista) //构造函数
  {
    this.nx=nx;
    this.ny=ny;
    this.sw=sw;
    this.c1=c1;
    this.c2=c2;
    this.len=len;
    this.dista=dista;
    this.i3=new Array(this.len);
    this.xishu=this.sw*this.dista;
     for(let i=0;i<=len-1;i++)
    {
      let n=map(i,0,len-1,0,1);
      var newc=lerpColor(this.c1,this.c2,n);
      this.i3[i]=new i1(this.nx,this.ny+this.xishu*i,this.sw,newc);
    }
  }
  drawashape2()
  {
    for(let i=0;i<=this.len-1;i++)
    {
       this.i3[i].drawashape();
    }
  }
  rule1_copy()//控制派生形状的复制规则
  {
    let b=new n1(this.nx,this.ny,this.sw,this.c1,this.c2,this.len,this.dista);
    return b;
  }
  rule2_scale(xd)//控制派生形状的长度变化
  {
    for(let i=0;i<=this.len-1;i++)
    {
      this.i3[i].ix=this.i3[i].ix+xd[i]*xd[i];
    }
  }
  rule3_symmx()//控制派生形状的对称规则
  {
    for(let i=0;i<=this.len-1;i++)
    {
       this.i3[i].ix=this.i3[i].ix*-1;
    }
  }
}

var mes;
var cavas;
var but;

function changestr()
{
  var inp=select('#inp');
  var st=inp.value().toString();
  console.log(st);
  if(st!=null)
  {
    mes=st;
  }
  else
  {
    mes=mes;
  }
  console.log(mes);
  drawtheshape(mes);
}

function drawtheshape(st)
{
  var strrr=String(st);
  var cha = strrr.split('');
  var dis2 = new Array(strrr.length);
  var ch, cs, cv;
  var deltach, deltacs, deltacv;
  var sum=0;
  for (let i = 0; i <= strrr.length - 1; i++) {
      
      dis2[i]=parseInt(cha[i]);
  }
  for (let i = 0; i <= strrr.length - 1; i++) {
      
    sum=sum+dis2[i];
}
  ch = sum%12 * 100 % 360;
  cs = sum%4 + 90;
  cv = sum%3 + 90;

  
  deltach = 180;
  deltacs = 60;
  deltacv = 60;
  
  var co = color(ch,cs,cv);
  var co2 = color((ch+deltach)%360,cs+deltacs,cv+deltacv);
  
  var s1, s2;
  s1=new n1(100,-300,1,co,co2,strrr.length,(sum%3+1)*15);
  s1.rule2_scale(dis2);
  s2 = s1.rule1_copy();
  s2.rule2_scale(dis2);
  s2.rule3_symmx();

  background(color(0,15,15));

  for (var j = 0; j <= strrr.length - 1; j++) {
      for (let k = 0; k <= strrr.length - 1; k++) {
          var col1 = s1.i3[j].c1;
          var col2 = s2.i3[k].c1;
          var newc2 = lerpColor(col1, col2, 0.5);
          var c = new i2(floor(width * 0.5) + s1.i3[j].ix, floor(height * 0.5)-s1.i3[j].iy, floor(width * 0.5) + s2.i3[k].ix, floor(height * 0.5)-s2.i3[k].iy, s1.sw, newc2);
          c.drawashape();
      }
  }
  
  s1.drawashape2();
  s2.drawashape2();
}


function setup() {
    initializeFields();
    //var wid = document.body.clientWidth;
    //var heig = document.body.clientHeight;
    mes="23423465476978452343578978070";
    but=select('#but');
    but.mousePressed(changestr);
    cavas=createCanvas(1500, 1500);
    cavas.parent('app2');
    colorMode(HSB, 360, 100, 100);
    background(color(0,15,15));
    noFill();
    strokeCap(ROUND);
    smooth();
    noLoop();

}

function draw() {
  drawtheshape(mes);
}



function initializeFields() {
    ix = 0;
    iy = 0;
    sw = 0;
    c1 = null;
    h = 0;
    s = 0;
    v = 0;
    ix1 = 0;
    iy1 = 0;
    ix2 = 0;
    iy2 = 0;
    sw = 0;
    c1 = null;
    h = 0;
    s = 0;
    v = 0;
    nx = 0;
    ny = 0;
    sw = 0;
    h = 0;
    s = 0;
    v = 0;
    len = 0;
    dist = 0;
    i3 = null;
    xishu = 0;
    c1 = null;
    c2 = null;
}
