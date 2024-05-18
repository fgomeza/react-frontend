import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

import { GET_USER_QUERY, UPDATE_USER_MUTATION } from "../queries/userQueries";
import { useEffect, useState } from "react";
import FullPageSpinner from "../components/FullPageSpinner";

type Params = {
  userId: string;
};

export default function User() {
  const { userId } = useParams<Params>();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [verified, setVerified] = useState(false)
  const { data, loading: queryLoading } = useQuery(GET_USER_QUERY, {
    variables: {
      id: userId!,
    },
  });

  const [callUpdateUser, { loading: mutationLoading }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      updateUserId: userId!,
      edits: {
        email,
        name
      }
    }
  })

  useEffect(() => {
    console.log("hello")
    setName(data?.user.name || '');
    setEmail(data?.user.email || '');
    setVerified(data?.user.verified || false);
  }, [data])

  function verifiedText(verified?: boolean) {
    return verified ? "Yes" : "No"
  }

  function handleSaveChanges() {
    callUpdateUser()
  }

  function isLoading() {
    return queryLoading || mutationLoading;
  }

  return (
    <>
      <div className="m-4 p-2 card w-96">
        <form onSubmit={handleSaveChanges}>
          <fieldset disabled={isLoading()}>
            <div className="grid grid-cols-2 gap-2">
              <span>User Name</span>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>
              <span>User Email</span>
              <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <span>User Verified</span>
              <span className="flex justify-around">
                <span>{verifiedText(verified)}</span>
                {verified && <i className="bi bi-check-circle-fill text-green-600 text-lg"></i>}
                {!verified && <button type="button" className="btn btn-primary btn-sm">Verify</button>}
              </span>
              <button type="button" className="btn btn-primary">Change Password</button>
              <span></span>
            </div>
            <div className="grid grid-cols-1 mt-4 mb-2 mx-8">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </fieldset>
        </form>
      </div>
      {isLoading() && <FullPageSpinner></FullPageSpinner>}
    </>
  );
}
