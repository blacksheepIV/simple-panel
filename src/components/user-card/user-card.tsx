import React, { FunctionComponent } from 'react'
import 'components/user-card/user-card.scss'
import { MdLocationOn, MdEmail } from 'react-icons/md'
import { IoIosGlobe } from 'react-icons/io'
import UserType from 'utils/interfaces/user-interface'

interface UserCardType {
  user: UserType,
  className?:string,
  onClick?(): void
}
const UserCard: FunctionComponent<UserCardType> = ({ user, className, ...userCardProps }) => (
  <div className={['userCard', className].join(' ')} {...userCardProps}>

    <div
      className="userCard__header"
      style={{
        backgroundImage: 'url("./imgs/dafault-profile.jpeg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    />

    <div className="userCard__content">
      <span className="userCard__heading">{user.name}</span>

      <span className="userCard__heading--sub">@{user.username}</span>

      <div className="userCard__extraInfo">
        <div>
          <MdLocationOn className="userCard__icon" />
          {user.address.city}
        </div>

        <div>
          <MdEmail className="userCard__icon" />
          {user.email}
        </div>

        <div>
          <IoIosGlobe className="userCard__icon" />
          {user.website}
        </div>
      </div>
    </div>
    <button className="userCard__btn" type="button">More Info</button>
  </div>
)

export default UserCard
