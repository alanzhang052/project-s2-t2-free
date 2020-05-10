import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { InputGroup, Container, Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { useToasts } from "../../components/Toasts";

function numToTime(num) {
  let str = "";
  if (Math.floor(num / 12) % 12 === 0) {
    str += "12";
  } else {
    str += Math.floor(num / 12) % 12;
  }
  str += ":";
  if ((num % 12) * 5 <= 5) {
    str += "0";
  }
  str += (num % 12) * 5;
  if (num >= 144) {
    str += " PM";
  } else {
    str += " AM";
  }
  return str;
}

function NewEventForm() {
  const { showToast } = useToasts();
  const { mutate } = useSWR("/api/event");
  const [name, setName] = useState("");

  const [isMonday, setIsMonday] = useState("false");
  const [isTuesday, setIsTuesday] = useState("false");
  const [isWednesday, setIsWednesday] = useState("false");
  const [isThursday, setIsThursday] = useState("false");
  const [isFriday, setIsFriday] = useState("false");
  const [isSaturday, setIsSaturday] = useState("false");
  const [isSunday, setIsSunday] = useState("false");

  const [startTime, setStartTime] = useState("12:00 PM");
  const [endTime, setEndTime] = useState("12:00 PM");

  const timeOptions = [];
  for (let i = 0; i < 288; i++) {
    timeOptions.push(<option>{numToTime(i)}</option>);
  }

  const addEvent = useCallback(
    async (e) => {
      // override default form submission behavior
      e.preventDefault();
      e.stopPropagation();
      setName("");
      setIsMonday("false");
      setIsTuesday("false");
      setIsWednesday("false");
      setIsThursday("false");
      setIsFriday("false");
      setIsSaturday("false");
      setIsSunday("false");
      setStartTime("12:00 PM");
      setEndTime("12:00 PM");
      if (name === "") {
        showToast("Added Event!");
      } else {
        showToast("Added Event: " + name);
      }
      await mutate(
        [
          {
            name: name,
            isMonday: isMonday,
            isTuesday: isTuesday,
            isWednesday: isWednesday,
            isThursday: isThursday,
            isFriday: isFriday,
            isSaturday: isSaturday,
            isSunday: isSunday,
            startTime: startTime,
            endTime: endTime,
          },
        ],
        false
      );
      await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          isMonday: isMonday,
          isTuesday: isTuesday,
          isWednesday: isWednesday,
          isThursday: isThursday,
          isFriday: isFriday,
          isSaturday: isSaturday,
          isSunday: isSunday,
          startTime: startTime,
          endTime: endTime,
        }),
      });
      await mutate();
    },
    [
      name,
      isMonday,
      isTuesday,
      isWednesday,
      isThursday,
      isFriday,
      isSaturday,
      isSunday,
      startTime,
      endTime,
    ]
  );

  return (
    <Form onSubmit={addEvent} className="mb-3">
      <Form.Group>
        <Container>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Event Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Untitled"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>Start Time</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                >
                  {timeOptions}
                </Form.Control>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>End Time</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                >
                  {timeOptions}
                </Form.Control>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-between">
            <Col md="auto">
              <Form.Check
                label="Monday"
                type="switch"
                id="Monday"
                onChange={(e) => setIsMonday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Tuesday"
                type="switch"
                id="Tuesday"
                onChange={(e) => setIsTuesday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Wednesday"
                type="switch"
                id="Wednesday"
                onChange={(e) => setIsWednesday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Thursday"
                type="switch"
                id="Thursday"
                onChange={(e) => setIsThursday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Friday"
                type="switch"
                id="Friday"
                onChange={(e) => setIsFriday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Saturday"
                type="switch"
                id="Saturday"
                onChange={(e) => setIsSaturday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Form.Check
                label="Sunday"
                type="switch"
                id="Sunday"
                onChange={(e) => setIsSunday(e.target.checked)}
              />
            </Col>
            <Col md="auto">
              <Button type="submit">Add Event</Button>
            </Col>
          </Row>
        </Container>
      </Form.Group>
    </Form>
  );
}

export default NewEventForm;
