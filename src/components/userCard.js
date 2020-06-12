import React from 'react';
import {Col, Card, CardBody, CardTitle, CardSubtitle, CardText} from "reactstrap";

function UserCard (props){
	return(
		<Col sm="6">
          <Card >
            <CardBody >
              <CardTitle>{props.user.name}</CardTitle>
              <CardSubtitle>{props.user.role}</CardSubtitle>
              <CardText>{props.user.email}</CardText>
            </CardBody>
          </Card>
        </Col>
    );
}

export default UserCard;