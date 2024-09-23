import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Reusable Tabs Component
export const CustomTabs = ({
  tabs,
  defaultValue,
  children,
}: {
  tabs: { value: string; label: string }[];
  defaultValue: string;
  children: React.ReactNode;
}) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
        {tabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
