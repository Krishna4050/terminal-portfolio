import { Html, Body, Container, Text, Heading, Preview, Section, Hr } from "@react-email/components";

interface WelcomeEmailProps {
  name: string;
  message: string; // <--- Add this
}

export default function WelcomeEmail({ name, message }: WelcomeEmailProps) {
  return (
    <Html>
      <Preview>Thank you for your recommendation!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Hi {name},</Heading>
          <Text style={text}>
            Thank you so much for taking the time to write a recommendation. I have received your message and will review it shortly.
          </Text>
          
          {/*  Display their message here */}
          <Section style={quoteContainer}>
            <Text style={quoteText}>&quot;{message}&quot;</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            This message was sent from Krishna&quot;s Portfolio.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// STYLES
const main = { backgroundColor: "#ffffff", fontFamily: "sans-serif" };
const container = { margin: "0 auto", padding: "40px 20px", maxWidth: "600px" };
const h1 = { color: "#1a1a1a", fontSize: "24px", fontWeight: "normal", marginBottom: "20px" };
const text = { color: "#444", fontSize: "16px", lineHeight: "26px", marginBottom: "20px" };
const hr = { borderColor: "#e6ebf1", margin: "20px 0" };
const footer = { color: "#8898aa", fontSize: "12px" };

// Style for the user's message box
const quoteContainer = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "16px",
  borderLeft: "4px solid #4ade80", // Green accent
  marginBottom: "20px"
};
const quoteText = {
  margin: "0",
  color: "#333",
  fontStyle: "italic",
  fontSize: "15px"
};