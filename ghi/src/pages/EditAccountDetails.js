import { useState, useContext } from "react"
import { FormInputOptional } from "../components/Forms"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../components/UserContext.js";

const EditAccountDetails = () => {
    const {userData, setUserData} = useContext(UserContext)
    const [email, setEmail] = useState(userData.email);
    const [first_name, setFirstName] = useState(userData.first_name);
    const [last_name, setLastName] = useState(userData.last_name);
    const navigate = useNavigate();
    const id = userData.id
    const username = userData.username
    const is_employee = userData.is_employee
    const current_ride = userData.current_ride

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accountEdits = {};
        accountEdits.email = email;
        accountEdits.first_name = first_name;
        accountEdits.last_name = last_name;
        console.log(accountEdits)
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/accounts/${userData.username}`;
        const fetchConfig = {
            method: "PATCH",
            body: JSON.stringify(accountEdits),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok){
            setUserData({
            id,
            username,
            first_name,
            last_name,
            email,
            is_employee,
            current_ride,
          })
            setEmail("");
            setFirstName("");
            setLastName("");
        }
        navigate("/dashboard/account/details");
    }

    return(
        <>
            <div>
                <h1>
                    Edit Account Information
                </h1>
                <form onSubmit={handleSubmit} id="edit-account-form">
                    <FormInputOptional
                        id="email"
                        placeholder={`${userData && userData.email}`}
                        labelText="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                    />
                    <FormInputOptional
                        id="firstName"
                        placeholder={`${userData && userData.first_name}`}
                        labelText="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                    />
                    <FormInputOptional
                        id="lastName"
                        placeholder={`${userData && userData.last_name}`}
                        labelText="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                    />
                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </>
    )
}
export default EditAccountDetails
