import React, { memo } from 'react';

const Todo = memo(() => {
	return (
		<li>
			<input type="checkbox" />
			<span>Hello</span>
			<button>Modify</button>
		</li>
	);
});

export default Todo;