import './index.css'

import {MdStar} from 'react-icons/md'

import {GoLocation} from 'react-icons/go'

import {FaShoppingBag} from 'react-icons/fa'

const SimilarJob = props => {
  const {eachJob} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    location,
    rating,
    title,
  } = eachJob
  return (
    <li className="background-color">
      <div className="job-list-d-flex">
        <img
          alt="similar job company logo"
          className="company-logo"
          src={company_logo_url}
        />
        <div className="font-size-16px">
          <h1 className="title">{title}</h1>
          <div className="job-list-d-flex m-1">
            <MdStar className="star-icon" />
            <p className="para">{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{job_description}</p>
      <div className="job-list-d-flex">
        <div className="job-list-d-flex m-1 mt-5 mr-1">
          <GoLocation />
          <p className="para">{location}</p>
        </div>
        <div className="job-list-d-flex m-1 mt-5">
          <FaShoppingBag />
          <p className="para">{employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJob
