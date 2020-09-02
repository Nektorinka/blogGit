import React, { useState } from 'react';

export default function Input({ classNames }) {
	const [ value, setValue ] = useState(null);
	return <input value={value} defaultValue="text" className={classNames} />;
}
