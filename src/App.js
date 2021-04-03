import Board from "./components/Board";
import "bootstrap/dist/css/bootstrap.min.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const ENDPOINT = "http://localhost:3000";

function App() {

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </div>
  );
}

export { ENDPOINT };
export default App;
