import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
    // data:{
    //   username:string,
    //   date:Date,
    //   time:string
    // }  
    username:string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const EmailTemplate = ({
  username
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
     Appointment Booking Confirmation
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://svgshare.com/i/14bZ.svg"}
          width="100"
          height="50"
          alt="logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {username},</Text>
        <Text style={paragraph}>
        {/* {`Your appointment has been booked on ${data.date.getDate()}-${data.date.getMonth()}-${data.date.getFullYear()} at ${data.time} `} */}
        Your appointment has been successfully booked. Thank you for using our services.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="http://localhost:3000">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
         Doctor Appointment System
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        </Text>
      </Container>
    </Body>
  </Html>
);


export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px"
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3559E0",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
