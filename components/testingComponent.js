import { useSelector, useDispatch } from "react-redux";

export default function TestingComponent() {
	const filterBy = useSelector((state) => state.task.filterBy);

	return (
		<div>
			TESTING NOW
			<h1>{filterBy}</h1>
		</div>
	);
}
