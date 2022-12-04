import React from "react";
import Calendar from "react-calendar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

const Overview = () => {
	const dataClasses = {
		labels: ["Booking Offline", "Booking Online"],
		datasets: [
			{
				label: "Total Classes",
				data: [12, 20],
				backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
		options: {
			plugins: {
				datalabels: {
					formatter: (value, ctx) => {
						let sum = 0;
						let dataset = ctx.chart.data.datasets[0].data;
						dataset.map((data) => {
							return (sum += data);
						});
						let percentage = ((value * 100) / sum).toFixed(2) + "%";
						return percentage;
					},
					color: "#212121",
				},
			},
		},
	};

	return (
		<div className="container mx-auto py-6 px-6">
			<div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
							<span className="mt-1 text-xl">
								<i className="fi fi-sr-user text-primary-violet"></i>
							</span>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-base font-medium text-neutral-80">Total Member</p>

							<p className="text-xl font-semibold text-secondary-navy">154</p>
						</div>
					</div>
				</div>
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
							<span className="mt-1 text-xl">
								<i className="fi fi-sr-gym text-primary-violet"></i>
							</span>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-base font-medium text-neutral-80">Total Instructure</p>

							<p className="text-xl font-semibold text-secondary-navy">154</p>
						</div>
					</div>
				</div>
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-violet bg-opacity-10 p-6">
							<span className="mt-1 text-xl">
								<i className="fi fi-sr-user text-primary-violet"></i>
							</span>
						</div>
						<div className="min-w-0 flex-1">
							<p className="text-base font-medium text-neutral-80">Total Video</p>

							<p className="text-xl font-semibold text-secondary-navy">154</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-6 grid gap-3 md:grid-cols-1 xl:grid-cols-12">
				<div className="rounded-xl bg-white p-4 shadow-4 lg:col-span-8">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<p className="text-base font-medium text-tertiary-1">Membership Growth</p>
							<div className="mt-3 flex items-center justify-center">
								<div className="chart-container relative h-[40vh] w-[80vw]"></div>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-xl bg-white p-4 shadow-4 lg:col-span-4">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<div className="flex items-center justify-center">
								<Calendar prev2Label={false} next2Label={false} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-base font-medium text-tertiary-1">Instructors</p>
								<Link
									to="/instructor"
									className="inline-flex items-center justify-center text-sm font-normal text-primary-violet hover:text-blue-600">
									View all
									<i className="fi fi-rr-angle-small-right ml-2 mt-1"></i>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-base font-medium text-tertiary-1">Members</p>
								<Link
									to="/membership"
									className="inline-flex items-center justify-center text-sm font-normal text-primary-violet hover:text-blue-600">
									View all
									<i className="fi fi-rr-angle-small-right ml-2 mt-1"></i>
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="rounded-xl bg-white p-4 shadow-4">
					<div className="flex items-center space-x-4">
						<div className="min-w-0 flex-1">
							<p className="mb-3 text-base font-medium text-tertiary-1">Total Classes</p>
							<div className="flex items-center justify-center">
								<div className="h-1/2 w-1/2">
									<Doughnut data={dataClasses} plugins={ChartDataLabels} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Overview;
