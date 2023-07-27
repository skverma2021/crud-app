import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';

const THead = styled(TableRow)`
  & > th {
    font-size: 12px;
    background: #000000;
    color: #ffffff;
  }
`;
const TRow = styled(TableRow)`
  & > td {
    font-size: 12px;
  }
`;
const EmpAll = () => {
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
  const deleteEmpData = async (theEmpId) => {
    console.log(theEmpId);
    console.log(`http://localhost:3000/api/emps/${theEmpId}`);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/emps/${theEmpId}`
      );
      // setEmps(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table>
      <TableHead>
        <THead>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Designation</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>DateOfBirth</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Mobile</TableCell>
          <TableCell>EMailID</TableCell>
          <TableCell></TableCell>
        </THead>
      </TableHead>
      <TableBody>
        {emps.map((t) => {
          return (
            <TRow key={t.id}>
              <TableCell>{t.id}</TableCell>
              <TableCell>{t.empFullName}</TableCell>
              <TableCell>{t.theDesig}</TableCell>
              <TableCell>{t.theDeptt}</TableCell>
              <TableCell>
                {t.theDay}/{t.theMonth}/{t.theYear}
              </TableCell>
              <TableCell>{t.addLine1}</TableCell>
              <TableCell>{t.theCity}</TableCell>
              <TableCell>{t.mobile}</TableCell>
              <TableCell>{t.eMailId}</TableCell>
              <TableCell>
                <Button
                  color='primary'
                  variant='contained'
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/upd/${t.id}`}
                >
                  Edit
                </Button>
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteEmpData(t.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default EmpAll;
