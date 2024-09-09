import React, { useState } from "react";
import Button from "@mui/material/Button";
import Expenses from  "../../../../Components/Expenses";
import Incomes from "../../../../Components/Incomes";


const DataEntry = () => {
  const [activeSection, setActiveSection] = useState("expenses");

  return (
    <div>
      {/* Button Section */}
      <div className="row">
        <div className="col-12 mt-4 text-center">
          <Button
            className={`custom-btn ms-2 ${
              activeSection === "expenses" ? "active" : ""
            }`}
            onClick={() => setActiveSection("expenses")}
          >
            Expenses
          </Button>
          <Button
            className={`custom-btn ms-5 ${
              activeSection === "incomes" ? "active" : ""
            }`}
            onClick={() => setActiveSection("incomes")}
          >
            Incomes
          </Button>
        </div>
      </div>

 
      {activeSection === "expenses" && <Expenses />}
      {activeSection === "incomes" && <Incomes />}
    </div>
  );
};

export default DataEntry;
