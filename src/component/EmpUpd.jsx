import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
} from '@mui/material';

import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';

// const Container = styled(FormGroup)`
//   width: 50%;
//   margin: 5% auto 0 25%;
//   & > div {
//     margin-top: 20px;
//   }
// `;
const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

// const empRec = {
//   uId: '',
//   fName: '',
//   mName: '',
//   sName: '',
//   title: '',
//   dob: '',
//   gender: '',
//   addLine1: '',
//   cityId: '',
//   mobile: '',
//   eMailId: '',
//   passwd: '',
// };
const EmpUpd = () => {
  const [emp, setEmp] = useState({});
  const [cities, setCities] = useState([]);
  const [theCity, setTheCity] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/emps/${id}`);
        setEmp(res.data[0]);
        setTheCity(res.data[0].cityId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cities`);
        setCities(res.data);

        // setEmp({...emp, cityId:});
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(cities.length);

  const cityOptions = useMemo(
    () =>
      cities.map((c) => {
        if (!cities || cities.length === 0) {
          return null; // Or some placeholder options if desired
        }
        return (
          <MenuItem key={c.id} value={c.id}>
            {c.cityName}
          </MenuItem>
        );
      }),
    [cities]
  );

  // console.log(cityOptions);

  const onValChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const updEmpData = async () => {
    try {
      await axios.put(`http://localhost:3000/api/emps/${id}`, {
        ...emp,
        cityId: theCity,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Typography variant='h4'>Edit an Employee</Typography>

      <FormControl>
        <InputLabel>Unique ID</InputLabel>
        <Input
          name='uId'
          value={emp.uId || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.uId }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>First Name:</InputLabel>
        <Input
          name='fName'
          value={emp.fName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.fName }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Middle Name:</InputLabel>
        <Input
          name='mName'
          value={emp.mName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Surname:</InputLabel>
        <Input
          name='sName'
          value={emp.sName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.sName }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Title:</InputLabel>
        <Input
          name='title'
          value={emp.title}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.title }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Date of Birth:</InputLabel>
        <Input
          name='dob'
          value={emp.dob || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.dob }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Gender:</InputLabel>
        <Input
          name='gender'
          value={emp.gender || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.gender }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Address:</InputLabel>
        <Input
          name='addLine1'
          value={emp.addLine1 || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.addLine1 }}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>City</InputLabel>
        <Select
          name='cityId'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={theCity}
          label='City'
          onChange={(e) => setTheCity(e.target.value)}
        >
          {/* <MenuItem value={''}>select</MenuItem> */}
          <MenuItem>""</MenuItem>
          {cityOptions}
          {/* {cities.map((c) => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.cityName}
              </MenuItem>
            );
          })} */}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Mobile:</InputLabel>
        <Input
          name='mobile'
          value={emp.mobile || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.mobile }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>eMail ID:</InputLabel>
        <Input
          name='eMailId'
          value={emp.eMailId || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.eMailId }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Password:</InputLabel>
        <Input
          name='passwd'
          value={emp.passwd || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          InputLabelProps={{ shrink: !!emp.passwd }}
        />
      </FormControl>
      <FormControl>
        <Button variant='contained' onClick={updEmpData}>
          Update
        </Button>
      </FormControl>
    </Container>
  );
};

export default EmpUpd;
