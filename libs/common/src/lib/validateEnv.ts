import { cleanEnv, str, num } from 'envalid';

export enum NodeEnvEnum {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PROD = 'prod',
}

interface EnvObject {
  PORT: number;
  NODE_ENV: string;
  SECRET: string;
  HOST: string;
}

const getEnvVars = (): EnvObject => {
  const EnvVars = cleanEnv(process.env, {
    NODE_ENV: str({ choices: Object.values(NodeEnvEnum) }),
    PORT: num(),
    SECRET: str(),
    HOST: str(),
  });

  return EnvVars as EnvObject;
};

export const EnvVars = getEnvVars();
