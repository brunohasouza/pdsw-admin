import { Mask } from 'maska';

export const documentMask = new Mask({ mask: '##.###.###/####-##' });
export const phoneMask = new Mask({ mask: '(##) #####-####' });
export const zipcodeMask = new Mask({ mask: '#####-###' });
