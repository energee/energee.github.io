import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Pause, Play } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { startAsciiField } from "./ascii";

// Replace this preview address with the approved public contact before launch.
const contactEmail = "hello@energee.example";

const businessTypes = ["Home services", "Dental or medical", "Med spa or salon", "Auto repair", "Legal", "Something else"] as const;

const ownerQuestions = [
  ["Will AI annoy my customers?", "It only answers calls nobody was going to pick up. The alternative is voicemail, and many callers hang up rather than leave a message."],
  ["How much setup is involved?", "You forward overflow and after-hours calls to a number we give you and connect your calendar. Your team keeps answering the phone the way it does now."],
  ["What does it cost?", "A flat monthly fee that covers calls, AI usage, and support. If the agent doesn’t book more business than it costs in your first 30 days, you don’t pay."],
  ["What if it gets something wrong?", "It reads the details back to the caller before booking. Anything outside its instructions goes to a person with a summary of the call, and you can listen to every recording."],
  ["Will it replace my staff?", "No. It covers the hours and moments when nobody is free to answer."],
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
  const [business, setBusiness] = useState<string>(businessTypes[0]);
  const emailDraft = `mailto:${contactEmail}?subject=${encodeURIComponent(`Missed-call count: ${business}`)}&body=${encodeURIComponent(brief.trim())}`;

  return (
    <Dialog>
      <header>
        <Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline">
          <a href="#" aria-label="Energee home">energee</a>
        </Button>
        <NavigationMenu aria-label="Main navigation" className="ml-auto hidden min-[651px]:flex">
          <NavigationMenuList>
            <NavigationMenuItem><NavigationMenuLink href="#how">How it works</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#guarantee">The guarantee</NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#work">Our work</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DialogTrigger asChild><Button onClick={rememberContactTrigger} variant="ghost" size="sm" className="ml-auto min-[651px]:ml-0">Free call count</Button></DialogTrigger>
      </header>
      <main>
        <section className="hero">
          <canvas ref={canvas} id="ascii-field" aria-hidden="true" />
          <Button ref={motionButton} id="motion-toggle" variant="ghost" size="icon-sm" aria-label="Pause animation" aria-pressed={false} className="group absolute right-[5%] bottom-4 text-muted-foreground/70 hover:text-foreground">
            <Pause aria-hidden="true" className="size-3.5 group-aria-pressed:hidden" />
            <Play aria-hidden="true" className="hidden size-3.5 group-aria-pressed:block" />
          </Button>
          <div className="intro-line"><span>AI PHONE AGENTS FOR BUSINESSES THAT BOOK BY PHONE</span><span>ENERGEE / PITTSBURGH</span></div>
          <h1>Every call answered. <br /><span>It pays off, or it’s free.</span></h1>
          <div className="hero-bottom-grid"><div>
            <p className="hero-copy">A missed call is a job that goes to whoever picks up next. Our AI agent answers the calls your team can’t get to, books them into your calendar, and texts you the details. If it doesn’t book more than it costs in 30 days, you don’t pay.</p>
            <div className="actions flex flex-wrap justify-center gap-3"><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg">Get your free missed-call count</Button></DialogTrigger><Button variant="ghost" size="lg" asChild><a href="#how">See how it works</a></Button></div>
          </div></div>
          <div className="capability-line">After hours, weekends, busy moments. Booked into your calendar. Handed to a person when needed.</div>
        </section>

        <section id="how" className="section" aria-labelledby="how-heading">
          <div className="section-heading">
            <div><span className="eyebrow">How it works</span><h2 id="how-heading">It only answers<br />the calls you’d miss.</h2></div>
            <p>Your team keeps answering the phone the way it does now. Overflow and after-hours calls go to the agent instead of voicemail. Nothing about your day changes except fewer lost customers.</p>
          </div>
          <div className="steps">
            <article><h3>We count what you’re missing</h3><p>We pull your missed and unanswered calls from your phone records and put a number on them. Free, before you commit to anything.</p></article>
            <article><h3>Forward the calls you can’t take</h3><p>The agent talks naturally, takes the job details, checks your calendar, and books the appointment while the caller is still on the line.</p></article>
            <article><h3>See every result</h3><p>Each booking lands in your calendar with a text summary and a call recording. Anything it can’t handle goes to a person with the context attached.</p></article>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">Built for businesses where one call is worth hundreds: home services, dental and medical practices, med spas, auto repair, and legal intake.</p>
        </section>

        <section id="guarantee" className="section" aria-labelledby="guarantee-heading">
          <div className="section-heading">
            <div><span className="eyebrow">The guarantee</span><h2 id="guarantee-heading">It pays for itself,<br />or you don’t pay.</h2></div>
            <p>You pay a flat monthly fee. If the agent doesn’t book more business than it costs in your first 30 days, you don’t pay. Every booking is in your calendar with a recording behind it, so the result is easy to check.</p>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="testing">
              <AccordionTrigger>How we test it before your customers hear it</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">Before it goes live, we call it the way your customers will: interruptions, corrected details, a full calendar, and callers who want a person. It goes live once it books correctly and hands off cleanly.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="work" className="case section">
          <div className="case-title"><span className="eyebrow">Selected work</span></div>
          <div className="case-grid">
            <div>
              <div className="mgr">MGR</div>
              <h2>We build software<br />businesses run on.</h2>
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

        <section id="questions" className="section" aria-labelledby="questions-heading">
          <div className="section-heading"><div><span className="eyebrow">Questions owners ask</span><h2 id="questions-heading">No setup project.<br />No risk.</h2></div><p>Forward a number, connect a calendar, and you’re live. If it doesn’t work, you don’t pay.</p></div>
          <Accordion type="single" collapsible>
            {ownerQuestions.map(([question, answer]) => (
              <AccordionItem value={question} key={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="cta"><span className="eyebrow">Start with the number</span><h2>How many calls did<br />you miss last month?</h2><DialogTrigger asChild><Button onClick={rememberContactTrigger} size="lg" className="mt-8">Get your free missed-call count</Button></DialogTrigger><p>We pull it from your phone records and show you what it’s worth. No commitment.</p></section>
      </main>
      <footer><Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline"><a href="#">energee</a></Button><span>AI phone agents that answer the calls you miss.</span><span>© 2026 Energee · Pittsburgh</span></footer>

      <DialogContent id="contact" className="max-h-[90dvh] overflow-y-auto" onCloseAutoFocus={event => {
        event.preventDefault();
        contactTrigger.current?.focus();
      }}>
        <DialogHeader>
          <span className="eyebrow">Free missed-call count</span>
          <DialogTitle className="text-3xl">Find out what you’re missing.</DialogTitle>
          <DialogDescription>Tell us about your business and how you take calls today. We’ll follow up to pull your missed-call count from your phone records. Open an email draft below, or copy the address into your email app.</DialogDescription>
        </DialogHeader>
        <div id="brief-form" className="grid gap-4">
          <p className="text-sm text-muted-foreground">Preview address: <span className="text-foreground">{contactEmail}</span>. This is a placeholder; email delivery is not available yet.</p>
          <div className="grid gap-2"><Label htmlFor="brief">How do you handle calls today?</Label><Textarea id="brief" rows={5} placeholder="We’re a four-truck HVAC company. The office answers 8 to 5; after that it goes to voicemail…" value={brief} onChange={event => setBrief(event.target.value)} /></div>
          <div className="grid gap-2"><Label htmlFor="business">What kind of business?</Label><NativeSelect id="business" className="w-full" value={business} onChange={event => setBusiness(event.target.value)}>
            {businessTypes.map(type => <NativeSelectOption key={type}>{type}</NativeSelectOption>)}
          </NativeSelect></div>
          <Button asChild><a href={emailDraft}>Open email draft</a></Button>
          <p className="text-sm text-muted-foreground">Your email app opens the draft. You review and send it yourself.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
