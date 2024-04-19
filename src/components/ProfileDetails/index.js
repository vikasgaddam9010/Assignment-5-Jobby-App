import './index.css'

const ProfileDetails = props => {
  const {userDetails} = props
  return (
    <>
      <div className="profile-details-container">
        <img
          alt="profile"
          className="profile-image"
          src={userDetails.profileImageUrl}
        />
        <h1 className="profile-name">{userDetails.name}</h1>
        <p>{userDetails.shortBio}</p>
      </div>
    </>
  )
}

export default ProfileDetails
