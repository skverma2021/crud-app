import React from 'react';
import { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const empRec = {
  uId: '',
  fName: '',
  mName: '',
  sName: '',
  title: '',
  dob: '',
  gender: '',
  addLine1: '',
  cityId: '',
  mobile: '',
  eMailId: '',
  passwd: '',
};
const EmpAdd = () => {
  const [emp, setEmp] = useState(empRec);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cities`);
        setCities(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(cities.length);

  const onValChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const postEmpData = async () => {
    try {
      await axios.post('http://localhost:3000/api/emps', emp);
      console.log(`Success: ${emp.id} created`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Typography variant='h4'>Add an Employee</Typography>

      <FormControl>
        <InputLabel>Unique ID:</InputLabel>
        <Input
          name='uId'
          value={emp.uId}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>First Name:</InputLabel>
        <Input
          name='fName'
          value={emp.fName}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Middle Name:</InputLabel>
        <Input
          name='mName'
          value={emp.mName}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Surname:</InputLabel>
        <Input
          name='sName'
          value={emp.sName}
          onChange={(e) => {
            return onValChange(e);
          }}
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
        />
      </FormControl>
      <FormControl>
        <InputLabel>Date of Birth:</InputLabel>
        <Input
          name='dob'
          value={emp.dob}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Gender:</InputLabel>
        <Input
          name='gender'
          value={emp.gender}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Address:</InputLabel>
        <Input
          name='addLine1'
          value={emp.addLine1}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>City:</InputLabel>
        <Select
          name='cityId'
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={emp.cityId}
          onChange={(e) => {
            return onValChange(e);
          }}
          label='City'
        >
          {cities.map((c) => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.cityName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Mobile:</InputLabel>
        <Input
          name='mobile'
          value={emp.mobile}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>eMail ID:</InputLabel>
        <Input
          name='eMailId'
          value={emp.eMailId}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Password:</InputLabel>
        <Input
          name='passwd'
          value={emp.passwd}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <Button variant='contained' onClick={postEmpData}>
          Add
        </Button>
      </FormControl>
    </Container>
  );
};

export default EmpAdd;
