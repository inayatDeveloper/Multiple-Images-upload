	const [state, setState] = useState({
		FirstName: "",
		LastName: "",
		BusinessName: "",
		CompanyId: "",
		Address1: "",
		Address2: "",
		City: "",
		PostCode: "",
		Charity: false,
		CasheroAgent: false,
	});
	const [image, setImage] = useState({
		imageName: "",
		imageFile: [],
		fullPath: "",
	});

	const handleChange = (event: any) => {
		setState({
			...state,
			[event.target.name]:
				event.target.type === "checkbox"
					? event.target.checked
					: event.target.value,
		});
	};


	const validatetor = (values: any) => {

		let errors: any = {};
		if (!values.FirstName) {
			errors.FirstName = 'FirstName is required';
		}
		else if (!values.LastName) {
			errors.LastName = 'LastName is required';
		}
		else if (!values.BusinessName) {
			errors.BusinessName = 'Business Name is required';

		}
		else if (!values.CompanyId) {
			errors.CompanyId = 'Company Id is required';

		}
		else if (!country.code) {
			errors.country = 'Country selection is required';
		}
		else if (!values.Address1) {
			errors.Address1 = 'Address is required';

		}
		else if (!values.City) {
			errors.City = 'City is required';
		}
		else if (!values.PostCode) {
			errors.PostCode = 'PostCode is required';
		}

		else if (!image.imageName) {
			errors.image = 'image is required ';
		}

		return errors;
	};

	const handleClick = () => {

		if (Object.keys(validatetor(state)).length > 0) {
			setErrors(validatetor(state))
			setTimeout(() => {
				setErrors({})
			}, 4000)

		}
		else {

			callapi()
		}
	}

	<TextField
						id="standard-basic"
						name="FirstName"
						label="First name"
						fullWidth
						variant="standard"
						onChange={handleChange}
						value={state.FirstName}
						className={classes.custominputfields}
						helperText={errors.FirstName ? errors.FirstName : ""}
						error={errors.FirstName}
					/>
					<button
					className={classes.depoBtn}
					onClick={(e) => handleClick()}
				>
					Continue
				</button>