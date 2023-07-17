import { useState, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";

const RideListbyAccount = ({userData}) => {
    const [rides, setRides] = useState([])
    const navigate = useNavigate()

    const loadRides = async() => {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/rides/history/${userData.id}`
        console.log(url)
        const response = await fetch(url)
        console.log(response)
        if (!response.ok){
            console.log('error with fetch')
        } else {
            const data = await response.json()
            console.log(data)
            setRides(data)
        }
    }

    const loadOneRide = (ride_id) => async() => {
        navigate(`${ride_id}`)
    }

    useEffect (() => {loadRides()}, [])

    return (
    <div className="container mt-4">
            <h1>All rides for {userData.username}</h1>
            {/* <div className='alert alert-warning d-none' id='err-not'>{err}</div> */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Roundtrip</th>
                        <th>Start Location</th>
                        <th>End location</th>
                        <th>Ride Status</th>
                        <th>Date</th>
                        <th>Vehicle</th>
                        <th>Comments</th>
                        <th>Driver Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map(ride => {
                        return (
                            <tr key={ride.id}>
                                <td>{ride.id}</td>
                                <td>{ride.account.first_name} {ride.account.last_name}</td>
                                <td>{ride.is_roundtrip}</td>
                                <td>{ride.start_location}</td>
                                <td>{ride.end_location}</td>
                                <td>{ride.ride_status}</td>
                                <td>{ride.datetime}</td>
                                <td>{ride.vehicle_info}</td>
                                <td>{ride.comments}</td>
                                <td>{ride.driver.first_name} {ride.driver.last_name}</td>
                                <td><button onClick={loadOneRide(ride.id)} className='btn btn-danger'>View</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>)
}

export default RideListbyAccount
