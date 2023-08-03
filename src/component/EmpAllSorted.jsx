import { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from '@mui/material';

import axios from 'axios';
// import { Link } from 'react-router-dom';

const TRow = styled(TableRow)`
  & > td {
    font-size: 14px;
    background-color: #d6eeee;
  }
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 14px;
    background: #000000;
    color: #ffffff;
  }
`;
function formattedDate(d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${day}/${month}/${year}`;
}

const deleteEmpData = async (theEmpId) => {
  // console.log(theEmpId);
  // console.log(`http://localhost:3000/api/emps/${theEmpId}`);
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/emps/${theEmpId}`
    );
    // setEmps(res.data);
  } catch (error) {
    console.log(error);
  }
};
const COLUMNS = [
  {
    Header: 'UniqueID',
    Footer: 'UniqueID',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'empFullName',
  },
  {
    Header: 'Designation',
    Footer: 'Designation',
    accessor: 'theDesig',
  },
  {
    Header: 'Department',
    Footer: 'Department',
    accessor: 'theDeptt',
  },
  {
    Header: 'DOB(yyyy/mm/dd)',
    Footer: 'DOB(yyyy/mm/dd)',
    accessor: 'theDob',
  },
  {
    Header: 'Address',
    accessor: 'addLine1',
  },
  {
    Header: 'City',
    Footer: 'City',
    accessor: 'theCity',
  },
  {
    Header: 'Mobile',
    Footer: 'Mobile',
    accessor: 'mobile',
  },
  {
    Header: 'EMail',
    Footer: 'EMail',
    accessor: 'eMailId',
  },
  {
    Header: 'Edit',
    Footer: 'Edit',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 10 }}
        component={Link}
        to={`/upd/${row.original.id}`}
      >
        Edit
      </Button>
    ),
  },
  {
    Header: 'Del',
    Footer: 'Del',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='secondary'
        variant='contained'
        onClick={() => deleteEmpData(`${row.original.id}`)}
      >
        Del
      </Button>
    ),
  },
  {
    Header: 'Bookings',
    Footer: 'Bookings',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 10 }}
        component={Link}
        to={`/book/${row.original.id}/6/2023`}
      >
        Bookings
      </Button>
    ),
  },
];
const EmpAllSorted = () => {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    getAllEmps();
  }, []);

  const getAllEmps = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/emps`);
      setEmps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => emps, [emps]);
  // console.log(data);

  const tableInst = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInst;

  return (
    <>
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 10 }}
        component={Link}
        to={`/add`}
      >
        Add an Employee
      </Button>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((p) => {
            return (
              <THead {...p.getHeaderGroupProps()}>
                {p.headers.map((q) => {
                  return (
                    <TableCell {...q.getHeaderProps(q.getSortByToggleProps())}>
                      {q.render('Header')}
                      <span>
                        {q.isSorted ? (q.isSortedDesc ? '↓' : '↟') : ''}
                      </span>
                    </TableCell>
                  );
                })}
              </THead>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((r) => {
            prepareRow(r);
            return (
              <TRow {...r.getRowProps()}>
                {r.cells.map((s) => {
                  return (
                    <TableCell {...s.getCellProps()}>
                      {s.render('Cell')}
                    </TableCell>
                  );
                })}
              </TRow>
            );
          })}
        </TableBody>
        <TableHead>
          {footerGroups.map((t) => {
            return (
              <THead {...t.getFooterGroupProps()}>
                {t.headers.map((u) => {
                  return (
                    <TableCell {...u.getFooterProps()}>
                      {u.render('Footer')}
                    </TableCell>
                  );
                })}
              </THead>
            );
          })}
        </TableHead>
      </Table>
    </>
  );
};

export default EmpAllSorted;
