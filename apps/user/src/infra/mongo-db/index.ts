import { EnvVars } from '@boilerplate/common';
import { LiveConnection } from './liveConnection';
import { TestConnection } from './testConnection';

export const Database =
  EnvVars.NODE_ENV === 'test' || EnvVars.NODE_ENV === 'development'
    ? TestConnection
    : LiveConnection;
