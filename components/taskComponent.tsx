import TaskList from "./taskList";
import { useSelector, useDispatch } from "react-redux";
import { addTask, filterTask } from "../state/addTask";
import { useEffect, useState } from "react";
import type { RootState } from "../state/store";
import { v4 } from "uuid";
export default function TaskComponent() {
	interface typeString {
		inputTxt: string;
		allList: any;
		pendingList: any;
		doneList: any;
	}
	const dispatch = useDispatch();
	const [state, setState] = useState<typeString>({
		inputTxt: "",
		allList: "",
		pendingList: "",
		doneList: "",
	});
	const [filter, setFilterBy] = useState<string>();
	const listTask = useSelector((state: RootState) => state.task.list);

	const filterBy = useSelector((state: RootState) => state.task.filterBy);

	const setFilter = (data: string) => {
		setFilterBy(data);
		dispatch(filterTask({ filter: data }));
	};

	useEffect(() => {
		if (listTask) {
			const pendingTask = listTask.filter((o: any) => o.filter == "pending");
			const doneTask = listTask.filter((o: any) => o.filter == "done");
			const allTask = listTask;

			setState((prevstate) => ({ ...prevstate, allList: allTask.length, pendingList: pendingTask.length, doneList: doneTask.length }));
		}
	}, [listTask]);

	return (
		<div className="ml-auto mr-auto" style={{ maxWidth: "1000px" }}>
			<div className="p-8 rounded-[10px] bg-white my-8">
				<div className="flex items-center">
					<input
						className="w-4/5 input-txt"
						onChange={(e) => {
							setState((prevstate) => ({ ...prevstate, inputTxt: e.target.value }));
						}}
						type="text"
						placeholder="add task"></input>

					<div
						onClick={(e) => {
							dispatch(addTask({ name: state.inputTxt, id: v4() }));
						}}
						style={{ background: "#F72424", display: "inline-block", borderRadius: "10px" }}
						className="px-6 mx-5 py-3 font-bold cursor-pointer text-white">
						Add Task
					</div>
				</div>
				<div className="flex my-5 tab-bar">
					<div
						onClick={(e: any) => {
							setFilter("all");
							console.log(filter, "filter");
						}}
						className={filter == "all" ? "mx-3 cursor-pointer active" : "mx-3 cursor-pointer"}>
						All ({state.allList})
					</div>
					<div
						onClick={(e: any) => {
							setFilter("pending");
							console.log(filter, "filter");
						}}
						className={filter == "pending" ? "mx-3 cursor-pointer active" : "mx-3 cursor-pointer"}>
						Pending ({state.pendingList})
					</div>
					<div
						onClick={(e: any) => {
							setFilter("done");
							console.log(filter, "filter");
						}}
						className={filter == "done" ? "mx-3 cursor-pointer active" : "mx-3 cursor-pointer"}>
						Completed ({state.doneList})
					</div>
				</div>
				<TaskList />
			</div>
		</div>
	);
}
