import React  from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Button
} from 'reactstrap';

import PropTypes from 'prop-types';
import ComponentCard5 from '../../../components/ComponentCard5';
import 'react-table-v6/react-table.css';

const JumbotronComponent = ({modal,toggle}) => {

  return (
    <>
     <ComponentCard5 >
          
            <Modal isOpen={modal} toggle={toggle} style={{'--bs-modal-width': '400px'}}>
              <ModalHeader toggle={toggle}></ModalHeader>
              <ModalBody>
                 <Form>
                   <Row>
                     <Col>
                       <FormGroup>
                         <Label>Are you sure you want to mark the Jumbo Roll as treated?</Label>
                        
                       </FormGroup>
                     </Col>
                   </Row>
                    <Row>
                      <Col md="12" style={{textAlign:'center'}}>
                        <Button  className="btn my-btn-color" onClick={()=>toggle()}>
                             Marked as Treated
                        </Button>
                      </Col>
                    </Row>
                 </Form>
              </ModalBody>
             
            </Modal>
          </ComponentCard5>
    </>
  );
};

export default JumbotronComponent;
JumbotronComponent.propTypes = {
  modal: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  
};