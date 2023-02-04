export const esLanguages = {
  US: "Inglés",
  ES: "Español",
  CN: "Chino (simplificado)",
  resultOption:
    "No encontramos ningún estudiante que coincida con tu búsqueda.Verifique la ortografía o intente crear un nuevo estudiante.",
  login_warning:
    "Es necesario iniciar sesión para acceder al formulario de registro de estudiantes.",
  error_404: "Error 404. Página no encontrada",
  error_students:
    "No pudimos encontrar un registro de estudiante asociado con su número de teléfono. Le recomendamos que cree un nuevo registro para su estudiante. Puede enviarnos un correo electrónico sobre este problema.",
  parent_coach_title: "Verificando su identidad. Espere por favor",
  parent_coach_option: "Verificando su identidad. Espere por favor",
  parent_option: "Padre/Tutor",
  coach_option: "Entrenador",
  new_option: "Nuevo",
  returning_option: "Existente",
  new_returning_option: "¿Está registrando un nuevo o existente estudiante?",
  new_returning_title:
    "Seleccione si está iniciando un nuevo registro de estudiante o actualizando el registro de un estudiante existente.",
  new_returning_sub_heading:
    "NOTA: Espere unos minutos antes de intentar ver o editar un nuevo registro.",
  steps_1: "Verificación de su rol",
  steps_2: "Seleccione nuevo o existente",
  steps_3: "Complete el formulario",
  button_continue: "CONTINUAR",
  button_back: "VOLVER",
  button_submit: "ENVIAR",
  logout_modal: {
    modal_title: "¿Estás seguro que deseas cerrar sesión?",
    modal_text: "Cualquier cambio realizado no será guardadado.",
    modal_cancel_button: "CANCELAR",
    modal_confirm_button: "CERRAR SESIÓN",
  },
  register_modal_success: {
    modal_title: "Registro exitoso",
    modal_text: "El estudiante ha sido registrado con éxito.",
    modal_footer:
      "Espere unos minutos antes de intentar ver o editar el nuevo registro.",
    modal_cancel_button: "AGREGAR OTRO ESTUDIANTE",
    modal_confirm_button: "FINALIZAR",
  },
  edit_modal_success: {
    modal_title: "Edición exitosa",
    modal_text: "El estudiante ha sido editado con éxito.",
    modal_cancel_button: "AGREGAR/EDITAR OTRO ESTUDIANTE",
    modal_confirm_button: "FINALIZAR",
  },
  error_modal: {
    error_500: {
      modal_title: "Error del servidor [500]",
      modal_text:
        "Hay un problema con nuestro servidor. Si esto persiste, por favor contáctenos " +
        '<a href="https://scoresu.org/contact" target="_blank">aquí</a> ',
      modal_close_button: "OK",
    },
    error_409: {
      modal_title: "Error del servidor [409]",
      modal_text:
        "El estudiante ya se encuentra registrado en el sistema, comuníquese con su entrenador o administrador.",
      modal_close_button: "OK",
    },
  },
  form: {
    required_fields: "El campo es obligatorio(*)",
    invalid_phone_number: "El número de teléfono no es válido",
    required_waiver: "Debe revisar y aceptar los términos y condiciones (*)",
    invalid_email: "El email no es válido",
    firstName_field: "Primer Nombre*",
    firstName_field_placeholder: "Ingrese primer nombre",
    middleName_field: "Segundo Nombre",
    middleName_field_placeholder: "Ingrese segundo nombre",
    lastName_field: "Apellido/s*",
    lastName_field_placeholder: "Ingrese apellido/s",
    schoolName_field: "Sitio del Programa SCORES*",
    schoolName_region_field: "Región*",
    schoolName_region_field_placeholder: "Seleccione...",
    schoolName_schoolname_field: "Nombre de Escuela*",
    schoolName_schoolname_field_placeholder: "Seleccione...",
    attendingSchool_field: "Escuela que asiste*",
    attendingSchool_field_placeholder: "Ingrese escuela que asiste",
    studentEmail_field: "Email del Estudiante",
    studentEmail_field_placeholder: "Ingrese email del estudiante",
    studentphoneNumber_field: "Teléfono del Estudiante",
    studentphoneNumber_field_placeholder: "Ingrese teléfono del estudiante",
    birthdate_field: "Fecha de Nacimiento*",
    birthdate_field_placeholder: "fecha de nacimiento",
    gender_field: "Género*",
    gender_field_placeholder: "Seleccione...",
    grade_field: "Nivel de Grado*",
    grade_field_placeholder: "Seleccione...",
    ethnicity_field: "Etnicidad*",
    ethnicity_field_placeholder: "Seleccione...",
    reducedPriceLunch_field:
      "¿Recibe su hijo(a) almuerzo gratis o con costo reducido?*",
    reducedPriceLunch_field_placeholder_confirm: "Sí",
    reducedPriceLunch_field_placeholder_denied: "No",
    allergies_field: "Alergias/Condiciones Médicas",
    allergies_field_placeholder: "Ingrese alergias/condiciones médicas",
    parentFName_field: "Primer Nombre del Padre/Tutor*",
    parentFName_field_placeholder: "Ingrese primer nombre del padre/tutor",
    parentLName_field: "Apellido del Padre/Tutor*",
    parentLName_field_placeholder: "Ingrese apellido del padre/tutor",
    parentEmail_field: "Email del Padre/Tutor*",
    parentEmail_field_placeholder: "Ingrese email del padre/tutor",
    relationship_field: "Parentesco con el Estudiante*",
    relationship_field_placeholder: "Seleccione...",
    parentPhone1_field: "Teléfono del Padre/Tutor 1*",
    parentPhone1_field_placeholder: "Ingrese el teléfono del padre/tutor 1",
    parentPhone2_field: "Teléfono del Padre/Tutor 2",
    parentPhone2_field_placeholder: "Ingrese el teléfono del padre/tutor  2",
    mailingStreet_field: "Dirección",
    mailingStreet_field_placeholder: "Ingrese la dirección",
    mailingCity_field: "Ciudad",
    mailingCity_field_placeholder: "Ingrese la ciudad",
    mailingState_field: "Estado/Provincia",
    mailingState_field_placeholder: "Ingrese el estado/provincia",
    mailingZip_field: "Código Postal",
    mailingZip_field_placeholder: "Ingrese el código postal",
    mailingCountry_field: "País",
    parentHomeLang_field: "Lengua Materna del Padre/Tutor*",
    parentHomeLang_field_placeholder: "Seleccione...",
    parentHomeLang_field_input_placeholder:
      "Ingrese la lengua materna del padre/tutor",
    volunteer_field:
      "¿Desea ser voluntario de este programa? (Parent/Guardian)",
    volunteer_field_placeholder_confirm: "Sí",
    volunteer_field_placeholder_denied: "No",
    emergency_Contact_Name_field:
      "Contacto en Caso de Emergencia (Otro que no sea el padre/tutor)*",
    emergency_Contact_Name_field_placeholder:
      "Ingrese el nombre del contacto de emergencia",
    emergency_Contact_Relationship_field:
      "Parentesco del Contacto de Emergencia con el Estudiante*",
    emergency_Contact_Relationship_field_placeholder: "Seleccione...",
    emergency_Contact_Phone1_field: "Teléfono de Emergencia 1*",
    emergency_Contact_Phone1_field_placeholder:
      "Ingrese teléfono de emergencia 1",
    emergency_Contact_Phone2_field: "Teléfono de Emergencia 2",
    emergency_Contact_Phone2_field_placeholder:
      "Ingrese teléfono de emergencia 2",
    second_Emergency_Contact_Name_field:
      "Nombre del Contacto de Emergencia Secundario",
    second_Emergency_Contact_Name_field_placeholder:
      "Ingrese el nombre del contacto de emergencia secundario",
    second_Emergency_Contact_Relationship_field:
      "Parentesco del Contacto de Emergencia Secundario con el Estudiante",
    second_Emergency_Contact_Relationship_field_placeholder: "Seleccione...",
    second_Emergency_Contact_Phone1_field:
      "Teléfono de Emergencia Secundario 1",
    second_Emergency_Contact_Phone1_field_placeholder:
      "Ingrese teléfono de emergencia secundario 1",
    second_Emergency_Contact_Phone2_field:
      "Teléfono de Emergencia Secundario 2",
    second_Emergency_Contact_Phone2_field_placeholder:
      "Ingrese teléfono de emergencia secundario 2",
    waiver_field: "Términos y Condiciones",
    waiver_field_button: "Mostrar términos y condiciones",
    formTitle1: "Detalles del Estudiante",
    formTitle2: "Información del Padre/Tutor",
    formTitle3:
      "Contacto en Caso de Emergencia (Otro que no sea el padre/tutor)",
    formTitle4:
      "Contacto Secundario en Caso de Emergencia ((Otro que no sea el padre/tutor y el Contacto Primario de emergencia)",
    requiredFieldsTitle: "Campos obligatorios faltantes :",
    genderArray: [
      {
        label: "Femenino",
        value: "Female",
      },
      {
        label: "Masculino",
        value: "Male",
      },
      {
        label: "No binario",
        value: "Non-binary",
      },
      {
        label: "Prefiero no decir",
        value: "Prefer not to say",
      },
    ],
    ethnicityArray: [
      {
        label: "Afroamericana",
        value: "African American",
      },
      {
        label: "Asiática",
        value: "Asian",
      },
      {
        label: "Caucásica",
        value: "Caucasian",
      },
      {
        label: "Filipina",
        value: "Filipino",
      },
      {
        label: "Hispana/Latinx",
        value: "Hispanic/Latinx",
      },
      {
        label: "Oriente Medio/Árabe",
        value: "Middle Eastern/Arabic",
      },
      {
        label: "Multirracial/Multiétnico",
        value: "Multi-Racial/Multi-Ethnic",
      },
      {
        label: "Nativa americana",
        value: "Native American",
      },
      {
        label: "Isleño del Pacífico",
        value: "Pacific Islander",
      },
    ],
    relationshipArray: [
      {
        label: "Padre/Madre",
        value: "Parent",
      },
      {
        label: "Tutor Legal ",
        value: "Legal Guardian",
      },
      {
        label: "Padre/Madre Adoptivo",
        value: "Foster Parent",
      },
      {
        label: "Abuela/o",
        value: "Grandparent",
      },
      {
        label: "Hermana/o/otro parentesco",
        value: "Sibling/Other relative",
      },
    ],
    parent_Home_Lang_Array: [
      {
        label: "Árabe",
        value: "Arabic",
      },
      {
        label: "Bengalí",
        value: "Bengali",
      },
      {
        label: "Chino",
        value: "Chinese (incl. Cantonese, Mandarin, other Chinese languages)",
      },
      {
        label: "Inglés",
        value: "English",
      },
      {
        label: "Francés",
        value: "French and French Creole",
      },
      {
        label: "Alemán",
        value: "German",
      },
      {
        label: "Griego",
        value: "Greek",
      },
      {
        label: "Guyaratí",
        value: "Gujarati",
      },
      {
        label: "Hebreo",
        value: "Hebrew",
      },
      {
        label: "Hindi",
        value: "Hindi",
      },
      {
        label: "Hmong",
        value: "Hmong",
      },
      {
        label: "Italiano",
        value: "Italian",
      },
      {
        label: "Japones",
        value: "Japanese",
      },
      {
        label: "Koreano",
        value: "Korean",
      },
      {
        label: "Persa",
        value: "Persian",
      },
      {
        label: "Polaco",
        value: "Polish",
      },
      {
        label: "Portugues",
        value: "Portuguese",
      },
      {
        label: "Punjabi",
        value: "Punjabi",
      },
      {
        label: "Ruso",
        value: "Russian",
      },
      {
        label: "Español",
        value: "Spanish",
      },
      {
        label: "Tagalo",
        value: "Tagalog",
      },
      {
        label: "Telugu",
        value: "Telugu",
      },
      {
        label: "Urdu",
        value: "Urdu",
      },
      {
        label: "Vietnamita",
        value: "Vietnamese",
      },
      {
        label: "Otro",
        value: "Other",
      },
    ],
    waiverModal_confirm: "Aceptar",
    waiverModal_denied: "Rechazar",
  },
  searchStudent: {
    title_parents: "Selecciona un estudiante para editar su información.",
    modal_title: "Eliminar Estudiante",
    modal_text:
      "Comuníquese con su administrador de Scores para obtener ayuda para eliminar el registro de un estudiante",
    modal_close_button: "Ok",
    title: "Buscar estudiante por Nombre/Apellido",
    inputProps: "buscar estudiante",
    inputPlaceholder: "Buscar...",
    tableOptions: {
      firstName: "Primer nombre",
      lastName: "Apellido",
      birthdate: "Fecha de Nacimiento",
      schoolName: "Escuela",
      actions: "Acciones",
    },
  },
};
