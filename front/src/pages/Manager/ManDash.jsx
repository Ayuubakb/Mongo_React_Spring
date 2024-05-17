import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { getDash,getDash2 } from '../../controllers/ManagerController';
import Waiting from '../../components/Waiting';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Reservations Stats',
    },
  },
};

const ManDash = () => {
  const [dataall,setData1]=useState({data1:[{month:1,count:0}],data2:[{month:1,count:0}],data3:[{month:1,count:0}],data4:[{month:1,count:0}]});
  const [numStats,setNumStats]=useState({cars:0,appending:0,accepted:0,added:0,refused:0});

  useEffect(()=>{
    getDash(setData1)
    getDash2(setNumStats)
  },[])
  
  const labels = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  function switchMonth(monthNum){
    let month;
    switch (monthNum) {
      case 1:
          month = "January";
          break;
      case 2:
          month = "February";
          break;
      case 3:
          month = "March";
          break;
      case 4:
          month = "April";
          break;
      case 5:
          month = "May";
          break;
      case 6:
          month = "June";
          break;
      case 7:
          month = "July";
          break;
      case 8:
          month = "August";
          break;
      case 9:
          month = "September";
          break;
      case 10:
          month = "October";
          break;
      case 11:
          month = "November";
          break;
      case 12:
          month = "December";
          break;
      }
    return month;
  }
  let months1=new Array();
  let months2=new Array();
  let months3=new Array();
  let months4=new Array();
  const result = labels.map(l =>{
    let flag=false
    dataall.data1.map(d => {
      let month=switchMonth(d.month)
        if (month === l) {
            months1.push(d.count)
            flag=true
        }
    })
    if(!flag)
      months1.push(0)
  }
  );
  const result2 = labels.map(l =>{
    let flag=false
    dataall.data2.map(d => {
      let month=switchMonth(d.month)
        if (month === l) {
            months2.push(d.count)
            flag=true
        }
    })
    if(!flag)
      months2.push(0)
  }
  );
  const result3 = labels.map(l =>{
    let flag=false
    dataall.data3.map(d => {
      let month=switchMonth(d.month)
        if (month === l) {
            months3.push(d.count)
            flag=true
        }
    })
    if(!flag)
      months3.push(0)
  }
  );
  const result4 = labels.map(l =>{
    let flag=false
    dataall.data4.map(d => {
      let month=switchMonth(d.month)
        if (month === l) {
            months4.push(d.count)
            flag=true
        }
    })
    if(!flag)
      months4.push(0)
  }
  );
  const data = {
  labels,
  datasets: [
    {
      label: 'Refused Reservations',
      data: months1,
      backgroundColor: '#CF0A0A',
    },
    {
      label: 'Accepted Reservations',
      data: months2,
      backgroundColor: '#41B06E',
    },
  ]};
  const data2 = {
  labels,
  datasets: [
    {
      label: 'Refused Reservations',
      data: months3,
      backgroundColor: '#CF0A0A',
    },
    {
      label: 'Accepted Reservations',
      data: months4,
      backgroundColor: '#41B06E',
    }
  ]};
  return (
    data2.cars!=0?(
    <>
    <Nav/>
    <h1 className='dashH'>General Statistics :</h1>
    <section className=' adminDash'>
      <div className='bars'>
        <Bar options={options} data={data} />    
      </div>
      <div className='nums'>
        <div>
            <p><span>{numStats.cars}</span> Cars <i class="fa-solid fa-car fa-lg"></i></p>
        </div>
        <div>
            <p><span>{numStats.appending}</span> Pending Reservations <i class="fa-solid fa-spinner fa-lg"></i></p>
        </div>
      </div>
    </section>
    <h1 className='dashH'>Personal Statistics :</h1>
    <section className=' adminDash'>
    <div className='nums'>
        <div>
            <p><span>{numStats.accepted}</span> Accepted Reservations <i class="fa-solid fa-check fa-lg"></i></p>
        </div>
        <div>
            <p><span>{numStats.refused}</span> Refused Reservations <i class="fa-solid fa-xmark fa-lg"></i></p>
        </div>
        <div>
            <p><span>{numStats.added}</span> Added Reservations <i class="fa-solid fa-plus fa-lg"></i></p>
        </div>
      </div>
      <div className='bars'>
        <Bar options={options} data={data2} />    
      </div>
    </section>
    </>):<Waiting/>
  )
}

export default ManDash