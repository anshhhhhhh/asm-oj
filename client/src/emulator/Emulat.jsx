import { createRegisters, getRegisterState } from './registerManager';
import { executeInstruction } from './InstructionSet';

export const emulate = (code) => {
  const registers = createRegisters();
  const memory = new Array(65536).fill(0);
  const output = [];

  const instructions = code.split('\n');

  for (let instruction of instructions) {
    try {
      executeInstruction(instruction, registers, memory, output);
    } catch (error) {
      throw new Error(`Error executing instruction "${instruction}": ${error.message}`);
    }
  }

  return {
    registers: getRegisterState(registers),
    output: output.join('')
  };
};