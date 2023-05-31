//定義一個bullet物件的class
class Bullet{
    constructor(args){ //預設值，基本資料(物件的顏色，移動的速度，大小，初始顯示位置...)
      this.r = args.r || 10 //設計的飛彈有大有小時，就傳參數args.r來設定飛彈大小
      // this.p = args.p || createVector(width/2,height/2) //建立一個向量，{x:width/2,y:height/2} 
      this.p = args.p || shipP.copy()
      this.v = args.v ||createVector(mouseX-width/2,mouseY-height/2).limit(25) //算出方向，limit-->每次移動5
      this.color = args.color || "#ffd166"
    }
    draw(){ //繪出物件程式碼
        push() //
         translate(this.p.x,this.p.y) //以該物件位置為原點
         fill(this.color)
         noStroke()
         ellipse(0,0,this.r)
        pop()
    }
    update(){ //計算出移動後的位置
        // this.p.x = this.p.x + this.v.x //X軸目前位置(this.p.x)加X軸的移動速度(this.v.x )
        // this.p.y = this.p.y + this.v.y
        this.p.add(this.v)
  
    }
  }