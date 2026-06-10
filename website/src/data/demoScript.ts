export type Scenario = 'b2b' | 'b2c'

export type Speaker = 'user' | 'agent'

export type ChatMessage = {
  speaker: Speaker
  text: string
}

export type DemoStep = {
  id: number
  title: string
  status: string
  eyebrow: string
  messages: ChatMessage[]
}

export type LeadSnapshot = {
  name?: string
  company?: string
  email?: string
  date?: string
  venue?: string
  groupSize?: string
  status?: string
  reference?: string
}

export type CartItem = {
  id: string
  name: string
  detail: string
  price: string
  warning?: string
}

export type CartSnapshot = {
  items: CartItem[]
  subtotal: string
  total: string
  badge: string
}

export type McpToolCall = {
  tool: string
  input: string
  output: string
}

export const b2bSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Multi-Intent Opening',
    status: 'NLU Parsing Active',
    eyebrow: 'Corporate hospitality',
    messages: [
      {
        speaker: 'user',
        text: 'Hey there! I am planning a corporate outing for about 45 people during the Stampede. We want to see the Evening Show but also want a private space with catering. What do you recommend?',
      },
      {
        speaker: 'agent',
        text: 'Howdy! That sounds like an unforgettable corporate outing. For a group of 45 looking for a private space with catering for the Evening Show, I highly recommend our premium Infield Suites - they sit right in the heart of the action with private catering and a spectacular view of the chuckwagons and fireworks. Alternatively, we could look at a semi-private Reserved Table Bundle at Ranchman\'s. Let me check the live Salesforce inventory for you. Do you have a specific date in mind, or are you flexible?',
      },
    ],
  },
  {
    id: 2,
    title: 'Context Q&A',
    status: 'Context-Aware Q&A Active',
    eyebrow: 'Side question handled',
    messages: [
      {
        speaker: 'user',
        text: 'We are looking at July 9th or 10th. By the way, is there a dress code for the Infield Suites? Some of our clients are coming straight from a conference.',
      },
      {
        speaker: 'agent',
        text: 'No dress code to worry about! While many folks love to wear their favorite western boots and cowboy hats, business casual or conference attire is perfectly fine. Now, looking at our live Salesforce inventory for July 9th and 10th: I see we have an Infield Suite available on July 9th, but July 10th is currently sold out. Would you like me to create a high-priority corporate lead in Salesforce for the July 9th Infield Suite so our VIP coordinator can lock it in for you?',
      },
    ],
  },
  {
    id: 3,
    title: 'Slot Extraction',
    status: 'Dynamic Slot Extraction Active',
    eyebrow: 'Lead created',
    messages: [
      {
        speaker: 'user',
        text: 'Yes, July 9th for the Infield Suite sounds perfect. Let us do that. My name is Sarah Jenkins, email is sarah@acme.com, company is Acme Corp.',
      },
      {
        speaker: 'agent',
        text: 'Awesome, Sarah! I have captured all the details and created a high-priority corporate lead in Salesforce (Reference: LD-2026-8802). Contact: Sarah Jenkins. Company: Acme Corp. Email: sarah@acme.com. Venue: Infield Suites. Date: July 9, 2026. Group Size: 45. A Stampede VIP Event Coordinator will reach out to customize your catering menu and finalize the contract.',
      },
    ],
  },
]

export const b2cSteps: DemoStep[] = [
  {
    id: 1,
    title: 'Request & Proactive Validation',
    status: 'NLU Parsing & Proactive Validation Active',
    eyebrow: 'Family trip',
    messages: [
      {
        speaker: 'user',
        text: 'Hey! I am planning a trip with my family of 4 on July 9th. Can we get 4 general admission tickets and also add 4 afternoon Rodeo tickets?',
      },
      {
        speaker: 'agent',
        text: 'Howdy! I would love to help you plan that family trip. I can certainly add both to your cart, but as your digital advisor, I want to double-check: did you know that your Afternoon Rodeo passes actually include full-day admission to the Stampede grounds? Since you asked for both, you would be double-paying for grounds access.',
      },
    ],
  },
  {
    id: 2,
    title: 'Cart Optimization',
    status: 'Client-Side Cart API Triggered',
    eyebrow: 'Savings applied',
    messages: [
      {
        speaker: 'user',
        text: 'Oh, wow! I had no idea the Rodeo tickets covered grounds entry. Yes, please remove the general admission tickets and just keep the 4 Rodeo passes. That saves us $100!',
      },
      {
        speaker: 'agent',
        text: 'You bet! I have automatically updated your cart to remove the 4 General Admission tickets. Your cart now contains just 4 Afternoon Rodeo tickets with grounds admission fully included for a new total of $180. Since you are coming on July 9th, would you like me to also add a parking pass or recommend some family-friendly food stands?',
      },
    ],
  },
  {
    id: 3,
    title: 'Value-Add Upsell',
    status: 'Value-Add Upsell & Contextual Q&A Active',
    eyebrow: 'Parking added',
    messages: [
      {
        speaker: 'user',
        text: 'Yes, a parking pass would be great! Also, what time should we arrive for the afternoon Rodeo?',
      },
      {
        speaker: 'agent',
        text: 'Perfect, I have added a Day Parking Pass ($25.00) to your cart! Regarding timing: the Afternoon Rodeo starts at 1:30 PM, but since grounds admission is included, I highly recommend arriving around 11:30 AM to enjoy the exhibits and grab lunch first. Your updated total is $205. I am ready to help you check out whenever you are!',
      },
    ],
  },
]

export const leadSnapshots: Record<number, LeadSnapshot> = {
  1: {
    venue: 'Infield Suites',
    groupSize: '45',
    status: 'Intent identified',
  },
  2: {
    date: 'July 9, 2026',
    venue: 'Infield Suites',
    groupSize: '45',
    status: 'Inventory matched',
  },
  3: {
    name: 'Sarah Jenkins',
    company: 'Acme Corp',
    email: 'sarah@acme.com',
    date: 'July 9, 2026',
    venue: 'Infield Suites',
    groupSize: '45',
    status: 'New - High Priority',
    reference: 'LD-2026-8802',
  },
}

export const cartSnapshots: Record<number, CartSnapshot> = {
  1: {
    items: [
      {
        id: 'general-admission',
        name: 'Stampede General Admission',
        detail: 'Date: July 9, 2026 - Qty: 4',
        price: '$100.00',
        warning: 'Redundant grounds admission detected',
      },
      {
        id: 'rodeo',
        name: 'Afternoon Rodeo Pass',
        detail: 'Date: July 9, 2026 - Qty: 4',
        price: '$180.00',
      },
    ],
    subtotal: '$280.00',
    total: '$280.00',
    badge: 'Redundant Items Flagged',
  },
  2: {
    items: [
      {
        id: 'rodeo',
        name: 'Afternoon Rodeo Pass',
        detail: 'Date: July 9, 2026 - Qty: 4',
        price: '$180.00',
      },
    ],
    subtotal: '$180.00',
    total: '$180.00',
    badge: 'Cart Optimized Automatically',
  },
  3: {
    items: [
      {
        id: 'rodeo',
        name: 'Afternoon Rodeo Pass',
        detail: 'Date: July 9, 2026 - Qty: 4',
        price: '$180.00',
      },
      {
        id: 'parking',
        name: 'Day Parking Pass',
        detail: 'Date: July 9, 2026 - Qty: 1',
        price: '$25.00',
      },
    ],
    subtotal: '$205.00',
    total: '$205.00',
    badge: 'Parking Pass Added',
  },
}

export const mcpToolCalls: McpToolCall[] = [
  {
    tool: 'get_event_catalog',
    input: 'eventType: private hospitality',
    output: 'Evening Show, Infield Suites, Ranchman\'s reserved tables',
  },
  {
    tool: 'check_ticket_availability',
    input: 'date: 2026-07-09, groupSize: 45',
    output: 'Infield Suites available; July 10 sold out',
  },
  {
    tool: 'create_private_event_lead',
    input: 'pending user confirmation',
    output: 'Ready to submit inquiry to Stampede VIP team',
  },
]

export const mcpPrompt =
  'I am planning a corporate event for 45 people at the Calgary Stampede. What private venues are available on July 9?'

export const mcpResponse =
  'For a corporate group of 45 on July 9, 2026, the Calgary Stampede has the premium Infield Suites available. They offer private catering and a spectacular view of the Evening Show. Would you like me to submit an inquiry to the Stampede VIP team for you?'
