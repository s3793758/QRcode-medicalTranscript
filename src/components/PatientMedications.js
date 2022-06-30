import React from "react";

const PatientMedications = ({ patientMedications }) => {
  return (
    <>
      <h2>Patient Previous Medications</h2>
      <ul className="medication-list">
        {patientMedications.map((medication, _id) => {
          const {
            conditionDescription,
            physicalTreatment,
            treatmentPlan,
            updatedAt,
          } = medication;
          return (
            <li key={_id}>
              <div>Condition Description: {conditionDescription}</div>
              <div>Physical Treatment: {physicalTreatment}</div>
              <div>Treatment Plan: {treatmentPlan}</div>
              <div>
                Prescription Date:{" "}
                {new Date(updatedAt).toLocaleDateString("en-US")}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PatientMedications;
