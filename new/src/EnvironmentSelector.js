import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function EnvironmentSelector(props) {
	return (
		<div>
			<RadioGroup
				aria-label="environment"
				name="environmentSelector"
				value={props.environment}
				onChange={e => props.onEnvironmentChange(e.target.value)}
				row
			>
				<FormControlLabel
					value="test"
					control={<Radio />}
					label="Test"
				/>
				<FormControlLabel
					value="prod"
					control={<Radio />}
					label="Prod"
				/>
			</RadioGroup>
		</div>
	);
}

export default EnvironmentSelector;