import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  
} from 'reactstrap';

import { loginUser } from '../../js/actions/authActions';

const LoginModalPatient = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
    history.push("/Files");
    setEmail('');
    setPassword('');
  };

  return (
    <div style={{ padding: '0 15px' }}>
      <Button color="warning" onClick={toggle}>sign-in</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                value={email}
                name="email"
                id="email"
                placeholder="email"
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                value={password}
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                color="purple"
                style={{ marginTop: '2rem' }}
                block
                onClick={handleLogin}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Form>
    {/* <Link to="/Files" ></Link> */}
    </Form>

    </div>
  );
};

export default LoginModalPatient;