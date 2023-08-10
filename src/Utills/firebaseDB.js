import { database } from "../firebase";
import { get, ref } from "firebase/database"; 


export const getUserDetails = async(userId) => {
    try {
      const dbRef = ref(database, `Customer/${userId}`);
      const snapshot = await get(dbRef);
      const userData = snapshot.val();
  
      return userData;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null; 
    }
  }


  export const getServiceProviderDetails = async(userId) => {
    try {
      const dbRef = ref(database, `serviceProvider/${userId}`);
      const snapshot = await get(dbRef);
      const userData = snapshot.val();
  
      return userData;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  }