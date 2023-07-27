import { useEffect } from "react"

const Geocode = (address) => {
    const getAddresslocation = async() => {
    const address_url = address.replace(/ /g, '+')

    const url=`https://geocode.maps.co/search?q=${address_url}`
    const response = await fetch(url)

    if (!response.ok){
        console.log('error with fetch')
    } else {
        const data = await response.json()

        const location = [data[0].lat,data[0].lon]
        return location
    }
    }
    useEffect(()=>
    {getAddresslocation()},[])
}

export default Geocode
