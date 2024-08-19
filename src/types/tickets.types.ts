export type Ticket = {
    id: string;
    issue: string;
    report: string;
    email: string;
    status: TicketStatus;
  };
  
  type TicketStatus = "New" | "Ongoing" | "Closed" | null;
  