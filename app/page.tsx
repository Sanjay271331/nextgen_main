import ClientHome from "@/components/ClientHome";
import { fetchContentBlocks, fetchDynamicButtons, fetchEventSchedule, fetchDomains, fetchFaqs } from "./actions";

export const revalidate = 0; // Disable static caching for real-time CMS

export default async function Home() {
  const content = await fetchContentBlocks();
  const buttons = await fetchDynamicButtons();
  const events = await fetchEventSchedule();
  const domains = await fetchDomains();
  const faqs = await fetchFaqs();

  return (
    <ClientHome 
      content={content} 
      buttons={buttons} 
      events={events} 
      domains={domains}
      faqs={faqs}
    />
  );
}
