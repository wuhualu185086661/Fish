var haloObj = function()
{
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
}

haloObj.prototype.num=5;

haloObj.prototype.init=function()
{
	for(var i=0;i<this.num;i++)
	{
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false; 
		this.r[i]=0;
	}
}

haloObj.prototype.draw=function()
{
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;// 设置阴影级数
	ctx1.shadowColor="rgba(203,91,0,1)";//设置阴影颜色
	for(var i=0;i<this.num;i++)
	{
		if(this.alive[i])
		{
			//draw
			this.r[i]+=deltaTime*0.05;
			//alpha=0时完全透明
			if(this.r[i]>100)
			{
				this.alive[i]=false;
				break;//跳出本次循环,同时i++;
			}
			//当alpha的值不属于[0,1]时，系统默认作为1处理，图片完全不透明
			var alpha=1-this.r[i]/100;
			//api
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			// strokeStyle是设置图形轮廓（边框）的颜色，fillStyle是设置图形填充（边框以内）的颜色
			ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
			ctx1.stroke();//开始绘制
			//draw

		}
	}
	ctx1.restore();
}

haloObj.prototype.born=function(x,y)
{
	for(var i=0;i<this.num;i++)
		if(!this.alive[i]) 
		{
			//born
            //return的作用：程序执行到这里时，会从<被调函数>返回到<主调函数>继续执行
            this.alive[i]=true;
            this.r[i]=10;
            this.x[i]=x;
            this.y[i]=y;
            return;
		}
	
}