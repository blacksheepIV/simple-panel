interface GeoType{
  lat: number,
  lng:number
}
interface AddressType{
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo :GeoType
}
interface CompanyType{
  name: string,
  catchPhrase: string,
  bs: string
}
export default interface UserType{
  id: number,
  name: string,
  username: string,
  email: string,
  address: AddressType,
  phone: string,
  website: string,
  company : CompanyType
}