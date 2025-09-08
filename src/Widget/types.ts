export type HistoricalData = { category: string; items: HistoricalItem[] }[];

export type HistoricalItem = {
  year: number;
  article: string;
};

export type Years = {
  firstYear: number;
  lastYear: number;
};

export type Button = {
  id: string;
  label: string;
};
