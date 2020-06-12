import React, { useState, useEffect } from 'react';
import {Row, Col, Button, Form, FormGroup, Label, Input} from "reactstrap";
import * as yup from "yup";
import axios from "axios";

function UserForm (props){
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		role: "Full-stack web dev",
		terms: true,
		id: Date.now()
	});

	const [buttonDisabled, setButtonDisabled] = useState(true);

	const [errors, setErrors] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
		terms: ""
	});

	const validateChange = event => {
		yup.reach(formSchema, event.target.name).validate(event.target.value).then(isValid => {
			setErrors({
				...errors,
				[event.target.name]: ""
			})
		}).catch(err =>{
			setErrors({
				...errors, [event.target.name]: err.errors[0]
				})
			})
	}

	const changeHandler = (event) => {
		event.persist();
		validateChange(event)

		setUser({
			...user,
			[event.target.name]: event.target.value ==="terms" ? event.target.checked : event.target.value
		});
	};

	const formSchema = yup.object().shape({
		name: yup.string().required("name is required"),
		email: yup.string().email("please enter a valid email").required("email is required"),
		password: yup.string().required("password is required"),
		role: yup.string(),
		terms: yup.boolean().oneOf([true])
	});

	useEffect(() => {
		formSchema.isValid(user).then(isValid => {
			setButtonDisabled(!isValid);
		});
	}, [user]);


	return(
		<Form onSubmit={event => {
			event.preventDefault();
			console.log(user);
			axios.post("https://reqres.in/api/users", user).then(res => {
				props.addUser(user);
				setUser({
					name: "",
					email: "",
					password: "",
					role: "Full-stack web dev",
					id: Date.now()
				});
			})
		}}>
	        <Row>
	          <Col>
	            <FormGroup sm="4">
	              <Label for="memberName">Name</Label>
	              <Input 
	              	type="text" 
	              	name="name" 
	              	id="memberName" 
	              	placeholder="name" 
	              	value = {user.name}
	              	onChange={changeHandler}
	            />
	            {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
	            </FormGroup>
	          </Col>
	          <Col>
	            <FormGroup sm="4">
	              <Label for="memberEmail">email</Label>
	              <Input 
	              	type="email" 
	              	name="email" 
	              	id="memberEmail" 
	              	placeholder="email" 
	              	value = {user.email}
	              	onChange={changeHandler}
	            />
	            {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
	            </FormGroup>
	          </Col>
	          <Col >
	          	<FormGroup sm="4">
	          		<Label for="userPassword">Password</Label>
	          		<Input
	          			type="password"
	          			name="password"
	          			id="userPassword"
	          			placeholder="password"
	          			value = {user.password}
	              		onChange={changeHandler}
	          		/>
	          		{errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
	          	</FormGroup>
	          </Col>
	          <Col>
	            <FormGroup sm="4">
	              <Label for="roleSelect">role</Label>
	              <Input 
	              	type="select" 
	              	name="role" 
	              	id="roleSelect"
	              	value={user.role}
	              	onChange={changeHandler}
	              >
	                <option>Full-stack web dev</option>
	                <option>Database Manager</option>
	                <option>Front-end Developer</option>
	                <option>Back-end Developer</option>
	                <option>Customer Service Manager</option>
	              </Input>
	              {errors.role.length > 0 ? <p className="error">{errors.role}</p> : null}
	            </FormGroup>
	          </Col>
			</Row>

          <Col>
	        <FormGroup>
		            <Label for="terms">
		              <Input 
		              	type="checkbox" 
		              	name="terms"
		              	id="terms" 
		              	checked={user.terms}
		              	onChange={changeHandler}
		              />
		              terms and conditions
		            </Label>
		    </FormGroup>
	      </Col>
		    
	        <Button type="submit" disabled={buttonDisabled}>Submit</Button>
	      </Form>
	);
}

export default UserForm;