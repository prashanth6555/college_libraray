export const college = {
  name: "Meridian College",
  library: "Meridian College Library",
  motto: "Read deeply. Think clearly.",
  established: 1968,
  address: "Library Block, Scholar's Walk, Meridian College Campus, Bengaluru 560001",
  email: "library@meridian.edu",
  phone: "+91 80 4123 5600",
  maps: "https://maps.google.com/?q=Bengaluru",
};

export const hours = [
  { day: "Monday – Friday", time: "8:00 AM – 10:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
  { day: "Exam weeks", time: "Reading room until midnight" },
];

export function libraryStatus(now = new Date()) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const window =
    day === 0 ? [10 * 60, 16 * 60] : day === 6 ? [9 * 60, 18 * 60] : [8 * 60, 22 * 60];
  const open = minutes >= window[0] && minutes < window[1];
  const closeLabel = day === 0 ? "4:00 PM" : day === 6 ? "6:00 PM" : "10:00 PM";
  const nextOpen = day === 0 ? "Monday, 8:00 AM" : "8:00 AM";
  return open
    ? { open: true, label: `Open now · until ${closeLabel}` }
    : { open: false, label: `Closed now · opens ${nextOpen}` };
}

export const services = [
  {
    icon: "BookOpen",
    title: "Circulation desk",
    text: "Issue, return, and renew in a few minutes. Members may hold four books for fourteen days.",
    image: "/images/stacks.jpg",
    points: ["Same-day issuing", "One free renewal", "Hold requests when a copy returns"],
  },
  {
    icon: "Monitor",
    title: "Digital stacks",
    text: "E-journals, past papers, and thesis PDFs from any campus login, including the residence halls.",
    image: "/images/code.jpg",
    points: ["Past question papers", "E-journals", "Thesis vault"],
  },
  {
    icon: "LampDesk",
    title: "Quiet study rooms",
    text: "Forty-two bookable rooms, from single carrels to group tables with a whiteboard.",
    image: "/images/hall.jpg",
    points: ["Book up to 3 hours", "Group rooms for 4–8", "Silent floor after 6 PM"],
  },
  {
    icon: "Search",
    title: "Research help",
    text: "Librarians sit with you on citations, literature reviews, and finding a source that is actually useful.",
    image: "/images/reading.jpg",
    points: ["Drop-in 2–5 PM", "Citation clinics", "Subject librarians"],
  },
  {
    icon: "Printer",
    title: "Print and scan",
    text: "Card-operated printers and overhead scanners on the ground floor, with a binding press beside them.",
    image: "/images/study.jpg",
    points: ["₹1 per page", "Colour on request", "Scan to email"],
  },
  {
    icon: "Wifi",
    title: "All-day reading room",
    text: "Power at every seat, campus Wi-Fi, and a coffee hatch that stops at the door of the silent floor.",
    image: "/images/shelves.jpg",
    points: ["Laptop loans", "Lockers for bags", "Water fountains on each floor"],
  },
];

export const rules = [
  {
    title: "Membership",
    body: "Carry your college ID. The library account is created with enrolment and stays active while you are a student or a member of staff.",
  },
  {
    title: "What you may borrow",
    body: "Up to four circulating books for fourteen days. Reference books, journals, and reserve textbooks stay inside the building.",
  },
  {
    title: "Renewals and holds",
    body: "Renew once online or at the desk if nobody is waiting. A second renewal needs a librarian, and overdue books cannot be renewed.",
  },
  {
    title: "Fines",
    body: "₹5 per day after the due date, capped at ₹200 a book. Accounts with more than ₹100 in fines are paused until the balance is cleared.",
  },
  {
    title: "Lost or damaged books",
    body: "Report a lost book within two days. You replace the title or pay the current price plus a ₹150 processing fee.",
  },
  {
    title: "Quiet and care",
    body: "The top floor is silent. Phone calls stay in the lobby. Food stays in the café; covered drinks are allowed in the lounge only.",
  },
  {
    title: "Bags and belongings",
    body: "Large bags go in the lobby lockers. The college is not responsible for devices left unattended in the reading room.",
  },
  {
    title: "Respect the shelves",
    body: "Do not reshelve books yourself. Leave them on the return cart so the shelf order stays intact for the next reader.",
  },
];

export const fineRows = [
  { item: "Overdue circulating book", rate: "₹5 / day", cap: "₹200" },
  { item: "Overdue overnight reserve", rate: "₹20 / day", cap: "₹200" },
  { item: "Lost book", rate: "Replacement + ₹150", cap: "—" },
  { item: "Damaged barcode or cover", rate: "₹80 repair", cap: "—" },
  { item: "Account pause", rate: "Fines above ₹100", cap: "Until cleared" },
];
