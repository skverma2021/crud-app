import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookDet from './BookDet';
import './book.css';

//localhost:3000/api/empBookHead/300
// {
//     "theEmpId": 300,
//     "theName": "Amrita Devi Shukla",
//     "theDesig": "Engineer (Electrical)",
//     "theGrade": "E2",
//     "theDeptt": "Project Planning Division",
//     "theDiscp": "Electrical Engineering",
//     "theHrRate": 100,
//     "curWorkPlans": 7
// }
//localhost:3000/api/bookHeads/300

// {
//     "empId": 300,
//     "nameJob": "Design and Development of Job Information System-1",
//     "nameStage": "Implementation Planning",
//     "dtStart": "2023/03/17",
//     "dtEnd": "2023/03/24",
//     "wpId": 38
// }, ...

const BookHead = () => {
  const [empDet, setEmpDet] = useState({});
  const [wpDet, setWpDet] = useState([]);
  const [bookDays, setBookDays] = useState([]);

  const { id, m, y } = useParams();

  useEffect(() => {
    getEmpDet();
    getWpDet();
    getBookingDates();
  }, []);

  const getEmpDet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/empBookHead/${id}`
      );
      setEmpDet(res.data[0]);
      console.log(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWpDet = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/bookHeads/${id}`);
      setWpDet(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBookingDates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/bookDates/${m}/${y}`
      );
      setBookDays(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //localhost:3000/api/bookDates/8/2023
  //   const m = 5;
  //   const y = 2023;

  //   const getBookingDays = async (m, y) => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3000/api/bookDates/${m}/${y}`
  //       );
  //       //   console.log(res.data);
  //       return res.data;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   const bDays = getBookingDays(8, 2023);
  //   console.log(bDays);

  //   const theBookingDays = (theMonth, theYear) => {
  //     let dt = new Date(theYear, theMonth, 1);
  //     let dys = [];
  //     while (dt.getMonth() === theMonth) {
  //       dys.push(new Date(dt));
  //       dt.setDate(dt.getDate() + 1);
  //     }
  //     return dys;
  //   };
  //   const m = 5;
  //   const y = 2023;
  //   const bDays = [...theBookingDays(m, y)];
  //   console.log(bDays);
  return (
    <>
      <div>
        {empDet.theName}, {empDet.theDesig}, [{empDet.theGrade}]
      </div>
      <div>
        {empDet.theDeptt}, {empDet.theDiscp}, [{empDet.theHrRate}Rs/hr,
        workPlans:{empDet.curWorkPlans}]
      </div>
      <div id='spreadSheet'>
        <div id='theHeader'>
          <dth>Date</dth>
          <jbh class='flex-container'>
            {wpDet.map((t) => {
              return (
                <div class='item' key={t.wpId}>
                  <div>{t.nameJob}</div>
                  <div>{t.nameStage}</div>
                  <div>{t.dtStart}</div>
                  <div>{t.dtEnd}</div>
                  <div>{t.wpId}</div>
                </div>
              );
            })}
          </jbh>
          <acth>action</acth>
        </div>
        {bookDays.map((d) => {
          return (
            <BookDet
              key={d.id}
              empId={id}
              wps={wpDet}
              bookDay={d}
              noWP={empDet.curWorkPlans}
            />
          );
        })}
      </div>
    </>
  );
};

export default BookHead;
