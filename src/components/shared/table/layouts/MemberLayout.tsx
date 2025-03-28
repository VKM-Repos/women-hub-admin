import { Table } from "@tanstack/react-table";
import CreateUserButton from "../components/CreateUserButton";
import SearchInputField from "../components/SearchInputField";
import FilterTableButton from "../components/FilterTableButton";
import FlagUserButton from "../components/FlagUserButton";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/Icon";
import useAppStore from "@/lib/store/app.store";

const baseURL = import.meta.env.VITE_APP_BASE_URL;


export default function MembersTableLayout({ table, children, endpoint = '' }: { table: Table<any>, children: React.ReactNode, endpoint?: string }) {
    const handleDownload = async () => {
        try {
            const token = useAppStore.getState().user?.token;
            const response = await fetch(baseURL + endpoint, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file'); 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error('Download failed:', error);
        }
      };
      

    

    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <CreateUserButton />

                <div className="flex items-center gap-5">
                <SearchInputField table={table} />
                <FilterTableButton table={table} />
                <FlagUserButton />
                <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="h-12 font-semibold flex items-center gap-2">
                        <Icon name='exportIcon' />
                        Export
                </Button>
                </div>
            </div>
            {children}
      </div>
    )
}