import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './workPlan.css';
import AddOneStage from './AddOneStage';

function JobExPlanAdd() {
  const [stages, setStages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllStages();
  }, []);

  const getAllStages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/ExStages/${id}`);
      setStages(res.data);
      // console.log(res.data);
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
          <acth>Action</acth>
        </div>
        {stages.map((t) => {
          return <AddOneStage key={t.stageId} {...t} theJob={id} />;
        })}
      </div>
    </>
  );
}

export default JobExPlanAdd;
