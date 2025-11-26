// Scene control data for all modules based on the provided document

export interface SceneControl {
  name: string
  label: string
  title: string
  description: string
  start: number
  end: number
}

export interface ModuleData {
  id: string
  title: string
  scenes: SceneControl[]
}

export const MODULE_DATA: Record<string, ModuleData> = {
  module1: {
    id: "module1",
    title: "Deployment & Onboarding",
    scenes: [
      {
        name: "hero",
        label: "Overview",
        title: "Deployment & Onboarding",
        description: "Smooth rollout to empower every employee from day one with a comprehensive deployment process.",
        start: 0,
        end: 3,
      },
      {
        name: "upload",
        label: "Employee Data Registration",
        title: "Employee Data Registration",
        description:
          "The deployment process begins with companies or factories submitting their employee lists. The FOS team uploads and validates the data to ensure system readiness.",
        start: 3,
        end: 13.4,
      },
      {
        name: "sms",
        label: "FOS IDs & SMS Distribution",
        title: "Automatic FOS IDs & SMS Distribution",
        description:
          "Each employee is assigned a unique FOS ID, enabling accurate identification and secure grievance registration. FOS IDs are sent directly to employees via the FOS SMS Service at no cost.",
        start: 13.4,
        end: 29,
      },
      {
        name: "card",
        label: "FOS Awareness Cards",
        title: "Personalized FOS Awareness Cards",
        description:
          "Personalized FOS Awareness Cards are designed for every employee for printing and distribution to maximize awareness.",
        start: 29,
        end: 43,
      },
      {
        name: "officers",
        label: "Investigation Officers",
        title: "Appointment of Investigation Officer(s)",
        description:
          "Companies or factories nominate Investigation Officer(s) (IOs) responsible for grievance resolution and documentation. Multiple IOs may be appointed based on unit, gender, or complaint category.",
        start: 43,
        end: 61.44,
      },
      {
        name: "portal",
        label: "IO Portal Activation",
        title: "Investigation Officer-IO Portal Activation",
        description:
          "Investigation Officers receive secure login credentials to document Root Cause Analysis (RCA), Corrective and Preventive Actions (CAPA), and supporting evidence.",
        start: 61.44,
        end: 71,
      },
      {
        name: "training",
        label: "On-Site Training",
        title: "On-Site Deployment & Awareness Sessions",
        description:
          "The FOS Team visits the company/factory facility to conduct comprehensive deployment and training sessions, educating employees on grievance reporting channels, and system functionality.",
        start: 71,
        end: 92,
      },
      {
        name: "closing",
        label: "IO Training",
        title: "Investigation Officer-IO Training",
        description:
          "Investigation Officers receive dedicated training on RCA validation, CAPA documentation, evidence uploading, and best-practice grievance remediation.",
        start: 92,
        end: 102,
      },
    ],
  },
  module2: {
    id: "module2",
    title: "Complaint Intake & Registration",
    scenes: [
      {
        name: "intro",
        label: "Overview",
        title: "Complaint Intake & Registration",
        description: "Multiple grievance reporting channels—confidential, accessible, and worker-friendly.",
        start: 0,
        end: 4.64,
      },
      {
        name: "omnichannel",
        label: "Reporting Channels",
        title: "Grievance Reporting Channels",
        description:
          "FOS provides a multi-channel reporting ecosystem—Toll-Free Hotline, SMS/WhatsApp, Email, Online Form, and Mobile App—ensuring all employees can report concerns confidentially.",
        start: 4.64,
        end: 22,
      },
      {
        name: "assisted",
        label: "Assisted Filing",
        title: "Assisted Complaint Filing",
        description:
          "When complaints are received through phone, SMS, WhatsApp, or email, trained FOS Grievance Officers conduct structured interviews, verify information, and digitally submit the complaint on behalf of the worker.",
        start: 22,
        end: 44.56,
      },
      {
        name: "anonymity",
        label: "Anonymous Option",
        title: "Anonymous Complaint Option",
        description:
          "Employees may register complaints anonymously through any reporting channel. The system masks identifying information from factory management and assigns an anonymous tracking ID.",
        start: 44.56,
        end: 61.24,
      },
      {
        name: "review",
        label: "Complaint Review",
        title: "Complaint Review & Approval",
        description:
          "Every incoming submission is reviewed by FOS to ensure accuracy, proper category mapping and completeness. This guarantees high-quality data entry and compliance with HRDD reporting standards.",
        start: 61.24,
        end: 71,
      },
      {
        name: "ticket",
        label: "Ticket Generation",
        title: "Ticket Number Generation",
        description:
          "Once verified, each complaint is assigned a unique system-generated ticket ID, enabling traceability, audit-ready documentation, and transparent end-to-end tracking throughout the grievance lifecycle.",
        start: 71,
        end: 82,
      },
      {
        name: "notification",
        label: "IO Notification",
        title: "IO Notification & Assignment",
        description:
          "The relevant Investigation Officer (IO) is automatically notified via the IO mobile app and system-generated email alerts. The complaint appears in the IO-Portal dashboard for timely action.",
        start: 82,
        end: 98,
      },
    ],
  },
  module3: {
    id: "module3",
    title: "Investigation-Remediation-Satisfaction Framework",
    scenes: [
      {
        name: "intro",
        label: "Overview",
        title: "Investigation-Remediation-Satisfaction Framework",
        description: "Systematic resolution workflows with verified employee satisfaction.",
        start: 0,
        end: 12.24,
      },
      {
        name: "timeline",
        label: "Case Activation",
        title: "Case Activation",
        description:
          "Once a complaint is received, the Investigation Officer (IO) reviews the initial complaint details, selects the case, and formally changes its status to 'In-Process.' This initiates the investigation workflow.",
        start: 12.24,
        end: 23.76,
      },
      {
        name: "validity",
        label: "Validity Assessment",
        title: "Validity Assessment",
        description:
          "The IO evaluates the complaint to determine whether it is Valid, Partially Valid, or Invalid. This assessment is based on evidence, worker interviews, and cross-verification with relevant records.",
        start: 23.76,
        end: 37.92,
      },
      {
        name: "rootCause",
        label: "Root Cause Analysis",
        title: "Root Cause Analysis",
        description:
          "A justification is entered into Root Cause Analysis (RCA), creating a transparent audit trail for the validity assessment.",
        start: 37.92,
        end: 51.32,
      },
      {
        name: "capa",
        label: "CAPA Development",
        title: "CAPA Development",
        description:
          "For valid or partially valid complaints, the IO develops a comprehensive Corrective and Preventive Action (CAPA) plan. This includes identifying immediate remedies and long-term preventive measures.",
        start: 51.32,
        end: 70.88,
      },
      {
        name: "evidence",
        label: "Evidence Submission",
        title: "Evidence Submission & Documentation",
        description:
          "After implementing the necessary actions, the IO compiles and uploads all supporting evidence. This may include photographs, written statements, committee notes, or updated policy documents.",
        start: 70.88,
        end: 80.04,
      },
      {
        name: "verification",
        label: "Worker Verification",
        title: "Worker Interview for Independent Verification",
        description:
          "FOS Grievance Officers independently contact the complainant to verify the factory's resolution. This step ensures impartiality and confirms that the resolution genuinely addresses the worker's concern.",
        start: 80.04,
        end: 99.12,
      },
      {
        name: "rework",
        label: "Bounce-Back Mechanism",
        title: "Bounce-Back Mechanism",
        description:
          "If the complainant is not satisfied, the complaint is returned to the IO. The IO must re-evaluate RCA, update CAPA actions, and provide additional evidence before resubmission.",
        start: 99.12,
        end: 111.4,
      },
      {
        name: "closure",
        label: "FOS Closure",
        title: "FOS Closure Feedback & Recordkeeping",
        description:
          "Once the complainant confirms full satisfaction, FOS closes the complaint in the system and records detailed closure feedback. All data is preserved in the system's digital archive.",
        start: 111.4,
        end: 120,
      },
    ],
  },
  module4: {
    id: "module4",
    title: "Dashboards & Risk Insights",
    scenes: [
      {
        name: "intro",
        label: "Overview",
        title: "Dashboards & Risk Insights",
        description: "Data Intelligence for HRDD reporting and risk monitoring.",
        start: 0,
        end: 16,
      },
      {
        name: "breakdown",
        label: "Real-Time Overview",
        title: "Real-Time Case Overview",
        description:
          "Provides a dynamic view of total, open, in-process, closed, and overdue complaints, enhancing operational transparency and enabling timely decision-making.",
        start: 16,
        end: 30.64,
      },
      {
        name: "heatmap",
        label: "Category Analytics",
        title: "Category-Based Analytics",
        description:
          "Segments complaints by HRDD-relevant categories such as wages and benefits, harassment, discrimination, Health safety & Environment, and working hours to facilitate targeted interventions.",
        start: 30.64,
        end: 43.4,
      },
      {
        name: "metrics",
        label: "Department Insights",
        title: "Unit & Department-Level Insights",
        description:
          "Visualizes risk concentration through breakdowns across units, shifts, or departments, highlighting priority areas for action.",
        start: 43.4,
        end: 59.4,
      },
      {
        name: "timeline",
        label: "Performance Metrics",
        title: "RCA & CAPA Performance Metrics",
        description:
          "Evaluates investigation quality, CAPA completion rates, adherence to deadlines, and recurrence rates to measure overall operational effectiveness.",
        start: 59.4,
        end: 70.4,
      },
      {
        name: "nps",
        label: "Satisfaction Indicators",
        title: "Worker Satisfaction Indicators",
        description:
          "Aggregates feedback from verification calls to assess the effectiveness of remediation processes and overall worker happiness & Safety scores.",
        start: 70.4,
        end: 75.68,
      },
      {
        name: "trends",
        label: "Trend Analysis",
        title: "Trend Analysis & Date-Range Filters",
        description:
          "Enables weekly, monthly, quarterly, and annual trend analysis, allowing for comparative insights and strategic planning.",
        start: 75.68,
        end: 90.28,
      },
      {
        name: "export",
        label: "Compliance Reports",
        title: "Exportable Compliance Reports",
        description:
          "Supports report exports for HRDD, ESG, and CSDDD compliance, including due diligence reporting, social compliance audits, internal dashboards, and brand reporting.",
        start: 90.28,
        end: 96.4,
      },
      {
        name: "conclusion",
        label: "Summary",
        title: "Conclusion",
        description:
          "Comprehensive data intelligence empowering organizations with actionable insights for risk prevention and compliance reporting.",
        start: 96.4,
        end: 102,
      },
    ],
  },
}