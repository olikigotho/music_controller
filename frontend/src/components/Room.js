import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Room = (
) => {
    const { roomCode } = useParams(); // Retrieves the room code from the URL parameter using the "useParams" hook

    const [votesToSkip, setVotesToSkip] = useState(2); // Defines a state variable for the number of votes required to skip a song
    const [guestCanPause, setGuestCanPause] = useState(false); // Defines a state variable for whether guests can control playback
    const [isHost, setIsHost] = useState(false); // Defines a state variable for whether the user is the host of the room

    const getRoomDetails = () => {
    // Fetches room details from the backend API based on the room code
    fetch('/api/get-room' + '?code=' + roomCode)
        // returns without return statment since it's one line
        // Converts the response to JSON
        .then((response) => response.json())
        .then((data) => {
            // Updates the state variables with the retrieved room details
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);

        });
    }
    useEffect(() => {
         // Executes the "getRoomDetails" function when the component mounts
        getRoomDetails();
      }, []); 
    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: { votesToSkip }</p>
            <p>Guest Can Pause: { guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}

export default Room