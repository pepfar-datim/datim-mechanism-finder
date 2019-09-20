import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


function EnvironmentSelector(props) {
	return (
		<div>
			<RadioGroup 
				style ={{
					padding: '5px',
					marginLeft: '10px'
				}}
				aria-label="environment"
				name="environmentSelector"
				value={props.environment}
				onChange={e => props.onEnvironmentChange(e.target.value)}
				row
			>
				<FormControlLabel
					value="prod"
					control={<Radio />}
					label="Search in FACTS Info production feed"
				/>
				<FormControlLabel
					value="test"
					control={<Radio />}
					label="Search in FACTS Info test feed"
				/>
			</RadioGroup>
		</div>
	);
}

export default EnvironmentSelector;