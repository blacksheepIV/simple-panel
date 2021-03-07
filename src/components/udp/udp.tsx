import React, { FunctionComponent, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter, IoLogoInstagram, IoLogoFacebook } from 'react-icons/io'
import UserType from 'utils/interfaces/user-interface'
import 'components/udp/udp.scss'

import axios from 'axios'
import { IconType } from 'react-icons/lib'


interface SocialType{
  socialName:string, 
  info:string, 
  icon:string
}

const Map :Record<string, IconType> = {
  'IoIosGlobe': IoIosGlobe,
  'IoLogoGithub': IoLogoGithub,
  'IoLogoTwitter':IoLogoTwitter,
  'IoLogoInstagram':IoLogoInstagram,
  'IoLogoFacebook':IoLogoFacebook
}
const UserDetailPage: FunctionComponent = ()=>{
  const { userId } = useParams()
  const defaultUser:UserType = {
    'id': 0,
    'name': '',
    'username': '',
    'email': '',
    'address': {
      'street': '',
      'suite': '',
      'city': '',
      'zipcode': '',
      'geo': {
        'lat': 0,
        'lng': 0
      }
    },
    'phone': '',
    'website': '',
    'company': {
      'name': '',
      'catchPhrase': '',
      'bs': ''
    }
  }
  const [user, setUser]  = useState<UserType>(defaultUser)
  const [socials, setSocials] = useState<SocialType[]>([])
  const [loading, setLoading] : [boolean, (loading:boolean)=>void] = useState<boolean>(true)
  const [postsNumber, setPostsNumber]  = useState<number>(0)
  useEffect(()=>{
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`
    axios.get<UserType>(url ).then((res)=>{

      setUser(res.data)
      const dummySocials = [{ socialName:'Website', info:res.data.website, icon:'IoIosGlobe' }, { socialName:'Github', info:res.data.username, icon:'IoLogoGithub' }, { socialName:'Twitter', info:res.data.username, icon:'IoLogoTwitter' }, { socialName:'Instagram', info:res.data.username, icon:'IoLogoInstagram' }, { socialName:'Facebook', info:res.data.username, icon:'IoLogoFacebook' }]
      setSocials(dummySocials)

    })
  }, [])
  return (
    <div className="udp">

      <div className="udp__breadcrumb">
        <li className="udp__breadcrumb--item">
          <Link to="/">Home</Link>
        </li>
        <li className="udp__breadcrumb--item">
          <Link to="/panel">Panel</Link>
        </li>
        <li className="udp__breadcrumb--item active" aria-current="page">User Profile</li>
      </div>

      <div className="row">
        <div className="cloumn">
          {/* TODO: make a seperate component  */}
          <div className="udp__card">
            <img src="/imgs/dafault-profile.jpeg" alt="userPhoto" className="udp__avatar" width="150" height="150" />
            <h4>{user.name}</h4>
            <span className="udp__subheader">{user.company.bs}</span>
            <span className="udp__subheader">{user.address.city},{user.address.street}</span>
          </div>

          {/* TODO: make a seperate component  */}
          <div className="udp__card">
            
            {socials.map((social, index)=>{
              const key = index * 1000 + 100
              const Icon = Map[social.icon]
              return (
                <div className="udp__socials" key={key}>
                  <span className="bold">
                    <span className="udp__socials--icon"><Icon /></span>
                    <span>{social.socialName}</span>
                  </span>
                  <span className="secondaryText">{social.info}</span>
                </div>
              )
            })}

          </div>
        </div>

        {/* TODO: make a seperate component  */}
        <div className="udp__card udp__contactInfo">

          <div className="udp__userInfo">
            <span className="bold">Name</span>
            <span className="secondaryText">{user.name}</span>
          </div>

          <div className="udp__userInfo">
            <span className="bold">Email</span>
            <span className="secondaryText">{user.email}</span>
          </div>

          <div className="udp__userInfo">
            <span className="bold">Phone</span>
            <span className="secondaryText">{user.phone}</span>
          </div>

          <div className="udp__userInfo">
            <span className="bold">Address</span>
            <span className="secondaryText">{user.address.city},{user.address.street},{user.address.suite}</span>
          </div>
          <div className="udp__userInfo">
            <span className="bold">Posts</span>
            <Link to="/posts/1">See all of {user.username}'s posts</Link>
          </div>
        </div>
      </div>
      
    </div>
  )
}
export default UserDetailPage