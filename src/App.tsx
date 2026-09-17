import DentistLanding from "./pages/DentistLanding";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <DentistLanding />
    </TooltipProvider>
  );
}

export default App;
