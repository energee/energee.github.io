import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Pause, Play } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { services } from "./services";
import { startAsciiField } from "./ascii";

const serviceAreas = [
  ["ops", "AI for operations"],
  ["eng", "AI for engineering"],
  ["knowledge", "AI search & knowledge"],
] as const;

// Replace this preview address with the approved public contact before launch.
const contactEmail = "hello@energee.example";

const buyerQuestions = [
  ["What will it cost?", "We scope the first workflow before quoting. The proposal separates implementation, third-party usage, and ongoing maintenance so you can compare the full cost with the work it replaces. For phone agents, we include telephony, AI usage, and the calls that still need a person."],
  ["Will we need to replace our existing tools?", "We start with your current systems and check their integration options. The scope identifies what can connect, what needs to change, and any data cleanup your team needs to do before building begins."],
  ["Who owns the system and looks after it?", "The proposal defines code and account ownership, data access, and handover. Before launch, we agree who monitors the workflow, handles failures, and maintains integrations, along with any ongoing support costs."],
  ["What if the agent gets something wrong?", "We agree which actions can run automatically and which need approval. Testing covers missing information, failed integrations, and recovery. A phone workflow also needs a clear route to a person when it cannot complete the caller’s request."],
] as const;

export function App() {
  const contactTrigger = useRef<HTMLButtonElement>(null);
  function rememberContactTrigger(event: MouseEvent<HTMLButtonElement>) {
    contactTrigger.current = event.currentTarget;
  }
  const canvas = useRef<HTMLCanvasElement>(null);
  const motionButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (canvas.current && motionButton.current) return startAsciiField(canvas.current, motionButton.current);
  }, []);
  const [brief, setBrief] = useState("");
  const [area, setArea] = useState("Operations & automation");
  const emailDraft = `mailto:${contactEmail}?subject=${encodeURIComponent(`First workflow: ${area}`)}&body=${encodeURIComponent(brief.trim())}`;

  return (
    <Dialog>
      <header>
        <Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline">
          <a href="#" aria-label="Energee home">energee</a>
        </Button>
        <NavigationMenu aria-label="Main navigation" className="ml-auto hidden min-[651px]:flex">
          <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink href="#phone-agents">AI phone agents</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#work">Our work</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#approach">Start small</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DialogTrigger asChild><Button onClick={rememberContactTrigger} variant="ghost" size="sm" className="ml-auto min-[651px]:ml-0">Let’s talk</Button></DialogTrigger>
      </header>
      <main>
        <section className="hero">
          <canvas ref={canvas} id="ascii-field" aria-hidden="true" />
          <Button ref={motionButton} id="motion-toggle" variant="ghost" size="icon-sm" aria-label="Pause animation" aria-pressed={false} className="group absolute right-[5%] bottom-4 text-muted-foreground/70 hover:text-foreground">
            <Pause aria-hidden="true" className="size-3.5 group-aria-pressed:hidden" />
            <Play aria-hidden="true" className="hidden size-3.5 group-aria-pressed:block" />
          </Button>
          <div className="intro-line"><span>AI FOR CUSTOMER CALLS &amp; BUSINESS OPERATIONS</span><span>ENERGEE / PITTSBURGH</span></div>
          <h1>Help customers faster. <br />Give your team <br /><span>time back.</span></h1>
          <div className="hero-bottom-grid"><div>
            <p className="hero-copy">We build AI phone agents and connected workflows for businesses spending too much time answering routine calls, chasing updates, and moving data between tools. From the customer’s request to the completed task, with your team in control.</p>
            <div className="actions flex flex-wrap justify-center gap-3"><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg">Discuss your first workflow</Button></DialogTrigger><Button variant="ghost" size="lg" asChild><a href="#work">See what we’ve built</a></Button></div>
          </div></div>
          <div className="capability-line">One workflow to start. Connected to your tools. Measured against the work it replaces.</div>
        </section>

        <section id="phone-agents" className="section" aria-labelledby="phone-agents-heading">
          <div className="section-heading">
            <div><span className="eyebrow">AI phone agents</span><h2 id="phone-agents-heading">A helpful voice.<br />A completed task.</h2></div>
            <p>Customers call to get something done. We build phone agents around that outcome: a booked appointment, an answered question, or a useful follow-up. Natural speech and quick responses, connected to the systems that make the next step happen.</p>
          </div>
          <div className="steps grid-cols-1 min-[651px]:grid-cols-2">
            <article>
              <Badge variant="secondary" className="mb-4">Inbound calls</Badge>
              <h3>Get callers to what they need</h3>
              <p>Let callers explain what they need in their own words, without working through a menu. Check availability, book or reschedule, and confirm the details. When a person is needed, pass along the context.</p>
              <p className="mt-4 text-sm text-muted-foreground">Customer questions · Appointment booking · Call routing</p>
            </article>
            <article>
              <Badge variant="secondary" className="mb-4">Outbound calls</Badge>
              <h3>Make every follow-up useful</h3>
              <p>Confirm appointments, follow up on an inquiry, or resolve an open service request. Keep the reason for the call clear, capture the outcome, and update your records so the next person has the context.</p>
              <p className="mt-4 text-sm text-muted-foreground">Inquiry follow-ups · Appointment reminders · Service check-ins</p>
            </article>
          </div>
          <div className="control-strip">
            <strong>Reduce your reliance on outsourced call centers.</strong>
            <p>Use AI for routine calls and reserve your people for the work that needs them. We compare the full running cost with your current call handling, including setup, usage, maintenance, and human handoffs. The target is a lower cost per resolved request.</p>
          </div>
          <Accordion type="single" collapsible className="mt-6">
            <AccordionItem value="call-quality">
              <AccordionTrigger>How we check that callers are actually helped</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Before launch, test interruptions, corrected details, unavailable appointments, and requests for a person. Measure response delays, completed tasks, and transfers. Check that the booking or record update happened, then compare the results with your existing process before expanding.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="work" className="case section">
          <div className="case-title"><span className="eyebrow">Selected work</span></div>
          <div className="case-grid">
            <div>
              <div className="mgr">MGR</div>
              <h2>A working system.<br />Used in daily operations.</h2>
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
        </section>

        <section className="section" aria-labelledby="connected-work-heading">
          <div className="section-heading">
            <div><span className="eyebrow">Human review, in practice</span><h2 id="connected-work-heading">Let the agent cook.<br />Keep the judgment.</h2></div>
            <p>In MGR, an agent can prepare a stock movement, but it cannot commit it. The person sees the proposed change and decides whether to proceed. That is the kind of boundary we build around consequential actions.</p>
          </div>
          <div className="steps">
            <article><h3>Find the relevant facts</h3><p>Ask MGR reads the records the staff member’s role allows. Missing details trigger a follow-up question.</p></article>
            <article><h3>Review the proposed change</h3><p>The system prepares a preview. The person can confirm it, dismiss it, or open the ordinary form.</p></article>
            <article><h3>Keep a record</h3><p>A confirmed movement is recorded in the inventory history. Retrying the same confirmed request does not record it twice.</p></article>
          </div>
        </section>

        <section id="capabilities" className="section capabilities">
          <div className="section-heading"><div><span className="eyebrow">Beyond the phone</span><h2>Take the busywork<br />out of daily operations.</h2></div><p>An off-the-shelf tool can be enough for a simple task. When the work crosses systems, needs your business rules, or requires a usable review process, we build the connections and the workflow around it.</p></div>
          <Tabs defaultValue="ops">
            <TabsList aria-label="Service areas" className="h-auto w-full justify-start overflow-x-auto">
              {serviceAreas.map(([key, title]) => <TabsTrigger key={key} value={key} className="border-0 px-3 py-3 text-xs sm:text-sm">{title}</TabsTrigger>)}
            </TabsList>
            {serviceAreas.map(([key]) => (
              <TabsContent key={key} value={key}>
                {services[key].map(([number, title, description, examples]) => (
                  <article className="service" key={number}><h3>{title}</h3><p>{description}</p><div className="example">{examples}</div></article>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section id="approach" className="section approach">
          <div className="section-heading"><div><span className="eyebrow">Your first engagement</span><h2>Start with one workflow.<br />Earn the next one.</h2></div><p>Choose a recurring task with a clear outcome. Agree the scope, cost, and success criteria before building, then decide whether to expand based on what the first workflow achieves.</p></div>
          <div className="steps">
            <article><h3>Define the result</h3><p>Map the current process and establish a baseline. Your scope sets out the integrations, your team’s involvement, deliverables, proposed timeline, and how success will be measured.</p></article>
            <article><h3>Build and evaluate</h3><p>Implement the bounded workflow and its review points. Test real tasks and failure cases with your team, then compare the results with the agreed baseline.</p></article>
            <article><h3>Decide what comes next</h3><p>Review the evidence together. Agree any changes, the launch plan, ownership, and support responsibilities before committing to wider rollout.</p></article>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {buyerQuestions.map(([question, answer]) => (
              <AccordionItem value={question} key={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="cta"><span className="eyebrow">Start with the work</span><h2>Which task is costing<br />your team too much time?</h2><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg" className="mt-8">Discuss your first workflow</Button></DialogTrigger><p>Bring one recurring task, the tools involved, and what a better result would look like.</p></section>
      </main>
      <footer><Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline"><a href="#">energee</a></Button><span>AI for customer calls and business operations.</span><span>© 2026 Energee · Pittsburgh</span></footer>

      <DialogContent id="contact" className="max-h-[90dvh] overflow-y-auto" onCloseAutoFocus={event => {
        event.preventDefault();
        contactTrigger.current?.focus();
      }}>
        <DialogHeader>
          <span className="eyebrow">One workflow to start</span>
          <DialogTitle className="text-3xl">Let’s find the useful first step.</DialogTitle>
          <DialogDescription>Tell us the recurring task, the tools involved, and what a better result would look like. Open an email draft below, or copy the address into your email app.</DialogDescription>
        </DialogHeader>
        <div id="brief-form" className="grid gap-4">
          <p className="text-sm text-muted-foreground">Preview address: <span className="text-foreground">{contactEmail}</span>. This is a placeholder; email delivery is not available yet.</p>
          <div className="grid gap-2"><Label htmlFor="brief">What process would you like to improve?</Label><Textarea id="brief" rows={5} placeholder="We handle appointment calls manually. We use… A better result would be…" value={brief} onChange={event => setBrief(event.target.value)} /></div>
          <div className="grid gap-2"><Label htmlFor="area">Where does it fit?</Label><NativeSelect id="area" className="w-full" value={area} onChange={event => setArea(event.target.value)}>
            <NativeSelectOption>Operations &amp; automation</NativeSelectOption><NativeSelectOption>AI phone agents</NativeSelectOption><NativeSelectOption>Software engineering</NativeSelectOption><NativeSelectOption>Search &amp; knowledge</NativeSelectOption><NativeSelectOption>Something else</NativeSelectOption>
          </NativeSelect></div>
          <Button asChild><a href={emailDraft}>Open email draft</a></Button>
          <p className="text-sm text-muted-foreground">Your email app opens the draft. You review and send it yourself.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
