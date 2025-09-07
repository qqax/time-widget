import React from 'react';
import TimeWidget from './Widget/TimeWidget';
import { mockTimeWidgetData } from './Widget/mockTimeWidgetData';

function App() {
  return (
    <div className="app">
      <TimeWidget data={mockTimeWidgetData} />
    </div>
  );
}

export default App;
