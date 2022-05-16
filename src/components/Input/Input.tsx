import React, { ReactNode } from 'react';
import { Input as ComponentString, InputNumber as ComponentNumber } from 'antd';
import cn from 'classnames';

import { Size } from '@/types/common';

import styles from './Input.module.scss';

export enum InputView {
  Default = 'Default',
}

export enum InputForm {
  Brick = 'Brick',
}

export interface IInputString {
  className?: string;
  size?: Size;
  view?: InputView;
  form?: InputForm;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  prefix?: React.ReactNode;
}

export const InputString: React.FC<IInputString> = (props) => {
  const {
    name,
    className,
    size = Size.S,
    view = InputView.Default,
    form = InputForm.Brick,
    maxLength,
    value,
    defaultValue,
    onChange,
    disabled,
    placeholder,
    onBlur,
    onPressEnter,
    prefix,
    onFocus,
  } = props;

  return (
    <ComponentString
      name={name}
      className={cn(
        styles.input,
        styles[`inputSize${size}`],
        styles[`inputForm${form}`],
        styles[`inputView${view}`],
        className,
      )}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      maxLength={maxLength}
      disabled={disabled}
      onBlur={(event) => onBlur?.(event.currentTarget.value)}
      prefix={prefix}
      onPressEnter={onPressEnter}
      onFocus={onFocus}
    />
  );
};

export interface IInputNumber {
  className?: string;
  size?: Size;
  view?: InputView;
  form?: InputForm;
  disabled?: boolean;
  autoFocus?: boolean;
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  name?: string;
  precision?: number;
  prefix?: ReactNode;
  parser?: (displayValue: string | undefined) => number;
  formatter?: (value: number | undefined) => string;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

const defaultInputNumberParser = (value?: string) => Number(value?.replace(/\D/g, ''));

export const InputNumber: React.FC<IInputNumber> = (props) => {
  const {
    className,
    size = Size.S,
    view = InputView.Default,
    form = InputForm.Brick,
    precision,
    value,
    defaultValue,
    onChange,
    disabled,
    autoFocus,
    min,
    max,
    step,
    placeholder,
    name,
    prefix,
    parser = props.formatter ? defaultInputNumberParser : undefined,
    formatter,
    onPressEnter,
  } = props;

  return (
    <ComponentNumber
      className={cn(
        styles.input,
        styles[`inputSize${size}`],
        styles[`inputForm${form}`],
        styles[`inputView${view}`],
        className,
      )}
      name={name}
      placeholder={placeholder}
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      min={min}
      max={max}
      step={step}
      precision={precision}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      prefix={prefix}
      parser={parser}
      formatter={formatter}
      onPressEnter={onPressEnter}
    />
  );
};

export interface ITextArea {
  className?: string;
  size?: Size;
  view?: InputView;
  form?: InputForm;
  rows?: number;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}

export const TextArea: React.FC<ITextArea> = (props) => {
  const {
    className,
    size = Size.S,
    view = InputView.Default,
    form = InputForm.Brick,
    rows,
    maxLength,
    value,
    defaultValue,
    onChange,
    disabled,
    placeholder,
    onBlur,
    onFocus,
    onPressEnter,
  } = props;

  return (
    <ComponentString.TextArea
      className={cn(
        styles.input,
        styles.textarea,
        styles[`inputSize${size}`],
        styles[`inputForm${form}`],
        styles[`inputView${view}`],
        className,
      )}
      rows={rows}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      onBlur={(event) => onBlur?.(event.currentTarget.value)}
      onFocus={onFocus}
      onPressEnter={onPressEnter}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
