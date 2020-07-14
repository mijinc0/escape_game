import { IField } from '../core/fields/IField';
import { TestField } from './testField1/TestField';
import { TestField2 } from './testField2/TestField';

export const GameFields = new Map<number, IField>([
  [TestField.id, TestField],
  [TestField2.id, TestField2],
]);