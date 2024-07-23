import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Collapse,
  Button,
  Card,
  Col,
  Input,
  Label,
  FormText,
  FormGroup,
  Form,
  Row,
  CardBody,
  Table
} from 'reactstrap';
import ComponentCard from '../../../components/ComponentCard';

const Customer = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = () => setCollapse(!collapse);

  const handleEditClick = (item) => {
    navigate('/order/customers/edit', { state: item });
  };

  const handleEditAdd = () => {
    navigate('/order/customers/add');
  };

  const handleView = (customer) => {
    navigate('/order/customers/view', { state: customer });
  };

  const handleEditAddress = (customer) => {
    navigate('/order/customers/address', { state: customer.id });
  };

  const handlePendingReport = (customer) => {
    navigate('/order/customers/pending-report', { state: customer.id });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchReset = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('userToken');
      const response = await fetch('https://factory.teamasia.in/api/public/customers/?is_trashed=0', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('result',result.customers);
      setData(result.customers);
    };

    fetchData();
  }, []);

  const filteredData = data.filter((customer) =>
    customer.company_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ComponentCard title="" subtitle={<p>{/* Overview of the projects */}</p>}>
      <Button className="my-btn-color" style={{ marginBottom: '1rem', marginRight: '10px' }} onClick={() => handleEditAdd()}>
        Add Customer
      </Button>
      <Button className="my-btn-color" onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
        Search
      </Button>
      <Collapse isOpen={collapse}>
        <Card className="border">
          <CardBody>
            <Form>
              <Row>
                <Col md="8">
                  <FormGroup>
                    <Label>Search By Company Name or Company Label</Label>
                    <Input
                      type="text"
                      placeholder=""
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    <FormText className="muted"></FormText>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Button type="button" className="btn btn-info" style={{ marginTop: '28px' }} onClick={() => {}}>
                      Find
                    </Button>
                    <Button type="button" className="btn btn-info" style={{ marginTop: '28px', marginLeft: '10px' }} onClick={handleSearchReset}>
                      Reset
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Collapse>
      
      <Row>
            <Table  responsive>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.company_name} {customer.labels !== '' && customer.labels.split(',').map((label)=><Button style={{backgroundColor:'#00abdb',color:'white',padding:"0px 5px"}}> {label}</Button>)}</td>
                    <td>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditClick(customer)}>
                        <i className="bi bi-pencil-fill my-pen-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleView(customer)}>
                        <i className="bi bi-eye-fill my-eye-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handleEditAddress(customer)}>
                        <i className="bi bi-geo-alt-fill my-geo-color" />
                      </button>
                      <button type="button" className="btn mybtncustomer btn-secondary btn-sm mr-2" onClick={() => handlePendingReport(customer)}>
                        <i className="bi bi-list my-list-color" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
      </Row>
    </ComponentCard>
  );
};

export default Customer;
