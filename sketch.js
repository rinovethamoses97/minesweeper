var cells=[];
var rows=20;
var columns=20;
var mines=50;
function setup(){
    createCanvas(201,251);
    for(var i=0;i<rows;i++){
        cells[i]=[];
        for(var j=0;j<columns;j++){
            cells[i].push(new Cell(i,j));
        }
    }
    var options=[];
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            options.push([i,j]);
        }
    }
    for(var i=0;i<mines;i++){
        var temp=floor(random(options.length));
        cells[options[temp][0]][options[temp][1]].mine=true;
        options.slice(temp,1);
    }
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            var mineCount=0;
            for(var xoff=-1;xoff<=1;xoff++){
                for(var yoff=-1;yoff<=1;yoff++){
                    var indexi=i+xoff;
                    var indexj=j+yoff;
                    if(indexi>=0 && indexi<rows && indexj>=0 && indexj<columns){
                        if(cells[indexi][indexj].mine){
                            mineCount++;
                        }
                    }
                }   
            }
            cells[i][j].neighbourMine=mineCount;
        }
    }
}
function draw(){
    // background(0);
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            cells[i][j].show();
        }
    }
    winCheck();
}
function keyPressed(){
    if(keyCode==32){
        // when space bar is pressed;
        var x=mouseX;
        var y=mouseY;
        for(var i=0;i<rows;i++){
            for(var j=0;j<columns;j++){
                if(x>cells[i][j].x && x<cells[i][j].x+cells[i][j].width && y>cells[i][j].y && y<cells[i][j].y+cells[i][j].width){
                    cells[i][j].flaged=!cells[i][j].flaged
                }
            }
        }
    }
}
function winCheck(){
    var count=0;
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            if(cells[i][j].revealed)
                count++;
        }
    }
    if(count==400-mines){    
        fill(0,255,0);
        textSize(35);
        text("Won",0,232);
        for(var i=0;i<rows;i++){
            for(var j=0;j<columns;j++){
                if(cells[i][j].mine){
                    fill(0,255,0);
                    ellipse(cells[i][j].x+5,cells[i][j].y+5,6,6);
                }
            }
        }
    }
}
function revealAll(){
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            cells[i][j].revealed=true;
        }
    }
    fill(255,0,0);
    textSize(35);
    text("Game Over!!!",0,232);
}
function mousePressed(){
    var x=mouseX;
    var y=mouseY;
    for(var i=0;i<rows;i++){
        for(var j=0;j<columns;j++){
            if(x>cells[i][j].x && x<cells[i][j].x+cells[i][j].width && y>cells[i][j].y && y<cells[i][j].y+cells[i][j].width){
                cells[i][j].revealed=true;
                if(cells[i][j].mine){
                    // game over
                    revealAll();
                }
                if(cells[i][j].neighbourMine==0 && !cells[i][j].mine){
                    cells[i][j].exploreNeighbour(cells);
                    return;
                }
            }
        }
    }
}