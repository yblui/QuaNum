function $plus(pa, pb) {
    if (pa.indexOf(".") == -1) pa = pa + ".";
    if (pb.indexOf(".") == -1) pb = pb + ".";
    pa = pa.split("");
    pb = pb.split("");
    if (pa.join("").split(".")[0].length > pb.join("").split(".")[0].length) {
        for (var i = 0; i < (pa.join("").split(".")[0].length - pb.join("").split(".")[0].length); i++) {
            pb.unshift("0");
        }
    } else {
        for (i = 0; i < (pb.join("").split(".")[0] - pa.join("").split(".")[0]); i++) {
            pa.unshift("0");
        }
    }
    var pc = [];
    for (i = 0; i < Math.max(pa.length, pb.length); i++) {
        if (pa[i] && pb[i] && pa[i] != ".") pc[i] = Number(pa[i]) + Number(pb[i])
        else if (pa[i] == ".") pc[i] = "."
        else pc[i] = Number(pa[i]) || Number(pb[i]);
    }
    while (!pc.every($check)) {
        for (i = 0; i < pc.length; i++) {
            if (pc[i] >= 10 && i == 0) {
                pc.unshift(1);
                pc[1] -= 10;
            } else if (pc[i] >= 10 && pc[i - 1] != ".") {
                pc[i] -= 10;
                pc[i - 1] += 1;
            } else if(pc[i] >= 10 && pc[i - 1] == ".") {
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
