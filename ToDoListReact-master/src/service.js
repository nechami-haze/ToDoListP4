import axios from 'axios';

// axios.defaults.baseURL = "http://localhost:5099/";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;


export default {

  // getTasks: async () => {
  //   try {
  //     const result = await axios.get(``);
  //     return result.data || []; // מחזיר מערך ריק אם result.data הוא undefined
  //   } catch (err) {
  //     console.error("Error", err);
  //     return []; // מחזיר מערך ריק במקרה של שגיאה
  //   }
  // },

  // getTasks: async () => {
  //   try {
  //     const result = await axios.get(``);
  //     console.log("Data received from API:", result.data); // לוג של הנתונים שהתקבלו
  //     console.log("Response status:", result.status); // לוג של הסטטוס של הבקשה
  //     return result.data || []; // מחזיר מערך ריק אם result.data הוא undefined
  //   } catch (err) {
  //     console.error("Error fetching data from API:", err); // לוג של השגיאה במקרה של בעיה
  //     return []; // מחזיר מערך ריק במקרה של שגיאה
  //   }
  // },
  
  getTasks: async () => {
    try {
      const result = await axios.get(``);
      console.log("Data received from API:", result.data); // לוג של הנתונים שהתקבלו
      console.log("Response status:", result.status); // לוג של הסטטוס של הבקשה
      return result.data.items || []; // מחזיר את המערך מתוך items, או מערך ריק אם הוא לא קיים
    } catch (err) {
      console.error("Error fetching data from API:", err); // לוג של השגיאה במקרה של בעיה
      return []; // מחזיר מערך ריק במקרה של שגיאה
    }
  },
  


  addTask: async (name) => {
    const item = { name: name };
    console.log('addTask', name);
    try {
      const result = await axios.post(`post`, item);
      return result.data;
    } catch (err) {
      console.error("Error", err);
    }
  },

  setCompleted: async (id, isComplete) => {
    const item = { id: id, isComplete: isComplete };
    console.log('setCompleted', { id, isComplete });
    try {
      const result = await axios.put(`update`, item);
      return result.data;
    } catch (err) {
      console.error("Error", err);
    }
  },

  deleteTask: async (id) => {
    try {
      const result = await axios.delete(`delete/${id}`);
      return result.data;
    } catch (err) {
      console.error("Error", err);
    }
  }
};
