import React from "react";
import AddData from "./component/AddData.tsx"

function App() {
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center', flexDirection:"column"}}>
      <h1>Teste Crud</h1>
      <AddData />
    </div>
  );
}

export default App;
