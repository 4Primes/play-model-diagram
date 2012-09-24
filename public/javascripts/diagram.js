
function drawModels()
{
    var paper = Raphael(0, 0, 1200, 800),
        connectionType = ["ManyToMany", "OneToMany", "ManyToOne", "OneToOne", "Extend"],
        color = ["blue", "fuchsia", "black", "lime", "red"],
        models = new Array(),
        connections = new Array(),
		arrows = new Array(),
		diox = new Array();

    function MODEL(x, y) {
        this.elements = new Array();
        var elmCount=0;
        this.add = function(element) {
        	
        	if(element.type=="text")
        	{
        		elmCount++;
        	}
            element.drag(move, start, up);
            this.elements.push(element);
            element.group = this.elements; 
            this.p.attr("height", (15*this.header + 13 ));
            this.r.attr("height", ((elmCount) * 15)+ 13 );
        };
        this.addMember = function(text, mid, font,isNullable,isUnique,isId) {
            var x, y, element,iconU,iconN,iconId,icnLen=0;
            if (mid == 0) {
                y = this.y+ 5 + (elmCount+1) * 15+ 15;
                x = this.x;

                
                if(isNullable){
                	icnLen+=10;
                	iconN=paper.image("/public/images/N.ico",x,y-5,10,10);
                	x+=10;
                	this.add(iconN);
            		iconN.attr({
                		cursor: "move"
            		});
            	}
            	if (isUnique){
            		icnLen+=10;
            		iconU=paper.image("/public/images/U.ico",x,y-5,10,10);	
            		x+=10;
            		this.add(iconU);
            		iconN.attr({
                		cursor: "move"
            		});

            	}
            	if (isId){
            		icnLen+=10;
            		iconId=paper.image("/public/images/I.ico",x,y-5,10,10);	
            		x+=10;
            		this.add(iconId);
            		iconId.attr({
                		cursor: "move"
            		});

            	}
            	element = paper.text(x+2, y, text);
            } else if (mid == 2) {
                y = this.y + 10;
                x = this.x+5;
                element = paper.text(x, y, text);
                element.attr("fill","black");
				this.p.attr({fill: "#89F5A6"});
            }
            else {
                x = y = 0;
                element = paper.text(x, y, text);
				if(text.length*7 + 10 < this.width  )
                    x = this.x + (this.width - text.length*9) / 2 ;
			    else 
			    	x = this.x + 5;
                element.remove();
                y = this.y + 5 + this.header * 10;
                element = paper.text(x, y, text);
            }
            element.attr("text-anchor", "start");
            element.attr("font-size", font);
			element.attr("font-family", "courier new")
            
            this.add(element);
            if (element.getBBox().width+icnLen > (this.width - this.widthOffset)) {
                this.width = element.getBBox().width + icnLen + this.widthOffset;
                this.r.attr("width", this.width);
                this.p.attr("width", this.width);
            }
            element.attr({
                cursor: "move"
            });
        }
		headerColor = this.headerColor
        this.x = x;
        this.y = y;
        this.width = 10;
        this.widthOffset = 10;
        this.r = paper.rect(x, y, this.width, 10, 5).attr({
            fill: "white",
            opacity: 1,
            cursor: "move"
        });
        this.p = paper.rect(x, y, this.width, 10, 5).attr({
            fill: "aqua",
            opacity: 1,
            cursor: "move"
        });
        this.add(this.r);
        this.add(this.p);
    };


    function start() {
        for (var index in this.group) {
            var item = this.group[index];
            item.ox = item.attr("x");
            item.oy = item.attr("y")
            item.attr({
                opacity: .5
            });
        }
    };

    function move(dx, dy) {
             for (var index in this.group) {
                 var item = this.group[index];
                 var attr = {
                     x: item.ox + dx,
                     y: item.oy + dy
                    };
                 item.attr(attr);    
             }
            move_arrows();
    };

    function up() {
        for (var index in this.group) {
            var item = this.group[index];
            item.attr({
                opacity: 1
            });
        }
    };
			
    function ARROW(a)
    {   
	    var modelBox = new Array(),
		sx,sy,ox,kx,ex,ey;
		
		limit = 1200;
        modelBox[0]=models[connections[a][0]].r.getBBox();
		modelBox[1]=models[connections[a][2]].r.getBBox();
		sy = modelBox[0].y + connections[a][1] * 15 + 5;
        ey = modelBox[1].y + connections[a][4];
	    if(connections[a][5]=="extend")
		{
		    limit = 800;
		    sy = modelBox[0].width/ 2 + modelBox[0].x;
			ey = modelBox[1].x + connections[a][4]*2;
		    var backup    = modelBox[0].x;
		    modelBox[0].x = modelBox[0].y;
			modelBox[0].y = backup;
			modelBox[0].width = modelBox[0].height;
			    backup    = modelBox[1].x;
		    modelBox[1].x = modelBox[1].y;
			modelBox[1].y = backup;
			modelBox[1].width = modelBox[1].height;	
		}
        if(modelBox[0].x < modelBox[1].x)
        {
            sx = modelBox[0].x + modelBox[0].width;
            if( modelBox[0].x + modelBox[0].width + 10 < modelBox[1].x ) {
                ox = ( modelBox[0].x + modelBox[0].width + modelBox[1].x ) / 2;
                ex = modelBox[1].x;
            }
            else{
                ex = modelBox[1].width + modelBox[1].x;
                if( ex > sx ) ox = ex + 20;
                else ox = sx +20;
            }
        }
        else{
            sx = modelBox[0].x;
            if(sx > modelBox[1].x + modelBox[1].width + 10){
                ox = ( modelBox[0].x + modelBox[1].width + modelBox[1].x ) / 2;
                ex = modelBox[1].width + modelBox[1].x;
            }
            else {
                ox = modelBox[1].x-20;
                ex = modelBox[1].x;
            }
        }
		
		if(ox<0)
	    {
			sx += modelBox[0].width;
			ex += modelBox[1].width;
			if( sx > ex ) ox = sx + 20;
			else ox = ex + 20;
		}
		else if(ox > limit)
	    {
			sx = modelBox[0].x;
			ex = modelBox[1].x;
			if( sx > ex ) ox = ex - 20;
			else ox = sx - 20;
		}
		for(i=0;i<connections.length;i++)
		{
		    if(ox==diox[i] && i!=a)
			   ox+=5; 
		}
		diox[a]=ox;
        if (ox < ex){ 
		    kx = ex - 10;
		    if(ox > kx)
			   ox = kx;
	    }
        else {
		    kx = ex + 10;
			if(ox < kx)
			   ox =kx;
		}
		if(connections[a][5]=="extend")
		{
		this.yol1 = line(sy, sx, sy, ox).attr({
            stroke: color[4]
        });
        this.yol2 = line(sy, ox, ey, ox).attr({
            stroke: color[4]
        });
        this.yol3 = line(ey, ox, ey, kx).attr({
            stroke: color[4]
        });
        this.yol4 = line(ey + 5, kx, ey,  ex).attr({
            stroke: color[4]
        });
        this.yol5 = line(ey - 5, kx,  ey, ex).attr({
            stroke: color[4]
        });
        this.yol6 = line(ey - 5, kx, ey + 5,  kx).attr({
            stroke: color[4]
        });
		   
		}
		else
		{
        this.yol1 = line(sx, sy, ox, sy).attr({
            stroke: color[connections[a][3]]
        });
        this.yol2 = line(ox, sy, ox, ey).attr({
            stroke: color[connections[a][3]]
        });
        this.yol3 = line(ox, ey, kx, ey).attr({
            stroke: color[connections[a][3]]
        });
        this.yol4 = line(kx, ey + 5, ex, ey).attr({
            stroke: color[connections[a][3]]
        });
        this.yol5 = line(kx, ey - 5, ex, ey).attr({
            stroke: color[connections[a][3]]
        });
        this.yol6 = line(kx, ey - 5, kx, ey + 5).attr({
            stroke: color[connections[a][3]]
        });
		}
    }
	
	function move_arrows(num)
	{
	    for(x=0;x<connections.length;x++)
		{
		    arrows[x].yol1.remove();
			arrows[x].yol2.remove();
			arrows[x].yol3.remove();
			arrows[x].yol4.remove();
			arrows[x].yol5.remove();
			arrows[x].yol6.remove();
			arrows[x] = new ARROW(x);
		}
	}
    
    function line(BX, BY, SX, SY) {
        return paper.path("M" + BX + " " + BY + " L" + SX + " " + SY);
    }
	
	function parsing()
	{
	    var counter = 0;
	    $.each(myModels, function(index, item) {
	        var rad = Math.PI * counter / 3;
	        models[counter] = new MODEL(30+300 + 300 * Math.cos(rad), 300 + 300 * Math.sin(rad));
	        models[counter].header = 1;
	        if (item.isMappedSuperClass == true) {
	            models[counter].addMember("<<MappedSuperclass>>", 2, "10px",false,false);
	            models[counter].header = 2;
	        }
			models[counter].name = item.name;
	        $.each(item.members, function(index, member) {
			    if(member.name == member.columnName)
	                models[counter].addMember(member.name + ": " + member.type, 0, "12px",member.nullable,member.unique,member.id);
				else  models[counter].addMember(member.name + ":" + member.type +"("+ member.columnName +")", 0, "12px",member.nullable,member.unique,member.id);
	        });
			if(models[counter].name == item.tableName)
	           models[counter].addMember(item.name, 1, "14px",false,false,false);
			else models[counter].addMember(item.name +":("+item.tableName + ")" , 1, "14px",false,false,false);
	        counter++;
	    }); 
		
		var arrowCounter=0;
		counter=0;
	    var memberCounter, arrowCounter, multiple;
	    $.each(myModels, function(index, item) 
	    {
	        connections[arrowCounter] = new Array();
			arrows[arrowCounter] = new Array();
			var memberCounter=2,
			multiple = 10;
			if (item.isMappedSuperClass == true) {
			    multiple =25;
	            memberCounter = 3;
		    }
			for(x=0;x<models.length;x++){
	            if (item.superClassName == models[x].name){
			        connections[arrowCounter]= [counter,0,x,4, models[x].r.getBBox().width / (2 + Math.random() * 10),"extend"];
					for(x=0;x<arrowCounter;x++)
					{
						if(connections[x][2]==connections[arrowCounter][2]&&connections[x][5]==connections[arrowCounter][5])
							if(connections[x][4]+8>=connections[arrowCounter][4]&&connections[x][4]-8<=connections[arrowCounter][4])
								connections[arrowCounter][4]+=12;	   
					}
					arrows[arrowCounter]=new ARROW(arrowCounter);
					arrowCounter++;
					break;
					}
			}		
	         $.each(item.members, function(index, member) 
	         {
	             if (member.association != undefined) 
	             {
	                for (x = 0; x < models.length; x++) 
	                {
	                    if (member.association.targetModelName == models[x].name) 
	                    {
	                        for (y = 0; y < connectionType.length - 1; y++) 
	                        {
	                            if (member.association.type == connectionType[y]) 
	                            {
									connections[arrowCounter]=[counter,memberCounter,x,y,(1 + Math.round(Math.random() * multiple)),"the others"];
									for(x=0;x<arrowCounter;x++)
									{
									    if(connections[x][2]==connections[arrowCounter][2]&&connections[x][5]==connections[arrowCounter][5])
										   if(connections[x][4]+2>=connections[arrowCounter][4]&&connections[x][4]-2<=connections[arrowCounter][4])
										       connections[arrowCounter][4]+=5;	   
									}
	                                arrows[arrowCounter]=new ARROW(arrowCounter,"other");
									arrowCounter++;
	                                break;
	                            }
	                        }
	                        break;
	                    }
	                }
	             }
	             memberCounter++;
	         });
			 counter++;
	    });	
		}
    parsing();

};
       
    
    
    
    
    
    
    
    
    
    
    
    