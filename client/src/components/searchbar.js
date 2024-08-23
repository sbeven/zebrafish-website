import { Button, Form } from "react-bootstrap";

export default function SearchBar({loading, setWordFunc, searchFunc }) {

  return (
    <div>
      <div className="bar">
          <Form.Control
            onChange={(e) => setWordFunc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? searchFunc() : null}
            aria-label="Search"
            aria-describedby="basic-addon1"
            margin="auto"
          />
      </div>
      <div className="button">
        <Button
          disabled={loading}
          variant="outline-primary"
          onClick={() => searchFunc()}>
          Search
        </Button>
      </div>
    </div>
  );
}