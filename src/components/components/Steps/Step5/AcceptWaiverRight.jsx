import React, { memo } from "react";
import { Container } from "../../../componentsStyle/registrationFormStyle";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const WaiverContainer = styled(Typography)({
  padding: "20px",
  height: "400px",
  borderRadius: "30px",
});
const WaiverTitle = styled(Typography)({
  fontWeight: "600",
  fontSize: "22px",
  textAlign: "left",
});
const WaiverSubTitle = styled(Typography)({
  fontSize: "15px",
  textAlign: "left",
});
const AcceptWaiverRight = memo(() => {
  return (
    <Container>
      <WaiverContainer>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "background.default",
            display: "grid",
            gap: 2,
            height: 400,
            overflowY: "scroll",
          }}
        >
          <Paper elevation={0}>
            <WaiverTitle>Oakland Waiver</WaiverTitle>
            <WaiverTitle>Waiver & Indemnity Agreement</WaiverTitle>
            <WaiverSubTitle variant="body1">
              In legal terms, a parent or legal guardian holds significant
              responsibilities and rights concerning the care, well-being, and
              upbringing of a child. These responsibilities are fundamental to
              ensuring the welfare and development of minors under their care.
              Guardianship refers to the legal relationship between a guardian
              and a minor child, where the guardian assumes responsibility for
              the child's personal care, upbringing, and property management
              until the child reaches adulthood or the guardianship is
              terminated. In legal terms, a parent or legal guardian holds
              significant responsibilities and rights concerning the care,
              well-being, and upbringing of a child. These responsibilities are
              fundamental to ensuring the welfare and development of minors
              under their care. Guardianship refers to the legal relationship
              between a guardian and a minor child, where the guardian assumes
              responsibility for the child's personal care, upbringing, and
              property management until the child reaches adulthood or the
              guardianship is terminated. In legal terms, a parent or legal
              guardian holds significant responsibilities and rights concerning
              the care, well-being, and upbringing of a child. These
              responsibilities are fundamental to ensuring the welfare and
              development of minors under their care. Guardianship refers to the
              legal relationship between a guardian and a minor child, where the
              guardian assumes responsibility for the child's personal care,
              upbringing, and property management until the child reaches
              adulthood or the guardianship is terminated.
            </WaiverSubTitle>
          </Paper>
        </Box>
      </WaiverContainer>
    </Container>
  );
});

export default AcceptWaiverRight;
