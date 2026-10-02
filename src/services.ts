type Service = readonly [number: string, title: string, description: string, examples: string];

export const services = {
  ops: [
    ['01','Move work between your tools','Connect requests, records, and next steps so your team spends less time copying data and checking whether something happened.','Order processing · CRM updates · Reconciliation'],
    ['02','Keep requests moving','Give routine requests a defined next action. Bring the exceptions, relevant records, and proposed response to the person who can resolve them.','Customer requests · Follow-ups · Routine checks'],
    ['03','Turn documents into usable records','Extract the information your process needs and route incomplete or uncertain entries for review before they reach your business systems.','Invoices · Purchase orders · Internal reports']
  ],
  eng: [
    ['01','Ship reviewed changes','Set up coding agents around your repository, tests, and review process so your engineers can evaluate useful changes before merging them.','Repository context · Test generation · Reviewed changes'],
    ['02','Keep documentation current','Detect software changes and prepare updates to technical documentation, API references, and onboarding guides for review.','Change detection · Draft updates · Source references'],
    ['03','Reduce release preparation','Connect checks, changelogs, and release preparation while keeping consequential deployment decisions with your team.','CI/CD · Release notes · Deployment approvals']
  ],
  knowledge: [
    ['01','Find answers in your business data','Help staff find relevant information across approved sources, with references they can check and access tied to their permissions.','Internal records · Source references · Access controls'],
    ['02','Help customers discover your business','Structure your content so AI search systems can understand and reference it, then track visibility to evaluate the changes.','Clear service information · Useful answers · Discoverability'],
    ['03','Keep answers connected to current information','Detect changes to policies, products, and internal documents so your team can review updates before stale information reaches customers.','Internal search · Content updates · Support knowledge']
  ]
} satisfies Record<string, readonly Service[]>;
