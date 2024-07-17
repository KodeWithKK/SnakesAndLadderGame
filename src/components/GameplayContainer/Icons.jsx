function ArrowIcon({ fgColor, bgColor, ...restProps }) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g clipPath="url(#clip0_75_9)">
        <path
          d="M42.934 20H36V4a4 4 0 00-4-4H16a4 4 0 00-4 4v16H5.066c-4.385 0-6.691 4.7-3.747 7.629L20.253 46.5a5.43 5.43 0 007.494 0L46.68 27.629C49.625 24.7 47.319 20 42.934 20z"
          fill={fgColor}
        />
        <path
          d="M42.934 20h-4c4.385 0 6.691 4.7 3.747 7.629L23.747 46.5A5.06 5.06 0 0122 47.628a5.444 5.444 0 005.747-1.128l18.934-18.871C49.625 24.7 47.319 20 42.934 20zM36 20V4a4 4 0 00-4-4h-4a4 4 0 014 4v16h4z"
          fill={bgColor}
        />
      </g>
      <defs>
        <clipPath id="clip0_75_9">
          <path fill="#fff" d="M0 0H48V48H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export { ArrowIcon };
