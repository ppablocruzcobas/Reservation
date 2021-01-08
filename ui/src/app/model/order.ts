interface Field {
  field: string;
  direction: number;
};

interface OrderBy {
  name: string;
  value: Field;
};

export const ORDERBY: OrderBy[] = [
  {name: 'By Date Ascending', value: {field: 'date', direction: -1}},
  {name: 'By Date Descending', value: {field: 'date', direction: 1}},
  {name: 'By Alphabetic Ascending', value: {field: 'contact', direction: -1}},
  {name: 'By Alphabetic Descending', value: {field: 'contact', direction: 1}},
  {name: 'By Ranking', value: {field: 'stars', direction: 1}}
];
