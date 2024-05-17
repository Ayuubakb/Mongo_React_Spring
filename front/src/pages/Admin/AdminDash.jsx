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
import {getDash2 } from '../../controllers/ManagerController';
import { getAdminDash, getRanking } from '../../controllers/AdminController';
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

const AdminDash = () => {
  const [dataall,setData1]=useState([{month:1,count:0}]);
  const [numStats,setNumStats]=useState({cars:0,managers:0});
  const [ranking,setRanking]=useState({add:[],accept:[],refuse:[]})
  useEffect(()=>{
    getAdminDash(setData1)
    getDash2(setNumStats)
    getRanking(setRanking)
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
  let month1= new Array();
  let flag=false;
  const result = labels.map(l =>{
    dataall.map(d => {
      let month=switchMonth(d.month)
        if (month === l) {
            month1.push(d.count)
            flag=true;
        }
    })
    if(!flag){
      month1.push(0);
    }
  }
  );
  const data = {
  labels,
  datasets: [
    {
      label: 'Refused Reservations',
      data: month1,
      backgroundColor: '#141E46',
    }
  ]};
  return (
    numStats.cars!=0?(
    <>
    <Nav/>
    <h1 className='dashH'>Revenue Statistics :</h1>
    <section className=' adminDash'>
      <div className='bars'>
        <Bar options={options} data={data} />    
      </div>
      <div className='nums'>
        <div>
            <p><span>{numStats.cars}</span> Cars <i class="fa-solid fa-car fa-lg"></i></p>
        </div>
        <div>
            <p><span>{numStats.managers}</span> Managers <i class="fa-solid fa-people-roof fa-lg"></i></p>
        </div>
      </div>
    </section>
    <h1 className='dashH'>Managers Ranking : </h1>
    {
      ranking.add.length===3 && ranking.accept.length===3 && ranking.refuse.length===3?
      <section className='adminDash'>
        <div className='tableHolder'>
          <h2 style={{color:"rgb(25,25,25)"}}>Most To Add Reservations :</h2>
          <table>
            <thead>
              <td><i class="fa-solid fa-ranking-star"></i> Ranking</td>
              <td>Name</td>
              <td>Stats</td>
            </thead>
            <tr style={{backgroundColor:"gold"}}>
              <td>1</td>
              <td>{ranking.add[0].firstName} {ranking.add[0].lastName}</td>
              <td>{ranking.add[0].numAdded}</td>
            </tr>
            <tr style={{backgroundColor:"silver"}}>
              <td>2</td>
              <td>{ranking.add[1].firstName} {ranking.add[1].lastName}</td>
              <td>{ranking.add[1].numAdded}</td>
            </tr>
            <tr style={{backgroundColor:"#CD7F32"}}>
              <td>3</td>
              <td>{ranking.add[2].firstName} {ranking.add[2].lastName}</td>
              <td>{ranking.add[2].numAdded}</td>
            </tr>
          </table>
        </div>
        <div className='tableHolder'>
        <h2 style={{color:"#41B06E"}}>Most To Accept Reservations :</h2>
          <table>
            <thead>
              <td><i class="fa-solid fa-ranking-star"></i> Ranking</td>
              <td>Name</td>
              <td>Stats</td>
            </thead>
            <tr style={{backgroundColor:"gold"}}>
              <td>1</td>
              <td>{ranking.accept[0].firstName} {ranking.accept[0].lastName}</td>
              <td>{ranking.accept[0].numAccepted}</td>
            </tr>
            <tr style={{backgroundColor:"silver"}}>
              <td>2</td>
              <td>{ranking.accept[1].firstName} {ranking.accept[1].lastName}</td>
              <td>{ranking.accept[1].numAccepted}</td>
            </tr>
            <tr style={{backgroundColor:"#CD7F32"}}>
              <td>3</td>
              <td>{ranking.accept[2].firstName} {ranking.accept[2].lastName}</td>
              <td>{ranking.accept[2].numAccepted}</td>
            </tr>
          </table>
        </div>
        <div className='tableHolder'>
        <h2>Most To Refuse Reservations :</h2>
        <table>
            <thead>
              <td><i class="fa-solid fa-ranking-star"></i> Ranking</td>
              <td>Name</td>
              <td>Stats</td>
            </thead>
            <tr style={{backgroundColor:"gold"}}>
              <td>1</td>
              <td>{ranking.refuse[0].firstName} {ranking.refuse[0].lastName}</td>
              <td>{ranking.refuse[0].numRefused}</td>
            </tr>
            <tr style={{backgroundColor:"silver"}}>
              <td>2</td>
              <td>{ranking.refuse[1].firstName} {ranking.refuse[1].lastName}</td>
              <td>{ranking.refuse[1].numRefused}</td>
            </tr>
            <tr style={{backgroundColor:"#CD7F32"}}>
              <td>3</td>
              <td>{ranking.refuse[2].firstName} {ranking.refuse[2].lastName}</td>
              <td>{ranking.refuse[2].numRefused}</td>
            </tr>
          </table>
        </div>
      </section>:null
    }
    </>):<Waiting/>
  )
}

export default AdminDash