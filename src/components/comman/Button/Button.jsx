import styles from "./Button.module.css";

const Button = ({ className, children, ...props }) => {
  return (
    <button className={`${styles.btn} ${className}`} {...props}>
      <p>{children}</p>
    </button>
  );
};

export default Button;
