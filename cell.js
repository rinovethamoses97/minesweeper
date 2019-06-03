class Cell{
    constructor(i,j){
        this.i=i;
        this.j=j;
        this.width=10;
        this.x=j*this.width;
        this.y=i*this.width;
        this.revealed=false;
        this.mine=false;
        this.neighbourMine=0;
        this.flaged=false;
    }
    show(){
        if(this.flaged){
            fill(0,255,0);
            ellipse(this.x+5,this.y+5,6,6);
        }
        else{
            fill(255);
            rect(this.x,this.y,this.width,this.width);
        }
        if(this.revealed){
            if(this.mine){
                fill(255,0,0);
                ellipse(this.x+5,this.y+5,6,6);
            }
            else{
                if(this.neighbourMine==0){
                    fill(100);
                    rect(this.x,this.y,this.width,this.width);
                }
                else{
                    fill(0);
                    textSize(10);        
                    text(this.neighbourMine,this.x+3,this.y+9);
                }
            }
        }
    }
    exploreNeighbour(cells){
        for(var xoff=-1;xoff<=1;xoff++){
            for(var yoff=-1;yoff<=1;yoff++){
                var indexi=this.i+xoff;
                var indexj=this.j+yoff;
                if(indexi>=0 && indexi<rows && indexj>=0 && indexj<columns){
                    if(!cells[indexi][indexj].revealed && !cells[indexi][indexj].mine){
                        cells[indexi][indexj].revealed=true;
                        if(cells[indexi][indexj].neighbourMine==0)
                            cells[indexi][indexj].exploreNeighbour(cells);
                    }
                }
            }
        }
    }
}