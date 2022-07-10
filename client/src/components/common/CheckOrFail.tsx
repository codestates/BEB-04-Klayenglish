import ErrorIcon from "@mui/icons-material/Error";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// 회원가입 input을 입력했을 때 보여지는 icon component

interface Check {
  validate: string;
  eyes?: string;
}

export const CheckOrFail: React.FC<Check> = ({ validate, eyes }) => {
  if (validate === "fail") {
    if (eyes == "on") {
      return <VisibilityOffIcon className="signup-error-icon" />;
    } else if (eyes == "off") {
      return <VisibilityIcon className="signup-error-icon" />;
    } else {
      return <ErrorIcon className="signup-error-icon" />;
    }
  } else if (validate === "pass") {
    if (eyes == "on") {
      return <VisibilityOffIcon className="signup-pass-icon" />;
    } else if (eyes == "off") {
      return <VisibilityIcon className="signup-pass-icon" />;
    } else {
      return <CheckIcon className="signup-pass-icon" />;
    }
  } else {
    return null;
  }
};

export default CheckOrFail;
