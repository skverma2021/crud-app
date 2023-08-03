import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import './book.css';

//localhost:3000/api/bookHeads/300
//localhost:3000/api/empBookHead/300

// select
// 	theWpId = isNull(workPlanId, 'n'),
// 	theBooking = isNull(booking, 'n')
// from bookings
// where (empId = 300) and (dateId = 5)
// order by workPlanId

// SELECT booking FROM     bookings WHERE  (empId = 300) AND (workPlanId = 200) AND (dateId = 100)
{
  /* <BookDet
              key={d.id}
              empId={id}
              wps={wpDet}
              bookDay={d}
              noWP={empDet.curWorkPlans}
            /> */
}

{
  /* <>
                  <div class='item'>
                    <div>{t.nameJob}</div>
                    <div>{t.nameStage}</div>
                    <div>{t.dtStart}</div>
                    <div>{t.dtEnd}</div>
                    <div>{t.wpId}</div>
                  </div>
                </> */
}

const BookDet = ({ empId, wps, bookDay, noWP }) => {
  const [bData, setBData] = useState([]);
  useEffect(() => {
    let rec = [];
    wps.map((p) => {
      rec = [
        ...rec,
        {
          theEmp: empId,
          theDayId: bookDay.id,
          theWpId: p.wpId,
          theBooking: '',
        },
      ];
    });
    setBData(rec);
  }, [wps]);

  console.log(bData);

  const handleInputChange = (index, e) => {
    const newValue = e.target.value;
    setBData((prevBData) => {
      const updatedBData = [...prevBData];
      updatedBData[index].theBooking = newValue;
      return updatedBData;
    });
  };
  // <div class='item' key={t.theWpId}>
  //             <input
  //               class='item'
  //               key={index}
  //               value={t.theBooking}
  //               onChange={(event) => handleInputChange(index, event)}
  //             />
  //           </div>
  // const onValChange = (e) => {
  //   const newValue = e.target.value;
  //   setBData((prevBData) => {
  //     const updatedBData = [...prevBData];
  //     updatedBData[index].theBooking = newValue;
  //     return updatedBData;
  //   });
  // setEmp({ ...emp, [e.target.name]: e.target.value });
  // };

  return (
    <div id='theRow'>
      <dt>{bookDay.theDay}</dt>
      <jb class='flex-container'>
        {bData.map((t, index) => {
          return (
            <div className='item' key={t.theWpId}>
              <input
                key={index}
                type='text'
                value={t.theBooking}
                size='16'
                onChange={(e) => handleInputChange(index, e)}
              />
            </div>
          );
        })}
      </jb>
      <act>action</act>
    </div>
  );
};

export default BookDet;
