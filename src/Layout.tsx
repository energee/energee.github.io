// Shared page chrome: header, footer, and the contact dialog every page can open.
import { createContext, useContext, useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Textarea } from "@/components/ui/textarea";
import { mgrPath, services } from "./services";

// Replace this preview address with the approved public contact before launch.
const contactEmail = "hello@energee.example";

const businessTypes = ["Not specified", "Home services", "Professional services", "Retail or hospitality", "Manufacturing or distribution", "Software or technology", "Something else"] as const;

const navLinks = [...services.map(({ path, nav }) => [nav, path] as const), ["Our work", mgrPath] as const];

// Remembers which button opened the dialog so focus can return to it on close.
const RememberTrigger = createContext<(event: MouseEvent<HTMLButtonElement>) => void>(() => {});

/** A shadcn Button that opens the contact dialog. Must render inside <Layout>. */
export function ContactButton(props: ComponentProps<typeof Button>) {
  const remember = useContext(RememberTrigger);
  return <DialogTrigger asChild><Button {...props} onClick={remember} /></DialogTrigger>;
}

export function Layout({ children }: { children: ReactNode }) {
  const contactTrigger = useRef<HTMLButtonElement | null>(null);
  const [brief, setBrief] = useState("");
  const [business, setBusiness] = useState<string>(businessTypes[0]);
  const emailDraft = `mailto:${contactEmail}?subject=${encodeURIComponent(`Workflow discovery: ${business}`)}&body=${encodeURIComponent(brief.trim())}`;

  return (
    <RememberTrigger.Provider value={event => { contactTrigger.current = event.currentTarget; }}>
      <Dialog>
        <header>
          <Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline">
            <a href="/" aria-label="Energee home">energee</a>
          </Button>
          <NavigationMenu aria-label="Main navigation" className="ml-auto hidden min-[900px]:flex">
            <NavigationMenuList>
              {navLinks.map(([label, href]) => <NavigationMenuItem key={href}><NavigationMenuLink href={href}>{label}</NavigationMenuLink></NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>
          <ContactButton variant="ghost" size="sm" className="ml-auto min-[900px]:ml-0">Let’s talk</ContactButton>
        </header>
        <main>{children}</main>
        <footer>
          <Button variant="link" asChild className="brand h-auto p-0 text-[28px] font-bold tracking-[-1.7px] text-foreground hover:no-underline"><a href="/">energee</a></Button>
          <span>Applied AI for business knowledge and workflows.</span>
          <span>© 2026 Energee · Pittsburgh</span>
        </footer>

        <DialogContent id="contact" className="max-h-[90dvh] overflow-y-auto" onCloseAutoFocus={event => {
          event.preventDefault();
          contactTrigger.current?.focus();
        }}>
          <DialogHeader>
            <span className="eyebrow">Workflow discovery</span>
            <DialogTitle className="text-3xl">Find the right starting point.</DialogTitle>
            <DialogDescription>Tell us where work gets stuck, which tools you use, and what a better result would look like. Open an email draft below, or copy the address into your email app. Share a general description, not customer records or confidential documents.</DialogDescription>
          </DialogHeader>
          <div id="brief-form" className="grid gap-4">
            <p className="text-sm text-muted-foreground">Preview address: <span className="text-foreground">{contactEmail}</span>. This is a placeholder; email delivery is not available yet.</p>
            <div className="grid gap-2"><Label htmlFor="brief">What work keeps getting stuck?</Label><Textarea id="brief" rows={5} placeholder="Our team searches policy documents to answer the same questions, then copies each request into our CRM. We want faster answers and fewer manual updates…" value={brief} onChange={event => setBrief(event.target.value)} /></div>
            <div className="grid gap-2"><Label htmlFor="business">What kind of business?</Label><NativeSelect id="business" className="w-full" value={business} onChange={event => setBusiness(event.target.value)}>
              {businessTypes.map(type => <NativeSelectOption key={type}>{type}</NativeSelectOption>)}
            </NativeSelect></div>
            <Button asChild><a href={emailDraft}>Open email draft</a></Button>
            <p className="text-sm text-muted-foreground">Your email app opens the draft. You review and send it yourself.</p>
          </div>
        </DialogContent>
      </Dialog>
    </RememberTrigger.Provider>
  );
}
