import React, { createContext, useState } from 'react';

export const UserContext = createContext(undefined);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: 'admin' } ou { role: 'student' }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
