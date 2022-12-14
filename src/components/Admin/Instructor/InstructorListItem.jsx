import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import useHook from "../../../hooks/useHook";

import { deleteInstructor } from "../../../stores/features/instructorSlice";
import { formatLongDate } from "../../../utils/formatDate";
import {
	actionDeleteButton,
	actionEditButton,
	cancelButtonSwal,
	confirmButtonSwal,
} from "../../../utils/globalVariable";
import ModalEditInstructor from "./ModalEditInstructor";

const InstructorListItem = ({ data }) => {
	const {
		no,
		instructor_id,
		instructor_image,
		image_name,
		instructor_name,
		phone_number,
		email,
		updated_at,
	} = data;
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
						dispatch(deleteInstructor(instructor_id));
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Deleted",
									text: "Instructor data has been deleted",
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
									text: "Instructor data cannot deleted",
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
			<tr className="whitespace-nowrap border-x border-b border-neutral-100-2 bg-white hover:bg-gray-50">
				<td className="py-3 px-6 font-normal text-neutral-80">{no}</td>
				<td className="relative flex items-center py-3 px-6">
					<img
						className="absolute inset-y-3 h-10 w-10 rounded-full object-cover object-center"
						src={instructor_image}
						alt={image_name}
					/>
					<div className="pl-12">
						<div className="text-sm font-normal text-neutral-80">{instructor_name}</div>
						<div className="text-xs font-normal text-neutral-60">{email}</div>
					</div>
				</td>
				<td className="py-3 px-6 text-xs font-normal text-neutral-80 md:text-sm">{phone_number}</td>
				<td className="py-3 px-6 text-xs font-normal text-neutral-80 md:text-sm">
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
						<ModalEditInstructor handleModalEditTrigger={handleModalEditTrigger} update={data} />
					)}
				</td>
			</tr>
		</tbody>
	);
};

export default InstructorListItem;
