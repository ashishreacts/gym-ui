import {
  RefetchTableData,
  getAPIErrorText,
} from "@/components/MaterialReactTable";
import { PaginationQuery } from "@/types/api";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import { GymListItem } from "../api/types";
import { useGymList } from "../api";

export const GymList: React.FC<unknown> = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial state = 0, means laod first page
    pageSize: 5,
  });

  const paginationQueryOptions: PaginationQuery = {
    // IMP: in material-react-table, pages are 0 indexed
    // But the server side pages are 1 indexed, so aading 1 here
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  };

  const api = useGymList({
    // TODO: add other params
    pagination: paginationQueryOptions,
  });

  const dbRowCount = api.data?.data?.totalRecords ?? 0;
  const tableRows = api.data?.data?.records ?? [];

  const columns = useMemo<MRT_ColumnDef<GymListItem>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.id,
        id: "id",
        header: "Id",
      },
      {
        accessorFn: (originalRow) => originalRow.name,
        id: "name",
        header: "Name",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableRows,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: false,

    renderTopToolbarCustomActions: () => <RefetchTableData api={api} />,
    muiToolbarAlertBannerProps: getAPIErrorText(api.isError),

    // pagination options
    manualPagination: true,
    rowCount: dbRowCount,
    paginationDisplayMode: "pages",
    onPaginationChange: setPagination,

    state: {
      pagination,
      isLoading: api.isLoading,
      showAlertBanner: api.isError,
      showProgressBars: api.isRefetching,
    },

    // crud options
    // editDisplayMode: "custom",
    // positionActionsColumn: "last",
    // enableRowActions: true,
    // renderRowActionMenuItems: ({ closeMenu, row }) => [
    //   <UpdateGym key={0} data={row.original} onSuccess={closeMenu} />,
    //   <DeleteGym key={1} data={row.original} onSuccess={closeMenu} />,
    // ],
  });

  return <MaterialReactTable table={table} />;
};