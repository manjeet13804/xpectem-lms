// @flow
import {setup} from 'bem-cn';

export default (block: string): mixed => {
  const config = setup({
    mod: '--',
  });

  return config(block);
};
