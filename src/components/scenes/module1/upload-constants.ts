export const ENHANCED_TIMING = {
    // Script: "We begin by registering the employee data" (2-5s)
    INTRO_START: 0,
    INTRO_TEXT: 2,
    INTRO_END: 5,

    // Script: "Companies simply share their active employee list..." (5-17s)
    COMPANY_APPEAR: 5,
    EMPLOYEE_LIST_REVEAL: 6,
    INTEGRATION_CHOICE: 8,
    HRMS_OPTION_APPEAR: 10,
    API_CONNECTION_START: 12,
    API_HANDSHAKE: 14,
    API_COMPLETE: 17,

    // Script: "Our team uploads and validates every record..." (17-22s)
    UPLOAD_INITIATE: 17,
    UPLOAD_PROGRESS: 18,
    VALIDATION_START: 19,
    VALIDATION_SCAN: 20,
    VALIDATION_COMPLETE: 21,
    READY_STATE: 22,
    CELEBRATION: 22.5
}

export const MOCK_EMPLOYEE_DATA = [
    { id: "EMP-204", name: "Zara Sheikh", dept: "Production", role: "Line Manager", status: "active", cnic: "35202-6543210-1" },
    { id: "EMP-205", name: "Usman Ali", dept: "Logistics", role: "Supply Officer", status: "active", cnic: "35202-1234567-9" },
    { id: "EMP-206", name: "Fatima Bibi", dept: "Textile", role: "Stitching Lead", status: "active", cnic: "31303-9876543-2" },
    { id: "EMP-207", name: "Hassan Raza", dept: "Quality", role: "Senior Auditor", status: "active", cnic: "42101-5678901-5" },
    { id: "EMP-208", name: "Ayesha Khan", dept: "HR", role: "Manager", status: "active", cnic: "61101-2345678-3" },
    { id: "EMP-209", name: "Ali Raza", dept: "IT", role: "Developer", status: "active", cnic: "35201-8765432-6" },
]
