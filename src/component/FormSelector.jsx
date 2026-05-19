import { useState } from "react";
import EnquiryForm from "./EnquiryForm";
import  AdmissionForm from "./AdmissionForm";
function FormSelector() {
  const [formType, setFormType] = useState("admission"); // default admission

  return (
    <div className="form-selector-container">
      <div className="form-selector">
      <h1>Select Form</h1>

      {/* Radio Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            name="formType"
            value="admission"
            checked={formType === "admission"}
            onChange={(e) => setFormType(e.target.value)}
          />
          Admission
        </label>

        <label style={{ marginLeft: "20px" }}>
          <input
            type="radio"
            name="formType"
            value="enquiry"
            checked={formType === "enquiry"}
            onChange={(e) => setFormType(e.target.value)}
          />
          Enquiry
        </label>
      </div>        
       {/* Conditional Rendering  */}
      {formType === "admission" && <AdmissionForm/>}
      {formType === "enquiry" && <EnquiryForm/>}
</div>
    </div>
  );
}

export default FormSelector;
