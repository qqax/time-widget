export type TimeWidgetItem = {
  year: number;
  article: string;
};
export type TimeWidgetData = { category: string; items: TimeWidgetItem[] }[];

export type Years = {
  firstYear: number;
  lastYear: number;
};

export type Button = {
  id: string;
  label: string;
};
