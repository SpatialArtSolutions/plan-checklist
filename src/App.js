import React, { useState } from 'react';
import { Save, FileCheck, Layout, Palette } from 'lucide-react';

const Tab = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
      active ? 'border-blue-500 text-blue-500' : 'border-transparent'
    }`}
  >
    <Icon size={18} />
    {children}
  </button>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('sheets');
  const [checklist, setChecklist] = useState({
    sheets: {
      'A0.1 Cover Sheet': {
        title: 'Cover Sheet',
        items: {
          projectData: { label: 'Project Data', checked: false, notes: '' },
          codesList: { label: 'Applicable Codes List', checked: false, notes: '' },
          vicinityMap: { label: 'Vicinity Map', checked: false, notes: '' },
          sheetIndex: { label: 'Sheet Index', checked: false, notes: '' },
          projectDescription: { label: 'Project Description', checked: false, notes: '' },
          buildingData: { label: 'Building Data', checked: false, notes: '' },
          stamps: { label: 'Approval Stamps', checked: false, notes: '' },
          scopeSummary: { label: 'Scope of Work', checked: false, notes: '' }
        }
      },
      'A0.2 General Notes': {
        title: 'General Notes',
        items: {
          buildingCode: { label: 'Building Code Notes', checked: false, notes: '' },
          energyCode: { label: 'Energy Code Notes', checked: false, notes: '' },
          mechanicalCode: { label: 'Mechanical Code Notes', checked: false, notes: '' },
          plumbingCode: { label: 'Plumbing Code Notes', checked: false, notes: '' },
          electricalCode: { label: 'Electrical Code Notes', checked: false, notes: '' },
          calGreen: { label: 'CALGreen Notes', checked: false, notes: '' },
          projectSpecific: { label: 'Project Specific Notes', checked: false, notes: '' }
        }
      }
      // ... Additional sheets follow same pattern
    },
    graphics: {
      'Text Standards': {
        title: 'Text Standards',
        items: {
          sheetTitles: { label: 'Sheet Titles (3/8" Arial Bold, Black)', checked: false, notes: '' },
          viewTitles: { label: 'View Titles (1/4" Arial, Dark Blue)', checked: false, notes: '' },
          roomNames: { label: 'Room Names (3/16" Arial, Black)', checked: false, notes: '' },
          dimensions: { label: 'Dimensions (1/8" Arial, Black)', checked: false, notes: '' },
          notes: { label: 'Notes & Labels (3/32" Arial, Black)', checked: false, notes: '' }
        }
      },
      'Line Weights': {
        title: 'Line Weights',
        items: {
          wallCuts: { label: 'Wall Cuts (1/32", Black)', checked: false, notes: '' },
          hiddenLines: { label: 'Hidden Lines (1/64", Gray 30%)', checked: false, notes: '' },
          dimensionLines: { label: 'Dimension Lines (1/128", Black)', checked: false, notes: '' }
        }
      }
    },
    requirements: {
      'Energy': {
        title: 'Energy Compliance',
        items: {
          title24: { label: 'Title 24 Documentation', checked: false, notes: '' },
          pvSystem: { label: 'PV System Requirements', checked: false, notes: '' },
          hvac: { label: 'HVAC Specifications', checked: false, notes: '' },
          insulation: { label: 'Insulation Requirements', checked: false, notes: '' }
        }
      },
      'Fire Safety': {
        title: 'Fire Safety',
        items: {
          detectors: { label: 'Smoke/CO Detector Locations', checked: false, notes: '' },
          egress: { label: 'Emergency Egress Requirements', checked: false, notes: '' },
          separation: { label: 'Fire Separation Distances', checked: false, notes: '' }
        }
      }
    }
  });

  const tabs = [
    { id: 'sheets', label: 'Sheet Set', icon: FileCheck },
    { id: 'graphics', label: 'Graphics', icon: Palette },
    { id: 'requirements', label: 'Requirements', icon: Layout }
  ];

  const updateItem = (section, category, item, field, value) => {
    setChecklist(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [category]: {
          ...prev[section][category],
          items: {
            ...prev[section][category].items,
            [item]: {
              ...prev[section][category].items[item],
              [field]: value
            }
          }
        }
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plan Set Checklist</h1>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Save size={20} />
          Export Results
        </button>
      </div>

      <div className="border-b mb-6">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
            >
              {tab.label}
            </Tab>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(checklist[activeTab]).map(([category, categoryData]) => (
          <div key={category} className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">{categoryData.title}</h2>
            <div className="space-y-4">
              {Object.entries(categoryData.items).map(([item, itemData]) => (
                <div key={item} className="bg-white p-4 rounded shadow-sm">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={itemData.checked}
                      onChange={(e) => updateItem(activeTab, category, item, 'checked', e.target.checked)}
                      className="h-5 w-5"
                    />
                    <label className="flex-1 font-medium">{itemData.label}</label>
                  </div>
                  <textarea
                    placeholder="Notes for revision..."
                    value={itemData.notes}
                    onChange={(e) => updateItem(activeTab, category, item, 'notes', e.target.value)}
                    className="w-full mt-2 p-2 border rounded"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;