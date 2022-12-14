import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import useHook from "../../../hooks/useHook";
import { deleteArticle } from "../../../stores/features/articleSlice";
import {
	actionDropdownDelete,
	actionDropdownEdit,
	cancelButtonSwal,
	confirmButtonSwal,
} from "../../../utils/globalVariable";
import { truncate } from "../../../utils/truncate";
import ModalEditArticle from "./ModalEditArticle";

const ArticleListItem = ({ data }) => {
	const { article_id, title, article_image, image_name, description } = data;
	const { actionDropdown, setActionDropdown, modalEditTrigger, setModalEditTrigger } = useHook();
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
						dispatch(deleteArticle(article_id));
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Deleted",
									text: "Article data has been deleted",
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
									text: "Article data cannot be deleted",
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

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	return (
		<div className="h-full rounded-20 bg-white shadow-4">
			<div className="relative overflow-hidden rounded-t-20 pb-40">
				<img
					className="absolute inset-0 h-full w-full rounded-t-20 object-cover object-center transition duration-300 ease-in-out hover:scale-105"
					src={article_image}
					alt={image_name}
					loading="lazy"
				/>
				<div className="group relative">
					<button
						className="absolute right-0 top-0 cursor-pointer rounded-bl-20 bg-neutral-80 bg-opacity-50 px-4 py-2 text-blue-100 shadow-4"
						onClick={handleActionDropdown}>
						<i className="fi fi-br-menu-dots-vertical"></i>
					</button>
					{actionDropdown && (
						<div>
							<div
								className={
									actionDropdown
										? "pointer-events-auto fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
										: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
								}
								onClick={handleActionDropdown}></div>
							<div className="absolute top-0 right-0 z-10 mr-5 mt-8 w-32 rounded-xl bg-white shadow-4 transition duration-300">
								<ul className="list-reset">
									<li>
										<button
											type="button"
											className={`rounded-t-xl hover:rounded-t-xl ${actionDropdownEdit}`}
											onClick={handleModalEditTrigger}>
											<i className="fi fi-sr-pencil mr-2 -ml-1 mt-1 text-sm text-secondary-yellow"></i>
											Edit
										</button>
									</li>
									<li>
										<button
											type="button"
											className={`rounded-b-xl hover:rounded-b-xl ${actionDropdownDelete}`}
											onClick={handleDelete}>
											<i className="fi fi-sr-trash mr-2 -ml-1 mt-1 text-sm text-secondary-red"></i>
											Delete
										</button>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="p-5">
				<div className="mb-4 flex items-center">
					<div className="min-w-0 flex-1">
						<div className="group relative">
							<p className="text-base font-semibold text-neutral-100-2">{truncate(title, 30)}</p>

							<div className="absolute top-0 left-0 mt-5 mr-1 hidden flex-col items-center group-hover:flex md:-top-4 md:mt-10">
								<span className="whitespace-no-wrap relative z-10 rounded-lg bg-neutral-100-2 p-2 text-[10px] leading-none text-white shadow-4">
									{title}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="min-w-0 flex-1">
					<p className="whitespace-pre-line break-all text-sm font-normal text-neutral-80">
						{truncate(description, 100)}
					</p>
				</div>
			</div>
			{modalEditTrigger && (
				<ModalEditArticle
					handleModalEditTrigger={handleModalEditTrigger}
					update={data}
					handleActionDropdown={handleActionDropdown}
				/>
			)}
		</div>
	);
};

export default ArticleListItem;
