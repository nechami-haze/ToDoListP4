// import axios from 'axios';

// // axios.defaults.baseURL = "http://localhost:5099/";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;


// export default {

//   getTasks: async () => {
//     try {
//       // בודק אם יש משימות שמורות ב-localStorage
//       const savedTasks = localStorage.getItem('tasks');
//       if (savedTasks) {
//         console.log("Loading tasks from localStorage:", JSON.parse(savedTasks));
//         return JSON.parse(savedTasks); // מחזיר את המשימות השמורות
//       }
  
//       const result = await axios.get(``);
//       console.log("Data received from API:", result.data); // לוג של הנתונים שהתקבלו
//       console.log("Response status:", result.status); // לוג של הסטטוס של הבקשה
  
//       // אם יש משימות, שומר אותן ב-localStorage
//       if (result.data.items && result.data.items.length > 0) {
//         localStorage.setItem('tasks', JSON.stringify(result.data.items));
//         return result.data.items; // מחזיר את המערך מתוך items
//       }
  
//       return []; // מחזיר מערך ריק אם אין משימות
//     } catch (err) {
//       console.error("Error fetching data from API:", err); // לוג של השגיאה במקרה של בעיה
//       return []; // מחזיר מערך ריק במקרה של שגיאה
//     }
//   },
  

//   addTask: async (name) => {
//     const item = { name: name };
//     console.log('addTask', name);
//     try {
//       const result = await axios.post(`post`, item);
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   },

//   setCompleted: async (id, isComplete) => {
//     const item = { id: id, isComplete: isComplete };
//     console.log('setCompleted', { id, isComplete });
//     try {
//       const result = await axios.put(`update`, item);
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       const result = await axios.delete(`delete/${id}`);
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   }
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////


// import axios from 'axios';

// // axios.defaults.baseURL = "http://localhost:5099/";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// export default {
//   getTasks: async () => {
//     try {
//       // בודק אם יש משימות שמורות ב-localStorage
//       const savedTasks = localStorage.getItem('tasks');
//       if (savedTasks) {
//         console.log("Loading tasks from localStorage:", JSON.parse(savedTasks));
//         return JSON.parse(savedTasks); // מחזיר את המשימות השמורות
//       }
  
//       const result = await axios.get(``);
//       console.log("Data received from API:", result.data); // לוג של הנתונים שהתקבלו
//       console.log("Response status:", result.status); // לוג של הסטטוס של הבקשה
  
//       // אם יש משימות, שומר אותן ב-localStorage
//       if (result.data.items && result.data.items.length > 0) {
//         localStorage.setItem('tasks', JSON.stringify(result.data.items));
//         return result.data.items; // מחזיר את המערך מתוך items
//       }
  
//       return []; // מחזיר מערך ריק אם אין משימות
//     } catch (err) {
//       console.error("Error fetching data from API:", err); // לוג של השגיאה במקרה של בעיה
//       return []; // מחזיר מערך ריק במקרה של שגיאה
//     }
//   },

//   addTask: async (name) => {
//     const item = { name: name };
//     console.log('addTask', name);
//     try {
//       const result = await axios.post(`post`, item);
//       // לאחר הוספת המשימה לשרת, נוסיף אותה ל-localStorage
//       const savedTasks = localStorage.getItem('tasks');
//       const tasks = savedTasks ? JSON.parse(savedTasks) : [];
//       tasks.push(result.data); // מוסיף את המשימה החדשה לרשימה
//       localStorage.setItem('tasks', JSON.stringify(tasks)); // שומר את הרשימה המעודכנת
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   },

//   setCompleted: async (id, isComplete) => {
//     const item = { id: id, isComplete: isComplete };
//     console.log('setCompleted', { id, isComplete });
//     try {
//       const result = await axios.put(`update`, item);
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   },

//   deleteTask: async (id) => {
//     try {
//       const result = await axios.delete(`delete/${id}`);
//       // לאחר מחיקת המשימה מהשרת, נעדכן את localStorage
//       const savedTasks = localStorage.getItem('tasks');
//       if (savedTasks) {
//         const tasks = JSON.parse(savedTasks).filter(task => task.id !== id);
//         localStorage.setItem('tasks', JSON.stringify(tasks)); // שומר את הרשימה המעודכנת
//       }
//       return result.data;
//     } catch (err) {
//       console.error("Error", err);
//     }
//   }
// };



///////////////////////////////////////////////////////////////////////////////////////////////////////////


import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default {
  getTasks: async () => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        console.log("Loading tasks from localStorage:", JSON.parse(savedTasks));
        return JSON.parse(savedTasks);
      }

      const result = await axios.get(``);
      console.log("Data received from API:", result.data);
      
      if (result.data.items && result.data.items.length > 0) {
        localStorage.setItem('tasks', JSON.stringify(result.data.items));
        return result.data.items;
      }

      return [];
    } catch (err) {
      console.error("Error fetching data from API:", err);
      return [];
    }
  },

  addTask: async (name) => {
    const item = { name: name };
    console.log('addTask', name);
    try {
      const result = await axios.post(`post`, item);
      const newTask = result.data; // קבלת המשימה החדשה מהשרת
      // עדכון localStorage
      const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      return newTask;
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
      // עדכון localStorage לאחר מחיקה
      let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      savedTasks = savedTasks.filter(task => task.id !== id); // מסנן את המשימה שנמחקה
      localStorage.setItem('tasks', JSON.stringify(savedTasks));
      return result.data;
    } catch (err) {
      console.error("Error", err);
    }
  }
};
