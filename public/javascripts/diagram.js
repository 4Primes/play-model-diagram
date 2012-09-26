function drawModels() {
    var papX = 1200,
        papY = 800;
    var paper = Raphael(0, 0, papX, papY),
        connectionType = ["ManyToMany", "OneToMany", "ManyToOne", "OneToOne", "Extend"],
        color = ["blue", "fuchsia", "black", "lime", "red"],
        models = new Array(),
        connections = new Array(),
        arrows = new Array(),
        diox = new Array();

    function MODEL(x, y, packName, z) {
        this.elements = new Array();
        var elmCount = 0;
        this.add = function(element, newText) {
        	element.num=z;
            element.drag(move, start, up)     
            this.elements.push(element);
            element.group = this.elements;
            if (newText) elmCount++;
            this.p.attr("height", (15 * this.header + 8));
            this.r.attr("height", ((elmCount) * 15) + 10);
            
        };
        this.addMember = function(text, mid, font_size, isNullable, isUnique, isId) {
            var x, y, element, iconU, iconN, iconId, icnLen = 0;
            if (mid == 0) {
                y = this.y + (elmCount + 2) * 15;
                x = this.x;
                if (!(isNullable)) iconN = paper.image("/public/images/not_nullable.png", x, y - 5, 12, 12);
                else iconN = paper.image("/public/images/nullable.png", x, y - 5, 12, 12);
                this.add(iconN, false);
                iconN.attr({
                    cursor: "move"
                });
                x += 12;
                if (isUnique) iconU = paper.image("/public/images/unique.png", x, y - 5, 12, 12);
                else iconU = paper.image("/public/images/not_unique.png", x, y - 5, 12, 12);
                this.add(iconU, false);
                iconU.attr({
                    cursor: "move"
                });
                x += 12;
                if (isId) iconId = paper.image("/public/images/id.png", x, y - 5, 12, 12);
                else iconId = paper.image("/public/images/not_id.png", x, y - 5, 12, 12);
                this.add(iconId, false);
                iconId.attr({
                    cursor: "move"
                });
                x += 12;
                newTexts = [true, false]
                textColors = ["bold", "lighter"]
                textNodes = text.split(' ');
                for (i = 0; i < textNodes.length; ++i) {
                    textNodes[i] = paper.text(x, y, textNodes[i]).attr({
                        'text-anchor': 'start',
                        'font-size': font_size,
                        'font-family': "courier new",
                        'font-weight': textColors[i],
                        cursor: "move"
                    });
                    this.add(textNodes[i], newTexts[i])
                    x += (textNodes[i].getBBox().width);
                }
                if (textNodes[0].getBBox().width + textNodes[1].getBBox().width + 36 > (this.width - this.widthOffset)) {
                    this.width = textNodes[0].getBBox().width + textNodes[1].getBBox().width + 36 + this.widthOffset;
                    this.r.attr("width", this.width);
                    this.p.attr("width", this.width);
                }
            }
            else if (mid == 2) {
                y = this.y + 10;
                x = this.x + 5;
                element = paper.text(x, y, text).attr({
                    'text-anchor': 'start',
                    'font-size': font_size,
                    'font-family': "courier new",
                    cursor: "move"
                });
                this.add(element, true);
                this.p.attr({
                    fill: "#89F5A6"
                });
                if (element.getBBox().width + icnLen > (this.width - this.widthOffset)) {
                    this.width = element.getBBox().width + icnLen + this.widthOffset;
                    this.r.attr("width", this.width);
                    this.p.attr("width", this.width);
                }
            }
            else {
                x = y = 0;
                element = paper.text(x, y, text);
                if (text.length * 7 + 20 < this.width) x = this.x + (this.width - text.length * 9) / 2;
                else x = this.x + 5;
                element.remove();
                y = this.y + this.header * 13;
                element = paper.text(x, y, text).attr({
                    "font-weight": "600",
                    'text-anchor': 'start',
                    'font-size': font_size,
                    'font-family': "courier new",
                    cursor: "move"
                });
                this.add(element, true);
                if (element.getBBox().width + icnLen > (this.width - this.widthOffset)) {
                    this.width = element.getBBox().width + icnLen + this.widthOffset;
                    this.r.attr("width", this.width);
                    this.p.attr("width", this.width);
                }
            }
        }
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
        this.p.attr({ "title": packName} );
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
    	var number=this.group[0].num;
        for (var index in this.group) {
        	
            var item = this.group[index];
            var attr = {
                x: item.ox + dx,
                y: item.oy + dy
            };
            item.attr(attr);
            
        }
        move_arrows();
        border_control(number);
    };

    function up() {
        for (var index in this.group) {
            var item = this.group[index];
            item.attr({
                opacity: 1
            });
        }
    };

    function ARROW(a) {
        var modelBox = new Array(),
            sx, sy, ox, kx, ex, ey;

        limit = 1200;
        modelBox[0] = models[connections[a][0]].r.getBBox();
        modelBox[1] = models[connections[a][2]].r.getBBox();
        sy = modelBox[0].y + connections[a][1] * 15;
        ey = modelBox[1].y + connections[a][4];
        if (connections[a][5] == "extend") {
            limit = 800;
            sy = modelBox[0].width / 2 + modelBox[0].x;
            ey = modelBox[1].x + connections[a][4] * 2;
            var backup = modelBox[0].x;
            modelBox[0].x = modelBox[0].y;
            modelBox[0].y = backup;
            modelBox[0].width = modelBox[0].height;
            backup = modelBox[1].x;
            modelBox[1].x = modelBox[1].y;
            modelBox[1].y = backup;
            modelBox[1].width = modelBox[1].height;
        }
        if (modelBox[0].x < modelBox[1].x) {
            sx = modelBox[0].x + modelBox[0].width;
            if (modelBox[0].x + modelBox[0].width + 10 < modelBox[1].x) {
                ox = (modelBox[0].x + modelBox[0].width + modelBox[1].x) / 2;
                ex = modelBox[1].x;
            }
            else {
                ex = modelBox[1].width + modelBox[1].x;
                if (ex > sx) ox = ex + 20;
                else ox = sx + 20;
            }
        }
        else {
            sx = modelBox[0].x;
            if (sx > modelBox[1].x + modelBox[1].width + 10) {
                ox = (modelBox[0].x + modelBox[1].width + modelBox[1].x) / 2;
                ex = modelBox[1].width + modelBox[1].x;
            }
            else {
                ox = modelBox[1].x - 20;
                ex = modelBox[1].x;
            }
        }

        if (ox < 0) {
            sx += modelBox[0].width;
            ex += modelBox[1].width;
            if (sx > ex) ox = sx + 20;
            else ox = ex + 20;
        }
        else if (ox > limit) {
            sx = modelBox[0].x;
            ex = modelBox[1].x;
            if (sx > ex) ox = ex - 20;
            else ox = sx - 20;
        }
        for (i = 0; i < connections.length; i++) {
            if (ox == diox[i] && i != a) ox += 5;
        }
        diox[a] = ox;
        if (ox < ex) {
            kx = ex - 10;
            if (ox > kx) ox = kx;
        }
        else {
            kx = ex + 10;
            if (ox < kx) ox = kx;
        }
        if (connections[a][5] == "extend") {
            this.drawing1 = line(sy, sx, sy, ox,4)
            this.drawing2 = line(sy, ox, ey, ox,4)
            this.drawing3 = line(ey, ox, ey, kx,4)
            this.drawing4 = triangle(ey + 5, kx, ey, ex, ey - 5, kx,4, "white")
        }
        else {
            this.drawing1 = line(sx, sy, ox, sy, connections[a][3])
            this.drawing2 = line(ox, sy, ox, ey, connections[a][3])
            this.drawing3 = line(ox, ey, kx, ey, connections[a][3])
            this.drawing4 = triangle(kx, ey + 5, ex, ey, kx, ey - 5, connections[a][3], color[connections[a][3]])
        }
    }

    function move_arrows(num) {
        for (x = 0; x < connections.length; x++) {
            arrows[x].drawing1.remove();
            arrows[x].drawing2.remove();
            arrows[x].drawing3.remove();
            arrows[x].drawing4.remove();
            arrows[x] = new ARROW(x);
        }
    }

    function border_control(number)
	{
	    var modelBox=models[number].r.getBBox();
		if (modelBox.x + modelBox.width > paper.width )
        {
		    var newWidth=paper.width * (1.1),newHeight = paper.height;	
		    paper.setSize(newWidth,newHeight)
		}
	    if (modelBox.y + modelBox.height > paper.height )
		{
		    var newWidth=paper.width, newHeight = paper.height* (1.1);
		    paper.setSize(newWidth,newHeight)
		}
	}

    function line(BX, BY, SX, SY, id) {
        return paper.path("M" + BX + " " + BY + " L" + SX + " " + SY).attr({
            stroke: color[id],
            title: connectionType[id]
        });
    }

    function triangle(X1, Y1, X2, Y2, X3, Y3, id, color2) {
        return paper.path("M" + X1 + "," + Y1 + "L" + X2 + "," + Y2 + "L" + X3 + "," + Y3 + "z").attr({
            stroke: color[id],
            fill: color2,
            title: connectionType[id]
        });
    }

    paper.rect(paper.width-90,paper.height-75, 85, 70, 5).attr({
        fill: "white",
        stroke: "navy"
    });
    for (x = 0; x < 5; x++) {
        var information = paper.text(paper.width-80,paper.height-(69 - 14 * x), connectionType[x]).attr({
        	'text-anchor': 'start',
            stroke: color[x]
        });
        information.attr("font-size", "12px");
    }

    function parsing() {
        var counter = 0,
            modelCounter = 0;
        $.each(myModels, function(index, item) {
            modelCounter++;
        });
        $.each(myModels, function(index, item) {
            var rad = 2 * Math.PI * counter / modelCounter;
            models[counter] = new MODEL(30 + 300 + 300 * Math.cos(rad), 300 + 300 * Math.sin(rad),item.packageName,counter);
            models[counter].header = 1;
            if (item.isMappedSuperClass == true) {
                models[counter].addMember("<<MappedSuperclass>>", 2, "10px", false, false, false);
                models[counter].header = 2;
            }
            models[counter].name = item.name;
            $.each(item.members, function(index, member) {
                var ifItsString = "",
                    listType = "";
                if (member.type == "String") ifItsString = "[" + member.length + "]";
                else if (member.type == "List") listType = "<" + member.association.targetModelName + ">";
                if (member.name == member.columnName) models[counter].addMember(member.name + ": " + member.type + listType + ifItsString, 0, "12px", member.nullable, member.unique, member.id);
                else models[counter].addMember(member.name + "(" + member.columnName + ")" + ": " + member.type + listType + ifItsString, 0, "12px", member.nullable, member.unique, member.id);
            });
            if (models[counter].name == item.tableName) models[counter].addMember(item.name, 1, "14px", false, false, false);
            else models[counter].addMember(item.name + "(" + item.tableName + ")", 1, "14px", false, false, false);
            counter++;
        });

        var arrowCounter = 0;
        counter = 0;
        var memberCounter, arrowCounter, multiple;
        $.each(myModels, function(index, item) {
            connections[arrowCounter] = new Array();
            arrows[arrowCounter] = new Array();
            var memberCounter = 2,
                multiple = 10;
            if (item.isMappedSuperClass == true) {
                multiple = 25;
                memberCounter = 3;
            }
            for (x = 0; x < models.length; x++) {
                if (item.superClassName == models[x].name) {
                    connections[arrowCounter] = [counter, 0, x, 4, models[x].r.getBBox().width / (2 + Math.random() * 10), "extend"];
                    for (x = 0; x < arrowCounter; x++) {
                        if (connections[x][2] == connections[arrowCounter][2] && connections[x][5] == connections[arrowCounter][5]) if (connections[x][4] + 8 >= connections[arrowCounter][4] && connections[x][4] - 8 <= connections[arrowCounter][4]) connections[arrowCounter][4] += 12;
                    }
                    arrows[arrowCounter] = new ARROW(arrowCounter);
                    arrowCounter++;
                    break;
                }
            }
            $.each(item.members, function(index, member) {
                if (member.association != undefined) {
                    for (x = 0; x < models.length; x++) {
                        if (member.association.targetModelName == models[x].name) {
                            for (y = 0; y < connectionType.length - 1; y++) {
                                if (member.association.type == connectionType[y]) {
                                    connections[arrowCounter] = [counter, memberCounter, x, y, (1 + Math.round(Math.random() * multiple)), "the others"];
                                    for (x = 0; x < arrowCounter; x++) {
                                        if (connections[x][2] == connections[arrowCounter][2] && connections[x][5] == connections[arrowCounter][5]) if (connections[x][4] + 2 >= connections[arrowCounter][4] && connections[x][4] - 2 <= connections[arrowCounter][4]) connections[arrowCounter][4] += 5;
                                    }
                                    arrows[arrowCounter] = new ARROW(arrowCounter, "other");
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