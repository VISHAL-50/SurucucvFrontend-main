export default function IconBtn({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-orange-500 bg-transparent" : "bg-orange-500"
        } cursor-pointer gap-x-2 rounded-md sm:w-18 lg:py-2 lg:px-5 sm:py-1 sm:px-2 font-semibold text-white ${customClasses}`}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-orange-500"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }
  