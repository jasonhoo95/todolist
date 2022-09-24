import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
	value: number;
	list: any;
	filterBy: string;
}

const initialState: CounterState = {
	value: 0,
	list: [],
	filterBy: "all",
};

export const task = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<any>) => {
			state.list.push({ name: action.payload.name, filter: "pending", id: action.payload.id });
		},
		removeTask: (state, action: PayloadAction<any>) => {
			state.list = state.list.filter((o: any, key: number) => {
				return o.id != action.payload;
			});
		},
		filterTask: (state, action: PayloadAction<any>) => {
			state.filterBy = action.payload.filter;
		},
		updateTask: (state, action: PayloadAction<any>) => {
			state.list.map((o: any, key: number) => {
				if (action.payload.key == o.id) {
					o.filter = action.payload.filter;
				}
			});
			console.log(state.list, "state list update");
		},
	},
});

// Action creators are generated for each case reducer function
export const { addTask, removeTask, updateTask, filterTask } = task.actions;

export default task.reducer;
