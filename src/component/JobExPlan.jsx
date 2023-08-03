import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './workPlan.css';

function JobExPlan() {
  console.log('Hi');
  const [stages, setStages] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getAllStages();
  }, []);

  const getAllStages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/WorkPlans/${id}`);
      setStages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id='spreadSheet'>
        <div id='theHeader'>
          <slh>SL</slh>
          <wsh>Stage</wsh>
          <deptth>Department</deptth>
          <starth>Date[start]</starth>
          <endh>Date[End]</endh>
          <acth>Act</acth>
        </div>
        {stages.map((t) => {
          return (
            <div id='theRows' key={t.id} class='parent'>
              <sl>{t.id}</sl>
              <ws>{t.theStage}</ws>
              <deptt>{t.theDeptt}</deptt>
              <start>{t.dtStart}</start>
              <end>{t.dtEnd}</end>
              <act>Act</act>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default JobExPlan;
