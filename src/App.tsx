import { ExperienceTest } from "./pages/ExperienceTest"
import { ReactFlowProvider } from "@xyflow/react"
function App() {

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <ExperienceTest />
      </ReactFlowProvider>
    </div>
  )
}

export default App
