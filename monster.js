var colors1 = "8a817c-70798c-f5f1ed-dad2bc-a99985".split("-").map(a=>"#"+a)

class Monster{  //宣告一個怪物類別，名稱為Monster
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置...)
        this.r = args.r || random(40,80) //設計怪物的主體，如果傳參數args.r來設定怪物大小，沒有就100
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量，由電腦亂數抽取顯示的初始位置，{x:random(width),y:random(height)} 
        this.v = args.v ||createVector(random(-1,1),random(-1,1)).limit(10) //移動的速度，如果沒有傳args參數，就會用亂數(-1,1)，抽出x,y軸移動速度
        this.color =args.color || random(colors1)//充滿顏色
        this.mode = random(["right","left"])
        this.dead = false //false代表活著
        this.timenumber = 0 //延長時間，讓大家看到他死
      }
    draw(){ //劃出元件
        if (this.dead==false){
            push() //重新設定原點位置
            translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
            fill(this.color)
            noStroke()
            //老鼠身體
            arc(0,-1,this.r+this.r/3,this.r,0,PI) //做出橢圓上半
            arc(0,0,this.r+this.r/3,this.r,PI,0)
            if(this.mode=="right"){
                // 眼睛
                fill(255)
                ellipse(this.r/2,-this.r/5.5,this.r/8)
                // 耳朵
                fill(this.color)
                ellipse(this.r/6,-this.r/2,this.r/2)
                // // 鼻子
                // fill(this.color)
                // ellipse((this.r+this.r/3)/2,0,this.r/8)
                // 尾巴
                stroke(this.color) //線條顏色跟身體及耳朵相同
                strokeWeight(8)
                noFill()
                // for (var j=0;j<1;j++){ //產生一條，所以可以不用
                    rotate(PI/0.32) //翻轉
                    beginShape()
                        for(var i=0;i<(this.r/2);i++){
                            vertex(this.r/2+i,sin(i/5+frameCount/10)*10) //用sin,frameCount來畫彎曲(sin)變動(framCount)線條
                        }
                    endShape()
                //  }
            
                
            }
            else{
                // 眼睛
                fill(255)
                ellipse(-this.r/2,-this.r/5.5,this.r/8)
                // 耳朵
                fill(this.color)
                ellipse(-this.r/6,-this.r/2,this.r/2)
                // 尾巴
                stroke(this.color) //線條顏色跟身體及耳朵相同
                strokeWeight(8)
                noFill()
                // for (var j=0;j<1;j++){ //產生一條，所以可以不用
                    rotate(-PI/4) //翻轉
                    beginShape()
                        for(var i=0;i<(this.r/2);i++){
                            vertex(this.r/2+i,sin(i/5+frameCount/10)*10) //用sin,frameCount來畫彎曲(sin)變動(framCount)線條
                        }
                    endShape()
                //  }
            
            }
            
            pop() //恢復原點到視窗左上角
        }
        else{ //怪物死亡
                this.timenumber = this.timenumber+1
            push()
                translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
                fill(this.color)
                noStroke()
                //老鼠身體
                arc(0,-1,this.r,this.r+this.r/3,0,PI) //做出橢圓上半
                arc(0,0,this.r,this.r+this.r/3,PI,0)
                // 耳朵
                ellipse(this.r/3,-(this.r+this.r/3)/2,this.r/2)
                ellipse(-this.r/3,-(this.r+this.r/3)/2,this.r/2)
                // 尾巴
                stroke(this.color)
                strokeWeight(4)
                noFill()
                //line(-this.r/2,0,this.r/2,0)
                // for(var j=0;j<1;j++){ //畫一次
                    rotate(PI/2)
                    line(this.r,0,this.r/2,0) //畫出一條線
                // }
            pop()
        }
        if (monsters.length == 0) { //如果怪物數量=0
            background(220) //清空畫面
            // fill("#84a59d")
            // rect(width/2-200,height/2-100,400,200)
            fill("#f6bd60")
            textSize(30)
            text("你的分數是:",width/2-100,height/2-60)//顯示分數
            text(score,width/2+60,height/2-60)  
            //禁止按鍵和滑鼠

            noLoop();
            noCursor();
    }
    }
    update(){ ////計算出元件移動後的位置
      this.p.add(this.v)

     //碰到牆壁會回彈
        if(this.p.x<=0 || this.p.x>=width){ //X軸碰到左邊(<=0)，或是碰到右邊(>=width)
            this.v.x=-this.v.x //把速度方向改變
        }
        if(this.p.y<=0 || this.p.y>=height-50){ //X軸碰到上邊(<=0)，或是碰到下邊(>=height)
        this.v.y=-this.v.y //把速度方向改變
        }
    }
    isBallinranger(x,y){ //功能:判斷滑鼠按下的位置是否在物件的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(滑鼠按下與物件中心點)之間的距離，放到d變數內
        if(d<this.r/2){
          return true //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
        }else{
          return false //滑鼠與物件的距離大於物件的寬度，代表未碰觸，則傳回false的值(未碰觸)
        }
    }

}