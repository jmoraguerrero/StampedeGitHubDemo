import React from "react";
import {
  Stack,
  Row,
  Grid,
  Divider,
  Spacer,
  Text,
  H1,
  H2,
  H3,
  Card,
  CardHeader,
  CardBody,
  Button,
  Pill,
  Stat,
  Callout,
  useHostTheme,
  useCanvasState,
  mergeStyle
} from "cursor/canvas";

export default function StampedeDemoProposal() {
  const theme = useHostTheme();
  
  // Tab state: "vision" | "script" | "roadmap"
  const [activeTab, setActiveTab] = useCanvasState<string>("activeTab", "vision");
  
  // Script step state: 1 | 2 | 3
  const [scriptStep, setScriptStep] = useCanvasState<number>("scriptStep", 1);

  // Script scenario state: "b2b" | "b2c"
  const [scriptScenario, setScriptScenario] = useCanvasState<string>("scriptScenario", "b2b");

  // Script step state for B2C: 1 | 2 | 3
  const [scriptStepB2C, setScriptStepB2C] = useCanvasState<number>("scriptStepB2C", 1);

  // Custom styling for headers and layouts
  const containerStyle = {
    padding: "24px",
    background: theme.bg.editor,
    minHeight: "100%",
    color: theme.text.primary,
  };

  const headerStyle = {
    background: theme.fill.secondary,
    padding: "24px",
    borderRadius: "8px",
    borderLeft: `4px solid ${theme.palette.red || "#C8102E"}`,
    marginBottom: "24px",
  };

  // Render Vision & Architecture Tab
  const renderVision = () => (
    <Stack gap={20}>
      <Callout tone="info" title="Executive Summary">
        <Text>
          This proposal outlines the creation of a fully runnable local demo showcasing a highly conversational Agentforce experience for the Calgary Stampede. The solution bridges unstructured customer conversations with structured Salesforce CRM data, and demonstrates future-proof connectivity via the Model Context Protocol (MCP).
        </Text>
      </Callout>

      <H2>Business Value & Key Pillars</H2>
      <Grid columns={3} gap={16}>
        <Card>
          <CardHeader trailing={<Pill tone="success" active size="sm">Conversational</Pill>}>
            Plan Your Visit
          </CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Replaces rigid, traditional chatbots with an open-ended assistant that understands complex, multi-intent visitor statements naturally.
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Pill tone="warning" active size="sm">High Value</Pill>}>
            Lead Capture
          </CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Dynamically extracts corporate event details (group size, date, venue) from natural chat and instantly inserts leads in Salesforce.
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardHeader trailing={<Pill tone="info" active size="sm">Future Proof</Pill>}>
            MCP Integration
          </CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Exposes live Salesforce ticket inventory and event catalogs directly to external AI clients like Google Gemini using the Model Context Protocol.
            </Text>
          </CardBody>
        </Card>
      </Grid>

      <H2>System Architecture</H2>
      <Card>
        <CardHeader>Architecture Layers</CardHeader>
        <CardBody>
          <Stack gap={16}>
            <Row gap={12} align="stretch">
              <div style={{ flex: 1, background: theme.fill.tertiary, padding: "12px", borderRadius: "6px" }}>
                <Text weight="semibold" size="small" style={{ color: theme.palette.red }}>1. Experience Layer</Text>
                <Divider style={{ margin: "6px 0" }} />
                <Text size="small" tone="secondary">Stampede Website (React App) & Embedded Agentforce Chat Widget</Text>
              </div>
              <div style={{ flex: 1, background: theme.fill.tertiary, padding: "12px", borderRadius: "6px" }}>
                <Text weight="semibold" size="small" style={{ color: theme.palette.orange }}>2. Agent Layer</Text>
                <Divider style={{ margin: "6px 0" }} />
                <Text size="small" tone="secondary">Agentforce Dialogue Orchestrator & Stampede MCP Server</Text>
              </div>
            </Row>
            <Row gap={12} align="stretch">
              <div style={{ flex: 1, background: theme.fill.tertiary, padding: "12px", borderRadius: "6px" }}>
                <Text weight="semibold" size="small" style={{ color: theme.palette.green }}>3. Integration Layer</Text>
                <Divider style={{ margin: "6px 0" }} />
                <Text size="small" tone="secondary">JSforce Salesforce Connection Module & Mock DB Fallback</Text>
              </div>
              <div style={{ flex: 1, background: theme.fill.tertiary, padding: "12px", borderRadius: "6px" }}>
                <Text weight="semibold" size="small" style={{ color: theme.palette.blue }}>4. Platform Layer</Text>
                <Divider style={{ margin: "6px 0" }} />
                <Text size="small" tone="secondary">Salesforce CRM (Leads, Bookings, Ticket Inventory, Event Catalog)</Text>
              </div>
            </Row>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );

  // Render Conversational Script Tab
  const renderScript = () => {
    const stepsB2B = [
      { id: 1, label: "1. Multi-Intent Opening" },
      { id: 2, label: "2. Context Q&A" },
      { id: 3, label: "3. Slot Extraction" }
    ];

    const stepsB2C = [
      { id: 1, label: "1. Multi-Intent Request" },
      { id: 2, label: "2. Contextual Q&A" },
      { id: 3, label: "3. Auto-Cart Adjustment" }
    ];

    return (
      <Stack gap={20}>
        <Callout tone="success" title="Interactive Script Simulator">
          <Text>
            Select a scenario and step below to simulate how the conversational agent processes unstructured text, handles side-questions, and extracts structured data or manipulates client-side state.
          </Text>
        </Callout>

        {/* Scenario Toggle */}
        <Row gap={8}>
          <Button
            variant={scriptScenario === "b2b" ? "primary" : "secondary"}
            onClick={() => setScriptScenario("b2b")}
            size="sm"
          >
            Scenario A: B2B Corporate Lead (Salesforce CRM)
          </Button>
          <Button
            variant={scriptScenario === "b2c" ? "primary" : "secondary"}
            onClick={() => setScriptScenario("b2c")}
            size="sm"
          >
            Scenario B: B2C Ticket Booking (Auto-Cart Fill)
          </Button>
        </Row>

        {/* Step Pills */}
        <Row gap={8}>
          {scriptScenario === "b2b" ? (
            stepsB2B.map(step => (
              <Pill
                key={step.id}
                active={scriptStep === step.id}
                onClick={() => setScriptStep(step.id)}
              >
                {step.label}
              </Pill>
            ))
          ) : (
            stepsB2C.map(step => (
              <Pill
                key={step.id}
                active={scriptStepB2C === step.id}
                onClick={() => setScriptStepB2C(step.id)}
              >
                {step.label}
              </Pill>
            ))
          )}
        </Row>

        <Grid columns="2fr 1fr" gap={20}>
          {/* Left: Chat Dialogue */}
          <Card>
            <CardHeader trailing={<Pill tone="neutral" active size="sm">Dialogue</Pill>}>
              {scriptScenario === "b2b" ? "Agentforce Chat Widget (B2B Mode)" : "Agentforce Chat Widget (B2C Mode)"}
            </CardHeader>
            <CardBody>
              {scriptScenario === "b2b" ? (
                <Stack gap={16}>
                  {scriptStep >= 1 && (
                    <Stack gap={8}>
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"Hey there! I'm planning a corporate outing for about 45 people during the Stampede. We want to see the Evening Show but also want a private space with catering. What do you recommend?"</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"Howdy! That sounds like an unforgettable corporate outing. For a group of 45 looking for a private space with catering for the Evening Show, I highly recommend our premium <strong>Infield Suites</strong>—they sit right in the heart of the action with private catering and a spectacular view of the chuckwagons and fireworks. Alternatively, we could look at a semi-private <strong>Reserved Table Bundle at Ranchman's</strong>. Let me check the live Salesforce inventory for you. Do you have a specific date in mind, or are you flexible?"</Text>
                      </div>
                    </Stack>
                  )}

                  {scriptStep >= 2 && (
                    <Stack gap={8}>
                      <Divider />
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"We're looking at July 9th or 10th. By the way, is there a dress code for the Infield Suites? Some of our clients are coming straight from a conference."</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"No dress code to worry about! While many folks love to wear their favorite western boots and cowboy hats, business casual or conference attire is perfectly fine. We want everyone to feel comfortable!<br/><br/>Now, looking at our live Salesforce inventory for July 9th and 10th: I see we have an <strong>Infield Suite</strong> available on <strong>July 9th</strong>, but July 10th is currently sold out. For July 10th, we do have semi-private tables at Ranchman's. Would you like me to create a high-priority corporate lead in Salesforce for the July 9th Infield Suite so our VIP coordinator can lock it in for you?"</Text>
                      </div>
                    </Stack>
                  )}

                  {scriptStep >= 3 && (
                    <Stack gap={8}>
                      <Divider />
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"Yes, July 9th for the Infield Suite sounds perfect. Let's do that. My name is Sarah Jenkins, email is sarah@acme.com, company is Acme Corp."</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"Awesome, Sarah! I've captured all the details and created a high-priority corporate lead in Salesforce (Reference: <strong>LD-2026-8802</strong>). A Stampede VIP Event Coordinator will reach out to you at sarah@acme.com to customize your catering menu and finalize the contract. Is there anything else I can help you plan today?"</Text>
                      </div>
                    </Stack>
                  )}
                </Stack>
              ) : (
                <Stack gap={16}>
                  {scriptStepB2C >= 1 && (
                    <Stack gap={8}>
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"Hey! I'm planning a trip with my family of 4 on July 9th. Can we get 4 general admission tickets and also add 4 afternoon Rodeo tickets?"</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"Howdy! I'd love to help you with that. I've checked our live inventory for July 9th, and we have both General Admission and Rodeo tickets available. I've gone ahead and automatically added <strong>4 General Admission tickets ($100.00)</strong> and <strong>4 Afternoon Rodeo tickets ($180.00)</strong> to your cart! You can see them in your cart on the right. Is there anything else I can add for you?"</Text>
                      </div>
                    </Stack>
                  )}

                  {scriptStepB2C >= 2 && (
                    <Stack gap={8}>
                      <Divider />
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"Wait, does the Rodeo ticket include admission to the grounds, or do we need both?"</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"Great question! Yes, your Afternoon Rodeo ticket actually includes admission to the Stampede grounds for the entire day, so you don't need separate General Admission tickets! Would you like me to adjust your cart to remove the 4 General Admission tickets so you aren't double-paying?"</Text>
                      </div>
                    </Stack>
                  )}

                  {scriptStepB2C >= 3 && (
                    <Stack gap={8}>
                      <Divider />
                      <div style={{ background: theme.fill.tertiary, padding: "12px", borderRadius: "8px", maxWidth: "85%" }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.orange }}>User:</Text>
                        <Text size="small">"Oh, perfect! Yes, please remove the general admission tickets and just keep the 4 Rodeo passes."</Text>
                      </div>
                      <div style={{ background: theme.fill.secondary, padding: "12px", borderRadius: "8px", maxWidth: "85%", alignSelf: "flex-end", borderLeft: `3px solid ${theme.palette.red}` }}>
                        <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>Agentforce Agent:</Text>
                        <Text size="small">"You got it! I've updated your cart to remove the 4 General Admission tickets. Your cart now contains just <strong>4 Afternoon Rodeo tickets</strong> (with grounds admission included) for a new total of <strong>$180.00</strong>. I'm ready to help you check out whenever you are!"</Text>
                      </div>
                    </Stack>
                  )}
                </Stack>
              )}
            </CardBody>
          </Card>

          {/* Right Side Panel: Salesforce CRM (B2B) OR Shopping Cart (B2C) */}
          <Stack gap={16}>
            {scriptScenario === "b2b" ? (
              <Card style={{ height: "100%" }}>
                <CardHeader trailing={<Pill tone="info" active size="sm">Salesforce CRM</Pill>}>
                  Extracted Fields
                </CardHeader>
                <CardBody>
                  <Stack gap={12}>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Lead Name</Text>
                      <Text size="small" weight="medium">{scriptStep >= 3 ? "Sarah Jenkins" : "—"}</Text>
                    </div>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Company</Text>
                      <Text size="small" weight="medium">{scriptStep >= 3 ? "Acme Corp" : "—"}</Text>
                    </div>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Email</Text>
                      <Text size="small" weight="medium">{scriptStep >= 3 ? "sarah@acme.com" : "—"}</Text>
                    </div>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Preferred Date</Text>
                      <Text size="small" weight="medium">{scriptStep >= 2 ? "July 9, 2026" : "—"}</Text>
                    </div>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Desired Venue</Text>
                      <Text size="small" weight="medium">{scriptStep >= 1 ? "Infield Suites" : "—"}</Text>
                    </div>
                    <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                      <Text size="small" tone="tertiary" weight="semibold">Group Size</Text>
                      <Text size="small" weight="medium">{scriptStep >= 1 ? "45" : "—"}</Text>
                    </div>

                    {scriptStep === 3 && (
                      <Callout tone="success" title="Lead Inserted">
                        <Text size="small">Sarah's inquiry has been written as a high-priority Lead in Salesforce CRM.</Text>
                      </Callout>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            ) : (
              <Card style={{ height: "100%" }}>
                <CardHeader trailing={<Pill tone="added" active size="sm">Shopping Cart</Pill>}>
                  Your Stampede Cart
                </CardHeader>
                <CardBody>
                  <Stack gap={12}>
                    {scriptStepB2C >= 1 && (
                      <Stack gap={8}>
                        {scriptStepB2C < 3 && (
                          <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                            <Row justify="space-between" align="center">
                              <Stack gap={2}>
                                <Text size="small" weight="semibold">General Admission</Text>
                                <Text size="xs" tone="secondary">Qty: 4</Text>
                              </Stack>
                              <Text size="small" weight="bold">$100.00</Text>
                            </Row>
                          </div>
                        )}
                        <div style={{ background: theme.fill.tertiary, padding: "8px 12px", borderRadius: "4px" }}>
                          <Row justify="space-between" align="center">
                            <Stack gap={2}>
                              <Text size="small" weight="semibold">Afternoon Rodeo Pass</Text>
                              <Text size="xs" tone="secondary">Qty: 4</Text>
                            </Stack>
                            <Text size="small" weight="bold">$180.00</Text>
                          </Row>
                        </div>
                        <Divider />
                        <Row justify="space-between">
                          <Text size="small" tone="secondary">Total</Text>
                          <Text size="small" weight="bold">
                            {scriptStepB2C === 3 ? "$180.00" : "$280.00"}
                          </Text>
                        </Row>
                        <Callout tone="success" title={scriptStepB2C === 3 ? "Cart Adjusted" : "Cart Populated"}>
                          <Text size="small">
                            {scriptStepB2C === 3 
                              ? "The agent automatically adjusted your cart to remove redundant grounds admission." 
                              : "The agent automatically populated your cart with GA and Rodeo passes."}
                          </Text>
                        </Callout>
                      </Stack>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            )}
          </Stack>
        </Grid>
      </Stack>
    );
  };

  // Render Technical Roadmap Tab
  const renderRoadmap = () => (
    <Stack gap={20}>
      <H2>Technical Implementation Roadmap</H2>
      <Grid columns={2} gap={20}>
        <Card>
          <CardHeader>File Structure</CardHeader>
          <CardBody>
            <Stack gap={12}>
              <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>mcp-server/</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>package.json</strong> - MCP & JSforce dependencies</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>tsconfig.json</strong> - TypeScript config</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>src/salesforce.ts</strong> - JSforce client + mock database fallback</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>src/index.ts</strong> - MCP server tool handlers</Text>
              
              <Divider style={{ margin: "8px 0" }} />
              
              <Text size="small" weight="semibold" style={{ color: theme.palette.red }}>website/</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>package.json</strong> - React, Tailwind, Vite</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>src/App.tsx</strong> - Stampede Website + Split Console Layout</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>src/components/AgentforceChat.tsx</strong> - Conversational widget</Text>
              <Text size="small" style={{ paddingLeft: "16px" }}>• <strong>src/components/SalesforceConsole.tsx</strong> - CRM Dashboard</Text>
            </Stack>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>Implementation Steps</CardHeader>
          <CardBody>
            <Stack gap={16}>
              <Row gap={8} align="center">
                <Pill tone="neutral" active size="sm">Step 1</Pill>
                <Text size="small"><strong>Setup Directories:</strong> Create project structure and package.json files.</Text>
              </Row>
              <Row gap={8} align="center">
                <Pill tone="neutral" active size="sm">Step 2</Pill>
                <Text size="small"><strong>Salesforce Client:</strong> Write JSforce connection module with mock fallback database.</Text>
              </Row>
              <Row gap={8} align="center">
                <Pill tone="neutral" active size="sm">Step 3</Pill>
                <Text size="small"><strong>MCP Server:</strong> Expose tools (get_event_catalog, check_ticket_availability, create_private_event_lead).</Text>
              </Row>
              <Row gap={8} align="center">
                <Pill tone="neutral" active size="sm">Step 4</Pill>
                <Text size="small"><strong>Conversational Frontend:</strong> Build React website and Agentforce widget with custom NLU simulator.</Text>
              </Row>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H2>Future-Proof MCP Tools (Gemini Integration)</H2>
      <Grid columns={3} gap={16}>
        <Card>
          <CardHeader>get_event_catalog</CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Queries Salesforce for active Stampede events, descriptions, pricing, and capacities.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>check_ticket_availability</CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Checks real-time ticket inventory and venue availability in Salesforce for a given date.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>create_private_event_lead</CardHeader>
          <CardBody>
            <Text size="small" tone="secondary">
              Inserts a high-priority corporate lead record directly into Salesforce CRM with extracted details.
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <Row gap={8} align="center">
          <Pill tone="added" active size="sm">Executive Proposal</Pill>
          <Text size="small" tone="secondary">June 3, 2026</Text>
        </Row>
        <H1 style={{ margin: "8px 0 4px 0", fontFamily: "'Playfair Display', serif" }}>
          Calgary Stampede - Agentic Demo Proposal
        </h1>
        <Text tone="secondary">
          An Agentforce-powered conversational planner and Salesforce-backed MCP server to revolutionize visitor planning and B2B hospitality booking.
        </Text>
      </div>

      {/* Tabs */}
      <Row gap={8} style={{ marginBottom: "20px", borderBottom: `1px solid ${theme.stroke.primary}`, paddingBottom: "10px" }}>
        <Pill active={activeTab === "vision"} onClick={() => setActiveTab("vision")}>
          Vision & Architecture
        </Pill>
        <Pill active={activeTab === "script"} onClick={() => setActiveTab("script")}>
          Conversational Script
        </Pill>
        <Pill active={activeTab === "roadmap"} onClick={() => setActiveTab("roadmap")}>
          Technical Roadmap
        </Pill>
      </Row>

      {/* Tab Content */}
      {activeTab === "vision" && renderVision()}
      {activeTab === "script" && renderScript()}
      {activeTab === "roadmap" && renderRoadmap()}
    </div>
  );
}
