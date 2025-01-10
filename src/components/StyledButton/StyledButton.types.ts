export interface IStyledButton {
  title: string;
  textDecoration?: string;
  color?: "primary" | "outlined";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}
