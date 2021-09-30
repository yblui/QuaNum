function $plus(pa, pb) {
    if (pa.indexOf(".") == -1) pa = pa + ".";
    if (pb.indexOf(".") == -1) pb = pb + ".";
    var ppa = pa.split("");
    var ppb = pb.split("");
    if (ppa.join("").split(".")[0].length > ppb.join("").split(".")[0].length) {
        var x = ppa.join("").split(".")[0].length - ppb.join("").split(".")[0].length;
        for (var i = 0; i < x; i++) ppb.unshift("0");
    } else {
        x = ppb.join("").split(".")[0].length - ppa.join("").split(".")[0].length;
        for (i = 0; i < x; i++) ppa.unshift("0");
    }
    var pc = [];
    for (i = 0; i < Math.max(ppa.length, ppb.length); i++) {
        if (ppa[i] && ppb[i] && ppa[i] != ".") pc[i] = Number(ppa[i]) + Number(ppb[i]);
        else if (ppa[i] == ".") pc[i] = ".";
        else pc[i] = Number(ppa[i]) || Number(ppb[i]);
    }
    while (!pc.every($check)) {
        for (i = 0; i < pc.length; i++) {
            if (pc[i] >= 10 && i == 0) {
                pc.unshift(1);
                pc[1] -= 10;
            } else if (pc[i] >= 10 && pc[i - 1] != ".") {
                pc[i] -= 10;
                pc[i - 1] += 1;
            } else if (pc[i] >= 10 && pc[i - 1] == ".") {
                pc[i] -= 10;
                pc[i - 2] += 1;
            }
        }
    }
    return pc.join("");
}

function $check(val) {
    return val < 10 || val == ".";
}

function $times(ta, tb) {
    var tta = ta.replace(/[\-\.]/g, "");
    var ttb = tb.replace(/[\-\.]/g, "");
    tta = tta.split("").reverse();
    ttb = ttb.split("").reverse();
    var ret = "0";
    for (var i = 0; i < tta.length; i++) {
        for (var j = 0; j < ttb.length; j++) {
            var a = "";
            for (var k = 0; k < i + j; k++) {
                a = a + "0";
            }
            ret = $plus(ret, Number(tta[i]) * Number(ttb[j]) + a);
        }
    }
    return ret;
}