import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [getCarsDb, setCarsDb] = useState([]);

  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("current-user-data");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    // hadii uu user uu jiro

    if (currentUser) {
      localStorage.setItem("current-user-data", JSON.stringify(currentUser));
    }

    // hadii empty uu yahay
    else {
      localStorage.removeItem("current-user-data");
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/api/owner/getAllCars?limit=6&skip=0");
        const data = await res.json();

        if (data.success) {
          setCarsDb(data.cars);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  // singinsuccess waxaa loo soo dhiwi doonaa userka login markaas loginka ah
  // markuu uu login success uu noqdo
  let signInSuccess = (user) => {
    setCurrentUser(user);
  };

  console.log("this is current page", currentUser);

  let signOutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("current-user-data");
  };

  const value = {
    currentUser,
    signInSuccess,
    signOutUser,
    setCarsDb,
    getCarsDb,
    pickupDate,
    setPickupDate,
    setReturnDate,
    returnDate,
  };

  // console.log("this is current user", currentUser)

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
