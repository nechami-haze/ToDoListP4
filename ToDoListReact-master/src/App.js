import React, { useEffect, useState } from 'react'; // מייבא את React ואת ה-Hooks useEffect ו-useState
import service from './service.js'; // מייבא מודול service שמכיל פונקציות לעבודה עם API

function App() {
  const [newTodo, setNewTodo] = useState(""); // יוצר מצב חדש בשם newTodo עם ערך התחלתי של מחרוזת ריקה
  const [todos, setTodos] = useState([]); // יוצר מצב חדש בשם todos עם ערך התחלתי של מערך ריק

  async function getTodos() { // פונקציה אסינכרונית שמביאה את רשימת המשימות
    const todos = await service.getTasks(); // קורא לפונקציה getTasks מהמודול service
    setTodos(todos); // מעדכן את המצב של todos עם הרשימה שהתקבלה
  }

  async function createTodo(e) { // פונקציה אסינכרונית שמביאה להוספת משימה חדשה
    e.preventDefault(); // מונע את ברירת המחדל של שליחת הטופס
    await service.addTask(newTodo); // קורא לפונקציה addTask כדי להוסיף את המשימה החדשה
    setNewTodo(""); // מאפס את הקלט לאחר ההוספה
    await getTodos(); // מעדכן את רשימת המשימות כדי לכלול את המשימה החדשה
  }

  async function updateCompleted(todo, isComplete) { // פונקציה אסינכרונית שמעדכנת את מצב ההשלמה של משימה
    await service.setCompleted(todo.id, isComplete); // קורא לפונקציה setCompleted כדי לעדכן את המצב
    await getTodos(); // מעדכן את רשימת המשימות לאחר העדכון
  }

  async function deleteTodo(id) { // פונקציה אסינכרונית שמוחקת משימה לפי מזהה
    await service.deleteTask(id); // קורא לפונקציה deleteTask כדי למחוק את המשימה
    await getTodos(); // מעדכן את רשימת המשימות לאחר המחיקה
  }

  useEffect(() => { // שימוש ב-Hook useEffect כדי לקרוא לפונקציה getTodos כאשר הרכיב נטען לראשונה
    getTodos(); // קורא לפונקציה getTodos
  }, []); // המערך הריק מציין שהפונקציה תופעל רק בפעם הראשונה

  return ( // מחזיר את התצוגה של רכיב ה-App
    <section className="todoapp">
      <header className="header">
        <h1 style={{fontFamily:'Comic Sans MS'}}>My tasks</h1>
        <form onSubmit={createTodo}> 
          <input className="new-todo" style={{textAlign:'center'}} placeholder="You Do It 👍" step={{color:'turquoise'}} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => { // ממפה את רשימת המשימות
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App; // מייצא את רכיב ה-App
