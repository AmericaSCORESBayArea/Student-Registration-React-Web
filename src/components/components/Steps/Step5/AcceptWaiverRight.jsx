import React from "react";
import {
  container,
  waiverContainer,
  waiverTitle,
  waiverSubTitle,
} from "../../../componentsStyle/registrationFormStyle";
import { Paper, Typography, Box } from "@mui/material";

import "@egjs/react-flicking/dist/flicking-inline.css";
function AcceptWaiverRight() {
  return (
    <div className={container}>
      <div className={waiverContainer}>
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
            <Typography className={waiverTitle}>Oakland Waiver</Typography>
            <Typography className={waiverTitle}>
              Waiver & Indemnity Agreement
            </Typography>
            <Typography variant="body1" className={waiverSubTitle}>
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
            </Typography>
          </Paper>
        </Box>
      </div>
    </div>
  );
}

export default AcceptWaiverRight;
