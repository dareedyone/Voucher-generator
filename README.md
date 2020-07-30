# Voucher-generator
Network voucher generator app

This apps mimicks a telecom recharge card generator and phone loading through local storage.

functionalities include:
Double click dial (green) button to switch the network you want to use to call.


Behaves as smartphone
Dialing
- *556# checks mtn balance directly without choosing sim. 
(It is smart it wont throw error. It knows to check mtn sim with *556#).

- #124# check glo balance. Same as mtn but checks glo balance.

- *123*correct 16 digits# has loads on glo directly. Incorrect or used throws error.

- *555*correct 16 digits# has loads on mtn directly. Incorrect or used throws error.


- *400#  on dial switch between mtn zone and mtn pulse tariff.   Zone is 20k/s while pulse is 35k/s

- *600# on dial switch between glo biz and glo cred tariff.   19k/s to 33k/s simultaneously.

- 080 or 081 or 090 then the rest digits. Dont try international number. 😂 it wont even work.  And finally of course balance reduce upon dialling if balance is more than #0
