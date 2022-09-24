import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../state/store";
import { removeTask, addTask, updateTask } from "../state/addTask";
interface Props {
	listTotal: Function;
}
export default function TaskList() {
	const listTask = useSelector((state: RootState) => state.task.list);
	const filterBy = useSelector((state: RootState) => state.task.filterBy);

	const dispatch = useDispatch();
	const [data, setData] = useState([]);

	useEffect(() => {
		console.log(listTask, "LIST TWASK");
		if (filterBy == "all") {
			setData(listTask);
		}
		if (filterBy == "done") {
			let task = listTask.filter((todo: any) => todo.filter == "done");
			setData(task);
		}
		if (filterBy == "pending") {
			let task = listTask.filter((todo: any) => todo.filter == "pending");
			setData(task);
		}
	}, [filterBy, listTask]);

	return (
		<div>
			{data?.map((o: any, key: number) => {
				return (
					<div key={key}>
						<div style={{ background: "#f6f8fa", borderRadius: "10px" }} className="p-5 my-3 flex w-full items-center">
							<input
								onChange={(e: any) => {
									dispatch(updateTask({ key: o.id, filter: e.target.checked ? "done" : "pending" }));
								}}
								style={{ accentColor: "#f12711" }}
								checked={o.filter == "done" ? true : false}
								type="checkbox"></input>
							<label className="strikethrough">
								<div className="px-3">{o.name}</div>
							</label>
							<div
								onClick={(e) => {
									dispatch(removeTask(o.id));
								}}
								style={{ background: "#14D128", borderRadius: "10px" }}
								className="ml-auto px-3 py-2 text-white cursor-pointer">
								REMOVE
							</div>
						</div>
						<hr />
					</div>
				);
			})}
		</div>
	);
}
