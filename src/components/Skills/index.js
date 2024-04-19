import './index.css'

const Skill = props => {
  const {image_url, name} = props.eachSkill
  return (
    <li className="li-item">
      <img className="img-item" alt="name" src={image_url} />
      <p>{name}</p>
    </li>
  )
}

export default Skill
