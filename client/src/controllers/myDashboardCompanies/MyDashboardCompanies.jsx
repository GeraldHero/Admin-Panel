import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesList } from '../../reduxConfig/action/companyActions';
import { Avatar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  {
    field: 'logo',
    label: 'Logo',

    renderCell: (params) => {
      const val = params.value;

      return (
        <Avatar
          alt={val.filename}
          src={val.path.substr(13)}
          variant="rectangle"
        />
      );
    },
  },
  { field: 'name', headerName: 'Company name' },
  { field: 'email', headerName: 'Email' },
  { field: 'website', headerName: 'Website' },
  {
    field: 'action',
    width: 130,
    sortable: false,

    renderCell: (params) => {
      const onClickDelete = async () => {
        return alert(JSON.stringify(params.row, null, 4));
      };
      const onClickEdit = async () => {};

      return (
        <>
          <IconButton onClick={onClickDelete}>
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton color="primary" onClick={onClickEdit}>
            <EditIcon />
          </IconButton>
        </>
      );
    },
  },
];

let rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const dispatch = useDispatch();

  const companiesListState = useSelector((state) => state.companiesList);
  const { error, companies, loading } = companiesListState;
  if (companies) rows = companies;
  useEffect(() => {
    dispatch(getCompaniesList());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id || row.id}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
