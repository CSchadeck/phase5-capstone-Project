import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserProfileUpdate from './UserProfileUpdate';
import UserCard from './UserCard';


function UserProfile({ user, setUser, env }) {
    const [cards, setCards] = useState([]);
    const [members, setMembers] = useState([])

    useEffect(() => {
        fetch(`/users`)
            .then(r => r.json())
            .then(data => {
                setMembers(data);
                setCards(user.requests);
            });
    }, []);

    return (
        <>
            <h1 className="text-center">Profile Page</h1>

            <div>
                <div key={user.id} className="user-card">
                    <h2 className="user_card_username">{user.username}</h2>
                    <p className="user_card_email">Email: {user.email}</p>
                    <p className="user_card_bio">Bio: {user.bio}</p>
                    {/* <UserProfileUpdate handleUpdateUser={handleUpdateUser}/> */}
                </div>

                <div className='user-cards'>
                    <h2 className='text-center'>User Requests</h2>
                    <div className='user-cards__status  text-center'>
                        <div className='text-center user-cards--accepted'>Accepted: {
                            cards.filter((card) => card.accepted).length}</div>
                        <div className='user-cards--open'>Open: {cards.filter((card) => !card.accepted).length
                        }</div>
                    </div>
                    {
                        cards.length === 0 ? <div>No requests at this time.</div> : cards.map((card) =>
                            <UserCard key={card.id} props={card} user={user} members={members} />
                        )}
                </div>
            </div>
        </>
    )


}

export default UserProfile