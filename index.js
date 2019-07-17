'use strict'

grt.addEventListener('click', generate);


function generate() {
    let final = `Your card value is <b>${cv.value}</b> on <b>${nn.value}</b> voucher service. <br> Here are your <b>${nc.value}</b> cards : <br>`;
    if (nc.value > 0 && cv.value && nn) {
        let n = nc.value;
        let i;
        let j;
        final += '<ol>';
        for (i = 1; i <= n; i++) {
            final += '<li>';
            for (j = 1; j <= 12; j++) {
                if (j == 4 || j == 8) {
                    final += Math.floor(Math.random() * 10) + '-';
                } else if (j == 12) {
                    final += Math.floor(Math.random() * 10) + '</li>';
                } else { final += Math.floor(Math.random() * 10); }
            }

           
        }
        final += '</ol>';
        dp.innerHTML = final;
    } else { alert('Input a valid input'); }


}