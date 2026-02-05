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

interface WelcomeEmailProps {
  userName: string
  loginUrl: string
}

export const WelcomeEmail = ({ userName, loginUrl }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Ventures Platform - Start your funding journey</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Ventures Platform! 🎉</Heading>
        
        <Text style={text}>Hi {userName},</Text>
        
        <Text style={text}>
          Thanks for creating an account with Ventures Platform. We're excited to have you join our community of innovative African founders.
        </Text>
        
        <Section style={buttonContainer}>
          <Button style={button} href={loginUrl}>
            Login to Dashboard
          </Button>
        </Section>
        
        <Text style={text}>
          <strong>What you can do now:</strong>
        </Text>
        
        <Text style={list}>
          • Submit funding applications<br/>
          • Track your application status in real-time<br/>
          • Connect with our investment team<br/>
          • Access resources for founders
        </Text>
        
        <Text style={text}>
          We review all applications within 48 hours. Ready to get started?
        </Text>
        
        <Text style={footer}>
          Best regards,<br/>
          The Ventures Platform Team
        </Text>
        
        <Text style={footerSmall}>
          Questions? Reply to this email or contact us at founders@awakapital.vc
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

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