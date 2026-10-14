// Every page of the site, as data. main.tsx hydrates one of these in the browser and
// build.ts prerenders all of them to static HTML, so each URL is a real document.
import { useEffect, useRef, type ComponentType } from "react";
import { Pause, Play } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { startAsciiField } from "./ascii";
import { ContactButton, Layout } from "./Layout";
import { mgrPath, services, type Service } from "./services";

export type Page = { path: string; title: string; description: string; crumb: string; Page: ComponentType };

const practicalQuestions = [
  ["Where should we start?", "Start with one recurring problem: unanswered inquiries, hard-to-find information, or work your team copies between systems. We identify the inputs, exceptions, and a measurable target before choosing the technology."],
  ["Do we need to train our own model?", "Usually not. We start with an existing model, relevant business context, and carefully scoped tools. Fine-tuning is an option for a repeatable task when suitable training examples and evaluation show it is worth the added work."],
  ["Can you work with our existing software?", "We assess the APIs, exports, and permissions your systems support. The first workflow can fit around your existing tools; a full replacement is not the starting assumption."],
  ["What does it cost?", "Pricing depends on the workflow, integrations, usage, and support. We agree on the pilot scope, cost, and success criteria before building; ongoing costs are part of that discussion."],
  ["What if the AI gets something wrong?", "We design source checks, validation, and human approval around the consequences of an error. Work outside the agreed scope goes to a person. Testing and monitoring reduce mistakes; they do not make AI infallible."],
] as const;

const technicalCapabilities = [
  ["Retrieval and business knowledge (RAG)", "Connect documents and business records to answers your team can check. Retrieval-augmented generation finds relevant material at answer time and supplies it as context; it does not change the model’s weights. A project can include ingestion, chunking, keyword and vector search, source references, and permission-filtered retrieval. We test whether the right evidence is retrieved and what happens when it is missing."],
  ["Agents and software integrations", "Connect models to calendars, CRMs, databases, and other APIs through narrowly scoped tools. Structured inputs, permission checks, validation, and approval gates control what can change. Live records come from the system of record rather than a model’s memory; workflows need safe retries and a clear handoff when an action fails."],
  ["Voice applications", "Handle overflow calls, intake, and booking using speech recognition, a conversation model, and speech synthesis connected to business tools. Scope includes interruptions, corrected details, response latency, and transfer to a person. Recording and retention rules are agreed before launch; voice is one application of the same knowledge and integration layer."],
  ["Task-specific model adaptation", "Start with instructions, examples, and structured outputs. Fine-tuning changes model weights using curated training examples to specialize behavior on a narrow task, such as classification or extraction. We compare against the simpler baseline using held-out examples before recommending it. Company facts that change generally belong in retrieval or live queries, not training."],
  ["Evaluation and operation", "Define test cases from real tasks, including missing information, conflicting sources, denied permissions, and failed integrations. Measure task success, retrieval quality where relevant, latency, and usage cost. Agree on monitoring, escalation, and recovery before expanding beyond the pilot; a fluent answer alone is not a passing result."],
] as const;

const Cta = () => (
  <section className="cta"><span className="eyebrow">Start with one problem</span><h2>Where does the work<br />keep getting stuck?</h2><ContactButton size="lg" className="mt-8">Find your highest-value workflow</ContactButton><p>Tell us what slows your team down. We’ll discuss a focused starting point and how to measure it.</p></section>
);

function Breadcrumb({ name }: { name: string }) {
  return <nav aria-label="Breadcrumb" className="eyebrow"><a href="/">Home</a> / {name}</nav>;
}

function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const motionButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (canvas.current && motionButton.current) return startAsciiField(canvas.current, motionButton.current);
  }, []);
  return (
    <>
      <section className="hero">
        <canvas ref={canvas} id="ascii-field" aria-hidden="true" />
        <Button ref={motionButton} id="motion-toggle" variant="ghost" size="icon-sm" aria-label="Pause animation" aria-pressed={false} className="group absolute right-[5%] bottom-4 text-muted-foreground/70 hover:text-foreground">
          <Pause aria-hidden="true" className="size-3.5 group-aria-pressed:hidden" />
          <Play aria-hidden="true" className="hidden size-3.5 group-aria-pressed:block" />
        </Button>
        <div className="intro-line"><span>APPLIED AI / KNOWLEDGE / WORKFLOWS</span><span>ENERGEE / PITTSBURGH</span></div>
        <h1>AI that knows your business. <br /><span>And gets the work done.</span></h1>
        <div className="hero-bottom-grid"><div>
          <p className="hero-copy">We connect AI to your company’s information and software so it can answer questions, handle customer requests, and complete routine work—with clear limits and human approval where it matters.</p>
          <div className="actions flex flex-wrap justify-center gap-3"><ContactButton size="lg">Find your highest-value workflow</ContactButton><Button variant="ghost" size="lg" asChild><a href="#how">See how we work</a></Button></div>
        </div></div>
        <div className="capability-line">The goal: faster answers, fewer handoffs, less repetitive work.</div>
      </section>

      <section id="problems" className="section" aria-labelledby="problems-heading">
        <div className="section-heading">
          <div><span className="eyebrow">What we solve</span><h2 id="problems-heading">Less waiting.<br />More work finished.</h2></div>
          <p>Start where delays and repetitive work cost your business. These are problems we can build for—not a reason to replace every system you use.</p>
        </div>
        <div className="steps">
          {services.map(service => (
            <article key={service.path}>
              <h3>{service.problem}</h3>
              <p>{service.problemBody}</p>
              <Button variant="link" asChild className="mt-4 h-auto p-0 text-primary"><a href={service.path}>Learn about {service.nav.toLowerCase()}</a></Button>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="section" aria-labelledby="how-heading">
        <div className="section-heading">
          <div><span className="eyebrow">How we work</span><h2 id="how-heading">One problem.<br />A measurable pilot.</h2></div>
          <p>Prove a useful workflow before expanding. We agree on what it should do, what it must not do, and how you’ll judge whether it works.</p>
        </div>
        <div className="steps">
          <article><h3>Find the right starting point</h3><p>Map the current work, the information it needs, and the exceptions your team handles. Choose a recurring problem with a clear owner and a result worth measuring.</p></article>
          <article><h3>Build within clear limits</h3><p>Connect the necessary knowledge and tools. Test on representative tasks, define approval and handoff rules, and agree on scope and cost before the pilot starts.</p></article>
          <article><h3>Measure before expanding</h3><p>Compare the pilot against your current process: task quality, handling time, customer response, and operating cost. Use the results to decide what to improve, expand, or stop.</p></article>
        </div>
      </section>

      <section id="technology" className="section" aria-labelledby="technology-heading">
        <div className="section-heading">
          <div><span className="eyebrow">Technology</span><h2 id="technology-heading">What’s underneath<br />the useful part.</h2></div>
          <p>These are capabilities we scope to your application, not a checklist every project needs. The simplest approach that passes the task’s evaluation is the starting point.</p>
        </div>
        <Accordion type="single" collapsible>
          {technicalCapabilities.map(([name, description]) => (
            <AccordionItem value={name} key={name}>
              <AccordionTrigger>{name}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-sm text-muted-foreground">Selected work below demonstrates business software and reviewed AI actions. It is not evidence of a deployed voice, RAG, or fine-tuned model project.</p>
      </section>

      <section id="work" className="case section">
        <div className="case-title"><span className="eyebrow">Selected work</span></div>
        <div className="case-grid">
          <div>
            <div className="mgr">MGR</div>
            <h2>We build software<br />businesses run on.</h2>
            <p>We built a brewery operations platform covering production, inventory, wholesale orders, and customer access. MGR replaced the brewery’s previous Ollie Ops setup and is actively used to run the business.</p>
            <Button variant="link" asChild className="mt-6 h-auto p-0 text-primary"><a href={mgrPath}>Read the MGR case study</a></Button>
          </div>
        </div>
      </section>

      <section id="questions" className="section" aria-labelledby="questions-heading">
        <div className="section-heading"><div><span className="eyebrow">Practical questions</span><h2 id="questions-heading">Clear scope.<br />No magic claims.</h2></div><p>Useful AI depends on the information, integrations, and checks around it. We make those requirements explicit before building.</p></div>
        <Accordion type="single" collapsible>
          {practicalQuestions.map(([question, answer]) => (
            <AccordionItem value={question} key={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <Cta />
    </>
  );
}

function ServicePage({ service }: { service: Service }) {
  const others = services.filter(other => other.path !== service.path);
  return (
    <>
      <section className="section page-head">
        <Breadcrumb name={service.nav} />
        <h1>{service.h1}</h1>
        <p className="lead">{service.lead}</p>
        <ContactButton size="lg" className="mt-8">Find your highest-value workflow</ContactButton>
      </section>
      <section className="section" aria-label={service.nav}>
        <div className="steps">
          {service.sections.map(([heading, body]) => <article key={heading}><h2>{heading}</h2><p>{body}</p></article>)}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">{service.note}</p>
      </section>
      <section className="section" aria-labelledby="related-heading">
        <span className="eyebrow">Related</span>
        <h2 id="related-heading" className="mt-4">Other ways we apply AI</h2>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          {others.map(other => <Button key={other.path} variant="link" asChild className="h-auto p-0 text-primary"><a href={other.path}>{other.nav}</a></Button>)}
          <Button variant="link" asChild className="h-auto p-0 text-primary"><a href={mgrPath}>The MGR case study</a></Button>
        </div>
      </section>
      <Cta />
    </>
  );
}

function MgrPage() {
  return (
    <>
      <section className="case section">
        <Breadcrumb name="MGR case study" />
        <div className="case-grid">
          <div>
            <div className="mgr">MGR</div>
            <h1>We build software <br />businesses run on.</h1>
            <p>We built a brewery operations platform covering production, inventory, wholesale orders, and customer access. MGR replaced the brewery’s previous Ollie Ops setup and is actively used to run the business.</p>
            <Button variant="link" asChild className="mt-6 h-auto p-0 text-primary">
              <a href="https://github.com/energee/mgr-zero/blob/main/content/docs/staff-guide.mdx" target="_blank" rel="noopener noreferrer">Read the real workflows</a>
            </Button>
          </div>
          <div className="case-details">
            <div className="case-row"><span>THE CHALLENGE</span><p>The brewery’s previous setup with Ollie Ops left gaps in functionality, data access, and support for its workflows.</p></div>
            <div className="case-row"><span>WHAT CHANGED</span><p>Orders, stock, production, and customer records now share one application. QuickBooks and Square integrations connect accounting and point-of-sale information.</p></div>
            <div className="case-row"><span>WHAT THE AI DOES</span><p>Ask MGR lets staff ask about inventory and find business records. It can prepare an inventory movement for review; a person confirms the change before it is recorded.</p></div>
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="architecture">
                <AccordionTrigger>Inside the architecture</AccordionTrigger>
                <AccordionContent>
                  <p>The repository documents tenant isolation, traceable inventory history, and safe retries. AI-assisted changes use permission boundaries and confirmation steps.</p>
                  <Button variant="link" asChild className="mt-4 h-auto p-0 text-primary"><a href="https://github.com/energee/mgr-zero" target="_blank" rel="noopener noreferrer">Explore the source code</a></Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">This is business software with reviewed AI actions. It is not evidence of a deployed voice, RAG, or fine-tuned model project, and we do not claim measured savings.</p>
      </section>
      <section className="section" aria-labelledby="related-heading">
        <span className="eyebrow">Related</span>
        <h2 id="related-heading" className="mt-4">Where we apply AI</h2>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
          {services.map(service => <Button key={service.path} variant="link" asChild className="h-auto p-0 text-primary"><a href={service.path}>{service.nav}</a></Button>)}
        </div>
      </section>
      <Cta />
    </>
  );
}

export const pages: readonly Page[] = [
  {
    path: "/",
    title: "Energee — AI that knows your business",
    description: "Energee connects AI to your business knowledge and software to answer questions, handle customer requests, and complete routine work.",
    crumb: "Home",
    Page: Home,
  },
  ...services.map(service => ({
    path: service.path,
    title: service.title,
    description: service.description,
    crumb: service.nav,
    Page: () => <ServicePage service={service} />,
  })),
  {
    path: mgrPath,
    title: "MGR: Brewery Operations Software Built by Energee",
    description: "How Energee built MGR, a brewery operations platform for production, inventory, and wholesale orders, with AI that prepares changes for review.",
    crumb: "MGR case study",
    Page: MgrPage,
  },
];

/** The page for a URL path, falling back to home. Accepts paths with or without a trailing slash. */
export function pageFor(pathname: string): Page {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return pages.find(page => page.path === path) ?? pages[0]!;
}

export function PageApp({ page }: { page: Page }) {
  return <Layout><page.Page /></Layout>;
}
