function $qn() {
    this.plus = $plus;
    this.times = $times;
    this.minus = $minus;
    this.divide = $divide;
    this.div = $divide;
    this.max = $max;
    this.min = $min;
    this.random = $random;
    this.floor = $floor;
    this.calc = $calc;
    this.pi = $pi;
    this.pow = $pow;
    this.power = $pow;
    this.abs = $abs;
    this.absoluteValue = $abs;
    this.sin = $sin;
    this.sine = $sin;
    this.fact = $fact;
    this.factorial = $fact;
    this.int = $int;
    this.mod = $mod;
    this.e = $e;
    this.euler = $e;
    this.sqrt = $sqrt;
    this.squareRoot = $sqrt;
    this.cos = $cos;
    this.cosine = $cos;
    this.tan = $tan;
    this.tangent = $tan;
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
        else if (ppa[i]) pc[i] = Number(ppa[i]);
        else pc[i] = Number(ppb[i]);
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
    return $format(pc.join(""));
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
    ret = ret.replace(".", "").split("");
    while (ret.length - fh[2] - fh[3] < 0) ret.unshift("0");
    ret.splice(ret.length - fh[2] - fh[3], 0, ".");
    ret = ret.join("");
    if (fh[0] != fh[1]) ret = "-" + ret;
    return $format(ret);
}

function $minus(ma, mb) {
    if (ma.indexOf("-") != -1 && mb.indexOf("-") != -1) return $minus(mb.replace("-", ""), ma.replace("-", ""));
    if (ma.indexOf("-") != -1 && mb.indexOf("-") == -1) return "-" + $plus(mb, ma.replace("-", ""));
    if (ma.indexOf("-") == -1 && mb.indexOf("-") != -1) return $plus(ma, mb.replace("-", ""));
    if (ma.indexOf(".") == -1) ma = ma + ".";
    if (mb.indexOf(".") == -1) mb = mb + ".";
    var mma = $max(ma, mb).split("");
    var mmb = $min(ma, mb).split("");
    if (mma.join("") == ma) var ji = "";
    else ji = "-";
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
    return $format(ji + pc.join(""));
}

var $cheb = (valb) => valb >= 0 || valb == ".";

function $divide(da, db) {
    var result = "", cou = 0;
    if (da.indexOf(".") == -1) da = da + ".";
    if (db.indexOf(".") == -1) db = db + ".";
    var fu = (da.indexOf("-") == -1) ^ (db.indexOf("-") == -1)
    if (fu) fu = "-";
    else fu = "";
    da = da.replace("-", "");
    db = db.replace("-", "");
    var a = "1";
    for (var k of db.split(".")[1]) a = a + "0";
    da = $times(da, a);
    db = db.replace(".", "");
    var yushu = "";
    if (arguments[2]) var jd = arguments[2];
    else jd = 30;
    for (var t = 0; t < jd; t++) {
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
            cou++;
            yushu = $format(yushu);
        }
        result = result + cou;
    }
    return $format(fu + result);
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
    if (a.split(".")[0].length > b.split(".")[0].length && fs) return fj + b;
    else if (a.split(".")[0].length > b.split(".")[0].length && !fs) return fj + a;
    else if (a.split(".")[0].length < b.split(".")[0].length && fs) return fj + a;
    else if (a.split(".")[0].length < b.split(".")[0].length && !fs) return fj + b;
    else {
        var z = ""
        if (a.length > b.length) {
            for (var i = 0; i < a.length - b.length; i++) z += "0";
            b = b + z;
        } else if (a.length < b.length) {
            for (i = 0; i < b.length - a.length; i++) z += "0";
            a = a + z;
        }
        for (var k = 0; k < a.length; k++) {
            if (a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k]) && fs) return $format(fj + b);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k]) && !fs) return $format(fj + a);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k]) && fs) return $format(fj + a);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k]) && !fs) return $format(fj + b);
        }
        return $format(fj + a);
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
    if (a.split(".")[0].length > b.split(".")[0].length && fs) return fj + a;
    else if (a.split(".")[0].length > b.split(".")[0].length && !fs) return fj + b;
    else if (a.split(".")[0].length < b.split(".")[0].length && fs) return fj + b;
    else if (a.split(".")[0].length < b.split(".")[0].length && !fs) return fj + a;
    else {
        var z = ""
        if (a.length > b.length) {
            for (var i = 0; i < a.length - b.length; i++) {
                z += "0";
            }
            b = b + z;
        } else if (a.length < b.length) {
            for (i = 0; i < b.length - a.length; i++) {
                z += "0";
            }
            a = a + z;
        }
        for (var k = 0; k < a.length; k++) {
            if (a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k]) && fs) return $format(fj + a);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) > Number(b.split("")[k]) && !fs) return $format(fj + b);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k]) && fs) return $format(fj + b);
            else if (a.split("")[k] != "." && Number(a.split("")[k]) < Number(b.split("")[k]) && !fs) return $format(fj + a);
        }
        return $format(fj + a);
    }
}

function $format(fa) {
    if (fa.indexOf("-") != -1) var fj = "-";
    else fj = "";
    fa = fa.replace("-", "");
    if (fa.indexOf(".") == -1) fa = fa + ".";
    while (fa[0] == "0" && fa[1] != ".") {
        fa = fa.split("");
        fa[0] = "";
        fa = fa.join("");
    }
    while (fa[fa.length - 1] == "0" && fa.indexOf(".") != -1) {
        fa = fa.split("");
        fa[fa.length - 1] = "";
        fa = fa.join("");
    }
    fa = fa.replace("-.", "-0.");
    if (fa.indexOf(".") == 0) fa = "0" + fa;
    if (fa == "-0" || fa == "-0.") fa = "0.";
    return fj + fa;
}

function $floor(fn) {
    if (fn.indexOf(".") != -1) {
        fn = fn.split(".");
        if (fn.join("").indexOf("-") == -1) fn[1] = "";
        else {
            fn[1] = "";
            fn[0] = "-" + $plus(fn[0].replace("-", ""), "1.")
        }
        fn = fn.join("");
    }
    return fn;
}

function $random(ra, rb) {
    var rc = "";
    for (var i = 0; i < 30; i++) {
        rc = rc + $floor($times($divide(window.crypto.getRandomValues(new Uint32Array(1))[0].toString(), "4294967296."), "10"))
    }
    return $plus($floor($times($divide(window.crypto.getRandomValues(new Uint32Array(1))[0].toString(), "4294967296."), $minus(rb, ra))), ra) + rc;
}

function $pow(oa, ob) {
    if (ob.indexOf(".") == -1) ob = ob + ".";
    var ooa = "1";
    for (var y = "1."; $max(y, ob) == ob; y = $plus(y, "1.")) ooa = $times(ooa, oa);
    for (var z = "-1."; $max(z, ob) == z; z = $minus(z, "1.")) ooa = $divide(ooa, oa);
    if (ob == "0") return "1.";
    return $format(ooa);
}

function $pi(pd) {
    var pi = "0.";
    var frax = $divide("1", $pow("2", "6"));
    for (var n = 0; n < pd; n++) {
        var fraa = "-" + $divide($pow("2", "5"), $plus($times("4", n.toString()), "1"));
        var frab = "-" + $divide("1", $plus($times("4", n.toString()), "3"));
        var frac = $divide($pow("2", "8"), $plus($times("10", n.toString()), "1"));
        var frad = "-" + $divide($pow("2", "6"), $plus($times("10", n.toString()), "3"));
        var frae = "-" + $divide($pow("2", "2"), $plus($times("10", n.toString()), "5"));
        var fraf = "-" + $divide($pow("2", "2"), $plus($times("10", n.toString()), "7"));
        var frag = $divide("1", $plus($times("10", n.toString()), "9"));
        var fray = $divide($pow("-1", n.toString()), $pow("2", $times("10", n.toString())));
        var fraz = $plus($plus($plus(fraa, frab), $plus(frac, frad)), $plus($plus(frae, fraf), frag));
        pi = $plus(pi, $times(fray, fraz));
    }
    return $times(pi, frax);
}

function $abs(aa) {
    return aa.replace("-", "");
}

function $fact(fa) {
    if (fa.indexOf(".") == -1) fa = fa + ".";
    var result = "1.";
    for (var g = "1."; $max(g, fa) == fa; g = $plus(g, "1.")) result = $times(result, g);
    return result;
}

function $sin(sa) {
    sa = $mod(sa, $pi(30));
    var result = "0.";
    for (var k = "1."; $max(k, "30.") == "30."; k = $plus(k, "1.")) {
        var ls = $divide($times($pow("-1", $minus(k, "1.")), $pow(sa, $minus($times("2", k), "1"))), $fact($minus($times("2", k), "1")));
        ls = $format(ls);
        result = $plus(result, ls);
    }
    return result;
}

function $int(ia) {
    if (ia.indexOf(".") == -1) ia = ia + ".";
    ia = ia.split(".")
    ia[1] = "";
    ia = ia.join("");
    return ia;
}

function $mod(oa, ob) {
    return $format($minus(oa, $times($int($divide(oa, ob)), ob)));
}

function $e(ea) {
    var res = "0.";
    for (let i = "0."; $max(i, ea) == $format(ea); i = $plus(i, "1.")) res = $plus(res, $divide("1.", $fact(i)));
    return res;
}

function $sqrt(sa) {
    var re = "1.";
    for (let i = 0; i < 10; i++) re = $divide($plus(re, $divide(sa, re, 90)), "2.");
    return re;
}

function $cos(ca) {
    return $sqrt($minus("1.", $pow($sin(ca), "2.")));
}

function $tan(ta) {
    var alpha = $times(ta, "2.");
    return $divide($minus("1.", $cos(alpha)), $sin(alpha), 90);
}

function $asin(aa){

    return;
}