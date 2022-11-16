import React from "react";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import styles from './Admin.module.css';
import { Table } from '../../components/Table'

const Admin = () => {
  return (
    <>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
      </div>
      <div className={styles.dashboard}>
        <div className={styles.object}>
          <h3>Current month submissions: </h3>
        </div>

        <div className={styles.object}>
          <h3>Current month Delivery: </h3>
          <CircularProgress value={70} color='green.400'>
            <CircularProgressLabel>70%</CircularProgressLabel>
          </CircularProgress>
        </div>

        <div className={styles.object}>
          <h3>Live Order: </h3>
          <CircularProgress value={70} color='red.400'>
          <CircularProgressLabel>70%</CircularProgressLabel>
        </CircularProgress>
        </div>

        <div className={styles.object}>
          <h3>NDR: </h3>
          <CircularProgress value={40} color='green.900'>
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </div>

        <div className={styles.object}>
          <h3>Out for Delivery: </h3>
          <CircularProgress value={40} color='green.400'>
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </div>

        <div className={styles.object}>
          <h3>Today&apos;s submissions</h3>
          <CircularProgress value={40} color='green.400'>
            <CircularProgressLabel>40%</CircularProgressLabel>
          </CircularProgress>
        </div>
      </div>

      <div>
        <h3>Total current month: </h3>
        <h3>Overall</h3>
      </div>

      <Table className={styles.table}> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>This Month&apos; Submissions</th>
            <th>Overall Submissions</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Someone</td>
              <td>88</td>
              <td>375</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Random</td>
              <td>72</td>
              <td>102</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Nick</td>
              <td>52</td>
              <td>153</td>
            </tr>
            </tbody>
      </Table>
    </>
  );
};

export default Admin;