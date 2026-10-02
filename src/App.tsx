import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
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
  const [briefStatus, setBriefStatus] = useState("");

  function downloadBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `ENERGEE / PROJECT BRIEF\n\nArea: ${area}\n\n${brief.trim()}\n\nCreated locally in the Energee site preview. Not submitted.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "energee-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setBriefStatus("Your brief was prepared for download. Nothing was sent.");
  }

  return (
    <Dialog>
      <header>
        <Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline">
          <a href="#" aria-label="Energee home">energee</a>
        </Button>
        <NavigationMenu aria-label="Main navigation" className="ml-auto hidden min-[651px]:flex">
          <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink href="#capabilities">What we build</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#work">Our work</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#approach">Approach</NavigationMenuLink></NavigationMenuItem>
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
          <div className="intro-line"><span>AI WORKFLOWS &amp; SOFTWARE ENGINEERING</span><span>ENERGEE / PITTSBURGH</span></div>
          <h1>We build AI workflows <br />for the work that <br />doesn’t follow a script.</h1>
          <div className="hero-bottom-grid"><div>
            <p className="hero-copy">We build agentic workflows that adapt to real-world complexity, handling exceptions and changing conditions that typically demand constant human attention.</p>
            <div className="actions"><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg">Talk to us about your project</Button></DialogTrigger></div>
          </div></div>
          <div className="capability-line">Agents that handle the routine. Interfaces that keep you in control.</div>
        </section>

        <section id="work" className="case section">
          <div className="case-title"><span className="eyebrow">Selected work</span></div>
          <div className="case-grid">
            <div>
              <div className="mgr">MGR</div>
              <h2>From disconnected tools<br />to daily operations.</h2>
              <p>A brewery operations platform spanning product direction, interface design, architecture, and implementation. Built to support the way a brewery actually runs.</p>
              <Button variant="link" asChild className="mt-6 h-auto p-0 text-primary">
                <a href="https://github.com/energee/mgr-zero" target="_blank" rel="noopener noreferrer">Explore the repository</a>
              </Button>
            </div>
            <div className="case-details">
              <div className="case-row"><span>THE CHALLENGE</span><p>The brewery’s previous setup with Ollie Ops left gaps in functionality, data access, and support for its workflows.</p></div>
              <div className="case-row"><span>THE SYSTEM</span><p>Production, inventory, wholesale ordering, and customer access in one application. Integrations connect QuickBooks and Square, with AI-assisted operational features.</p></div>
              <div className="case-row"><span>THE RESULT</span><p>MGR replaced Ollie Ops and is actively used for brewery operations.</p></div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Next.js / React</Badge><Badge variant="secondary">TypeScript</Badge><Badge variant="secondary">PostgreSQL / Supabase</Badge>
              </div>
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="architecture">
                  <AccordionTrigger>Inside the architecture</AccordionTrigger>
                  <AccordionContent>
                    <p>The repository documents tenant isolation, traceable inventory history, and safe retries. AI-assisted changes use permission boundaries and confirmation steps.</p>
                    <p className="minor">Architecture described from project documentation. No performance or savings metrics are claimed.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section capabilities">
          <div className="section-heading"><div><span className="eyebrow dark">Services</span><h2>Practical applications of AI</h2></div><p>Connect the systems you already use. Give agents useful work. Keep the decisions that matter in your hands.</p></div>
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
          <div className="control-strip"><strong>Powerful agents. Clean interfaces.</strong><p>Review exceptions, approve important actions, and understand what happened without digging through logs.</p></div>
        </section>

        <section id="phone-agents" className="section" aria-labelledby="phone-agents-heading">
          <div className="section-heading">
            <div><span className="eyebrow dark">AI phone agents</span><h2 id="phone-agents-heading">Natural conversations.<br />Faster resolutions.</h2></div>
            <p>We build AI phone agents for natural speech, quick responses, and getting things done. Connected to your business systems, they can turn a conversation into a booking, an answer, or a completed next step.</p>
          </div>
          <div className="steps grid-cols-1 min-[651px]:grid-cols-2">
            <article>
              <Badge variant="secondary" className="mb-4">Inbound calls</Badge>
              <h3>Get callers to what they need</h3>
              <p>Let customers explain what they need in their own words. Help them get an answer, book or reschedule an appointment, or reach the right person—with the context carried forward.</p>
              <p className="mt-4 text-sm text-muted-foreground">Customer questions · Appointment booking · Call routing</p>
            </article>
            <article>
              <Badge variant="secondary" className="mb-4">Outbound calls</Badge>
              <h3>Make every follow-up useful</h3>
              <p>Confirm an appointment, resolve an open request, or agree on the next step. Keep calls short and relevant, capture the outcome, and update your records so customers don’t have to repeat themselves.</p>
              <p className="mt-4 text-sm text-muted-foreground">Inquiry follow-ups · Appointment reminders · Service check-ins</p>
            </article>
          </div>
          <div className="control-strip">
            <strong>Reduce your reliance on outsourced call centers.</strong>
            <p>Automate routine inbound and outbound calls to reduce outsourced call volume and staffing overhead. Keep your people focused on complex questions and customer relationships that need a human.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="connected-work-heading">
          <div className="section-heading">
            <div><span className="eyebrow dark">Human review</span><h2 id="connected-work-heading">Let the agent cook.<br />Keep the judgment.</h2></div>
            <p>Copying data, chasing updates, and checking whether the next step happened is work a connected system should handle. We build that system, with clear review points for the decisions that need your team.</p>
          </div>
          <div className="steps">
            <article><h3>Keep routine work moving</h3><p>Connect the request, the relevant records, and the next action. Move information between your tools without making someone carry it through every step.</p></article>
            <article><h3>Bring exceptions with context</h3><p>When information is missing or rules conflict, bring the issue, supporting records, and proposed next step to the person who can resolve it.</p></article>
            <article><h3>Make changes traceable</h3><p>Keep a record of the inputs, actions, and approvals so your team can understand what happened and investigate when something goes wrong.</p></article>
          </div>
        </section>

        <section id="approach" className="section approach">
          <div className="section-heading"><div><span className="eyebrow dark">How we work</span><h2>From a process to a working system</h2></div><p>Focus on one workflow, its rough edges, and the people who depend on it.</p></div>
          <div className="steps">
            <article><h3>Understand the work</h3><p>Map the process, the data, and the exceptions. Identify where automation can help and where human judgment belongs.</p></article>
            <article><h3>Build the workflow</h3><p>Connect the tools, implement the agent, and design the interface your team will use to supervise it.</p></article>
            <article><h3>Test the messy parts</h3><p>Evaluate edge cases, permissions, and recovery paths. Refine the workflow with the people doing the work.</p></article>
          </div>
        </section>
        <section className="cta"><span className="eyebrow dark">Start a project</span><h2>Let’s improve a workflow.</h2><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg" className="mt-8">Let’s work through it</Button></DialogTrigger><p>Bring a process, a bottleneck, or a system that needs to work better.</p></section>
      </main>
      <footer><Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline"><a href="#">energee</a></Button><span>AI workflows. Built for the real world.</span><span>© 2026 Energee</span></footer>

      <DialogContent id="contact" className="max-h-[90dvh] overflow-y-auto" onCloseAutoFocus={event => {
        event.preventDefault();
        contactTrigger.current?.focus();
      }}>
        <DialogHeader>
          <span className="eyebrow">Start with the problem</span>
          <DialogTitle className="text-3xl">Tell us about the work.</DialogTitle>
          <DialogDescription>This preview lets you draft a project brief. Nothing is sent.</DialogDescription>
        </DialogHeader>
        <form id="brief-form" onSubmit={downloadBrief} className="grid gap-4">
          <div className="grid gap-2"><Label htmlFor="brief">What process would you like to improve?</Label><Textarea id="brief" rows={5} placeholder="We spend hours each week checking orders across three systems…" required value={brief} onChange={event => setBrief(event.target.value)} /></div>
          <div className="grid gap-2"><Label htmlFor="area">Where does it fit?</Label><NativeSelect id="area" className="w-full" value={area} onChange={event => setArea(event.target.value)}>
            <NativeSelectOption>Operations &amp; automation</NativeSelectOption><NativeSelectOption>AI phone agents</NativeSelectOption><NativeSelectOption>Software engineering</NativeSelectOption><NativeSelectOption>Search &amp; knowledge</NativeSelectOption><NativeSelectOption>Something else</NativeSelectOption>
          </NativeSelect></div>
          <Button type="submit">Download project brief</Button>
          <p id="brief-status" role="status" className="text-sm text-muted-foreground">{briefStatus}</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
