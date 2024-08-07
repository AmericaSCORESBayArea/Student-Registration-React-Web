import React, { useState, useEffect } from "react";
import "../styles/RadioButton.css";
import Button from "@mui/material/Button";
import Loader from "../utils/Loader";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { getWaiver } from "../controller/api";
import { ErrorModal } from "../utils/Modal";

export function WaiverModal(props) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = await getWaiver(props.waiverRegion);
      if (response.length > 0) {
        setHtml(response[0].Content);
        props.addWaiverData(response[0]);
      } else {
        setShow(false);
        props.function();
        ErrorModal(props.errorTranslation, "warning");
      }
      setLoading(false);
    })();
  }, [props]);

  return (
    <div id="container">
      {loading ? (
        <Loader />
      ) : (
        <Modal
          backdrop="static"
          fullscreen={"lg-down"}
          show={show}
          onHide={() => {
            setShow(false);
            props.function();
          }}
        >
          <Modal.Header closeButton={props.deniedButton ? true : false}>
            <Modal.Title> Waiver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <article
              className="markdown-body entry-content container-lg w-100"
              itemProp="text"
            >
              <h1 id="waiverTitle">{props.waiverRegion} Waiver</h1>
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
          </Modal.Body>
          <Modal.Footer>
            {props.deniedButton && (
              <Button
                size={"medium"}
                variant="contained"
                onClick={() => {
                  setShow(false);
                  props.function();
                  props.checkboxFunction("waiver", false);
                }}
                style={{
                  marginRight: "2%",
                  backgroundColor: "#5c6370",
                }}
              >
                {props.deniedButton}
              </Button>
            )}
            <Button
              size={"medium"}
              variant="contained"
              onClick={() => {
                setShow(false);
                props.function();
                if (props.deniedButton) props.checkboxFunction("waiver", true);
              }}
            >
              {props.confirmButton}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
