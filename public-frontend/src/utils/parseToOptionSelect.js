// @flow
type PropType = {
  label: string,
  value: string
};

export default (items: Array<object>, prop: PropType): Array<object> => (
  items.map((item: object): object => ({
    label: item[prop.label],
    value: item[prop.value],
  })));
