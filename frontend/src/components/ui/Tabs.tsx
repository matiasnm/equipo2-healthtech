import React, { useState } from 'react';


type TabsProps = {
    initialTab: string;
    tabs: ItemTab[];
};

type ItemTab = {
    key: string;
    label: string;
    content: React.ReactNode;

}

const Tabs = ({ tabs, initialTab }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<string>(initialTab);
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className='className="max-w-5xl mx-auto my-8'>

                <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {
                    tabs.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                            {tabs.find(tab => tab.key === activeTab)?.content}
                        </div>
                    )
                }
            </div>
        </div>


    );
}

const Header = ({ tabs, activeTab, setActiveTab }: { tabs: ItemTab[]; activeTab: string; setActiveTab: (key: string) => void }) => {
    return (
        <div className="flex items-center gap-2 border-b">
            {tabs.map((tab, i) => (
                <button
                    key={i}
                    className={`px-4 py-2 -mb-px border-b-2 text-sm sm:text-base ${activeTab === tab.key ? 'border-primary text-primary' : 'border-transparent text-gray-500'}`}
                    onClick={() => setActiveTab(tab.key)}
                >
                    {tab.label}
                </button>

            ))}
        </div>
    )
}

export default Tabs;
