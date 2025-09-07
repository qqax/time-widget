import React from 'react';
import Years from './Circle/Years';

type TimeWidgetItem = {
  year: number;
  article: string;
};
export type TimeWidgetData = { category: string; items: TimeWidgetItem[] }[];

export type TimeWidgetProps = {
  data: TimeWidgetData;
};

type Years = {
  firstYear: number;
  lastYear: number;
};

export type Button = {
  id: string;
  label: string;
};

export type CircleProps = {
  buttonsData: Button[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
} & Years;

export type YearsProps = Years;
