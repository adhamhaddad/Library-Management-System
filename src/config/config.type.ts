export interface AppConfig {
  nodeEnv: string;
  name: string;
  backendDomain: string;
  port: number;
  apiPrefix: string;
}

export interface AuthConfig {
  secret?: string;
  expires?: string;
}

export interface DatabaseConfig {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  logging: boolean;
  pool?: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}
export interface RedisConfig {
  socket?: {
    host: string;
    port: number;
  };
}

export interface AllConfigType {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
}
