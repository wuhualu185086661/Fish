var momObj = function()
{
	this.x;
	this.y;
	this.angle;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momBodyCount=0;

}
momObj.prototype.init=function()
{
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
}
momObj.prototype.draw=function()
{
	//lerp x,y
	//lerpDistance(aim, cur, ratio) 
	//aim:目标值
	//cur：当前值
	//ratio:百分比。数值越小，跟随速度越快
	if(!data.gameOver)
	{
			this.x=lerpDistance(mx,this.x,0.99);
			this.y=lerpDistance(my,this.y,0.99);
			//delta angle
			//Math.atan2(y,x) 反正切函数
			var deltaY=my-this.y;
			var deltaX=mx-this.x;
			var beta=Math.atan2(deltaY,deltaX)+ Math.PI;  //[-PI,PI]+PI
			//lerp angle
			//a为目标值
			//b为当前值
			//t为跟随速度
			this.angle=lerpAngle(beta, this.angle, 0.9);

			//Tail
			this.momTailTimer+=deltaTime;
				if(this.momTailTimer>50)
				{
					this.momTailCount=(this.momTailCount+1)%8;
					this.momTailTimer%=50;
				}

			//mom eye
				this.momEyeTimer+=deltaTime;
				if(this.momEyeTimer>this.momEyeInterval)
				{
					this.momEyeCount=(this.momEyeCount+1)%2;
					this.momEyeTimer%=this.momEyeInterval;

					if(this.momEyeCount==0)
					{
						this.momEyeInterval=Math.random()*1500+2000;
					}
					else
					{
						this.momEyeInterval=150;

					}
				}

    }

	
    // 如果不进行Canvas的save和restore操作的话，
    // 所有的图像都是在以坐标(this.x,this.y)为起点的画布上绘制的
	ctx1.save();
	//下次开始在canvas中绘图时，以坐标(this.x,this.y)作为起点
	//可以把translate函数理解为移动坐标原点
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	//注意先后
	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);	
	
	var momBodyCount=this.momBodyCount;
	if(data.double==1)//ora
	{
	 ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);

	}
	else
	{
	 ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	
	
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);	
	ctx1.restore();
}