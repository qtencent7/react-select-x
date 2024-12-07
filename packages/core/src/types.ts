export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  /** 选项列表 */
  options: Option[];
  /** 当前选中的值 */
  value?: Option | Option[] | null;
  /** 值变化时的回调函数 */
  onChange?: (value: Option | Option[] | null) => void;
  /** 占位符文本，默认为 "请选择..." */
  placeholder?: string;
  /** 是否支持多选，默认为 false */
  isMulti?: boolean;
  /** 是否支持搜索，默认为 true */
  isSearchable?: boolean;
  /** 是否禁用，默认为 false */
  isDisabled?: boolean;
  /** 自定义类名 */
  className?: string;
}
