import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard'

const Home = () => {
  return (
    <>
      <Dashboard />
    </>
  )
}


export default Home;