import React from "react";

const Footer = () => {
	return (
		<div className="mt-8 lg:mt-20">
			<footer className="bg-secondary-navy py-5 px-6 sm:py-16 lg:py-10 lg:px-36">
				<div className="flex-none text-white lg:flex lg:justify-between lg:text-left">
					<div className="mb-6 lg:mb-0">
						<h3 className="text-2xl font-semibold lg:text-5xl">WorkFit.</h3>
						<div className="text-base font-medium text-secondary-subtle-yellow lg:text-xl">
							<p className="mt-2 lg:my-3">workfit@gmail.com</p>
							<p>+62 821 10001 778</p>
						</div>
						<div className="mt-4 flex lg:mt-5">
							<a
								className="border-r pr-6 pt-1"
								href="https://www.facebook.com/alterra.academy"
								target="_blank"
								rel="noopener noreferrer">
								<i className="fi fi-brands-facebook text-xl lg:text-3xl"></i>
							</a>
							<a
								className="border-r px-6 pt-1"
								href="https://www.instagram.com/alterra.academy/"
								target="_blank"
								rel="noopener noreferrer">
								<i className="fi fi-brands-instagram text-xl lg:text-3xl"></i>
							</a>
							<a
								className="border-r px-6 pt-1"
								href="https://twitter.com/alterra.academy"
								target="_blank"
								rel="noopener noreferrer">
								<i className="fi fi-brands-twitter text-xl lg:text-3xl"></i>
							</a>
							<a
								className="px-6 pt-1"
								href="https://www.youtube.com/@AlterraAcademy"
								target="_blank"
								rel="noopener noreferrer">
								<i className="fi fi-brands-youtube text-xl lg:text-3xl"></i>
							</a>
						</div>
					</div>
					<div className="mb-6 md:mb-0">
						<h2 className="text-lg font-semibold uppercase dark:text-white lg:mb-6 lg:text-2xl">
							Quick Link
						</h2>
						<ul className="text-base text-secondary-subtle-yellow dark:text-gray-400 lg:text-xl">
							<li className="mb-1">
								<a href="https://flowbite.com/" className="hover:underline">
									About
								</a>
							</li>
							<li className="mb-1">
								<a href="https://tailwindcss.com/" className="hover:underline">
									Features
								</a>
							</li>
							<li className="mb-1">
								<a href="https://tailwindcss.com/" className="hover:underline">
									Blog
								</a>
							</li>
							<li className="mb-1">
								<a href="https://tailwindcss.com/" className="hover:underline">
									Contact Us
								</a>
							</li>
							<li className="mb-1">
								<a href="https://tailwindcss.com/" className="hover:underline">
									FAQ
								</a>
							</li>
						</ul>
					</div>
					<div className="mb-6 md:mb-0">
						<h2 className="mt-4 text-lg font-semibold uppercase dark:text-white lg:mb-6 lg:text-2xl">
							News Letter
						</h2>
						<ul className="text-base text-secondary-subtle-yellow dark:text-gray-400 lg:text-xl">
							<li className="mb-4">
								<p>
									Subscribe our newsletter to get our latest <br /> update & news
								</p>
							</li>
							<li>
								<form>
									<label
										htmlFor="search"
										className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
										Search
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="fi fi-sr-envelope mt-1 text-neutral-80"></i>
										</div>
										<input
											type="email"
											id="search"
											className="font-xs block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-gray-900 placeholder:text-sm placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 lg:p-4 lg:pl-10 lg:text-sm placeholder:lg:text-lg"
											placeholder="Your Email Address"
											required
										/>
										<a href="/">
											<i className="fi fi-sr-paper-plane absolute right-4 bottom-2 text-sm text-neutral-80 lg:right-5 lg:bottom-2.5 lg:text-xl"></i>
										</a>
									</div>
								</form>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
