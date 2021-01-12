import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "../models";
import { getUser } from "../network-util";
import { History } from "history";
import { Divider } from "antd";
import "./Profile.css";
import NoteDisplay from "./NoteDisplay";

interface ProfileProps {
  username: string,
  loggedInUser: string,
  history: History<unknown>
}

const Profile = ({ username, loggedInUser, history }: ProfileProps) => {
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
      {profile.assignedUser && (
        <h2>Assigned to: <a href={`/profile/${profile.assignedUser}`} onClick={(event) => {
          event.preventDefault();
          history.push(`/profile/${profile.assignedUser}`);
        }}>{profile.assignedUser}</a></h2>
      )}
      <Divider />
      <div className="address" style={{ textAlign: "left" }}>
        <h3>Address</h3>
        <p>{profile.address.line1}</p>
        {profile.address.line2 !== undefined && <p>{profile.address.line2}</p>}
        <p>{`${profile.address.city}, ${profile.address.usState} ${profile.address.zip}`}</p>
      </div>
      <Divider />
      {profile.notes !== undefined
        ? (
          <NoteDisplay
            notes={profile.notes}
            username={username}
            loggedInUser={loggedInUser}
            onNewNote={(id, message) => {
              setProfile({
                ...profile,
                notes: profile.notes && [...profile.notes, { id, message }]
              });
            }}
            onNoteDeleted={(id) => {
              setProfile({
                ...profile,
                notes: profile.notes && profile.notes.filter((note) => note.id !== id)
              });
            }} />
        )
        : <h3>Notes others left for you are hidden!</h3>}
    </div>
  );
}

export default Profile;
