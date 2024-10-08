import { getRegisterPart, setRegisterPart } from './registerManager';

export const executeInstruction = (instruction, registers, memory, output) => {
  // Check if the instruction is valid

  if (instruction.startsWith('mov')) {
    const [_, dest, src] = instruction.match(/mov\s+(\w+),\s*(\w+)/);
    const srcValue = isNaN(src) ? getRegisterPart(registers, src) : parseInt(src);
    setRegisterPart(registers, dest, srcValue);
  } else if (instruction.startsWith('add')) {
    const [_, dest, src] = instruction.match(/add\s+(\w+),\s*(\w+)/);
    const destValue = getRegisterPart(registers, dest);
    const srcValue = isNaN(src) ? getRegisterPart(registers, src) : parseInt(src);
    setRegisterPart(registers, dest, destValue + srcValue);
  } else if (instruction.startsWith('sub')) {
    const [_, dest, src] = instruction.match(/sub\s+(\w+),\s*(\w+)/);
    const destValue = getRegisterPart(registers, dest);
    const srcValue = isNaN(src) ? getRegisterPart(registers, src) : parseInt(src);
    setRegisterPart(registers, dest, destValue - srcValue);
  } else if (instruction === 'int 21h') {
    if (registers.ax.high === 2) {
      output.push(String.fromCharCode(registers.dx.low));
    }
  } else {
    throw new Error(`Unknown instruction: ${instruction}`);
  }
};
