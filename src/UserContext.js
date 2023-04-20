import { createContext } from "react";

const UserContext = createContext(null);

// import the above into App

export { UserContext };

// wrap this around whatever items you wish to give context to
// <UserContext.Provider  value="hello from context">
// anything wrapped by the provider will have the value passed to it
// </UserContext.Provider>

//const Index = () => { const msg= useContext(UserContext)}

// https://www.youtube.com/watch?v=lhMKvyLRWo0
