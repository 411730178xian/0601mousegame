class obj{ //宣告一個類別，針對一個畫的圖案
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置...)
    // this.p = args.p || {x:random(width),y:random(height)} //描述為該物件的初始位置，||(or)，當產生一個物件時，有傳給位置參數，使用該參數，如果沒有傳參數，則使用or後面的產出
    this.p = args.p || createVector(random(width),random(height)) 
    // this.v = {x:random(-1,1),y:random(-1,1)} //設定一個物件的移動速度
    this.v = createVector(random(-1,1),random(-1,1)) //把原本的{X:..Y;..}改成"向量"方式呈現
    this.size =random(0.5,2) //一個物件的放大倍率
    this.color =random(fill_colors) //充滿顏色
    this.stroke =random(line_colors) //外框線條顏色
  }

  draw(){ //劃出單一個物件形狀
    push() //依照我的設定，設定原點(0,0)的位置
     translate(this.p.x,this.p.y) //以該物件位置為原點
     scale(this.v.x<0?1:-1,-1) //前面條件成立?否則:。如果this.v.x<0條件成立，值唯一，否則為-1，y軸的-1，為上下翻轉。
     fill(this.color)
     stroke(this.stroke)
     strokeWeight(4) //線條粗細
     beginShape()
     for(var k=0;k<points.length;k++){
      // line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size) //需要提供兩個點的座標
      // vertex(points[k][0]*this.size,points[k][1]*this.size) //只要設定一個點，當指令到endShape()，會把所有點串接在一起
      curveVertex(points[k][0]*this.size,points[k][1]*this.size) //用圓弧畫
     }
     endShape()
    pop() //執行pop()，原點(0，0)設定回到整個視窗的左上角
  }
  update(){
    // this.p.x = this.p.x + this.v.x //X軸目前位置(this.p.x)加X軸的移動速度(this.v.x )
    // this.p.y = this.p.y + this.v.y
    this.p.add(this.v) //設定好向量後，使用add就可以與上面兩行指令一樣的效果
    //向量sub==>減號
    //知道滑鼠的位置，並建立一個滑鼠的向量
    // let mouseV=createVector(mouseX,mouseY) //把滑鼠的位置轉換成一個向量值
    // let delta =mouseV.sub(this.p).limit(this.v.mag()*2) //sub計算出滑鼠所在位置向量(mouseV)到物件向量(this.v)的距離，每次以3的距離，this.v.mag()代表該物件的速度大小(一個向量值有大小與方向)
    // this.p.add(delta)
    
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
    if(d<4*this.size){
      return true //滑鼠與物件的距離小於物件的寬度，代表碰觸了，則傳回true的值(碰觸)
    }else{
      return false //滑鼠與物件的距離大於物件的寬度，代表未碰觸，則傳回false的值(未碰觸)
    }

  }
}