import {Link} from 'react-router-dom'

import {MdStar} from 'react-icons/md'

import {GoLocation} from 'react-icons/go'

import {FaShoppingBag} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDdescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = eachJob
  return (
    <li className="job-contain">
      <Link className="link" to={`/jobs/${id}`}>
        <div>
          <div className="job-list-d-flex">
            <img
              alt="company logo"
              className="company-logo"
              src={companyLogoUrl}
            />
            <div className="font-size-16px">
              <h1 className="title">{title}</h1>
              <div className="job-list-d-flex m-1">
                <MdStar className="star-icon" />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="d-flex-space-between">
            <div className="job-list-d-flex">
              <div className="job-list-d-flex m-1 mt-5 mr-1">
                <GoLocation />
                <p className="para">{location}</p>
              </div>
              <div className="job-list-d-flex m-1 mt-5">
                <FaShoppingBag />
                <p className="para">{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDdescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
