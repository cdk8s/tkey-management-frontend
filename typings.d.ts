import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';

declare module '*.css';
declare module '*.png';
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

