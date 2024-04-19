import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

import JobItem from '../JobItem'

import LoaderView from '../LoaderView'

import ProfileDetails from '../ProfileDetails'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileStatus = {
  initial: 'INITiAL',
  loader: 'LOAADER',
  sucess: 'SUCCESS',
  failed: 'FAILED',
}

const jobStatus = {
  jobInitial: 'INITiAL',
  jobLoader: 'LOAADER',
  jobSucess: 'SUCCESS',
  jobFailed: 'FAILED',
  jobslistZero: 'ZERO',
}

class JobDetails extends Component {
  state = {
    profileState: profileStatus.initial,
    jobState: jobStatus.jobInitial,
    userDetails: {},
    selectedJobType: [],
    selectedSalary: '',
    jobInputSearch: '',
    getJobsList: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsData()
  }

  getJobsData = async () => {
    const {selectedJobType, selectedSalary, jobInputSearch} = this.state

    this.setState({jobState: jobStatus.jobLoader}) // state updated to loader.

    const typeJ = selectedJobType.join(',')

    const jwtToken = Cookies.get('jwt_token')

    const apiForForProfileDetails = `https://apis.ccbp.in/jobs?employment_type=${typeJ}&minimum_package=${selectedSalary}&search=${jobInputSearch}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const apiData = await fetch(apiForForProfileDetails, options)
    if (apiData.ok === true) {
      const jobsList = await apiData.json()
      const {jobs} = jobsList

      const convertedJobsList = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDdescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(jobs)
      this.setState({
        getJobsList: convertedJobsList,
        jobState: jobStatus.jobSucess,
      })
      if (jobs.length === 0) {
        this.setState({jobState: jobStatus.jobslistZero})
      }
    } else {
      this.setState({jobState: jobStatus.jobFailed})
    }
  }

  getProfile = async () => {
    this.setState({profileState: profileStatus.loader}) // profile updated to loader.
    const jwtToken = Cookies.get('jwt_token')

    const apiForForProfileDetails = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const profileDetails = await fetch(apiForForProfileDetails, options) // api to fetch profile details.

    if (profileDetails.ok === true) {
      const jsonConverted = await profileDetails.json()
      const jsonProfileDetails = jsonConverted.profile_details
      const jsonConvertedToCamelCase = {
        name: jsonProfileDetails.name,
        profileImageUrl: jsonProfileDetails.profile_image_url,
        shortBio: jsonProfileDetails.short_bio,
      }
      this.setState({
        // state updated to success after successfully data retrieved.
        userDetails: jsonConvertedToCamelCase,
        profileState: profileStatus.sucess,
      })
    } else {
      this.setState({profileState: profileStatus.failed}) /// state updated to failed.
    }
  }

  onClickJobType = event => {
    // function to add and remove type job to
    const {selectedJobType} = this.state
    const typeJob = event.target.value
    if (selectedJobType.includes(typeJob)) {
      const newJobZType = selectedJobType.filter(each => each !== typeJob)
      this.setState({selectedJobType: newJobZType}, this.getJobsData)
    } else {
      this.setState(
        prevState => ({
          selectedJobType: [...prevState.selectedJobType, event.target.value],
        }),
        this.getJobsData,
      )
    }
  }

  onClickSalaryRange = event => {
    this.setState({selectedSalary: event.target.value}, this.getJobsData)
  }

  onChangeJobSearchInput = event => {
    this.setState({jobInputSearch: event.target.value})
  }

  onClickJobSearchInput = () => {
    this.getJobsData()
  }

  getButtonViewForFailedToFetchProfile = () => (
    <div className="btn-center">
      <button type="button" className="logout-btn" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  getProfileStateBasedView = () => {
    const {userDetails, profileState} = this.state

    switch (profileState) {
      case profileStatus.loader:
        return <LoaderView />
      case profileStatus.sucess:
        return <ProfileDetails userDetails={userDetails} />
      case profileStatus.failed:
        return this.getButtonViewForFailedToFetchProfile()
    }
  }

  getSuccessView = () => {
    const {getJobsList} = this.state
    return (
      <ul>
        {getJobsList.map(eachJob => (
          <JobItem key={eachJob.id} eachJob={eachJob} />
        ))}
      </ul>
    )
  }

  getZeroListView = () => (
    <div className="btn-center height">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>we could not find any jobs. try other filters.</p>
    </div>
  )

  getFailedView = () => (
    <div className="btn-center height">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking fo</p>
      <button type="button" className="logout-btn" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  getJobsOrNoJobsOrFailedView = () => {
    const {jobState} = this.state
    switch (jobState) {
      case jobStatus.jobLoader:
        return <LoaderView />
      case jobStatus.jobSucess:
        return this.getSuccessView()
      case jobStatus.jobslistZero:
        return this.getZeroListView()
      case jobStatus.jobFailed:
        return this.getFailedView()
    }
  }

  render() {
    const {jobInputSearch, jobState} = this.state

    console.log(jobState)

    return (
      <>
        <Header />
        <div className="job-container">
          <div className="input-search-sm hide-lg">
            <input
              placeholder="Search"
              type="search"
              className="search-input"
              value={jobInputSearch}
              onChange={this.onChangeJobSearchInput}
            />
            <button
              onClick={this.onClickJobSearchInput}
              className="search-icon"
              type="button"
              data-testid="searchButton"
            >
              <BsSearch aria-label="close" />
            </button>
          </div>
          <div className="profile-filter-section">
            {this.getProfileStateBasedView()}

            <hr />
            <h1 className="heading">Type of Employment</h1>
            <ul>
              {employmentTypesList.map(eachType => (
                <li key={eachType.employmentTypeId} className="margin-bottom">
                  <input
                    onClick={this.onClickJobType}
                    value={eachType.employmentTypeId}
                    id={eachType.employmentTypeId}
                    type="checkbox"
                  />
                  <label className="label" htmlFor={eachType.employmentTypeId}>
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr />
            <h1 className="heading">Salary Range</h1>
            <ul>
              {salaryRangesList.map(eachType => (
                <li key={eachType.salaryRangeId} className="margin-bottom">
                  <input
                    name="salary"
                    type="radio"
                    onClick={this.onClickSalaryRange}
                    value={eachType.salaryRangeId}
                    id={eachType.salaryRangeId}
                  />
                  <label className="label" htmlFor={eachType.salaryRangeId}>
                    {eachType.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-list-section">
            <div className="input-search d-none-lg">
              <input
                placeholder="Search"
                type="search"
                className="search-input"
                value={jobInputSearch}
                onChange={this.onChangeJobSearchInput}
              />
              <button
                onClick={this.onClickJobSearchInput}
                className="search-icon"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch aria-label="close" />
              </button>
            </div>
            {this.getJobsOrNoJobsOrFailedView()}
          </div>
        </div>
      </>
    )
  }
}

export default JobDetails
