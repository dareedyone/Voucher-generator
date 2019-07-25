"use strict";
var ad;
let nt = "mtn";
let st;
let cg;
//diference between the converted seconds and counts 
let diff;
window.addEventListener("load", setLoc);
grt.addEventListener("click", generate);

//create audio
const ms = () => {
   ad = document.createElement('audio');
    if (ad.canPlayType('audio/mpeg')) {
        ad.setAttribute('src', 'audio/yanniOne.mp3');
    } else {
        ad.setAttribute('src', 'audio/yanniOne.mp4')
    }
    document.body.appendChild(ad);

}
window.onload = () => ms();

ms.onended = () => ad.play(); //loops the audio

class Network {
    constructor(type, tariff1, tariff2) {
        (this.type = type), (this.balance = 0);
        this.cards = { "#100": [], "#200": [], "#500": [], "#1000": [], used: [] };
        this.tariff = [tariff1, tariff2];
    }
}

var One = new Network("Mtn", "Mtn Zone", "Mtn Pulse");
var Two = new Network("Glo", "Glo Biz", "Glo Cred");

function setLoc() {
    if (!localStorage.mtn || !localStorage.glo) {
        localStorage.setItem("mtn", JSON.stringify(One));
        localStorage.setItem("glo", JSON.stringify(Two));
    }
}

function generate() {
    let final = `Your card value is <b>${cv.value}</b> on <b>${
        nn.value
        }</b> voucher service. <br> Here are your <b>${nc.value}</b> cards : <br>`;
    if (nc.value > 0 && cv.value && nn.value) {
        let n = nc.value;
        let i;
        let j;
        final += "<ol>";
        for (i = 1; i <= n; i++) {
            final += "<li>";
            for (j = 1; j <= 16; j++) {
                if (j == 4 || j == 8 || j == 12) {
                    final += Math.floor(Math.random() * 10) + "-";
                } else if (j == 16) {
                    final += Math.floor(Math.random() * 10) + "</li>";
                } else {
                    final += Math.floor(Math.random() * 10);
                }
            }
        }
        final += "</ol>";

        let fclass = final
            .match(/\d{4}-\d{4}-\d{4}-\d{4}/g)
            .toString()
            .replace(/-/g, "")
            .split(",");
        let temp;
        let tpush;

        if (nn.value == "Mtn") {
            temp = JSON.parse(localStorage.getItem("mtn"));

            if (cv.value == "#100") {
                fclass.every(a => temp.cards["#100"].push(a));
            } else if (cv.value == "#200") {
                fclass.every(a => temp.cards["#200"].push(a));
            } else if (cv.value == "#500") {
                fclass.every(a => temp.cards["#500"].push(a));
            } else if (cv.value == "#1000") {
                fclass.every(a => temp.cards["#1000"].push(a));
            }

            localStorage.mtn = JSON.stringify(temp);
        } else if (nn.value == "Glo") {
            temp = JSON.parse(localStorage.getItem("glo"));
            if (cv.value == "#100") {
                fclass.every(a => temp.cards["#100"].push(a));
            } else if (cv.value == "#200") {
                fclass.every(a => temp.cards["#200"].push(a));
            } else if (cv.value == "#500") {
                fclass.every(a => temp.cards["#500"].push(a));
            } else if (cv.value == "#1000") {
                fclass.every(a => temp.cards["#1000"].push(a));
            }

            localStorage.glo = JSON.stringify(temp);
        }

        dp.innerHTML = final;
    } else {
        alert("Input a valid input");
    }
}

function getNo(n = 0) {

    fdp.style.paddingTop = "30%";
    fdp.style.textAlign = "right";
    if (fdp.value.match(/[a-z]/gi)) {
        fdp.value = n;
    } else if (
        /\d/g.test(fdp.value) ||
        fdp.value == "" ||
        fdp.value.match(/\*$/) ||
        fdp.value.match(/\#$/)
    ) {
        fdp.value += n;
    }
}

function clr() {
    if (!fdp.value.match(/[a-z]/gi)) {
        let n = fdp.value;
        let res = n.slice(0, n.length - 1);
        fdp.value = res;
    }
}

function swtch() {
    if (ntw.innerHTML == "Mtn|Glo") {
        ntw.innerHTML = "Glo|Mtn";
        nt = "glo";
        fdp.value = "";
        fdp.style.paddingTop = "30%";
        fdp.style.textAlign = "right";
        cg = true;
    } else {
        ntw.innerHTML = "Mtn|Glo";
        nt = "mtn";
        fdp.value = "";
        fdp.style.paddingTop = "30%";
        fdp.style.textAlign = "right";
        cg = true;
    }
}

function green() {
    let temp;

    function cbm() {
        fdp.style.paddingTop = "20px";
        fdp.style.textAlign = "center";
        temp = JSON.parse(localStorage.getItem("mtn"));
        cg = false;
        fdp.value = `${temp.tariff[0]} bal: N${
            temp.balance
            }..MTN Leading the delivery of a bold, new digital world. www.mtn.com`;
    }

    function cbg() {
        fdp.style.paddingTop = "20px";
        fdp.style.textAlign = "center";
        temp = JSON.parse(localStorage.getItem("glo"));
        cg = false;
        fdp.value = `${temp.tariff[0]} bal: N${
            temp.balance
            }..Glo with pride leading the new era, We got you covered. www.glo.com`;
    }

    if (fdp.value == "*556#") {
        cbm();
    } else if (fdp.value == "#124#") {
        cbg();
    } else if (fdp.value.match(/\*555\*\d{16}\#/)) {
        let i;
        let b;
        let c;
        let bal;
        fdp.style.paddingTop = "20px";
        fdp.style.textAlign = "center";
        let m = fdp.value.match(/\d{16}/)[0];
        temp = JSON.parse(localStorage.getItem("mtn"));

        for (b in temp.cards) {
            for (i = 0; i < temp.cards[b].length; i++) {
                if (temp.cards["used"][i] !== m && temp.cards[b][i] == m) {
                    bal = b.match(/\d+/)[0];
                    temp.balance = (Number(temp.balance) + Number(bal)).toFixed(2);
                    c = temp.cards[b].splice(i, 1).toString();
                    temp.cards["used"].push(c);
                    localStorage.mtn = JSON.stringify(temp);
                    return cbm();
                } else if (temp.cards["used"][i] == m) {
                    fdp.value = `Dear Mtn user, this card has already been used by you !`;
                } else {
                    fdp.value = `Dear Mtn user, this voucher does not exist !`;
                }
            }
        }
    } else if (fdp.value.match(/\*123\*\d{16}\#/)) {
        let i;
        let b;
        let c;
        let bal;
        fdp.style.paddingTop = "20px";
        fdp.style.textAlign = "center";
        let m = fdp.value.match(/\d{16}/)[0];
        temp = JSON.parse(localStorage.getItem("glo"));

        for (b in temp.cards) {
            for (i = 0; i < temp.cards[b].length; i++) {
                if (temp.cards["used"][i] !== m && temp.cards[b][i] == m) {
                    bal = b.match(/\d+/)[0];
                    temp.balance += Number(bal);
                    c = temp.cards[b].splice(i, 1).toString();
                    temp.cards["used"].push(c);
                    localStorage.glo = JSON.stringify(temp);
                    return cbg();
                } else if (temp.cards["used"][i] == m) {
                    fdp.value = `Dear Glo user, this card has already been used by you !`;
                } else {
                    fdp.value = `Dear Glo user, this voucher does not exist !`;
                }
            }
        }
    } else if (fdp.value.match(/(080|081|090|\+234)\d{8}/)) {

        if (nt == "mtn") {

            cg = true;
            let dsp;
            let count = 0;
            let t;
            let s;
            temp = JSON.parse(localStorage.getItem("mtn"));
            temp.tariff[0] == 'Mtn Pulse' ? s = 35 : s = 20;

            let tp = (temp.balance * 100) / s;
            let d = new Date();
            if (Number(temp.balance) > 0) {
                //   x.setAttribute('controls', 'controls');
                st = setInterval(myTimer, 1000);
                function myTimer() {
                    count++;
                    ad.play();
                    d.setFullYear(1000);
                    d.setMonth(0);
                    d.setDate(1);
                    d.setHours(0);
                    d.setMinutes(0);
                    d.setSeconds(count);
                    t = d.toLocaleTimeString();
                    fdp.value = t;
                    diff = tp - count;
                    temp.balance = diff;

                    if (Number(temp.balance) == 0) {
                        ad.pause();
                        clrInt();
                        localStorage.mtn = JSON.stringify(temp);
                        fdp.value = 'Your balance is N0.. try recharging. Mtn everwhere you go';
                        cg = false;
                    }

                }
            } else if (temp.balance == 0) {
                fdp.style.paddingTop = "25%";
                fdp.style.textAlign = "center";
                fdp.value = "Please recharge or consider changing to other sim";
                cg = false;

            }
        } else if (nt == "glo") {
            cg = true;
            let dsp;
            let count = 0;
            let t;
            let s;
            temp = JSON.parse(localStorage.getItem("glo"));
            temp.tariff[0] == 'Glo Biz' ? s = 33 : s = 19;
            let tp = (temp.balance * 100) / s;
            let d = new Date();
            if (Number(temp.balance) > 0) {
                st = setInterval(myTimer, 1000);
                function myTimer() {
                    ad.play();
                    count++;
                    d.setFullYear(1000);
                    d.setMonth(0);
                    d.setDate(1);
                    d.setHours(0);
                    d.setMinutes(0);
                    d.setSeconds(count);
                    t = d.toLocaleTimeString();
                    fdp.value = t;
                    diff = tp - count;
                    temp.balance = diff;

                    if (Number(temp.balance) == 0) {
                        clrInt();
                        localStorage.glo = JSON.stringify(temp);
                        fdp.value = 'Your balance is N0.. try recharging. Glo with Pride';
                        cg = false;
                    }

                }
            } else if (temp.balance == 0) {
                ad.pause();
                cg = false;
                fdp.style.paddingTop = "20%";
                fdp.style.textAlign = "center";
                fdp.value = "Please recharge or consider changing to other sim"

            }
        }
    } else if (fdp.value.match(/\*(400)\#/)) {
        fdp.style.paddingTop = "20%";
        fdp.style.textAlign = "center";
        temp = JSON.parse(localStorage.getItem("mtn"));
        if (temp.tariff[0] !== "Mtn Pulse") {
            temp.tariff.reverse();
            fdp.value = `Dear customer, You are welcome to Mtn pulse, we charge at 35k/s. Enjoy !`
            localStorage.mtn = JSON.stringify(temp);

        } else {
            temp.tariff.reverse();
            fdp.value = `Dear customer, You are welcome to Mtn Zone, we charge at 20k/s. Bonjour !`
            localStorage.mtn = JSON.stringify(temp);
        }


    } else if (fdp.value.match(/\*(600)\#/)) {
        fdp.style.paddingTop = "20%";
        fdp.style.textAlign = "center";
        temp = JSON.parse(localStorage.getItem("glo"));
        if (temp.tariff[0] !== "Glo Biz") {
            temp.tariff.reverse();
            fdp.value = `Dear customer, You are welcome to Glo Biz, we charge at 33k/s. Enjoy !`
            localStorage.glo = JSON.stringify(temp);

        } else {
            temp.tariff.reverse();
            fdp.value = `Dear customer, You are welcome to Glo Cred, we charge at 19k/s. Bonjour !`
            localStorage.glo = JSON.stringify(temp);
        }


    } else {
        cg = false;
        fdp.style.paddingTop = "20%";
        fdp.style.textAlign = "center";
        fdp.value = "Insert a valid request !"

    }
}

function red() {
    if (!cg) {
        fdp.value = "";
        fdp.style.paddingTop = "30%";
        fdp.style.textAlign = "right";
    } else {
        if (st && nt == 'mtn') {
            clrInt();
            let temp = JSON.parse(localStorage.getItem("mtn"));
            let s;
            ad.pause();
            temp.tariff[0] == 'Mtn Pulse' ? s = 35 : s = 20;
            temp.balance = ((diff * s) / 100).toFixed(2);
            fdp.value = `Your remaining bal: N${
                temp.balance
                }..MTN Leading the delivery of a bold, new digital world. www.mtn.com`;
            localStorage.mtn = JSON.stringify(temp);
            cg = false;
        } else if (st && nt == 'glo') {
            clrInt();
            let temp = JSON.parse(localStorage.getItem("glo"));
            let s;
            ad.pause();
            temp.tariff[0] == 'Glo Biz' ? s = 33 : s = 19;
            temp.balance = ((diff * s) / 100).toFixed(2);
            fdp.value = `Your remaining bal: N${
                temp.balance
                }..Glo Leading with excelent pride, new digital world. www.glo.com`;
            localStorage.glo = JSON.stringify(temp);
            cg = false;
        }
    }


}

function clrInt() {
    clearInterval(st);
    fdp.style.paddingTop = "5%";
    fdp.style.textAlign = "center";
}
