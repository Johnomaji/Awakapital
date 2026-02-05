import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface ApplicationApprovedEmailProps {
  founderName: string
  companyName: string
  dashboardUrl: string
}

export const ApplicationApprovedEmail = ({ 
  founderName, 
  companyName,
  dashboardUrl 
}: ApplicationApprovedEmailProps) => (
  <Html>
    <Head />
    <Preview>Great news about your {companyName} application!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🎉 Congratulations!</Heading>
        
        <Text style={text}>Hi {founderName},</Text>
        
        <Text style={text}>
          <strong>Great news!</strong> Your application for <strong>{companyName}</strong> has been approved by our investment committee.
        </Text>
        
        <Section style={highlightBox}>
          <Text style={highlightText}>
            We're excited to move forward with you and discuss the next steps for your funding.
          </Text>
        </Section>
        
        <Text style={text}>
          <strong>What happens next:</strong>
        </Text>
        
        <Text style={list}>
          1. <strong>Initial Call:</strong> We'll contact you within 2 business days to schedule a call<br/>
          2. <strong>Due Diligence:</strong> We'll discuss terms, timeline, and documentation requirements<br/>
          3. <strong>Term Sheet:</strong> If all goes well, we'll prepare investment terms<br/>
          4. <strong>Funding:</strong> Finalize legal documents and transfer funds
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={dashboardUrl}>
            View in Dashboard
          </Button>
        </Section>
        
        <Text style={text}>
          In the meantime, please prepare:
        </Text>
        
        <Text style={list}>
          • Updated pitch deck with latest traction<br/>
          • Financial projections (next 12-24 months)<br/>
          • Cap table and existing shareholder information<br/>
          • Business registration documents
        </Text>
        
        <Text style={footer}>
          Congratulations again! We're looking forward to working with you.
        </Text>
        
        <Text style={footer}>
          Best regards,<br/>
          The Awakapital Team
        </Text>
        
        <Text style={footerSmall}>
          Questions? Contact us at founders@awakapital.vc
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ApplicationApprovedEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
}

const h1 = {
  color: '#0A1E3A',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
  textAlign: 'center' as const,
}

const text = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 40px',
}

const list = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '16px 40px',
  paddingLeft: '20px',
}

const highlightBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #FFD700',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
}

const highlightText = {
  color: '#0A1E3A',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '26px',
  margin: '0',
  textAlign: 'center' as const,
}

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#FFD700',
  borderRadius: '8px',
  color: '#0A1E3A',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '220px',
  padding: '14px',
  margin: '0 auto',
}

const footer = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '32px 40px',
}

const footerSmall = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 40px',
  textAlign: 'center' as const,
}