import React, { useState } from 'react';
import './Sidebar.scss';

interface Item {
  id: string;
  name: string;
  children?: Item[];
}

interface SidebarProps {
  items: Item[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [sidebarItems, setSidebarItems] = useState<Item[]>(items);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (itemId: string) => {
    setExpandedItems({ ...expandedItems, [itemId]: !expandedItems[itemId] });
  };

  const addItem = (parentId: string | null = null) => {
    const newItem: Item = { id: Date.now().toString(), name: 'New Item' };
    if (parentId === null) {
      setSidebarItems([...sidebarItems, newItem]);
    } else {
      const updatedItems = addNestedItem([...sidebarItems], parentId, newItem);
      setSidebarItems(updatedItems);
    }
  };

  const addNestedItem = (items: Item[], parentId: string, newItem: Item): Item[] => {
    return items.map(item => {
      if (item.id === parentId) {
        return { ...item, children: [...(item.children || []), newItem] };
      }
      if (item.children) {
        return { ...item, children: addNestedItem(item.children, parentId, newItem) };
      }
      return item;
    });
  };

  const deleteItem = (itemId: string) => {
    const updatedItems = removeNestedItem([...sidebarItems], itemId);
    setSidebarItems(updatedItems);
  };

  const removeNestedItem = (items: Item[], itemId: string): Item[] => {
    return items
      .map(item => {
        if (item.id === itemId) {
          return null;
        }
        if (item.children) {
          return { ...item, children: removeNestedItem(item.children, itemId) };
        }
        return item;
      })
      .filter(Boolean) as Item[];
  };

  const renderItems = (items: Item[], level: number = 0) => {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id} className={`sidebar-item ${level > 0 ? 'nested' : ''}`}>
            <div className="item-content">
              {item.children && (
                <span
                  className="toggle-icon"
                  onClick={() => toggleItem(item.id)}
                >
                  <i className={`fas fa-chevron-${expandedItems[item.id] ? 'down' : 'right'}`}></i>
                </span>
              )}
              <span className="item-name" onClick={() => toggleItem(item.id)}>
                {item.name}
              </span>
              <button className="context-button" onClick={() => addItem(item.id)}>
                <i className="fas fa-plus"></i>
              </button>
              <button className="context-button" onClick={() => deleteItem(item.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
            {item.children && expandedItems[item.id] && renderItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
        <button onClick={() => addItem()}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="sidebar-content">
        {renderItems(sidebarItems)}
      </div>
    </div>
  );
};

export default Sidebar;
