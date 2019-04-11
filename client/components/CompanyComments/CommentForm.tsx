import React, { FormEventHandler, FormEvent, useState } from 'react';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';

export interface CommentFormProps {
  onSubmit?: (content: string) => void;
}

export default ({ onSubmit = () => {} }: CommentFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit(content);

    setContent('');
  };

  return (
    <Form className="clearfix" onSubmit={handleSubmit}>
      <Form.Group controlId="commentContent">
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="Add your thoughts. Markdown supported."
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
        />
      </Form.Group>
      <Button type="submit" className="float-right">
        Submit
      </Button>
    </Form>
  );
};
