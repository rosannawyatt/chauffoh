import { Link } from "react-router-dom"

const UserAccountDetails = ({ userData }) => {
    return(
        <>
            <div>
                <h1>
                    Account Details
                </h1>
                <div>
                    <p>
                        Username: {userData && userData.username}
                    </p>
                    <p>
                        Email: {userData && userData.email}
                    </p>
                    <p>
                        First Name: {userData && userData.first_name}
                    </p>
                    <p>
                        Last Name: {userData && userData.last_name}
                    </p>
                </div>
                <div>
                    <Link to="/dashboard/edit/account">
                        <button>Edit Account Information</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default UserAccountDetails
