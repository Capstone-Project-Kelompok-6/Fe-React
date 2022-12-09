// Label and Input
export const labelError =
	"absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-secondary-red duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-secondary-red";
export const labelNotError =
	"absolute top-1 left-1 z-10 origin-[0] -translate-y-3 scale-75 transform bg-white px-2 text-sm text-neutral-60 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-dark-4";
export const inputError =
	"peer block w-full appearance-none rounded-lg border border-secondary-red bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-secondary-red focus:border-secondary-red focus:outline-none focus:ring-0";
export const inputNotError =
	"peer block w-full appearance-none rounded-lg border border-neutral-60 bg-transparent px-2.5 pb-1.5 pt-3 text-sm text-neutral-60 focus:border-primary-violet focus:outline-none focus:ring-0";

// Regex Validation
export const regexNameValidation = /^[a-zA-Z\s]*$/;
export const regexEmailValidation =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regexPasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// Tabs
export const activeTab = "inline-block rounded-full border border-primary-violet bg-tertiary-background-1 px-3 py-1 text-xs text-tertiary-3";
export const notActiveTab = "inline-block rounded-full border border-primary-violet px-3 py-1 text-xs text-tertiary-3 hover:bg-neutral-background";
