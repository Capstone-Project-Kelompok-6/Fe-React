import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { formatLongDate } from "../../../utils/formatDate";
import ModalEditWorkout from "./ModalEditWorkout";
import { deleteWorkout } from "../../../stores/features/workoutSlice";
import {
	actionDeleteButton,
	actionEditButton,
	cancelButtonSwal,
	confirmButtonSwal,
} from "../../../utils/globalVariable";
import useHook from "../../../hooks/useHook";

const WorkoutListItem = ({ data }) => {
	const { no, workout_id, workout_image, image_name, workout, updated_at } = data;
	const { modalEditTrigger, setModalEditTrigger } = useHook();
	const dispatch = useDispatch();

	const handleDelete = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: confirmButtonSwal,
				cancelButton: cancelButtonSwal,
				icon: "text-secondary-yellow",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure",
				text: "You can't undo this action.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, Delete it!",
				cancelButtonText: "No, Cancel",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					try {
						dispatch(deleteWorkout(workout_id));
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Deleted",
									text: "Workout data has been deleted",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
					} catch (error) {
						setTimeout(
							() =>
								Swal.fire({
									icon: "error",
									title: "Error",
									text: "Workout data cannot deleted",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
					}
				}
			});
	};

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
	};

	return (
		<tbody>
			<tr className="whitespace-nowrap border-x border-b border-neutral-100-2 bg-white text-xs hover:bg-gray-50">
				<td className="py-3 px-6 font-normal text-neutral-80">{no}</td>
				<td className="flex items-center py-3 px-6">
					<img
						className="h-16 w-24 rounded-xl object-cover object-center"
						src={workout_image}
						alt={image_name}
						loading="lazy"
					/>
					<div className="pl-3">
						<div className="text-sm font-normal text-neutral-80">{workout}</div>
					</div>
				</td>
				<td className="py-3 px-10 text-xs font-normal text-neutral-80 md:text-sm">
					{formatLongDate(updated_at)}
				</td>
				<td className="py-3 px-6">
					<div className="flex items-center space-x-4 text-lg">
						<button type="button" className={actionEditButton} onClick={handleModalEditTrigger}>
							<i className="fi fi-sr-pencil text-sm"></i>
						</button>
						<button type="button" className={actionDeleteButton} onClick={handleDelete}>
							<i className="fi fi-sr-trash text-sm"></i>
						</button>
					</div>
					{modalEditTrigger && (
						<ModalEditWorkout handleModalEditTrigger={handleModalEditTrigger} update={data} />
					)}
				</td>
			</tr>
		</tbody>
	);
};

export default WorkoutListItem;
