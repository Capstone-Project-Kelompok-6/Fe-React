// Label, Input. and Select
export const labelError =
	"absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-secondary-red duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-secondary-red";

export const labelNotError =
	"absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-dark-4";

export const inputError =
	"peer block w-full appearance-none rounded-lg border border-secondary-red bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-secondary-red focus:border-secondary-red focus:outline-none focus:ring-0";

export const inputNotError =
	"peer block w-full appearance-none rounded-lg border border-neutral-60 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-neutral-60 focus:border-primary-violet focus:outline-none focus:ring-0";

export const searchInputForLgScreen =
	"block w-full rounded-lg border border-primary-violet bg-white p-2 pr-8 text-sm text-neutral-100-2 placeholder-neutral-80 placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500";

export const searchInputForSmScreen =
	"block w-full rounded-lg border border-primary-violet bg-white p-2 pr-8 text-sm text-neutral-100-2 placeholder:text-[10px] placeholder:text-neutral-60 focus:border-blue-500 focus:ring-blue-500";

export const select =
	"block w-full appearance-none rounded-lg bg-transparent text-sm font-normal text-neutral-60 focus:border-blue-600 focus:outline-none focus:ring-0";

// Regex Validation
export const regexNameValidation = /^[a-zA-Z\s]*$/;

export const regexEmailValidation =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const regexPasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const imageMimeType = /image\/(png|jpg|jpeg)/i;

export const videoMimeType = /video\/(mp4)/i;

// Tabs
export const activeTab =
	"inline-block rounded-full border border-primary-violet bg-tertiary-background-1 px-3 py-1 text-xs text-tertiary-3";

export const notActiveTab =
	"inline-block rounded-full border border-primary-violet px-3 py-1 text-xs text-tertiary-3 hover:bg-neutral-background";

export const activeLinkTab =
	"text-secondary inline-block rounded-t-lg border-b-2 border-secondary-navy p-4 text-sm font-medium text-secondary-navy transition-all duration-300 ease-in-out";

export const inActiveLinkTab =
	"inline-block rounded-t-lg border-b-2 border-transparent p-4 text-sm font-normal text-neutral-60 transition-all duration-300 ease-in-out hover:border-gray-300 hover:text-neutral-80";

// Button
export const cancelButton =
	"w-full rounded-10 border border-secondary-navy bg-white px-5 py-2.5 text-sm font-normal text-primary-violet hover:bg-gray-100 hover:text-violet-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300";

export const saveButton =
	"w-full rounded-10 bg-secondary-navy px-5 py-2.5 text-center text-sm font-normal text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300";

export const disabledButton =
	"w-full rounded-10 bg-neutral-20 px-5 py-2.5 text-center text-sm font-normal text-neutral-60 cursor-not-allowed";

export const addButton =
	"inline-flex items-center rounded-lg bg-secondary-navy px-3 py-1.5 text-center text-[10px] font-normal text-white focus:outline-none focus:ring-4 focus:ring-blue-300 md:px-3 md:py-1";

export const previousButtonDisabled =
	"ml-0 block cursor-not-allowed rounded-l-lg bg-white py-2 px-3 font-normal leading-tight text-neutral-80 hover:bg-neutral-5 hover:text-gray-700";

export const previousButtonActive =
	"ml-0 block rounded-l-lg bg-white py-2 px-3 font-normal leading-tight text-secondary-navy hover:bg-blue-100 hover:text-indigo-800";

export const nextButtonDisabled =
	"block cursor-not-allowed rounded-r-lg bg-white py-2 px-3 font-normal leading-tight text-neutral-80 hover:bg-neutral-5 hover:text-gray-700";

export const nextButtonActive =
	"block rounded-r-lg bg-white py-2 px-3 font-normal leading-tight text-primary-violet hover:bg-blue-100 hover:text-indigo-800";

export const actionEditButton =
	"rounded-lg bg-secondary-yellow px-2 py-1 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-yellow-300";

export const actionDeleteButton =
	"rounded-lg bg-secondary-red px-2 py-1 text-center font-medium text-white focus:outline-none focus:ring-4 focus:ring-red-300";

export const actionDropdownEdit =
	"mr-2 inline-flex w-full items-center px-5 py-2.5 text-center text-sm font-normal text-neutral-100-2 transition duration-300 ease-in-out hover:bg-yellow-50 focus:outline-none";

export const confirmButtonSwal =
	"focus:outline-none text-white bg-secondary-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2";

export const cancelButtonSwal =
	"text-secondary-red hover:text-secondary-red border border-secondary-red hover:bg-red-200 focus:ring-1 focus:outline-none focus:ring-secondary-red font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";

export const actionDropdownDelete =
	"mr-2 inline-flex w-full items-center px-5 py-2.5 text-center text-sm font-normal text-neutral-100-2 transition duration-300 ease-in-out hover:bg-red-50 focus:outline-none";

// Sidebar
export const sidebarActive =
	"mb-1 flex items-center rounded-lg bg-primary-violet bg-opacity-10 p-2 text-sm font-normal text-primary-violet transition-all duration-300 ease-in-out hover:bg-indigo-200";

export const sidebarInActive =
	"mb-1 flex items-center rounded-lg p-2 text-sm font-normal text-neutral-80 transition-all duration-300 ease-in-out hover:bg-indigo-100";

// Data not found
export const dataNotFound =
	"flex flex-wrap items-center justify-center rounded-xl bg-white py-4 px-6 text-xs font-semibold leading-7 text-neutral-80 shadow-4";
