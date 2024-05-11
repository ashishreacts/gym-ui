# material-react-table

## [Usage](https://www.material-react-table.com/docs/getting-started/usage)

## [Editing Feature Guide](https://www.material-react-table.com/docs/guides/editing)

### Row Actions

enable feature with this option in the table obtions

```js
enableRowActions: true
```

adjust the positioning of these actions with 

```js
positionActionsColumn: "last", // or "first"
```

**Note**: Only use either of `renderRowActions` or `renderRowActionMenuItems` 

To display "edit" and "delete" action on each row 

```tsx
renderRowActions: ({ row, table }) => (
    <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
            </IconButton>
        </Tooltip>
        {/* <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}> */}
        {/* Or call custom component e.g. DeletePlan */}
        <Tooltip title="Delete">
            <DeletePlan data={row.original} />
        </Tooltip>
    </Box>
),
```

instead of displaying these actions on the row, you can group them with `renderRowActionMenuItems`.

## [React Query (Remote) Example](https://www.material-react-table.com/docs/examples/react-query#react-query-(remote)-example)

Using `useEffect` and `useState` instead of react query - [example](https://www.material-react-table.com/docs/guides/pagination#remote-source-code)
