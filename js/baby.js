var babyObj = function()
{
		this.x;
		this.y;
		this.angle;
		this.babyBody=new Image();
		this.babyTail=new Image();

		this.babyTailTimer=0;
		this.babyTailCount=0;

		this.babyEyeTimer=0;
		this.babyEyeCount=0;
		this.babyEyeInterval=1000;

		this.babyBodyTimer=0;
		this.babyBodyCount=0;
}
babyObj.prototype.init=function()
{
		this.x=canWidth*0.5-50;
		this.y=canHeight*0.5 +50;
		this.angle=0;
		this.babyBody.src="./src/babyFade0.png";
}

babyObj.prototype.draw=function()
{        
	if(!data.gameOver)
	{
		//lerp x,y
		this.x =lerpDistance(mom.x,this.x,0.985);
		this.y =lerpDistance(mom.y,this.y,0.985);
		//baby tail count
		this.babyTailTimer+=deltaTime;
		if(this.babyTailTimer>50)
		{
			this.babyTailCount=(this.babyTailCount+1)%8;
			this.babyTailTimer%=50;
		}

		//baby eye
		this.babyEyeTimer+=deltaTime;
		if(this.babyEyeTimer>this.babyEyeInterval)
		{
			this.babyEyeCount=(this.babyEyeCount+1)%2;
			this.babyEyeTimer%=this.babyEyeInterval;

			if(this.babyEyeCount==0)
			{
				this.babyEyeInterval=Math.random()*2000+2000;
			}else
			{
				this.babyEyeInterval=200;

			}
		}

	}
	else
	 {
	 	
	 	this.y =lerpDistance(mom.y+30,this.y,0.995);

	 }
		
		//lerp angle
		var deltaY=mom.y-this.y;
		var deltaX=mom.x-this.x;
		var beta=Math.atan2(deltaY,deltaX)+ Math.PI;  //[-PI,PI]+PI
		//lerp angle
		//a为目标值
		//b为当前值
		//t为跟随速度
			this.angle=lerpAngle(beta, this.angle, 0.9);	
		//baby body
		this.babyBodyTimer+=deltaTime;
		if(this.babyBodyTimer>350)
		{
			this.babyBodyCount++;
				//置0
			this.babyBodyTimer%=350;
			if(this.babyBodyCount>19)
			{
				this.babyBodyCount=19;
				//game over
				data.gameOver=true;
			}
		}



		//ctx1
		ctx1.save();
		//translate转移原点相对坐标
		ctx1.translate(this.x,this.y);
		//rotate(x):将画布顺时针旋转x弧度
		ctx1.rotate(this.angle);

		var babyTailCount=this.babyTailCount;
		ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);		
		
		var babyBodyCount=this.babyBodyCount;
		ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
		
		var babyEyeCount=this.babyEyeCount;
		ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
		
		ctx1.restore();

}