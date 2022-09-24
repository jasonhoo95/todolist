import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../state/store";
import { removeTask, addTask, updateTask } from "../state/addTask";
interface Props {
	listTotal: Function;
}
export default function TaskList() {
	let listTask = useSelector((state: RootState) => state.task.list);
	const filterBy = useSelector((state: RootState) => state.task.filterBy);
	let [jsonObject, setJSON] = useState();
	const dispatch = useDispatch();
	let [data, setData] = useState<any>();

	useEffect(() => {
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
						<div style={{ background: "#f6f8fa", borderRadius: "10px" }} className="py-3 px-5 my-3 flex md:flex-nowrap flex-wrap w-full items-center">
							<div className="flex w-full">
								<input
									onChange={(e: any) => {
										dispatch(updateTask({ key: o.id, filter: e.target.checked ? "done" : "pending" }));
									}}
									style={{ accentColor: "#f12711" }}
									checked={o.filter == "done" ? true : false}
									type="checkbox"></input>

								{o.edit ? (
									<input
										value={o.name}
										onChange={(e: any) => {
											dispatch(updateTask({ key: o.id, name: e.target.value }));
										}}
										className="input-txt"
										type="text"></input>
								) : (
									<label className="strikethrough md:w-auto w-full">
										<div className="px-3">{o.name}</div>
									</label>
								)}
							</div>
							<div className="flex">
								<div
									onClick={(e) => {
										dispatch(updateTask({ key: o.id, edit: !o.edit }));

										// setData(mainData);
									}}
									style={{ background: "#14D128", borderRadius: "10px" }}
									className="md:ml-auto my-3 mr-3  remove-btn px-3 py-2 text-white cursor-pointer">
									{o.edit ? "SAVE" : "EDIT"}
								</div>

								<div
									onClick={(e) => {
										dispatch(removeTask(o.id));
									}}
									style={{ background: "#14D128", borderRadius: "10px" }}
									className="md:ml-auto my-3  remove-btn px-3 py-2 text-white cursor-pointer">
									REMOVE
								</div>
							</div>
						</div>
						<hr />
					</div>
				);
			})}
		</div>
	);
}
