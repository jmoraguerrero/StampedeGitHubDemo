# Calgary Stampede Conversational Agentic Demo Script

This document outlines the step-by-step narrative for presenting the Calgary Stampede Agentic Demo. It highlights the shift from a traditional, rigid chatbot to a highly conversational, context-aware Agentforce experience, backed by Salesforce CRM and future-proofed with the Model Context Protocol (MCP).

---

## Demo Overview & Narrative Arc

```
┌──────────────────────────┐      ┌──────────────────────────┐      ┌──────────────────────────┐
│   1. The Friction        │      │   2. Conversational Flow │      │   3. Salesforce CRM      │
│  Traditional chatbots    │ ───> │  Natural language, Q&A,  │ ───> │  Structured data from    │
│  are rigid and frustrating│      │  context switching, slots│      │  unstructured chat       │
└──────────────────────────┘      └──────────────────────────┘      └──────────────────────────┘
                                                                                  │
                                                                                  ▼
                                                                    ┌──────────────────────────┐
                                                                    │   4. Future MCP Layer    │
                                                                    │  Gemini queries Stampede │
                                                                    │  data directly via MCP   │
                                                                    └──────────────────────────┘
```

---

## Scene 1: The Frustrated Customer (The Friction)

### Speaker Narrative
> "Traditional chatbots are frustrating. They force users down rigid decision trees: 'Press 1 for Tickets, Press 2 for Private Events.' If a customer types a complex, natural sentence like: *'I want to bring my team of 45 people to the Evening Show and have a private space with catering,'* a traditional chatbot breaks. It doesn't know how to handle multi-intent queries, it can't answer side-questions, and it forces the user into a generic form.
> 
> Today, we're going to show you how Salesforce Agentforce delivers a true **conversational agentic experience**. Our agent doesn't rely on rigid buttons. It understands natural language, answers contextual questions mid-conversation, dynamically fills 'slots' of information, and writes structured data directly to Salesforce in real-time."

### Action on Screen
1. Show the **Calgary Stampede Mockup Website** homepage.
2. Point out the prominent **"Plan Your Visit"** floating action button in the bottom-right corner.
3. Click the button to open the **Agentforce Chat Widget**.

---

## Scene 2: The Conversational Agentforce Experience

### Action on Screen
1. The Agentforce Chat Widget slides open with an open-ended, welcoming greeting:
   > *"Howdy! Welcome to the Calgary Stampede. I'm your digital concierge. Tell me a bit about what you're planning—are you coming with family, hosting a corporate group, or looking for the ultimate VIP experience?"*
2. Instead of clicking a button, the presenter types a complex, free-form query in the chat input:
   > **User:** *"Hey there! I'm planning a corporate outing for about 45 people during the Stampede. We want to see the Evening Show but also want a private space with catering. What do you recommend?"*
3. Click **Send**.

---

### Understanding & Routing (Multi-Intent Parsing)

#### Speaker Narrative
> "Notice what just happened. The user didn't select 'Tickets' or 'Private Events.' They expressed a complex, multi-intent request: a corporate outing (Private Event), for 45 people (Group Size), for the Evening Show (Event Type), with catering. 
> 
> Our Agentforce agent parses this unstructured text, identifies the key parameters, and responds with tailored recommendations."

#### Action on Screen
1. The Agent responds dynamically:
   > *"Howdy! That sounds like an unforgettable corporate outing. For a group of 45 looking for a private space with catering for the Evening Show, I highly recommend our premium **Infield Suites**—they sit right in the heart of the action with private catering and a spectacular view of the chuckwagons and fireworks. 
   > 
   > Alternatively, we could look at a semi-private **Reserved Table Bundle at Ranchman's**. Let me check the live Salesforce inventory for you. Do you have a specific date in mind, or are you flexible?"*

---

### Context Switching & Q&A (Natural Conversation)

#### Speaker Narrative
> "In a traditional chatbot, if the user asks a side-question now, the bot gets confused or loses the booking state. Let's test our agent's conversational flexibility. We'll ask about the dress code—a common question for corporate clients—and see if the agent can answer it and then smoothly guide us back to the booking."

#### Action on Screen
1. The presenter types a side-question:
   > **User:** *"We're looking at July 9th or 10th. By the way, is there a dress code for the Infield Suites? Some of our clients are coming straight from a conference."*
2. Click **Send**.
3. The Agent responds instantly, answering the question and returning to the flow:
   > *"No dress code to worry about! While many folks love to wear their favorite western boots and cowboy hats, business casual or conference attire is perfectly fine. We want everyone to feel comfortable!
   > 
   > Now, looking at our live Salesforce inventory for July 9th and 10th: I see we have an **Infield Suite** available on **July 9th**, but July 10th is currently sold out. For July 10th, we do have semi-private tables at Ranchman's. 
   > 
   > Would you like me to create a high-priority corporate lead in Salesforce for the July 9th Infield Suite so our VIP coordinator can lock it in for you?"*

---

### Dynamic Slot Filling (No Rigid Forms)

#### Speaker Narrative
> "Instead of forcing the user to fill out a 5-field form, the agent simply asks to confirm. The user can provide all their contact details in a single, natural sentence, and the agent will extract them dynamically."

#### Action on Screen
1. The presenter types:
   > **User:** *"Yes, July 9th for the Infield Suite sounds perfect. Let's do that. My name is Sarah Jenkins, email is sarah@acme.com, company is Acme Corp."*
2. Click **Send**.
3. The Agent parses the sentence, extracts the contact info, and confirms:
   > *"Awesome, Sarah! I've captured all the details and created a high-priority corporate lead in Salesforce (Reference: **LD-2026-8802**). 
   > 
   > Here is what I've registered:
   > - **Contact:** Sarah Jenkins
   > - **Company:** Acme Corp
   > - **Email:** sarah@acme.com
   > - **Venue:** Infield Suites
   > - **Date:** July 9, 2026
   > - **Group Size:** 45
   > 
   > A Stampede VIP Event Coordinator will reach out to you at sarah@acme.com to customize your catering menu and finalize the contract. Is there anything else I can help you plan today?"*

---

## Scene 3: Under the Hood (Salesforce CRM Console)

### Speaker Narrative
> "Let's see what happened under the hood. We'll toggle over to our Salesforce CRM Console. 
> 
> Look at the **Leads** table. Sarah Jenkins from Acme Corp was created instantly. But look at how the data is structured: the agent successfully extracted the contact name, company, email, group size of 45, preferred date of July 9, and desired venue of Infield Suites—all from unstructured, conversational chat. 
> 
> This is the power of Salesforce. We've turned a natural, friction-free conversation into structured, actionable CRM data."

### Action on Screen
1. Toggle to the **Salesforce CRM Console** panel on the website.
2. Highlight the **Leads Table**: Point out the new lead `Sarah Jenkins (Acme Corp)` with venue `Infield Suites`, group size `45`, status `New (High Priority)`, and date `July 9, 2026`.
3. Highlight the **Inventory Table**: Show that the Infield Suites inventory for July 9 has been marked as *Hold* or *Reserved*.

---

## Scene 4: Future Agentic Connectivity (Google Gemini & MCP)

### Speaker Narrative
> "Finally, let's look at the future of agentic connectivity. What if Sarah doesn't visit our website? What if she asks her personal AI assistant, Google Gemini, to plan this event?
> 
> By building a Stampede MCP Server, we expose our Salesforce data and booking APIs directly to external LLMs. 
> 
> Let's simulate a user asking Google Gemini: *'I'm planning a corporate event for 45 people at the Calgary Stampede. What private venues are available on July 9?'*
> 
> Gemini connects to our MCP Server, calls the `get_event_catalog` and `check_ticket_availability` tools, and queries Salesforce in real-time. It sees that the Infield Suites are available on July 9 and presents a rich, conversational recommendation directly inside the Gemini interface.
> 
> We are meeting our customers wherever they are, powered by a single Salesforce backend."

### Action on Screen
1. Show the **MCP Server Terminal / Console** or a mock Gemini interface.
2. Show the incoming query: *"I'm planning a corporate event for 45 people at the Calgary Stampede. What private venues are available on July 9?"*
3. Show the MCP tool execution logs:
   - `Calling tool: check_ticket_availability(date: "2026-07-09")` -> Returns Infield Suites available from Salesforce.
4. Show the rich, structured response generated by Gemini:
   > *"For a corporate group of 45 on July 9, 2026, the Calgary Stampede has the premium **Infield Suites** available. They offer private catering and a spectacular view of the Evening Show. 
   > 
   > Would you like me to submit an inquiry to the Stampede VIP team for you?"*
