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

interface ApplicationRejectedEmailProps {
  founderName: string
  companyName: string
  dashboardUrl: string
}

export const ApplicationRejectedEmail = ({ 
  founderName, 
  companyName,
  dashboardUrl 
}: ApplicationRejectedEmailProps) => (
  <Html>
    <Head />
    <Preview>Update on your {companyName} application</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Application Update</Heading>
        
        <Text style={text}>Hi {founderName},</Text>
        
        <Text style={text}>
          Thank you for submitting your application for <strong>{companyName}</strong>. We've completed our review and unfortunately, we won't be moving forward with an investment at this time.
        </Text>
        
        <Text style={text}>
          This decision doesn't reflect on the quality of your work or the potential of your company. We receive many excellent applications and must make difficult choices based on our current investment thesis, portfolio composition, and available capital.
        </Text>
        
        <Section style={highlightBox}>
          <Text style={highlightText}>
            We encourage you to reapply in the future as your company grows and evolves.
          </Text>
        </Section>
        
        <Text style={text}>
          <strong>What you can do next:</strong>
        </Text>
        
        <Text style={list}>
          • Continue building traction and growing your customer base<br/>
          • Refine your business model based on market feedback<br/>
          • Connect with other investors who may be a better fit<br/>
          • Reapply when you've achieved key milestones (6-12 months)
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={dashboardUrl}>
            View Dashboard
          </Button>
        </Section>
        
        <Text style={text}>
          We're rooting for your success and would love to hear about your progress. Please keep us updated on major milestones - we're always open to reconsidering as companies grow.
        </Text>
        
        <Text style={footer}>
          Wishing you the best in your journey,<br/>
          The Ventures Platform Team
        </Text>
        
        <Text style={footerSmall}>
          Questions or feedback? We're happy to provide brief insights. Email us at hello@venturesplatform.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ApplicationRejectedEmail

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
  fontSize: '32px',
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
}

const highlightBox = {
  backgroundColor: '#e3f2fd',
  border: '2px solid #2196F3',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
}

const highlightText = {
  color: '#0A1E3A',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0',
  textAlign: 'center' as const,
}

const buttonContainer = {
  padding: '27px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#0A1E3A',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px',
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