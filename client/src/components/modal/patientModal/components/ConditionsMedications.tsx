import { useContext, useState } from "react";
import "./ConditionsMedications.css";
import useConditionsMedicines from "../../../../hooks/useMedicalConditionsMedicines";
import useConditionsMedicines2 from "../../../../hooks/useMedicalConditionsMedicines";
import ThemeContext from "../../../../context/ThemeProvider";

type propsType = {
  conditions: string[];
  setConditions: React.Dispatch<React.SetStateAction<string[]>>;
  medication: boolean;
  medications: string[];
  setMedications: React.Dispatch<React.SetStateAction<string[]>>;
};

const ConditionsMedications = ({
  conditions,
  setConditions,
  medication,
  medications,
  setMedications,
}: propsType) => {
  const [conditionMedication, setConditionMedication] = useState<string>("");
  const medicalMedications = useConditionsMedicines(conditionMedication, false);
  const medicines = useConditionsMedicines2(conditionMedication, true);
  const {darkMode} = useContext(ThemeContext)

  function addConditionMedication(event: React.KeyboardEvent<HTMLDivElement>) {
    if (conditionMedication && event.key === "Enter") {
      if (medication) {
        setMedications([...medications, conditionMedication]);
      } else {
        setConditions([...conditions, conditionMedication]);
      }
      setConditionMedication("");
    }
  }

  function addConditionMedicationClick() {
    if (conditionMedication) {
      if (medication) {
        setMedications([...medications, conditionMedication]);
      } else {
        setConditions([...conditions, conditionMedication]);
      }
      setConditionMedication("");
    }
  }

  return (
    <div className="conditions_medications_container" id={darkMode ? 'dark_conditions_medications_container':''}>
      <div className="search_container">
        <label htmlFor="conditionMedication">
          {medication ? "Medication:" : "Conditions:"}
        </label>
        <input
          type="search"
          list={medication ? "medicines" : "conditionMedication"}
          value={conditionMedication}
          onChange={(e) => {
            setConditionMedication(e.target.value);
          }}
          onKeyDown={addConditionMedication}
        />
        {medication ? (
          <datalist id="medicines">
            {medicines &&
              medicines.map((value, index) => {
                return <option key={index} value={value} />;
              })}
          </datalist>
        ) : (
          <datalist id="conditionMedication">
            {medicalMedications &&
              medicalMedications.map((value, index) => {
                return <option key={index} value={value} />;
              })}
          </datalist>
        )}
        <img
          src="plus_white.png"
          alt="add medication icon"
          className={"add_condition_medication " + (conditionMedication ? "add_condition_medication_active" : "add_condition_medication_inactive")}
          onClick={addConditionMedicationClick}
        />
      </div>
      <ul>
        {medication
          ? medications.map((medication, index) => {
              return (
                <li key={index}>
                  {medication}
                  <img
                    src="minus.png"
                    alt="minus icon"
                    className="minus_button"
                    onClick={() => {
                      setMedications(
                        medications.filter(function removeConditionMedication(
                          x
                        ) {
                          return x !== medication;
                        })
                      );
                    }}
                  />
                </li>
              );
            })
          : conditions.map((condition, index) => {
              return (
                <li key={index}>
                  {condition}
                  <img
                    src="minus.png"
                    alt="minus icon"
                    className="minus_button"
                    onClick={() => {
                      setConditions(
                        conditions.filter(function removeConditionMedication(
                          x
                        ) {
                          return x !== condition;
                        })
                      );
                    }}
                  />
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default ConditionsMedications;
