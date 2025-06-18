import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const TableContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-x-auto shadow-md sm:rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Table = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <table
      className={cn(
        "w-full text-base text-left rtl:text-right text-gray-500 ",
        className
      )}
    >
      {children}
    </table>
  );
};

export const TableHead = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <thead
      className={cn(
        "text-sm text-gray-700 uppercase bg-gray-50  ",
        className
      )}
    >
      <tr>{children}</tr>
    </thead>
  );
};

export const TableHeadCell = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <th scope="col" className={cn("px-6 py-3", className)}>
      {children}
    </th>
  );
};

export const TableRow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <tr
      className={cn(
        "odd:bg-white  even:bg-gray-50  border-b  border-gray-200",
        className
      )}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <td className={cn("px-6 py-4", className)}>{children}</td>;
};

export default function SimpleTable({
  containerClass,
  tableClass,
  headClass,
  headCellClass,
  rowClass,
  cellClass,
  items,
  columns,
}: {
  containerClass?: string;
  tableClass?: string;
  headClass?: string;
  headCellClass?: string;
  rowClass?: string;
  cellClass?: string;
  items: any[];
  columns: any[];
}) {
  return (
    <div>
      {items.length == 0 ? (
        <div className="text-center bg-gray-50 border border-dashed p-8 rounded-md">
          Aucune donnée disponible
        </div>
      ) : (
        <TableContainer className={containerClass}>
          <Table className={tableClass}>
            <TableHead className={headClass}>
              {columns.map((item) => {
                return (
                  <TableHeadCell
                    key={`${item.header}`}
                    className={headCellClass}
                  >
                    {item.header}
                  </TableHeadCell>
                );
              })}
            </TableHead>
            <tbody>
              {items.map((item: any, index: number) => {
                return (
                  <TableRow key={`table${index}`} className={rowClass}>
                    {columns.map((col) => {
                      return (
                        <TableCell key={col.name} className={cellClass}>
                          {col.row ? col.row(item) : item[col.name]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
