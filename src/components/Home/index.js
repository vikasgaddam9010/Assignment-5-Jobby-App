import './index.css'

import {Link} from 'react-router-dom'

import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="head">
        Find The Job That
        <br />
        Fits Your Life
      </h1>
      <p className="para">
        Millions of people are searching for jobs, salary
        <br />
        information, company reviews. FInd the job that fits your
        <br />
        abilities and potential
      </p>
      <Link to="/jobs">
        <button type="button" className="jobs-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)
export default Home
