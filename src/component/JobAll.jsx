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

const deleteJobData = async (theJobId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/jobs/${theJobId}`
    );
  } catch (error) {
    console.log(error);
  }
};

//job.id, job.description, job.clientId, client.shortName, job.ordDateStart, job.ordDateEnd, job.ordValue
const COLUMNS = [
  {
    Header: 'JobID',
    Footer: 'JobID',
    accessor: 'id',
  },
  {
    Header: 'JobDescription',
    Footer: 'JobDescription',
    accessor: 'description',
  },
  {
    Header: 'Client',
    Footer: 'Client',
    accessor: 'shortName',
  },
  {
    Header: 'StartDate',
    Footer: 'StartDate',
    accessor: 'theStart',
  },
  {
    Header: 'EndDate',
    Footer: 'EndDate',
    accessor: 'theEnd',
  },
  {
    Header: 'Edit',
    Footer: 'Edit',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 2 }}
        component={Link}
        to={`/job/upd/${row.original.id}`}
      >
        Edit
      </Button>
    ),
  },
  {
    Header: 'Execution',
    Footer: 'Execution',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 2 }}
        component={Link}
        to={`/job/ex/${row.original.id}`}
      >
        exPlan
      </Button>
    ),
  },
  {
    Header: 'ExAdd',
    Footer: 'ExAdd',
    accessor: '',
    Cell: ({ row }) => (
      <Button
        color='primary'
        variant='contained'
        style={{ marginRight: 2 }}
        component={Link}
        to={`/job/exAdd/${row.original.id}`}
      >
        addExPlan
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
        onClick={() => deleteJobData(`${row.original.id}`)}
      >
        Del
      </Button>
    ),
  },
];
const JobAll = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => jobs, [jobs]);
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
  );
};

export default JobAll;
