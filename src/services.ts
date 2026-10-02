type Service = readonly [number: string, title: string, description: string, examples: string];

export const services = {
  ops: [
    ['01','Workflow automation','Offload repetitive steps across your tools, with clear handling for exceptions and approvals.','Order processing · CRM updates · Reconciliation'],
    ['02','Operational agents','Give agents bounded tasks, relevant context, and a usable interface for your team to supervise their work.','Customer requests · Follow-ups · Routine checks'],
    ['03','Document intelligence','Turn unstructured documents into useful information, flagging uncertain or incomplete results for review.','Invoices · Purchase orders · Internal reports']
  ],
  eng: [
    ['01','Agent-assisted coding','Integrate coding agents into feature development, debugging, and review, with tests and human review built in.','Repository context · Test generation · Reviewed changes'],
    ['02','Living documentation','Keep technical documentation, API references, and onboarding guides aligned with changes to your software.','Change detection · Draft updates · Source references'],
    ['03','Release workflows','Coordinate checks, changelogs, versioning, and release preparation, with approval gates for consequential steps.','CI/CD · Release notes · Deployment approvals']
  ],
  knowledge: [
    ['01','Chat with your data','Build retrieval-augmented assistants that help people explore large knowledge sources with relevant references.','RAG · Permission-aware retrieval · Source citations'],
    ['02','Answer engine optimization','Make your business easier for AI search systems to understand and reference, then measure visibility over time.','Content structure · Clear answers · Discoverability'],
    ['03','Knowledge maintenance','Keep useful answers connected to current policies, product information, and internal documentation.','Internal search · Content freshness · Support knowledge']
  ]
} satisfies Record<string, readonly Service[]>;
