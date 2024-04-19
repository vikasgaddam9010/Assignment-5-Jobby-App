import './index.css'

import {MdStar} from 'react-icons/md'

import {GoLocation} from 'react-icons/go'

import {FaShoppingBag, FaExternalLinkAlt} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'
import Header from '../Header'

import SimilarJob from '../SimilarJob'

import Skills from '../Skills'

class EachJobDetails extends Component {
  state = {
    jobData: {},
    skillsList: [],
    lifeAtCompanyData: {},
    similarJobslist: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {id} = this.props.match.params
    console.log(id)
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const apiResult = await fetch(url, options)

    if (apiResult.ok === true) {
      const eachAndSimilarData = await apiResult.json()
      console.log(eachAndSimilarData)
      const jobDetails = eachAndSimilarData.job_details
      const camelCaseJobData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        title: jobDetails.title,
        location: jobDetails.location,
        rating: jobDetails.rating,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        similarJobs: jobDetails.similar_jobs,
      }
      console.log(camelCaseJobData)
      this.setState({
        jobData: camelCaseJobData,
        skillsList: jobDetails.skills,
        lifeAtCompanyData: jobDetails.life_at_company,
        similarJobslist: eachAndSimilarData.similar_jobs,
      })
    }
  }

  renderSkills = () => {
    const {skillsList} = this.state
    return (
      <>
        <h1 className="description-heading">Skills</h1>
        <ul className="ul-item">
          {skillsList.map(eachSkill => (
            <Skills key={eachSkill.name} eachSkill={eachSkill} />
          ))}
        </ul>
      </>
    )
  }

  getSimilarJobs = () => {
    const {similarJobslist} = this.state
    console.log(similarJobslist)
    return (
      <>
        <h1>Similar Jobs</h1>
        <ul className="d-flex-item">
          {similarJobslist.map(eachJob => (
            <SimilarJob key={eachJob.id} eachJob={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {jobData, lifeAtCompanyData} = this.state

    const {
      companyLogoUrl,
      rating,
      location,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      title,
      jobDescription,
    } = jobData

    return (
      <>
        <Header />
        <div className="job-container flex-direction-column">
          <div className="job-contain">
            <div className="d-flex-item">
              <img
                alt="job details company logo"
                className="company-logo-1"
                src={companyLogoUrl}
              />
              <div className="font-size-16px">
                <h1 className="title-1">{title}</h1>
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
            <div className="center">
              <h1 className="description-heading">Description</h1>
              <a className="job-list-d-flex" href={companyWebsiteUrl}>
                <p>Visit</p>
                <FaExternalLinkAlt className="external-link-icon" />
              </a>
            </div>

            <p className="para-description-1">{jobDescription}</p>
            {this.renderSkills()}
            <h1>Life at company</h1>
            <div className="d-flex-item-space-between">
              <p className="link-item">{lifeAtCompanyData.description}</p>
              <img
                alt="life at company"
                className="item-life-at-company-image"
                src={lifeAtCompanyData.image_url}
              />
            </div>
          </div>
          {this.getSimilarJobs()}
        </div>
      </>
    )
  }
}
export default EachJobDetails
