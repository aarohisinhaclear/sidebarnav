import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';

const initialItems = [
  {
    id: '1',
    name: 'Important',
    children: [
      { id: '2', name: 'Chats' },
      { id: '3', name: 'Scheduled' },
    ],
  },
  {
    id: '4',
    name: 'All Mail',
    children: [
      {
        id: '5',
        name: 'Spam',
        children: [{ id: '6', name: 'Trash' }],
      },
    ],
  },
  {
    id: '7',
    name: 'Categories',
    children: [
      { id: '8', name: 'Social' },
      { id: '9', name: 'Updates' },
      { id: '10', name: 'Forums' },
      { id: '11', name: 'Promotions' },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Sidebar items={initialItems} />
    </div>
  );
};

export default App;
