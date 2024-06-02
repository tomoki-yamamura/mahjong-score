export const room2275validPlayerName = `LXXX | 21:22 | 四般南喰赤－ | playerA(+40.9) playerB(+9.4) playerC(-11.2) playerD(-39.1)
LXXX | 21:51 | 四般南喰赤－ | playerA(+69.6) playerD(-3.2) playerB(-26.7) playerC(-39.7)
LXXX | 22:47 | 四般南喰赤－ | playerD(+60.5) playerB(+28.4) playerC(-32.5) playerA(-56.4)`;

export const room2275invalidPlayerName = `LXXX | 21:22 | 四般南喰赤－ | NoName1(+40.9) NoName2(+9.4) NoName3(-11.2) NoName4(-39.1)
LXXX | 21:51 | 四般南喰赤－ | NoName1(+69.6) NoName2(-3.2) NoName3(-26.7) NoName4(-39.7)
LXXX | 22:47 | 四般南喰赤－ | NoName1(+60.5) NoName2(+28.4) NoName3(-32.5) NoName4(-56.4)`;

export const expectedValidRoom2275Result = [
  'LXXX | 21:22 | 四般南喰赤－ | playerA(+40.9) playerB(+9.4) playerC(-11.2) playerD(-39.1)',
  'LXXX | 21:51 | 四般南喰赤－ | playerA(+69.6) playerD(-3.2) playerB(-26.7) playerC(-39.7)',
  'LXXX | 22:47 | 四般南喰赤－ | playerD(+60.5) playerB(+28.4) playerC(-32.5) playerA(-56.4)',
];
