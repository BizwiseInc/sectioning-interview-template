import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testTimeout: 60000,
};

export default config;
