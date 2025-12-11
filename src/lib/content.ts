export type Language = "en" | "es";

export interface WaiverContent {
  en: string;
  es: string;
}

export const waiverContent: WaiverContent = {
  en: `## SHOWER and LAUNDRY PROGRAM RELEASE FROM LIABILITY

I agree that I, my successors, assignees, heirs, insurers, agents, guardians and legal representatives waive and release any rights, actions, or causes of action against Hope's Corner, Inc., its officers, directors and employees, and any of Hope's Corner, Inc. volunteers or recipients of Hope's Corner services (collectively, the "Released Parties") for injury, death, loss of use, damages arising out of or resulting from the acts or omissions of acts of any person or entity or my activities as a shower program and/or laundry program participant. This includes, without limitation, negligence of any of the Released Parties, whether active or passive, sole or cooperative, or other negligence, however caused, arising from or relating to Hope's Corner or my participation with Hope's Corner in any way. I understand that Hope's Corner would not allow me to participate as a shower program and/or laundry program client without my agreeing to this waiver and release and the other terms of this agreement.

I release and forever discharge the Released Parties from any claim whatsoever arising, or that may arise, on account of any first aid, treatment, or medical service, including the lack of such or timing of such, rendered in connection with my participation as a shower program client.

I acknowledge that an inherent risk of exposure to the disease COVID-19 and any other communicable or infectious disease, exists in any public place where people are present. No precautions can eliminate the risk of exposure to communicable or infectious diseases, and the risk of exposure applies to everyone. I acknowledge that the risk of exposure includes the risk that I will expose others that I later encounter, even if I am not experiencing or displaying any symptoms of illness myself. By visiting and/or participating in Hope's Corner's in-person services I agree to voluntarily assume any and all risks in any way related to exposure to COVID-19 and any other communicable or infectious disease, including illness, injury, or death of myself or others, and including without limitation, all risks based on the sole, joint, active or passive negligence of any of the Released Parties, named below. I acknowledge that my participation is entirely voluntary.

If any provision in this Agreement is held invalid or unenforceable, the other provisions will remain enforceable, and the invalid or unenforceable provision will be considered modified so that it is valid and enforceable to the maximum extent permitted by law. I understand that this agreement will survive the termination of my participation and the assignment of this Agreement by Hope's Corner to any successor or other assignee and will be binding upon my heirs and legal representatives.

**I (PARTICIPANT) FOR MYSELF AND ANY MINOR CHILDREN FOR WHICH I AM PARENT, LEGAL GUARDIAN OR OTHERWISE RESPONSIBLE, HAVE READ THIS ENTIRE RELEASE, I FULLY UNDERSTAND IT, AND I AGREE TO BE LEGALLY BOUND BY IT.**

## ELECTRONIC SIGNATURE AGREEMENT

By entering my full name and initials in the form below, I agree that my electronic signature is the legally binding equivalent of my handwritten signature. I will not contest the legally binding nature, validity, or enforceability of this agreement based on the fact that I signed it electronically. I understand that I have the right to request a paper copy of this waiver by contacting Hope's Corner directly, and that signing electronically does not diminish my rights under this agreement.`,

  es: `## EXENCIÓN DE RESPONSABILIDAD DEL PROGRAMA DE DUCHAS y LAVANDERÍA

Acepto que yo, mis sucesores, cesionarios, herederos, aseguradores, agentes, tutores y representantes legales renuncio y libero cualquier derecho, acción o causa de acción contra Hope's Corner, Inc., sus funcionarios, directores y empleados, y cualquiera de los voluntarios o beneficiarios de los servicios de Hope's Corner, Inc. (colectivamente, las "Partes Exoneradas") por lesiones, muerte, pérdida de uso, daños que surjan de o resulten de los actos u omisiones de actos de cualquier persona o entidad o mis actividades como participante del programa de duchas y/o lavandería. Esto incluye, sin limitación, la negligencia de cualquiera de las Partes Exoneradas, ya sea activa o pasiva, única o cooperativa, u otra negligencia, cualquiera que sea su causa, que surja de o se relacione con Hope's Corner o mi participación con Hope's Corner de cualquier manera. Entiendo que Hope's Corner no me permitiría participar como cliente del programa de duchas y/o lavandería sin mi aceptación de esta exención y liberación y los demás términos de este acuerdo.

Libero y descargo para siempre a las Partes Exoneradas de cualquier reclamo que surja, o pueda surgir, a causa de cualquier primer auxilio, tratamiento o servicio médico, incluida la falta de este o el momento de este, prestado en conexión con mi participación como cliente del programa de duchas.

Reconozco que existe un riesgo inherente de exposición a la enfermedad COVID-19 y cualquier otra enfermedad comunicable o infecciosa en cualquier lugar público donde haya personas presentes. Ninguna precaución puede eliminar el riesgo de exposición a enfermedades comunicables o infecciosas, y el riesgo de exposición se aplica a todos. Reconozco que el riesgo de exposición incluye el riesgo de que exponga a otros que encuentre más tarde, incluso si no estoy experimentando o mostrando ningún síntoma de enfermedad. Al visitar y/o participar en los servicios presenciales de Hope's Corner, acepto asumir voluntariamente todos y cada uno de los riesgos relacionados de cualquier manera con la exposición a COVID-19 y cualquier otra enfermedad comunicable o infecciosa, incluyendo enfermedad, lesión o muerte mía o de otros, e incluyendo sin limitación, todos los riesgos basados en la negligencia única, conjunta, activa o pasiva de cualquiera de las Partes Exoneradas, nombradas a continuación. Reconozco que mi participación es enteramente voluntaria.

Si alguna disposición de este Acuerdo se considera inválida o inaplicable, las demás disposiciones seguirán siendo aplicables, y la disposición inválida o inaplicable se considerará modificada para que sea válida y aplicable en la máxima medida permitida por la ley. Entiendo que este acuerdo sobrevivirá a la terminación de mi participación y la cesión de este Acuerdo por parte de Hope's Corner a cualquier sucesor u otro cesionario y será vinculante para mis herederos y representantes legales.

**YO (PARTICIPANTE) POR MÍ MISMO Y POR CUALQUIER HIJO MENOR DEL CUAL SOY PADRE/MADRE, TUTOR LEGAL U OTRO RESPONSABLE, HE LEÍDO ESTA EXENCIÓN COMPLETA, LA ENTIENDO TOTALMENTE Y ACEPTO ESTAR LEGALMENTE OBLIGADO POR ELLA.**

## ACUERDO DE FIRMA ELECTRÓNICA

Al ingresar mi nombre completo e iniciales en el formulario a continuación, acepto que mi firma electrónica es legalmente equivalente a mi firma manuscrita. No impugnaré la naturaleza legalmente vinculante, validez o aplicabilidad de este acuerdo basándome en el hecho de que lo firmé electrónicamente. Entiendo que tengo derecho a solicitar una copia en papel de esta exención contactando directamente a Hope's Corner, y que firmar electrónicamente no disminuye mis derechos bajo este acuerdo.`,
};

export const getAgreementContent = (year: number): WaiverContent => ({
  en: `## ${year} PARTICIPANT AGREEMENT

The shower and laundry services are reserved for **unhoused** individuals.

- Guests will make a reservation for a shower and/or laundry appointment during the meal program. Appointment times are available on a first-come, first-serve basis and are available for the current day only. When all appointment times are filled, participants will be offered the opportunity to join the waitlist.
- Participants will complete the Liability Waiver and Participant Agreement before using the program for the first time. An updated agreement and/or waiver may be needed from time-to-time if required by City, State or County requirements. Participants must complete other documentation or health screenings if required by the County Health Department.
- Participants must comply with County Health Guidelines to participate in the program. Participants experiencing any symptoms of illness are not to enter the property.
- Participants will be onsite and ready for their appointment at least 5 minutes before their scheduled time. Late arrival will result in forfeiture of the appointment.
- Hope's Corner is committed to providing an environment free of discrimination, harassment, inappropriate language or behavior. All participants are expected to use polite language, follow instructions without arguing and follow program rules. Any violation will result in consequences up to and including suspension and/or permanent ban from utilizing services at Hope's Corner.
- Shower participants are allowed a maximum of 15 minutes in the shower room. Shower water usage is limited to a maximum of 5 minutes of running water time.
- Leave the shower room clean. Use your towel to wipe down the sink and other wet areas, dry the floor, remove all personal belongings, place trash in the garbage bin. Inform staff when you are done so the room can be checked for cleanliness. Place your used towel and bathmat in the designated laundry bin when done.
- Please do not flush anything but toilet tissue down the toilets.
- Laundry times will be assigned on a first-come, first-serve basis and are only available on a same day basis. If the onsite laundry program is filled for the day, participant will be offered the option to have one load of laundry cleaned offsite and returned to Hope's Corner for participant to pick up on the next program day. The program is only available if all onsite laundry appointments are filled for the day.
- To avoid damage to the equipment, be sure to empty all pockets. We cannot wash bulky items (blankets, pillows, sleeping bags, etc.), extremely dirty items, items with loose parts or pieces, metal items, shoes, or other hard materials.
- All laundry is washed in hot water and dried on high heat. All colors are washed together.
- Hope's Corner laundry (aprons, bath towels, kitchen towels, etc.) will be added to participant laundry load when space allows. We will never add items that belong to another participant.
- We will do our best to complete participant laundry on the same day, however this is not guaranteed. If you need your laundry the same day, do not utilize this service.
- Laundry left for more than 1 week will be donated or discarded.
- Absolutely no smoking, vaping, alcohol, drugs, weapons or animals (except certified service animals) are permitted on the premises.
- Please notify a staff or volunteer if you notice anything in need of repair or maintenance while utilizing the program.
- Hope's Corner, Inc, volunteers and staff are not responsible for lost or stolen property.

**I agree to follow the shower and laundry program rules and acknowledge that any violation of the rules will result in suspension and/or exclusion from future use of the showers and/or laundry.**`,

  es: `## ACUERDO DE PARTICIPANTE ${year}

Los servicios de ducha y lavandería están reservados para personas **sin hogar**.

- Los invitados harán una reserva para una cita de ducha y/o lavandería durante el programa de comidas. Los horarios de citas están disponibles por orden de llegada y están disponibles solo para el día actual. Cuando se llenan todos los horarios de citas, se ofrecerá a los participantes la oportunidad de unirse a la lista de espera.
- Los participantes completarán la Exención de Responsabilidad y el Acuerdo de Participante antes de usar el programa por primera vez. Es posible que se necesite un acuerdo y/o exención actualizado de vez en cuando si lo requieren los requisitos de la Ciudad, el Estado o el Condado. Los participantes deben completar otra documentación o exámenes de salud si lo requiere el Departamento de Salud del Condado.
- Los participantes deben cumplir con las Directrices de Salud del Condado para participar en el programa. Los participantes que experimenten cualquier síntoma de enfermedad no deben ingresar a la propiedad.
- Los participantes estarán en el lugar y listos para su cita al menos 5 minutos antes de la hora programada. La llegada tardía resultará en la pérdida de la cita.
- Hope's Corner se compromete a proporcionar un ambiente libre de discriminación, acoso, lenguaje o comportamiento inapropiado. Se espera que todos los participantes usen un lenguaje educado, sigan instrucciones sin discutir y sigan las reglas del programa. Cualquier violación resultará en consecuencias que pueden incluir la suspensión y/o prohibición permanente de utilizar los servicios en Hope's Corner.
- Los participantes de la ducha tienen un máximo de 15 minutos en la sala de duchas. El uso del agua de la ducha está limitado a un máximo de 5 minutos de tiempo de agua corriente.
- Deje la sala de duchas limpia. Use su toalla para limpiar el lavabo y otras áreas mojadas, seque el piso, retire todas sus pertenencias personales, coloque la basura en el bote de basura. Informe al personal cuando haya terminado para que se pueda verificar la limpieza de la habitación. Coloque su toalla y alfombra de baño usadas en el contenedor de ropa designado cuando termine.
- Por favor, no tire nada más que papel higiénico por los inodoros.
- Los horarios de lavandería se asignarán por orden de llegada y solo están disponibles el mismo día. Si el programa de lavandería en el sitio está lleno para el día, al participante se le ofrecerá la opción de tener una carga de ropa lavada fuera del sitio y devuelta a Hope's Corner para que el participante la recoja el próximo día del programa. El programa solo está disponible si todos los citas de lavandería en el sitio están llenas para el día.
- Para evitar daños al equipo, asegúrese de vaciar todos los bolsillos. No podemos lavar artículos voluminosos (mantas, almohadas, sacos de dormir, etc.), artículos extremadamente sucios, artículos con piezas sueltas, artículos metálicos, zapatos u otros materiales duros.
- Toda la ropa se lava con agua caliente y se seca con calor alto. Todos los colores se lavan juntos.
- La ropa de Hope's Corner (delantales, toallas de baño, toallas de cocina, etc.) se agregará a la carga de lavandería del participante cuando el espacio lo permita. Nunca agregaremos artículos que pertenezcan a otro participante.
- Haremos todo lo posible para completar la lavandería del participante el mismo día, sin embargo, esto no está garantizado. Si necesita su lavandería el mismo día, no utilice este servicio.
- La ropa dejada por más de 1 semana será donada o descartada.
- Absolutamente no se permite fumar, vapear, alcohol, drogas, armas o animales (excepto animales de servicio certificados) en las instalaciones.
- Por favor notifique a un miembro del personal o voluntario si nota algo que necesite reparación o mantenimiento mientras utiliza el programa.
- Hope's Corner, Inc, los voluntarios y el personal no son responsables de la propiedad perdida o robada.

**Acepto seguir las reglas del programa de duchas y lavandería y reconozco que cualquier violación de las reglas resultará en la suspensión y/o exclusión del uso futuro de las duchas y/o lavandería.**`,
});

export const translations = {
  en: {
    selectLanguage: "Select Language",
    liabilityWaiver: "Liability Waiver",
    participantAgreement: "Participant Agreement",
    readDocuments: "Please read both sections below carefully before signing",
    step1: "Step 1: Read Documents",
    step2: "Step 2: Fill Information",
    step3: "Step 3: Sign & Submit",
    completeInfo: "Complete Your Information",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    initials: "Initials",
    initialsPlaceholder: "Your initials",
    minorNames: "Minor's Name(s) (if signing for a child)",
    minorNamesPlaceholder: "Enter minor's name(s)",
    minorNamesHelp: "Only required if signing for a minor",
    date: "Date",
    requiredAcknowledgments: "Required Acknowledgments",
    acknowledgeWaiver: "I have read and understand the Liability Waiver",
    acknowledgeAgreement: "I have read and agree to the Participant Agreement",
    acknowledgeUnhoused: "I confirm that I am currently experiencing homelessness and am eligible for these services",
    acknowledgmentNote: "All acknowledgments are required to proceed",
    digitalSignature: "Digital Signature",
    signatureInstructions: "Please draw your signature in the box below",
    signatureTips: "Tips: Use your finger or stylus on mobile, or your mouse on desktop",
    clearSignature: "Clear Signature",
    beforeSubmitting: "Before submitting, please ensure:",
    checklist: {
      readDocs: "You have read both documents",
      acknowledgedWaiver: "You have acknowledged reading the Liability Waiver",
      acknowledgedAgreement: "You have acknowledged the Participant Agreement",
      acknowledgedUnhoused: "You have confirmed your eligibility for these services",
      filledFields: "All required fields are filled",
      providedSignature: "You have provided your signature",
    },
    submitButton: "Sign & Submit Waiver",
    processing: "Processing Your Submission",
    pleaseWait: "Please wait while we process your waiver...",
    capturingData: "Capturing form data...",
    processingSubmission: "Processing submission...",
    savingDatabase: "Saving to database...",
    almostDone: "Almost done...",
    mayTakeSeconds: "This may take a few seconds...",
    success: "Thank you! Your waiver has been signed and saved successfully.",
    successSharePoint: "Data has been saved to Database.",
    errorSharePoint: "Note: Could not save to Database.",
    errorGeneral: "An error occurred while submitting the waiver.",
    validationErrors: {
      fullName: "Please enter your full name.",
      initials: "Please enter your initials.",
      waiver: "Please confirm that you have read and understand the Liability Waiver.",
      agreement: "Please confirm that you have read and agree to the Participant Agreement.",
      unhoused: "Please confirm your eligibility for these services.",
      signature: "Please draw your signature in the box before submitting.",
    },
  },
  es: {
    selectLanguage: "Seleccionar Idioma",
    liabilityWaiver: "Exención de Responsabilidad",
    participantAgreement: "Acuerdo de Participante",
    readDocuments: "Por favor lea ambas secciones cuidadosamente antes de firmar",
    step1: "Paso 1: Leer Documentos",
    step2: "Paso 2: Completar Información",
    step3: "Paso 3: Firmar y Enviar",
    completeInfo: "Complete Su Información",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingrese su nombre completo",
    initials: "Iniciales",
    initialsPlaceholder: "Sus iniciales",
    minorNames: "Nombre(s) del Menor (si firma por un niño)",
    minorNamesPlaceholder: "Ingrese el nombre(s) del menor",
    minorNamesHelp: "Solo requerido si firma por un menor",
    date: "Fecha",
    requiredAcknowledgments: "Reconocimientos Requeridos",
    acknowledgeWaiver: "He leído y entiendo la Exención de Responsabilidad",
    acknowledgeAgreement: "He leído y acepto el Acuerdo de Participante",
    acknowledgeUnhoused: "Confirmo que actualmente estoy experimentando falta de vivienda y soy elegible para estos servicios",
    acknowledgmentNote: "Todos los reconocimientos son requeridos para proceder",
    digitalSignature: "Firma Digital",
    signatureInstructions: "Por favor dibuje su firma en el cuadro de abajo",
    signatureTips: "Consejos: Use su dedo o stylus en móvil, o su ratón en escritorio",
    clearSignature: "Borrar Firma",
    beforeSubmitting: "Antes de enviar, asegúrese de que:",
    checklist: {
      readDocs: "Ha leído ambos documentos",
      acknowledgedWaiver: "Ha reconocido leer la Exención de Responsabilidad",
      acknowledgedAgreement: "Ha reconocido el Acuerdo de Participante",
      acknowledgedUnhoused: "Ha confirmado su elegibilidad para estos servicios",
      filledFields: "Todos los campos requeridos están llenos",
      providedSignature: "Ha proporcionado su firma",
    },
    submitButton: "Firmar y Enviar Exención",
    processing: "Procesando Su Envío",
    pleaseWait: "Por favor espere mientras procesamos su exención...",
    capturingData: "Capturando datos del formulario...",
    processingSubmission: "Procesando envío...",
    savingDatabase: "Guardando en base de datos...",
    almostDone: "Casi terminado...",
    mayTakeSeconds: "Esto puede tomar unos segundos...",
    success: "¡Gracias! Su exención ha sido firmada y guardada con éxito.",
    successSharePoint: "Los datos se han guardado en la base de datos.",
    errorSharePoint: "Nota: No se pudo guardar en la base de datos.",
    errorGeneral: "Ocurrió un error al enviar la exención.",
    validationErrors: {
      fullName: "Por favor ingrese su nombre completo.",
      initials: "Por favor ingrese sus iniciales.",
      waiver: "Por favor confirme que ha leído y entiende la Exención de Responsabilidad.",
      agreement: "Por favor confirme que ha leído y acepta el Acuerdo de Participante.",
      unhoused: "Por favor confirme su elegibilidad para estos servicios.",
      signature: "Por favor dibuje su firma en el cuadro antes de enviar.",
    },
  },
};
