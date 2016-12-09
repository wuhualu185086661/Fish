var aneObj=function()
{
	//start point,control point,end point(sin)
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.amp=[];
	this.alpha=0;
}
aneObj.prototype.num=60;
aneObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.rootx[i]=i*16+Math.random()*20;//Math.random返回的是[0,1)之间的值
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-280+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}

}
aneObj.prototype.draw=function()
{
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);//[-1,1]
	ctx2.save();
	ctx2.globalAlpha=0.6;//设置透明度
	ctx2.lineWidth = 22;//线的宽度
	ctx2.lineCap="round";//线段结束时的样式,使海葵的头部为半圆形
	ctx2.strokeStyle="#3b154e";//颜色
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);//设置绘图的起始点是图片的底部
		// quadraticCurveTo(cpx,cpy,x,y);
		// cpx	贝塞尔控制点的 x 坐标
		// cpy	贝塞尔控制点的 y 坐标
		// x	结束点的 x 坐标
		// y	结束点的 y 坐标
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo
			(this.rootx[i],
			canHeight - 100,
			this.headx[i],
			this.heady[i]);//绘制一条二次贝塞尔曲线
		ctx2.stroke();//绘制

	}
	ctx2.restore();
}