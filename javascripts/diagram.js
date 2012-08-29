

var drawModels=function(myModels) {
    var w = 1200,
        h = 800,
        r = Raphael(0, 0, w, h),
        say = 0,
        say2, rad, sayici = 0,
        sayici2 = 0,
        tip = [["CreatedType", 0],
               ["Event", 1],
               ["Friend", 2],
               ["Model", 3],
               ["MyModel", 4],
               ["User", 5]],
        tip2 = ["ManyToMany", "OneToMany", "ManyToOne", "OneToOne", "Extend"],
        renk = ["blue", "fuchsia", "black", "lime", "red"],
        yerdiz = new Array(),
        kutu = new Array(),
        diox = new Array(),
        dioy = new Array(),
        yerdiz2 = new Array(),
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
                if (this.yaz == 2) {
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
        rad = Math.PI * say / 3;
        say2 = 2;
        kutu[say] = new Model(330 + 300 * Math.cos(rad), 330 + 300 * Math.sin(rad));
        kutu[say].cer = 1;
        kutu[say].yaz = 2;
        kutu[say].map = 0;
        kutu[say].map2 = 0;
        if (item.isMappedSuperClass == true) {
            kutu[say].map2 = 1;
            kutu[say].addMember("<<MappedSuperclass>>");
            kutu[say].cer = 2;
            kutu[say].map = 1;
        }
        for (i = 0; i < 6; i++) {
            if (item.superClassName == tip[i][0]) {
                yerdiz2[sayici2] = [say, i, 4];
                sayici2++;
            }
        }

        kutu[say].addMember(item.name);
        kutu[say].yaz = 1;
        $.each(item.members, function(index, member) {
            kutu[say].addMember(member.name + " : " + member.type);
            if (member.association != undefined) {
                for (i = 0; i < 6; i++) {
                    if (member.association.targetModelName == tip[i][0]) {
                        for (x = 0; x < 4; x++) {
                            if (member.association.type == tip2[x]) {
                                if (kutu[say].cer == 2) yerdiz[sayici] = [say2 + 1, say, i, x];
                                else yerdiz[sayici] = [say2, say, i, x];
                            }
                        }
                    }
                }
                sayici++;
            }
            say2++;
        });
        say++;
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
        bag();
        bag2();
    };

    function up() {
        for (var index in this.group) {
            var item = this.group[index];
            item.attr({
                opacity: 1
            });
        }
    };

    function bag() {
        for (i = 0; i < sayici; i++) {
            var kt1 = kutu[dizi[i].md1].r.getBBox(),
                kt2 = kutu[dizi[i].md2].r.getBBox(),
                bx, by, ox, sx, sy, kx;
            by = kt1.y + dizi[i].uye1 * 20;
            sy = kt2.y + 3 + dizi[i].uye2 * 4;
            if (kt1.x < kt2.x) {
                bx = kt1.x + kt1.width;
                if (kt1.x + kt1.width < kt2.x) {
                    ox = (kt1.x + kt1.width + kt2.x) / 2;
                    sx = kt2.x;
                }
                else {
                    sx = kt2.x + kt2.width;
                    if (sx > bx) ox = sx + 20;
                    else ox = bx + 20;
                }
            }
            else {
                bx = kt1.x;
                if (bx > kt2.x + kt2.width) {
                    ox = (kt1.x + kt2.x + kt2.width) / 2;
                    sx = kt2.x + kt2.width;
                }
                else {
                    ox = kt2.x - 20;
                    sx = kt2.x;
                }
            }
            for (j = 0; j < sayici; j++)
            if (diox[j] == ox && j != i) {
                if (bx > sx) {
                    if (ox < sx || sx < ox - 5 || bx < ox - 5) ox -= 5;
                }
                else {
                    if (bx == sx || bx < ox - 5 || sx < ox - 5) ox -= 5;
                }
            }
            diox[i] = ox;
            if (ox < sx) kx = sx - 10;
            else kx = sx + 10;
            dizi[i].yol1.remove();
            dizi[i].yol2.remove();
            dizi[i].yol3.remove();
            dizi[i].yol4.remove();
            dizi[i].yol5.remove();
            dizi[i].yol6.remove();
            dizi[i].yol1 = Cizgi(bx, by, ox, by).attr({
                stroke: renk[dizi[i].rk]
            });
            dizi[i].yol2 = Cizgi(ox, by, ox, sy).attr({
                stroke: renk[dizi[i].rk]
            });
            dizi[i].yol3 = Cizgi(ox, sy, kx, sy).attr({
                stroke: renk[dizi[i].rk]
            });
            dizi[i].yol4 = Cizgi(kx, sy + 5, sx, sy).attr({
                stroke: renk[dizi[i].rk]
            });
            dizi[i].yol5 = Cizgi(kx, sy - 5, sx, sy).attr({
                stroke: renk[dizi[i].rk]
            });
            dizi[i].yol6 = Cizgi(kx, sy - 5, kx, sy + 5).attr({
                stroke: renk[dizi[i].rk]
            });
        }
    };

    function bag2() {
        for (i = 0; i < sayici; i++) {
            var kt1 = kutu[dizi2[i].md1].r.getBBox(),
                kt2 = kutu[dizi2[i].md2].r.getBBox(),
                bx, by, oy, sx, sy, ky;
            by = kt1.y;
            bx = kt1.x + kt1.width / 2;
            sx = kt2.x + 10 * dizi2[i].uye2;
            if (kt1.y > kt2.y) {
                if (kt1.y > kt2.y + kt2.height) {
                    oy = (kt1.y + kt2.height + kt2.y) / 2;
                    sy = kt2.y + kt2.height;
                    ky = sy + 10;
                }
                else {
                    sy = kt2.y;
                    ky = sy - 10;
                    oy = sy - 20;
                }
            }
            else {
                sy = kt2.y;
                ky = sy - 10;
                if (kt1.y + kt1.height < kt2.y) {
                    by += kt1.height;
                    oy = (kt1.y + kt1.height + kt2.y) / 2;
                }
                else oy = kt1.y - 20;
            }
            for (j = 0; j < sayici2; j++)
            if (dioy[j] == oy && i != j && oy - 8 > sy) oy -= 8;
            dioy[i] = oy;
            dizi2[i].yol1.remove();
            dizi2[i].yol2.remove();
            dizi2[i].yol3.remove();
            dizi2[i].yol4.remove();
            dizi2[i].yol5.remove();
            dizi2[i].yol6.remove();
            dizi2[i].yol1 = Cizgi(bx, by, bx, oy).attr({
                stroke: renk[dizi2[i].rk]
            });
            dizi2[i].yol2 = Cizgi(bx, oy, sx, oy).attr({
                stroke: renk[dizi2[i].rk]
            });
            dizi2[i].yol3 = Cizgi(sx, oy, sx, ky).attr({
                stroke: renk[dizi2[i].rk]
            });
            dizi2[i].yol4 = Cizgi(sx + 5, ky, sx, sy).attr({
                stroke: renk[dizi2[i].rk]
            });
            dizi2[i].yol5 = Cizgi(sx - 5, ky, sx, sy).attr({
                stroke: renk[dizi2[i].rk]
            });
            dizi2[i].yol6 = Cizgi(sx - 5, ky, sx + 5, ky).attr({
                stroke: renk[dizi2[i].rk]
            });
        }
    };

    var a, b, c, d, e, dizi = new Array(),
        dizi2 = new Array();

    for (x = 0; x < sayici; x++) {
        a = yerdiz[x][0];
        b = (1 + Math.round(Math.random() * 11)) % 8;
        c = yerdiz[x][1];
        d = yerdiz[x][2];
        e = yerdiz[x][3];
        dizi[x] = new ciz(a, b, c, d, e, x);
    }
    for (x = 0; x < sayici2; x++) {
        b = (1 + Math.round(Math.random() * 15));
        c = yerdiz2[x][0];
        d = yerdiz2[x][1];
        e = yerdiz2[x][2];
        dizi2[x] = new ciz2(b, c, d, e, x);
    }

    function ciz(a, b, c, d, e, limit) {
        this.uye1 = a, this.uye2 = b, this.md1 = c, this.md2 = d, this.rk = e;
        var kt1 = kutu[this.md1].r.getBBox(),
            kt2 = kutu[this.md2].r.getBBox(),
            bx, by, ox, sx, sy, kx;
        by = kt1.y + this.uye1 * 20;
        sy = kt2.y + 3 + this.uye2 * 4;
        if (kt1.x < kt2.x) {
            bx = kt1.x + kt1.width;
            if (kt1.x + kt1.width < kt2.x) {
                ox = (kt1.x + kt1.width + kt2.x) / 2;
                sx = kt2.x;
            }
            else {
                sx = kt2.x + kt2.width;
                if (sx > bx) ox = sx + 20;
                else ox = bx + 20;
            }
        }
        else {
            bx = kt1.x;
            if (bx > kt2.x + kt2.width) {
                ox = (kt1.x + kt2.x + kt2.width) / 2;
                sx = kt2.x + kt2.width;
            }
            else {
                ox = kt2.x - 20;
                sx = kt2.x;
            }
        }
        for (i = 0; i < limit; i++)
        if (diox[i] == ox) {
            if (bx > sx) {
                if (ox < sx || sx < ox - 5 || bx < ox - 5) ox -= 5;
            }
            else {
                if (bx == sx || bx < ox - 5 || sx < ox - 5) ox -= 5;
            }
        }
        diox[limit] = ox;
        if (ox < sx) kx = sx - 10;
        else kx = sx + 10;
        this.yol1 = Cizgi(bx, by, ox, by).attr({
            stroke: renk[this.rk]
        });
        this.yol2 = Cizgi(ox, by, ox, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol3 = Cizgi(ox, sy, kx, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol4 = Cizgi(kx, sy + 5, sx, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol5 = Cizgi(kx, sy - 5, sx, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol6 = Cizgi(kx, sy - 5, kx, sy + 5).attr({
            stroke: renk[this.rk]
        });
    };

    function ciz2(b, c, d, e, limit) {
        this.uye2 = b, this.md1 = c, this.md2 = d, this.rk = e;
        var kt1 = kutu[this.md1].r.getBBox(),
            kt2 = kutu[this.md2].r.getBBox(),
            bx, by, oy, sx, sy, ky;
        by = kt1.y;
        bx = kt1.x + kt1.width / 2;
        sx = kt2.x + 10 * this.uye2;
        if (kt1.y > kt2.y) {
            if (kt1.y > kt2.y + kt2.height) {
                oy = (kt1.y + kt2.height + kt2.y) / 2;
                sy = kt2.y + kt2.height;
                ky = sy + 10;
            }
            else {
                sy = kt2.y;
                ky = sy - 10;
                oy = sy - 20;
            }
        }
        else {
            sy = kt2.y;
            ky = sy - 10;
            if (kt1.y + kt1.height < kt2.y) {
                by += kt1.height;
                oy = (kt1.y + kt1.height + kt2.y) / 2;
            }
            else oy = kt1.y - 20;
        }
        for (i = 0; i < limit; i++)
        if (dioy[i] == oy && oy - 8 > sy) oy -= 8;
        dioy[limit] = oy;
        this.yol1 = Cizgi(bx, by, bx, oy).attr({
            stroke: renk[this.rk]
        });
        this.yol2 = Cizgi(bx, oy, sx, oy).attr({
            stroke: renk[this.rk]
        });
        this.yol3 = Cizgi(sx, oy, sx, ky).attr({
            stroke: renk[this.rk]
        });
        this.yol4 = Cizgi(sx + 5, ky, sx, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol5 = Cizgi(sx - 5, ky, sx, sy).attr({
            stroke: renk[this.rk]
        });
        this.yol6 = Cizgi(sx - 5, ky, sx + 5, ky).attr({
            stroke: renk[this.rk]
        });
    };

    function Cizgi(BX, BY, SX, SY) {
        return r.path("M" + BX + " " + BY + " L" + SX + " " + SY);
    }

    r.rect(5, 5, 85, 70).attr({
        fill: "white",
        stroke: "navy"
    });
    var bil;
    for (x = 0; x < 5; x++) {
        bil = r.text(45, 12 + 14 * x, tip2[x]).attr({
            stroke: renk[x]
        });
        bil.attr("font-size", "12px");
    }

};
