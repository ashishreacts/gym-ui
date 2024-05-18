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
import { useMemberList } from "../api";
import { MemberListItem } from "../api/types";

export const MemberList: React.FC<unknown> = () => {
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

  const api = useMemberList({
    // TODO: add other params
    pagination: paginationQueryOptions,
    gymId: "5a0b9b6c-358f-406a-a82e-70cf9ba5ba70",
  });

  const dbRowCount = api.data?.data?.totalRecords ?? 0;
  const tableRows = api.data?.data?.records ?? [];

  const columns = useMemo<MRT_ColumnDef<MemberListItem>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.firstName,
        id: "firstName",
        header: "First Name",
      },
      {
        accessorFn: (originalRow) => originalRow.lastName,
        id: "lastName",
        header: "Last Name",
      },
      {
        accessorFn: (originalRow) => originalRow.email,
        id: "email",
        header: "Email",
      },
      {
        accessorFn: (originalRow) => originalRow.mobile,
        id: "mobile",
        header: "Mobile No.",
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
    //   <UpdateMember key={0} data={row.original} onSuccess={closeMenu} />,
    //   <DeleteMember key={1} data={row.original} onSuccess={closeMenu} />,
    // ],
  });

  return <MaterialReactTable table={table} />;
};
