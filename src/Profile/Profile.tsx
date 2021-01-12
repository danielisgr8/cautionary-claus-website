import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../models";
import { getUser } from "../network-util";

interface ProfileProps {
  username: string,
  loggedInUser: string
}

const Profile = ({ username, loggedInUser }: ProfileProps) => {
  const [profile, setProfile] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (username !== "" && loggedInUser !== "") {
      const call = async () => {
        try {
          setProfile(await getUser(username, loggedInUser));
        } catch (error) {
          toast.error(error.response.data);
        }
      };
      call();
    }
  }, [username, loggedInUser]);

  if (profile === undefined) return <div>Loading...</div>
  return (
    <div>
      <h1 style={{ marginBottom: "0.2rem" }}>{profile.username}</h1>
      <h2 style={{ marginBottom: "0.2rem" }}>{`${profile.firstName} ${profile.lastName}`}</h2>
      <div style={{ textAlign: "left" }}>
        <p>{profile.address.line1}</p>
        <p>{profile.address.line2}</p>
        <p>{`${profile.address.city}, ${profile.address.usState} ${profile.address.zip}`}</p>
      </div>
    </div>
  );
}

export default Profile;
