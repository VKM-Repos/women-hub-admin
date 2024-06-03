import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type tableProps = {
  columns: any[];
  data: any[];
};
export default function GenericTable({ columns, data }: tableProps) {
  // const [data, _setData] = useState(() => [...defaultData]);
  // const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full bg-white">
      <table className="w-full font-inter">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="text-left" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="py-4 px-5" key={header.id}>
                  <span>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index: number) => (
            <tr
              className={`text-left ${index % 2 === 0 ? "bg-[#EAEAEA]" : ""}`}
              style={{ padding: "10px" }}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <td className="px-5 py-3" key={cell.id}>
                  <span>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
