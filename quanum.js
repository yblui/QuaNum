function $qn() {
    this.plus = $plus;
    this.times = $times;
    this.minus = $minus;
    this.divide = $divide;
    this.max = $max;
    this.min = $min;
    this.random = $random;
    this.calc = $calc;
}

var qn = new $qn();

function $plus(pa, pb) {
    if (pa.indexOf("-") == -1 && pb.indexOf("-") != -1) return $minus(pa, pb.replace("-", ""));
    if (pa.indexOf("-") != -1 && pb.indexOf("-") == -1) return $minus(pb, pa.replace("-", ""));
    if (pa.indexOf(".") == -1) pa = pa + ".";
    if (pb.indexOf(".") == -1) pb = pb + ".";
    var ppa = pa.replace("-", "");
    var ppb = pb.replace("-", "");
    ppa = ppa.split("");
    ppb = ppb.split("");
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
    if (pa.indexOf("-") != -1) return "-" + pc.join("");
    return pc.join("");
}

var $check = (val) => val < 10 || val == ".";

function $times(ta, tb) {
    var tta = ta, ttb = tb;
    if (ta.indexOf(".") == -1) tta = ta + ".";
    if (tb.indexOf(".") == -1) ttb = tb + ".";
    var fh = [tta.indexOf("-") == -1, ttb.indexOf("-") == -1, tta.split(".")[1].length, ttb.split(".")[1].length];
    tta = ta.replace(/[\-\.]/g, "");
    ttb = tb.replace(/[\-\.]/g, "");
    tta = tta.split("").reverse();
    ttb = ttb.split("").reverse();
    var ret = "0";
    for (var i = 0; i < tta.length; i++) {
        for (var j = 0; j < ttb.length; j++) {
            var a = "";
            for (var k = 0; k < i + j; k++) a = a + "0";
            ret = $plus(ret, Number(tta[i]) * Number(ttb[j]) + a);
        }
    }
    if (fh[0] != fh[1]) ret = "-" + ret;
    ret = ret.replace(".", "").split("");
    ret.splice(ret.length - fh[2] - fh[3], 0, ".");
    ret = ret.join("");
    return ret;
}

function $minus(ma, mb) {
    if (ma.indexOf(".") == -1) ma = ma + ".";
    if (mb.indexOf(".") == -1) mb = mb + ".";
    var mma = $max(ma, mb).split("");
    var mmb = $min(ma, mb).split("");
    if (mma.join("").split(".")[0].length > mmb.join("").split(".")[0].length) {
        var x = mma.join("").split(".")[0].length - mmb.join("").split(".")[0].length;
        for (var i = 0; i < x; i++) mmb.unshift("0");
    } else {
        x = mmb.join("").split(".")[0].length - mma.join("").split(".")[0].length;
        for (i = 0; i < x; i++) mma.unshift("0");
    }
    if (mma.join("").split(".")[1].length > mmb.join("").split(".")[1].length) {
        x = mma.join("").split(".")[1].length - mmb.join("").split(".")[1].length;
        for (var j = 0; j < x; j++) mmb.push("0");
    } else {
        x = mmb.join("").split(".")[1].length - mma.join("").split(".")[1].length;
        for (j = 0; j < x; j++) mma.push("0");
    }
    var pc = [];
    for (i = 0; i < mma.length; i++) {
        if (mma[i] != ".") pc[i] = Number(mma[i]) - Number(mmb[i]);
        else if (mma[i] == ".") pc[i] = ".";
    }
    while (!pc.every($cheb)) {
        for (i = 0; i < pc.length; i++) {
            if (pc[i] < 0 && pc[i - 1] != ".") {
                pc[i] += 10;
                pc[i - 1] -= 1;
            } else if (pc[i] < 0 && pc[i - 1] == ".") {
                pc[i] += 10;
                pc[i - 2] -= 1;
            }
        }
    }
    if (mma == ma) return pc.join("");
    else return "-" + pc.join("");
}

var $cheb = (valb) => valb >= 0 || valb == ".";

function $divide(da, db) {
    var result = "", cou = 0;
    if (da.indexOf(".") == -1) da = da + ".";
    if (db.indexOf(".") == -1) db = db + ".";
    var a = "1";
    for (var k of db.split(".")[1]) a = a + "0";
    da = $times(da, a);
    db = db.replace(".", "");
    var yushu = "";
    for (var t = 0; t < 30; t++) {
        cou = 0;
        if (da[t] && da[t] != ".") yushu = yushu + da[t];
        else if (da[t] && da[t] == ".") {
            result = result + ".";
            continue;
        }
        else yushu = yushu + "0";
        yushu = yushu.replace(".", "") + "."
        yushu = $format(yushu);
        while ($max(yushu, db) == yushu) {
            yushu = $minus(yushu, db);
            cou++
            yushu = $format(yushu);
        }
        result = result + cou;
    }
    result = $format(result);
    return result;
}

function $calc(ca) {
    return;
}

function $max(a, b) {
    var fs = false;
    var fj = "";
    if (a.indexOf(".") == -1) a = a + ".";
    if (b.indexOf(".") == -1) b = b + ".";
    a = $format(a);
    b = $format(b);
    if (a.indexOf("-") != -1 && b.indexOf("-") == -1) return b;
    else if (a.indexOf("-") == -1 && b.indexOf("-") != -1) return a;
    if (a.indexOf("-") != -1) {
        fs = true;
        fj = "-";
    }
    a = a.replace("-", "");
    b = b.replace("-", "");
    if ((a.split(".")[0].length > b.split(".")[0].length) ^ fs) return fj + a;
    else if ((a.split(".")[0].length < b.split(".")[0].length) ^ fs) return fj + b;
    else {
        for (var k = 0; k < a.length; k++) {
            if ((a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k])) ^ fs) return fj + a;
            else if ((a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k])) ^ fs) return fj + b;
        }
        return fj + a;
    }
}

function $min(a, b) {
    var fs = false;
    var fj = "";
    if (a.indexOf(".") == -1) a = a + ".";
    if (b.indexOf(".") == -1) b = b + ".";
    a = $format(a);
    b = $format(b);
    if (a.indexOf("-") != -1 && b.indexOf("-") == -1) return a;
    else if (a.indexOf("-") == -1 && b.indexOf("-") != -1) return b;
    if (a.indexOf("-") != -1) {
        fs = true;
        fj = "-";
    }
    a = a.replace("-", "");
    b = b.replace("-", "");
    if ((a.split(".")[0].length > b.split(".")[0].length) ^ fs) return fj + b;
    else if ((a.split(".")[0].length < b.split(".")[0].length) ^ fs) return fj + a;
    else {
        for (var k = 0; k < a.length; k++) {
            if ((a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k])) ^ fs) return fj + b;
            else if ((a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k])) ^ fs) return fj + a;
        }
        return fj + a;
    }
}

function $format(fa) {
    while (fa[0] == "0" && fa[1] != ".") {
        fa = fa.split("");
        fa[0] = "";
        fa = fa.join("");
    }
    return fa;
}

function $random(ra, rb) {
    return;
}