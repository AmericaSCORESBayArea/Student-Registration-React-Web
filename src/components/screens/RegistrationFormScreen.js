import React, { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import { parentContainer } from "../componentsStyle/registrationFormStyle";
export default function RegistrationFormScreen() {
  return (
    <div className={parentContainer}>
      <RegistrationForm />
    </div>
  );
}
