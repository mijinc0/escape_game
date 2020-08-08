import { GlslValueType } from './GlslValueType';

type DefaultValue = {
  type: GlslValueType,
  name: string,
  value: any,
};

export interface IFragShaderEntry {
  name: string,
  glslSrc: string,
  defaultValues?: DefaultValue[],
}