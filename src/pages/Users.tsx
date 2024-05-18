import { useQuery } from "@apollo/client"
import { GET_USERS_QUERY } from "../queries/userQueries"
import { useNavigate } from "react-router-dom"
import FullPageSpinner from "../components/FullPageSpinner"

export default function Users() {
  const navigate = useNavigate()
  const { data, loading } = useQuery(GET_USERS_QUERY)

  function handleDoubleClick(user: { id: string }) {
    navigate(`/users/${user.id}`);
  }

  return (
    <>
    <div className="m-4">
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user) => (
            <tr key={user.id} onDoubleClick={() => handleDoubleClick(user)}>
              <th>{ user.name }</th>
              <th>{ user.email }</th>
              <th>{ user.verified }</th>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
    {loading && <FullPageSpinner></FullPageSpinner>}
    </>
  )
}
