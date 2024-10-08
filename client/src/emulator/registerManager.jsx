export const createRegister = () => {
  let value = 0;
  return {
    get full() { return value; },
    set full(newValue) { value = (newValue & 0xFFFF); },
    get high() { return ((value & 0xFF00) >> 8); },
    set high(newValue) { value = ((value & 0x00FF) | ((newValue & 0xFF) << 8)); },
    get low() { return value & 0x00FF; },
    set low(newValue) { value = (((value & 0xFF00) | (newValue & 0xFF))); }
  };
};

export const createRegisters = () => ({
  ax: createRegister(),
  bx: createRegister(),
  cx: createRegister(),
  dx: createRegister()
});

export const getRegisterPart = (registers, reg) => {
  const fullReg = reg[0]+'x';
  const part= reg[1];

  console.log(fullReg);
  console.log(part);
  const register = registers[fullReg.toLowerCase()];
  switch(part.toLowerCase()) {
    case 'x': return register.full;
    case 'h': return register.high;
    case 'l': return register.low;
    default: throw new Error(`Invalid register part: ${part}`);
  }
};

export const setRegisterPart = (registers, reg, value) => {
  const fullReg = reg[0]+'x';
  const part= reg[1];

  console.log(fullReg);
  console.log(part);
  const register = registers[fullReg.toLowerCase()];
  switch(part.toLowerCase()) {
    case 'x': register.full = value; break;
    case 'h': register.high = value; break;
    case 'l': register.low = value; break;
    default: throw new Error(`Invalid register part: ${part}`);
  }
};

export const getRegisterState = (registers) => ({
  ax: registers.ax.full,
  ah: registers.ax.high,
  al: registers.ax.low,
  bx: registers.bx.full,
  bh: registers.bx.high,
  bl: registers.bx.low,
  cx: registers.cx.full,
  ch: registers.cx.high,
  cl: registers.cx.low,
  dx: registers.dx.full,
  dh: registers.dx.high,
  dl: registers.dx.low
});