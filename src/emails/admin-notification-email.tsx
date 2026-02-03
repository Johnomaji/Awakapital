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

interface AdminNotificationEmailProps {
  companyName: string
  founderName: string
  email: string
  industry: string
  stage: string
  fundingAmount: string
  dashboardUrl: string
}

export const AdminNotificationEmail = ({ 
  companyName,
  founderName,
  email,
  industry,
  stage,
  fundingAmount,
  dashboardUrl 
}: AdminNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>🚨 New Application: {companyName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🚨 New Application</Heading>
        
        <Text style={text}>
          A new funding application has been submitted and needs review.
        </Text>
        
        <Section style={infoBox}>
          <Text style={infoTitle}>Application Details</Text>
          <Text style={infoText}>
            <strong>Company:</strong> {companyName}<br/>
            <strong>Founder:</strong> {founderName}<br/>
            <strong>Email:</strong> {email}<br/>
            <strong>Industry:</strong> {industry}<br/>
            <strong>Stage:</strong> {stage}<br/>
            <strong>Funding:</strong> {fundingAmount}
          </Text>
        </Section>
        
        <Section style={buttonContainer}>
          <Button style={button} href={dashboardUrl}>
            Review Application
          </Button>
        </Section>
        
        <Text style={footerSmall}>
          Login to the admin dashboard to review and take action.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default AdminNotificationEmail

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

const infoBox = {
  backgroundColor: '#fff3cd',
  border: '2px solid #FFD700',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 40px',
}

const infoTitle = {
  color: '#0A1E3A',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
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
  backgroundColor: '#0A1E3A',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '220px',
  padding: '14px',
  margin: '0 auto',
}

const footerSmall = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 40px',
  textAlign: 'center' as const,
}