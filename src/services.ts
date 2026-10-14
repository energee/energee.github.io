// Content for the three service pages. Nav labels, titles, and copy live here so the
// header, the sitemap, and the pages stay in sync. Copy reuses existing site claims:
// no performance results or customer outcomes are asserted.
export type Service = {
  path: string;
  nav: string;
  problem: string;
  problemBody: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: readonly (readonly [heading: string, body: string])[];
  note: string;
};

export const mgrPath = "/work/mgr/";

export const services: readonly Service[] = [
  {
    path: "/ai-phone-agents/",
    nav: "AI phone agents",
    problem: "Customers wait—or go elsewhere.",
    problemBody: "Answer overflow calls, capture inquiries, and book appointments. Give customers a next step when your team is busy, with a handoff for requests that need a person.",
    title: "AI Phone Agents for Overflow and After-Hours Calls | Energee",
    description: "AI phone agents that answer overflow calls, capture inquiries, and book appointments, with a handoff to your team when a request needs a person.",
    h1: "AI phone agents that answer when your team can’t.",
    lead: "Customers who can’t reach you wait or go elsewhere. We build phone agents that answer overflow and after-hours calls, capture inquiries, and book appointments, and hand the call to a person when a request needs one.",
    sections: [
      ["What the agent handles", "Overflow calls, after-hours calls, intake of caller details, and appointment booking against your calendar. We agree the list of requests with you. Anything outside that scope goes to a person."],
      ["How a call works", "Speech recognition turns the caller’s words into text, a conversation model decides the reply, and speech synthesis speaks it. Narrowly scoped tools read your calendar or CRM and write the booking. We test interruptions, corrected details, and response delay before launch."],
      ["Handoff to a person", "A request outside the agreed scope is transferred to a person or flagged for follow-up with the details captured so far. The handoff rules are written down and tested, not left to the model."],
      ["Recordings and retention", "Whether calls are recorded, and how long recordings and transcripts are kept, is agreed before launch."],
      ["Measuring a pilot", "We compare the pilot with your current process: calls answered, bookings made, handling time, caller response, and operating cost. The result decides whether to improve, expand, or stop."],
    ],
    note: "We have not published phone-agent performance results. Our selected work shows business software and reviewed AI actions, not a deployed voice project. Results come from a pilot on your own calls.",
  },
  {
    path: "/knowledge-search/",
    nav: "Knowledge search",
    problem: "Your team keeps hunting for answers.",
    problemBody: "Find information across policies, documents, and business records. Give your team relevant answers with sources they can check and access limited to what they’re allowed to see.",
    title: "AI Knowledge Search for Business Documents | Energee",
    description: "AI that finds answers across your policies, documents, and business records, with sources your team can check and access limited to each person.",
    h1: "AI knowledge search your team can check.",
    lead: "Your team keeps hunting for answers across policies, documents, and business records. We build search and question answering that returns relevant answers with sources they can check, limited to what each person is allowed to see.",
    sections: [
      ["What it searches", "Policies, documents, and business records, connected through ingestion, chunking, and keyword and vector search. We scope the sources to the questions your team actually asks."],
      ["Answers with sources", "Retrieval-augmented generation finds relevant material at answer time and supplies it to the model as context. It does not change the model’s weights. Each answer points to the material it used so a person can check it."],
      ["Access limited to each person", "Retrieval is filtered by permission, so an answer draws only on material the person asking is allowed to see."],
      ["When the answer isn’t there", "We test missing information, conflicting sources, and denied permissions, and design the response when evidence is absent rather than letting a fluent answer fill the gap."],
      ["Measuring a pilot", "We test whether the right evidence is retrieved and whether answers are correct on real questions, alongside response time and usage cost."],
    ],
    note: "Our selected work does not include a deployed retrieval project. The MGR assistant finds business records for staff; broader document search would be scoped and tested in a pilot.",
  },
  {
    path: "/workflow-automation/",
    nav: "Workflow automation",
    problem: "Work gets stuck between systems.",
    problemBody: "Turn emails and documents into validated records, prepare updates, and move routine requests forward. Keep people in control of consequential changes.",
    title: "AI Workflow Automation for Business Software | Energee",
    description: "AI that turns emails and documents into validated records, prepares updates across your systems, and keeps people in control of consequential changes.",
    h1: "AI that moves routine work between your systems.",
    lead: "Work gets stuck between systems. We build agents that turn emails and documents into validated records, prepare updates, and move routine requests forward, with people in control of consequential changes.",
    sections: [
      ["What it automates", "Recurring work your team copies between inboxes, documents, a CRM, a calendar, or a database: reading a request, checking it, and preparing the record or update."],
      ["Narrowly scoped tools", "Models connect to your software through tools with structured inputs, permission checks, and validation. Live records come from the system of record, not the model’s memory."],
      ["People approve consequential changes", "An agent can prepare a change for review, and a person confirms before it is recorded. MGR works this way for inventory movements."],
      ["When something fails", "Workflows need safe retries and a clear handoff when an action fails. We design both before the first pilot."],
      ["Measuring a pilot", "We compare the pilot with your current process: task quality, handling time, and operating cost. The result decides whether to improve, expand, or stop."],
    ],
    note: "Our selected work shows business software and reviewed AI actions in MGR. We do not claim measured savings.",
  },
];
