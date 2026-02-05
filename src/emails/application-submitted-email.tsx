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

interface ApplicationSubmittedEmailProps {
  founderName: string
  companyName: string
  fundingAmount: string
  dashboardUrl: string
}

export const ApplicationSubmittedEmail = ({ 
  founderName, 
  companyName,
  fundingAmount,
  dashboardUrl 
}: ApplicationSubmittedEmailProps) => (
  <Html>
    <Head />
    <Preview>We received your application for {companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Application Received! ✓</Heading>
        
        <Text style={text}>Hi {founderName},</Text>
        
        <Text style={text}>
          Thanks for submitting your application! We've received it and wanted to confirm the details:
        </Text>
        
        <Section style={infoBox}>
          <Text style={infoText}>
            <strong>Company:</strong> {companyName}<br/>
            <strong>Funding Sought:</strong> {fundingAmount}<br/>
            <strong>Status:</strong> Under Review
          </Text>
        </Section>
        
        <Text style={text}>
          <strong>What happens next:</strong>
        </Text>
        
        <Text style={list}>
          1. Our team will review your application within 48 hours<br/>
          2. We may reach out for additional information<br/>
          3. You'll receive an update on your application status<br/>
          4. Track progress anytime in your dashboard
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={dashboardUrl}>
            Track Application
          </Button>
        </Section>
        
        <Text style={footer}>
          Best regards,<br/>
          The Ventures Platform Team
        </Text>
        
        <Text style={footerSmall}>
          Questions? Reply to this email or contact founders@awakapital.vc
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ApplicationSubmittedEmail

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
  paddingLeft: '20px',
}

const infoBox = {
  backgroundColor: '#f8f9fa',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 40px',
}

const infoText = {
  color: '#0A1E3A',
  fontSize: '16px',
  lineHeight: '28px',
  margin: '0',
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