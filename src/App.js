import { AddTask } from "./components/AddTask/AddTask";
import { ListTask } from "./components/ListTask/ListTask";
import AppProvider from "./components/AppContext/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appstyle from "./app.css";

function App() {
  return (
    <div className="App">
      <div className="backgroundApp">
        <div className="appContent">
          <AppProvider>
            <h1 className="appTitle">Lista de Tarefas</h1>
            <AddTask></AddTask>
            <ListTask></ListTask>
            <ToastContainer />
          </AppProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
