

var drawModels=function(myModels) {
    var w = 1200,
        h = 800,
        r = Raphael(0, 0, w, h),
        num = 0,
        num2, rad, counter = 0,
        counter2 = 0,
        type = [["CreatedType", 0],
               ["Event", 1],
               ["Friend", 2],
               ["Model", 3],
               ["MyModel", 4],
               ["User", 5]],
        type2 = ["ManyToMany", "OneToMany", "ManyToOne", "OneToOne", "Extend"],
        color = ["blue", "fuchsia", "black", "lime", "red"],
        connArr = new Array(),
        box = new Array(),
        diox = new Array(),
        dioy = new Array(),
        connArr2 = new Array(),
        Model = function(x, y) {
            this.elements = new Array();
            this.add = function(element) {
                element.drag(move, start, up);
                this.elements.push(element);
                element.group = this.elements;
                this.r.attr("height", ((this.elements.length - 1) * 20));
                this.p.attr("height", (10 + 20 * this.cer));
            };
            this.addMember = function(text) {
                var x = this.x + 10;
                var y = this.y + (this.elements.length - 1) * 20;
                if (this.font == 2) {
                    if (this.map == 1) var element = r.text(x + this.width / 2 - 10, y, text);
                    else {
                        if (this.map2 == 1) element = r.text(x + 10, y, text);
                        else element = r.text(x + 20, y, text);
                        element.attr("text-anchor", "start");
                    }
                    element.attr("font-size", "16px");
                }
                else {
                    element = r.text(x, y, text);
                    element.attr("text-anchor", "start");
                    element.attr("font-size", "13px");
                }
                element.attr({
                    cursor: "move"
                });
                this.add(element);
                if (element.getBBox().width > (this.width - this.widthOffset)) {
                    this.width = element.getBBox().width + this.widthOffset;
                    this.r.attr("width", this.width);
                    this.p.attr("width", this.width);
                }
            }
            this.x = x;
            this.y = y;
            this.width = 10;
            this.widthOffset = 40;
            this.r = r.rect(x, y, this.width, 10, 5).attr({
                fill: "white",
                opacity: 1,
                cursor: "move"
            });
            this.p = r.rect(x, y, this.width, 10, 5).attr({
                fill: "aqua",
                opacity: 1,
                cursor: "move"
            });
            this.add(this.r);
            this.add(this.p);
        };

    $.each(myModels, function(index, item) {
        rad = Math.PI * num / 3;
        num2 = 2;
        box[num] = new Model(330 + 300 * Math.cos(rad), 330 + 300 * Math.sin(rad));
        box[num].cer = 1;
        box[num].font = 2;
        box[num].map = 0;
        box[num].map2 = 0;
        if (item.isMappedSuperClass == true) {
            box[num].map2 = 1;
            box[num].addMember("<<MappedSuperclass>>");
            box[num].cer = 2;
            box[num].map = 1;
        }
        for (i = 0; i < 6; i++) {
            if (item.superClassName == type[i][0]) {
                connArr2[counter2] = [num, i, 4];
                counter2++;
            }
        }

        box[num].addMember(item.name);
        box[num].font = 1;
        $.each(item.members, function(index, member) {
            box[num].addMember(member.name + " : " + member.type);
            if (member.association != undefined) {
                for (i = 0; i < 6; i++) {
                    if (member.association.targetModelName == type[i][0]) {
                        for (x = 0; x < 4; x++) {
                            if (member.association.type == type2[x]) {
                                if (box[num].cer == 2) connArr[counter] = [num2 + 1, num, i, x];
                                else connArr[counter] = [num2, num, i, x];
                            }
                        }
                    }
                }
                counter++;
            }
            num2++;
        });
        num++;
    });

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
        arrow();
        extendarrow();
    };

    function up() {
        for (var index in this.group) {
            var item = this.group[index];
            item.attr({
                opacity: 1
            });
        }
    };

    function arrow() {
        for (i = 0; i < counter; i++) {
            var kt1 = box[modelArray[i].md1].r.getBBox(),
                kt2 = box[modelArray[i].md2].r.getBBox(),
                sx, sy, ox, ex, ey, kx;
            sy = kt1.y + modelArray[i].member1 * 20;
            ey = kt2.y + 3 + modelArray[i].member2 * 4;
            if (kt1.x < kt2.x) {
                sx = kt1.x + kt1.width;
                if (kt1.x + kt1.width < kt2.x) {
                    ox = (kt1.x + kt1.width + kt2.x) / 2;
                    ex = kt2.x;
                }
                else {
                    ex = kt2.x + kt2.width;
                    if (ex > sx) ox = ex + 20;
                    else ox = sx + 20;
                }
            }
            else {
                sx = kt1.x;
                if (sx > kt2.x + kt2.width) {
                    ox = (kt1.x + kt2.x + kt2.width) / 2;
                    ex = kt2.x + kt2.width;
                }
                else {
                    ox = kt2.x - 20;
                    ex = kt2.x;
                }
            }
            for (j = 0; j < counter; j++)
            if (diox[j] == ox && j != i) {
                if (sx > ex) {
                    if (ox < ex || ex < ox - 5 || sx < ox - 5) ox -= 5;
                }
                else {
                    if (sx == ex || sx < ox - 5 || ex < ox - 5) ox -= 5;
                }
            }
            diox[i] = ox;
            if (ox < ex) kx = ex - 10;
            else kx = ex + 10;
            modelArray[i].route1.remove();
            modelArray[i].route2.remove();
            modelArray[i].route3.remove();
            modelArray[i].route4.remove();
            modelArray[i].route5.remove();
            modelArray[i].route6.remove();
            modelArray[i].route1 = toPath(sx, sy, ox, sy).attr({
                stroke: color[modelArray[i].rk]
            });
            modelArray[i].route2 = toPath(ox, sy, ox, ey).attr({
                stroke: color[modelArray[i].rk]
            });
            modelArray[i].route3 = toPath(ox, ey, kx, ey).attr({
                stroke: color[modelArray[i].rk]
            });
            modelArray[i].route4 = toPath(kx, ey + 5, ex, ey).attr({
                stroke: color[modelArray[i].rk]
            });
            modelArray[i].route5 = toPath(kx, ey - 5, ex, ey).attr({
                stroke: color[modelArray[i].rk]
            });
            modelArray[i].route6 = toPath(kx, ey - 5, kx, ey + 5).attr({
                stroke: color[modelArray[i].rk]
            });
        }
    };

    function extendarrow() {
        for (i = 0; i < counter; i++) {
            var kt1 = box[modelArray2[i].md1].r.getBBox(),
                kt2 = box[modelArray2[i].md2].r.getBBox(),
                sx, sy, oy, ex, ey, ky;
            sy = kt1.y;
            sx = kt1.x + kt1.width / 2;
            ex = kt2.x + 10 * modelArray2[i].member2;
            if (kt1.y > kt2.y) {
                if (kt1.y > kt2.y + kt2.height) {
                    oy = (kt1.y + kt2.height + kt2.y) / 2;
                    ey = kt2.y + kt2.height;
                    ky = ey + 10;
                }
                else {
                    ey = kt2.y;
                    ky = ey - 10;
                    oy = ey - 20;
                }
            }
            else {
                ey = kt2.y;
                ky = ey - 10;
                if (kt1.y + kt1.height < kt2.y) {
                    sy += kt1.height;
                    oy = (kt1.y + kt1.height + kt2.y) / 2;
                }
                else oy = kt1.y - 20;
            }
            for (j = 0; j < counter2; j++)
            if (dioy[j] == oy && i != j && oy - 8 > ey) oy -= 8;
            dioy[i] = oy;
            modelArray2[i].route1.remove();
            modelArray2[i].route2.remove();
            modelArray2[i].route3.remove();
            modelArray2[i].route4.remove();
            modelArray2[i].route5.remove();
            modelArray2[i].route6.remove();
            modelArray2[i].route1 = toPath(sx, sy, sx, oy).attr({
                stroke: color[modelArray2[i].rk]
            });
            modelArray2[i].route2 = toPath(sx, oy, ex, oy).attr({
                stroke: color[modelArray2[i].rk]
            });
            modelArray2[i].route3 = toPath(ex, oy, ex, ky).attr({
                stroke: color[modelArray2[i].rk]
            });
            modelArray2[i].route4 = toPath(ex + 5, ky, ex, ey).attr({
                stroke: color[modelArray2[i].rk]
            });
            modelArray2[i].route5 = toPath(ex - 5, ky, ex, ey).attr({
                stroke: color[modelArray2[i].rk]
            });
            modelArray2[i].route6 = toPath(ex - 5, ky, ex + 5, ky).attr({
                stroke: color[modelArray2[i].rk]
            });
        }
   };

    var a, b, c, d, e, modelArray = new Array(),
        modelArray2 = new Array();

    for (x = 0; x < counter; x++) {
        a = connArr[x][0];
        b = (1 + Math.round(Math.random() * 11)) % 8;
        c = connArr[x][1];
        d = connArr[x][2];
        e = connArr[x][3];
        modelArray[x] = new line(a, b, c, d, e, x);
   }
    for (x = 0; x < counter2; x++) {
        b = (1 + Math.round(Math.random() * 15));
        c = connArr2[x][0];
        d = connArr2[x][1];
        e = connArr2[x][2];
        modelArray2[x] = new extendLine(b, c, d, e, x);
   }

    function line(a, b, c, d, e, limit) {
        this.member1 = a, this.member2 = b, this.md1 = c, this.md2 = d, this.rk = e;
        var kt1 = box[this.md1].r.getBBox(),
            kt2 = box[this.md2].r.getBBox(),
            sx, sy, ox, ex, ey, kx;
        sy = kt1.y + this.member1 * 20;
        ey = kt2.y + 3 + this.member2 * 4;
        if (kt1.x < kt2.x) {
            sx = kt1.x + kt1.width;
            if (kt1.x + kt1.width < kt2.x) {
                ox = (kt1.x + kt1.width + kt2.x) / 2;
                ex = kt2.x;
            }
            else {
                ex = kt2.x + kt2.width;
                if (ex > sx) ox = ex + 20;
                else ox = sx + 20;
            }
        }
        else {
            sx = kt1.x;
            if (sx > kt2.x + kt2.width) {
                ox = (kt1.x + kt2.x + kt2.width) / 2;
                ex = kt2.x + kt2.width;
            }
            else {
                ox = kt2.x - 20;
                ex = kt2.x;
            }
        }
        for (i = 0; i < limit; i++)
        if (diox[i] == ox) {
            if (sx > ex) {
                if (ox < ex || ex < ox - 5 || sx < ox - 5) ox -= 5;
            }
            else {
                if (sx == ex || sx < ox - 5 || ex < ox - 5) ox -= 5;
            }
        }
        diox[limit] = ox;
        if (ox < ex) kx = ex - 10;
        else kx = ex + 10;
        this.route1 = toPath(sx, sy, ox, sy).attr({
            stroke: color[this.rk]
        });
        this.route2 = toPath(ox, sy, ox, ey).attr({
            stroke: color[this.rk]
        });
        this.route3 = toPath(ox, ey, kx, ey).attr({
            stroke: color[this.rk]
        });
        this.route4 = toPath(kx, ey + 5, ex, ey).attr({
            stroke: color[this.rk]
        });
        this.route5 = toPath(kx, ey - 5, ex, ey).attr({
            stroke: color[this.rk]
        });
        this.route6 = toPath(kx, ey - 5, kx, ey + 5).attr({
            stroke: color[this.rk]
        });
    };

    function extendLine(b, c, d, e, limit) {
        this.member2 = b, this.md1 = c, this.md2 = d, this.rk = e;
        var kt1 = box[this.md1].r.getBBox(),
            kt2 = box[this.md2].r.getBBox(),
            sx, sy, oy, ex, ey, ky;
        sy = kt1.y;
        sx = kt1.x + kt1.width / 2;
        ex = kt2.x + 10 * this.member2;
        if (kt1.y > kt2.y) {
            if (kt1.y > kt2.y + kt2.height) {
                oy = (kt1.y + kt2.height + kt2.y) / 2;
                ey = kt2.y + kt2.height;
                ky = ey + 10;
            }
            else {
                ey = kt2.y;
                ky = ey - 10;
                oy = ey - 20;
            }
        }
        else {
            ey = kt2.y;
            ky = ey - 10;
            if (kt1.y + kt1.height < kt2.y) {
                sy += kt1.height;
                oy = (kt1.y + kt1.height + kt2.y) / 2;
            }
            else oy = kt1.y - 20;
        }
        for (i = 0; i < limit; i++)
        if (dioy[i] == oy && oy - 8 > ey) oy -= 8;
        dioy[limit] = oy;
        this.route1 = toPath(sx, sy, sx, oy).attr({
            stroke: color[this.rk]
        });
        this.route2 = toPath(sx, oy, ex, oy).attr({
            stroke: color[this.rk]
        });
        this.route3 = toPath(ex, oy, ex, ky).attr({
            stroke: color[this.rk]
        });
        this.route4 = toPath(ex + 5, ky, ex, ey).attr({
            stroke: color[this.rk]
        });
        this.route5 = toPath(ex - 5, ky, ex, ey).attr({
            stroke: color[this.rk]
        });
        this.route6 = toPath(ex - 5, ky, ex + 5, ky).attr({
            stroke: color[this.rk]
        });
    };

    function toPath(sx, sy, ex, ey) {
        return r.path("M" + sx + " " + sy + " L" + ex + " " + ey);
    }

    r.rect(5, 5, 85, 70).attr({
        fill: "white",
        stroke: "navy"
    });
    var info;
    for (x = 0; x < 5; x++) {
        info = r.text(45, 12 + 14 * x, type2[x]).attr({
            stroke: color[x]
        });
        info.attr("font-size", "12px");
    }

};
